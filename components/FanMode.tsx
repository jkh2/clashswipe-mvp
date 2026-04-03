'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function FanMode() {
  const { fighters, loadFighters, fanVotes, voteAsFan, subscribeToVotes } = useStore();

  useEffect(() => {
    loadFighters();
    subscribeToVotes();
  }, [loadFighters, subscribeToVotes]);

  // Fan mode shows all fighters as potential matchups
  // A real mutual match query would require auth; for now show all fighter pairs
  const pairs: Array<{ matchId: string; fighterA: typeof fighters[0]; fighterB: typeof fighters[0] }> = [];
  for (let i = 0; i < fighters.length; i++) {
    for (let j = i + 1; j < fighters.length; j++) {
      pairs.push({
        matchId: `${fighters[i].id}-${fighters[j].id}`,
        fighterA: fighters[i],
        fighterB: fighters[j],
      });
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">Fan Mode</h1>
      <p className="text-zinc-400 mb-8">Swipe on fights you would PAY to watch</p>

      <div className="space-y-6">
        {pairs.length === 0 ? (
          <p className="text-zinc-400">No fighters yet — check back once fighters sign up!</p>
        ) : (
          pairs.map(({ matchId, fighterA, fighterB }) => {
            const votes = fanVotes[matchId] || 0;
            return (
              <Card key={matchId} className="p-6">
                <div className="flex justify-between">
                  <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={fighterA.image} alt={fighterA.name} className="w-16 h-16 rounded-2xl object-cover" />
                    <div>
                      <p className="font-semibold">{fighterA.name} vs {fighterB.name}</p>
                      <p className="text-sm text-zinc-400">{fighterA.weight} lbs • {votes} fans want this</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button size="sm" onClick={() => voteAsFan(matchId)}>I&apos;d Pay</Button>
                    <Button size="sm" variant="outline">Pass</Button>
                  </div>
                </div>
                <Badge className="mt-4">Estimated Purse: ${(votes * 12).toLocaleString()}</Badge>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
