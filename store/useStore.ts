import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { Fighter } from '@/types';

type Store = {
  currentUser: Fighter | null;
  fighters: Fighter[];
  swipes: Record<string, 'yes' | 'no'>;
  mutualMatches: string[];
  fanVotes: Record<string, number>;
  setCurrentUser: (user: Fighter | null) => void;
  loadFighters: () => Promise<void>;
  swipe: (fighterId: string, direction: 'yes' | 'no') => Promise<void>;
  getMutualMatches: () => Fighter[];
  voteAsFan: (matchId: string) => Promise<void>;
  subscribeToVotes: () => void;
};

export const useStore = create<Store>((set, get) => ({
  currentUser: null,
  fighters: [],
  swipes: {},
  mutualMatches: [],
  fanVotes: {},

  setCurrentUser: (user) => set({ currentUser: user }),

  loadFighters: async () => {
    const { data } = await supabase.from('fighters').select('*');
    set({ fighters: data || [] });
  },

  swipe: async (fighterId, direction) => {
    const { currentUser } = get();
    if (!currentUser) return;

    await supabase.from('swipes').upsert({
      user_id: currentUser.id,
      fighter_id: fighterId,
      direction,
    });

    set((state) => ({
      swipes: { ...state.swipes, [fighterId]: direction },
    }));
  },

  getMutualMatches: () => {
    const state = get();
    return state.fighters.filter(
      (f) => state.swipes[f.id] === 'yes' && state.mutualMatches.includes(`${state.currentUser?.id}-${f.id}`)
    );
  },

  voteAsFan: async (matchId) => {
    const current = get().fanVotes[matchId] || 0;
    await supabase
      .from('votes')
      .upsert({ match_id: matchId, count: current + 1 }, { onConflict: 'match_id' });
    // Realtime subscription handles the state update
  },

  subscribeToVotes: () => {
    supabase
      .channel('votes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'votes' },
        (payload) => {
          const row = payload.new as { match_id: string; count: number };
          set((state) => ({
            fanVotes: {
              ...state.fanVotes,
              [row.match_id]: row.count || 0,
            },
          }));
        }
      )
      .subscribe();
  },
}));
