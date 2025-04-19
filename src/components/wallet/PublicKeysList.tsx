
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { shortenAddress } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Connection, LAMPORTS_PER_SOL, clusterApiUrl, PublicKey } from "@solana/web3.js";

interface PublicKeysListProps {
  publicKeys: string[];
}

export function PublicKeysList({ publicKeys }: PublicKeysListProps) {
  const { toast } = useToast();
  const [balances, setBalances] = React.useState<{[key: string]: number}>({});

  React.useEffect(() => {
    const fetchBalances = async () => {
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
      const balanceMap: {[key: string]: number} = {};
      
      for (const address of publicKeys) {
        try {
          const publicKey = new PublicKey(address);
          const balanceInLamports = await connection.getBalance(publicKey);
          balanceMap[address] = balanceInLamports / LAMPORTS_PER_SOL;
        } catch (error) {
          console.error(`Error fetching balance for ${address}:`, error);
          balanceMap[address] = 0;
        }
      }
      
      setBalances(balanceMap);
    };
    
    if (publicKeys.length > 0) {
      fetchBalances();
    }
  }, [publicKeys]);

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied",
      description: "Wallet address copied to clipboard",
    });
  };

  if (publicKeys.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Solana Wallets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {publicKeys.map((address, index) => (
            <div
              key={index}
              className="flex flex-col p-3 bg-muted rounded-md"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-medium">
                  Address
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(address)}
                  title="Copy address"
                  className="h-6 w-6"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <code className="text-xs font-mono break-all mb-2">
                {address}
              </code>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Balance</span>
                <span className="text-sm font-medium">
                  {balances[address] !== undefined 
                    ? `${balances[address].toFixed(4)} SOL` 
                    : "Loading..."}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
