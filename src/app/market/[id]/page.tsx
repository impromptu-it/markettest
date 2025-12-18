import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import BuyButton from './BuyButton';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const marketId = parseInt(params.id);
  const market = !isNaN(marketId) ? await db.market.findUnique({ where: { id: marketId } }) : null;
  return {
    title: market ? `${market.question} | Matt's Markets` : "Matt's Markets",
  };
}

export default async function MarketDetail({ params }: { params: { id: string } }) {
  const marketId = parseInt(params.id);
  if (isNaN(marketId)) notFound();

  const market = await db.market.findUnique({ where: { id: marketId } });
  if (!market) notFound();

  const totalShares = market.yesShares + market.noShares;
  // Prevent division by zero if market is new
  const yesPrice = totalShares > 0 ? market.noShares / totalShares : 0.5;
  const noPrice = totalShares > 0 ? market.yesShares / totalShares : 0.5;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
          &larr; Back to Matt's Markets
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{market.question}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Volume: ${totalShares.toLocaleString()}</span>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Yes Option */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-xl font-semibold text-green-700">YES</span>
              <span className="text-3xl font-bold text-gray-900">{(yesPrice * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div className="bg-green-500 h-3 rounded-full transition-all duration-500" style={{ width: `${yesPrice * 100}%` }}></div>
            </div>
            <BuyButton marketId={market.id} side="yes" price={yesPrice} className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors shadow-sm flex justify-between items-center group" />
          </div>

          {/* No Option */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-xl font-semibold text-red-700">NO</span>
              <span className="text-3xl font-bold text-gray-900">{(noPrice * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div className="bg-red-500 h-3 rounded-full transition-all duration-500" style={{ width: `${noPrice * 100}%` }}></div>
            </div>
            <BuyButton marketId={market.id} side="no" price={noPrice} className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors shadow-sm flex justify-between items-center group" />
          </div>
        </div>
      </div>
    </div>
  );
}
