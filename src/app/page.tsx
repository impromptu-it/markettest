import Link from 'next/link';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const markets = await db.market.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-8">
      <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 shadow-sm">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">
          Predict the future on <span className="text-blue-600">Matt's Markets</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Trade on news, politics, and culture.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Markets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.map((m) => {
            const totalShares = m.yesShares + m.noShares;
            const yesPrice = totalShares > 0 ? m.noShares / totalShares : 0.5;
            const noPrice = totalShares > 0 ? m.yesShares / totalShares : 0.5;
            
            return (
              <Link 
                key={m.id} 
                href={`/market/${m.id}`} 
                className="group block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-4 line-clamp-2">
                  {m.question}
                </h3>
                
                <div className="flex gap-3 mb-4">
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${yesPrice * 100}%` }} />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-green-700">Yes</span>
                      <span className="font-bold text-gray-900">{(yesPrice * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: `${noPrice * 100}%` }} />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-red-700">No</span>
                      <span className="font-bold text-gray-900">{(noPrice * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-xs text-gray-500 font-medium">
                  <span>Vol: ${totalShares.toLocaleString()}</span>
                </div>
              </Link>
            );
          })}
          
          {markets.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No markets found. <Link href="/create" className="text-blue-600 hover:underline">Create one?</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
