import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Fighter = {
  id: string;
  name: string;
  weight: number;
  height: string;
  age: number;
  record: string;
  style: string;
  image: string;
  bio: string;
};

const mockFighters: Fighter[] = [
  { id: '1', name: 'Diego "The Beast" Morales', weight: 155, height: "5'9\"", age: 28, record: "12-3", style: "Striker", image: "https://picsum.photos/id/64/400/400", bio: "Aggressive kickboxer" },
  { id: '2', name: 'Marcus Rivera', weight: 155, height: "5'10\"", age: 31, record: "9-2", style: "Grappler", image: "https://picsum.photos/id/201/400/400", bio: "BJJ black belt" },
  { id: '3', name: 'Tyler Kane', weight: 170, height: "6'1\"", age: 26, record: "15-4", style: "Striker", image: "https://picsum.photos/id/29/400/400", bio: "Power puncher" },
];

type Store = {
  currentUser: Fighter | null;
  swipes: Record<string, 'yes' | 'no'>;
  mutualMatches: string[];
  fanVotes: Record<string, number>;
  setCurrentUser: (user: Fighter) => void;
  swipe: (fighterId: string, direction: 'yes' | 'no') => void;
  getMutualMatches: () => Fighter[];
  voteAsFan: (matchId: string, vote: boolean) => void;
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      currentUser: null,
      swipes: {},
      mutualMatches: ['1-2'],
      fanVotes: { '1-2': 87 },
      setCurrentUser: (user) => set({ currentUser: user }),
      swipe: (id, direction) =>
        set((state) => ({
          swipes: { ...state.swipes, [id]: direction },
        })),
      getMutualMatches: () => {
        const state = get();
        return mockFighters.filter(f => state.swipes[f.id] === 'yes' && state.mutualMatches.includes(`1-${f.id}`));
      },
      voteAsFan: (matchId, vote) =>
        set((state) => ({
          fanVotes: {
            ...state.fanVotes,
            [matchId]: (state.fanVotes[matchId] || 0) + (vote ? 1 : 0),
          },
        })),
    }),
    { name: 'clashswipe-storage' }
  )
);
