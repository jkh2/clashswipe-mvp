'use client';

import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Fighter } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Props {
  fighter: Fighter;
  onSwipe: (direction: 'yes' | 'no') => void;
}

export default function SwipeCard({ fighter, onSwipe }: Props) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 150) onSwipe('yes');
    else if (info.offset.x < -150) onSwipe('no');
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -200, right: 200 }}
      onDragEnd={handleDragEnd}
      style={{ x, rotate, opacity }}
      className="swipe-card absolute inset-0 cursor-grab active:cursor-grabbing"
      whileTap={{ scale: 0.95 }}
    >
      <Card className="h-full w-full overflow-hidden bg-zinc-900 border-red-500/20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={fighter.image} alt={fighter.name} className="w-full h-3/4 object-cover" />
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold">{fighter.name}</h2>
              <p className="text-zinc-400">{fighter.age} • {fighter.height} • {fighter.weight} lbs</p>
            </div>
            <Badge variant="destructive" className="text-lg px-4 py-2">{fighter.record}</Badge>
          </div>
          <p className="mt-3 text-sm text-zinc-300">{fighter.bio}</p>
          <div className="mt-6 flex gap-2">
            <Badge>{fighter.style}</Badge>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
