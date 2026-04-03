'use client';

import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function FanMode() {
  const { getMutualMatches, fanVotes, voteAsFan } = useStore();
  const matches = getMutualMatches();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">Fan Mode</h1>
      <p className="text-zinc-400 mb-8">Swipe on fights you would PAY to watch</p>

      <div className="space-y-6">
        {matches.length === 0 ? (
          <p className="text-zinc-400">No mutual matches yet — tell your fighter friends to start swiping!</p>
        ) : (
          matches.map((fight) => {
            const matchId = `1-${fight.id}`;
            const votes = fanVotes[matchId] || 42;
            return (
              <Card key={fight.id} className="p-6">
                <div className="flex justify-between">
                  <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://picsum.photos/id/64/400/400" alt="fighter" className="w-16 h-16 rounded-2xl object-cover" />
                    <div>
                      <p className="font-semibold">Diego Morales vs {fight.name}</p>
                      <p className="text-sm text-zinc-400">155 lbs • {votes} fans want this</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button size="sm" onClick={() => voteAsFan(matchId, true)}>I&apos;d Pay</Button>
                    <Button size="sm" variant="outline" onClick={() => voteAsFan(matchId, false)}>Pass</Button>
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
