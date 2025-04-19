
export function TransactionHistoryTab() {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          Transaction History
        </h2>
      </div>
      
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="grid grid-cols-5 p-4 font-medium border-b">
          <div>Date</div>
          <div>Type</div>
          <div>Description</div>
          <div>Amount</div>
          <div>Status</div>
        </div>
        <div className="divide-y">
          <div className="grid grid-cols-5 p-4 items-center">
            <div className="text-sm">Apr 15, 2025</div>
            <div>
              <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs">Purchase</span>
            </div>
            <div className="text-sm">Solana Summer Hackathon 2025</div>
            <div className="text-sm">150.00 USDC</div>
            <div>
              <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs">Confirmed</span>
            </div>
          </div>
          <div className="grid grid-cols-5 p-4 items-center">
            <div className="text-sm">Apr 12, 2025</div>
            <div>
              <span className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs">Bid</span>
            </div>
            <div className="text-sm">DeFi Summit 2025</div>
            <div className="text-sm">230.00 USDC</div>
            <div>
              <span className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs">Pending</span>
            </div>
          </div>
          <div className="grid grid-cols-5 p-4 items-center">
            <div className="text-sm">Apr 10, 2025</div>
            <div>
              <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-500 text-xs">Refund</span>
            </div>
            <div className="text-sm">Metaplex Art Exhibition</div>
            <div className="text-sm">75.00 USDC</div>
            <div>
              <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs">Confirmed</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
