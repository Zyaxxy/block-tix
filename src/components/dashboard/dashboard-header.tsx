
import { shortenAddress } from "@/lib/utils";

interface DashboardHeaderProps {
  walletAddress: string;
}

export function DashboardHeader({ walletAddress }: DashboardHeaderProps) {
  return (
    <header className="ticket-nav mb-8">
      <h1 className="text-4xl font-bold mb-4 text-gradient font-serif">My Dashboard</h1>
      <div className="flex items-center space-x-2 font-serif">
        <div className="h-4 w-4 rounded-full bg-green-500"></div>
        <p className="text-muted-foreground">
          Connected: <span className="font-mono">{shortenAddress(walletAddress)}</span>
        </p>
      </div>
    </header>
  );
}
