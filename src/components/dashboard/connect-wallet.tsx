
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

interface ConnectWalletProps {
  isLoading: boolean;
  onConnect: () => void;
}

export function ConnectWallet({ isLoading, onConnect }: ConnectWalletProps) {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold page-heading font-serif">Connect Your Wallet</h1>
        <p className="text-muted-foreground font-serif">
          Connect your Solana wallet to view your tickets, auctions, and manage your account.
        </p>
        <Button 
          onClick={onConnect} 
          disabled={isLoading}
          className="auth-button w-full flex items-center justify-center"
          size="lg"
        >
          <Wallet className="mr-2 h-5 w-5" />
          {isLoading ? "Connecting..." : "Connect Wallet"}
        </Button>
      </div>
    </div>
  );
}
