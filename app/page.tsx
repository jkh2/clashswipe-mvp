'use client';

import { useState } from 'react';
import FighterMode from '@/components/FighterMode';
import FanMode from '@/components/FanMode';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [mode, setMode] = useState<'fighter' | 'fan' | null>(null);

  if (!mode) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <h1 className="text-7xl font-black tracking-tighter bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              CLASHSWIPE
            </h1>
            <p className="text-xl text-zinc-400 mt-2">Swipe. Match. Fight.<br />Fans vote with their wallets.</p>
          </div>

          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full text-xl py-8 rounded-3xl"
              onClick={() => setMode('fighter')}
            >
              👊 I&apos;m a Fighter
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full text-xl py-8 rounded-3xl"
              onClick={() => setMode('fan')}
            >
              👀 I&apos;m a Fan
            </Button>
          </div>

          <p className="text-xs text-zinc-500 mt-12">MVP v0.1 • Built live with Grok</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {mode === 'fighter' ? <FighterMode /> : <FanMode />}
      <button
        onClick={() => setMode(null)}
        className="fixed bottom-6 left-6 text-xs text-zinc-400 hover:text-white flex items-center gap-1"
      >
        ← Back to home
      </button>
    </div>
  );
}
