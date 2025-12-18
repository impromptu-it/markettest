'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function BuyButton({ marketId, side, price, className }: { marketId: number; side: 'yes' | 'no'; price: number; className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    const shares = prompt(`How many ${side.toUpperCase()} shares? (price: ${(price * 100).toFixed(0)}¢ each)`);
    if (!shares) return;

    setLoading(true);
    const res = await fetch('/api/bets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ marketId, side, shares: parseInt(shares) }),
    });

    if (res.ok) {
      const { cost } = await res.json();
      alert(`Bought ${shares} ${side.toUpperCase()} shares for $${cost.toFixed(2)}`);
      router.refresh();
    } else {
      alert('Failed to place bet');
    }
    setLoading(false);
  }

  return (
    <button onClick={handleBuy} disabled={loading} className={className}>
      <span>{loading ? 'Buying...' : `Buy ${side.toUpperCase()}`}</span>
      <span className={`${side === 'yes' ? 'bg-green-800' : 'bg-red-800'} bg-opacity-30 px-2 py-1 rounded text-sm group-hover:bg-opacity-40`}>
        {(price * 100).toFixed(0)}¢
      </span>
    </button>
  );
}
