export default function LoadingMarket() {
  return (
    <div className="max-w-4xl mx-auto p-6 animate-pulse">
      <div className="mb-6 h-5 w-32 bg-gray-200 rounded"></div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Skeleton for Options */}
          {[1, 2].map((i) => (
            <div key={i} className="space-y-4">
              <div className="flex justify-between items-end">
                <div className="h-6 w-12 bg-gray-200 rounded"></div>
                <div className="h-8 w-20 bg-gray-200 rounded"></div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3"></div>
              <div className="h-12 w-full bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}