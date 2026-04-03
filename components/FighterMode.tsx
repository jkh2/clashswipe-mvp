'use client';

import { useState, useEffect } from 'react';
import { useStore, type Fighter } from '@/store/useStore';
import SwipeCard from './SwipeCard';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function FighterMode() {
  const { currentUser, setCurrentUser, swipe, getMutualMatches } = useStore();
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const mock: Fighter[] = [
      { id: '1', name: 'Diego "The Beast" Morales', weight: 155, height: "5'9\"", age: 28, record: "12-3", style: "Striker", image: "https://picsum.photos/id/64/400/400", bio: "Aggressive kickboxer from Denver" },
      { id: '2', name: 'Marcus Rivera', weight: 155, height: "5'10\"", age: 31, record: "9-2", style: "Grappler", image: "https://picsum.photos/id/201/400/400", bio: "Submission specialist" },
      { id: '3', name: 'Tyler Kane', weight: 170, height: "6'1\"", age: 26, record: "15-4", style: "Striker", image: "https://picsum.photos/id/29/400/400", bio: "Power puncher" },
    ];
    setFighters(mock);
  }, []);

  if (!currentUser) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-8">Build your fighter profile</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const user: Fighter = {
              id: 'me',
              name: (form.elements.namedItem('name') as HTMLInputElement).value,
              weight: parseInt((form.elements.namedItem('weight') as HTMLInputElement).value),
              height: (form.elements.namedItem('height') as HTMLInputElement).value,
              age: parseInt((form.elements.namedItem('age') as HTMLInputElement).value),
              record: (form.elements.namedItem('record') as HTMLInputElement).value,
              style: (form.elements.namedItem('style') as HTMLInputElement).value,
              image: "https://picsum.photos/id/1005/400/400",
              bio: "Local Colorado fighter ready to clash",
            };
            setCurrentUser(user);
            toast.success("Profile created! Time to start swiping");
          }}
          className="space-y-6"
        >
          <input name="name" placeholder="Full name" className="w-full bg-zinc-900 p-4 rounded-2xl" required />
          <div className="grid grid-cols-2 gap-4">
            <input name="weight" placeholder="Weight (lbs)" type="number" className="w-full bg-zinc-900 p-4 rounded-2xl" required />
            <input name="height" placeholder="Height" className="w-full bg-zinc-900 p-4 rounded-2xl" required />
          </div>
          <input name="age" placeholder="Age" type="number" className="w-full bg-zinc-900 p-4 rounded-2xl" required />
          <input name="record" placeholder="Record (e.g. 8-2)" className="w-full bg-zinc-900 p-4 rounded-2xl" required />
          <input name="style" placeholder="Style (Striker / Grappler)" className="w-full bg-zinc-900 p-4 rounded-2xl" required />
          <Button type="submit" className="w-full py-8 text-xl rounded-3xl">Create Profile &amp; Start Swiping</Button>
        </form>
      </div>
    );
  }

  const currentFighter = fighters[currentIndex];

  const handleSwipe = (direction: 'yes' | 'no') => {
    if (currentFighter) {
      swipe(currentFighter.id, direction);
      const next = currentIndex + 1;
      setCurrentIndex(next);
      if (next >= fighters.length) {
        toast("Out of fighters in your class! Check your Fight Ledger");
      }
    }
  };

  const matches = getMutualMatches();

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
        <div>
          <p className="font-semibold">{currentUser.name}</p>
          <p className="text-xs text-zinc-400">{currentUser.weight} lbs • {currentUser.record}</p>
        </div>
        <div className="flex items-center gap-3">
          {matches.length > 0 && (
            <span className="text-sm text-green-400">{matches.length} match{matches.length > 1 ? 'es' : ''}!</span>
          )}
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>Ledger</Button>
        </div>
      </div>

      {/* Swipe area */}
      <div className="flex-1 relative flex items-center justify-center p-6 overflow-hidden">
        {currentIndex < fighters.length ? (
          <SwipeCard fighter={currentFighter} onSwipe={handleSwipe} />
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">You swiped through everyone!</h2>
            <Button onClick={() => setCurrentIndex(0)}>Restart swipes</Button>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="p-6 flex justify-center gap-8 border-t border-zinc-800">
        <Button size="lg" variant="destructive" className="rounded-3xl w-20 h-20 text-4xl" onClick={() => handleSwipe('no')}>✕</Button>
        <Button size="lg" className="rounded-3xl w-20 h-20 text-4xl bg-green-500 hover:bg-green-600" onClick={() => handleSwipe('yes')}>✓</Button>
      </div>
    </div>
  );
}
