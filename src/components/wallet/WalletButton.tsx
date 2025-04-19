
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { ArrowDown, ArrowUp, Swap, Activity } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { shortenAddress } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export function WalletButton() {
  const { walletAddress, balance } = useWallet();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const mockTransactions = [
    {
      type: 'receive',
      amount: 1,
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      from: '3Eq1dtcPnC4WuPpW3ugCcxwXzWwEXUkgkTU89rQRWCdQ'
    },
    {
      type: 'send',
      amount: 0.5,
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      to: '7ZWZqpZ5rkwkuB6GxwQpYVGEYxo1sJvVcEJ5cVqXW8Q9'
    },
    {
      type: 'swap',
      amount: 2,
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      with: 'USDC'
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'receive':
        return <ArrowDown className="h-4 w-4 text-green-500" />;
      case 'send':
        return <ArrowUp className="h-4 w-4 text-red-500" />;
      case 'swap':
        return <Swap className="h-4 w-4 text-blue-500" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const minutes = Math.floor((Date.now() - new Date(timestamp).getTime()) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <div className="flex items-center space-x-2 cursor-pointer bg-card p-2 rounded-lg">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium">{balance.toFixed(2)} SOL</p>
            <p className="text-xs text-muted-foreground">{shortenAddress(walletAddress || '')}</p>
          </div>
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${walletAddress}`} alt="Wallet" />
            <AvatarFallback>W</AvatarFallback>
          </Avatar>
        </div>
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <CardHeader className="px-0">
          <CardTitle>Wallet Overview</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <Card className="mb-6 bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-6">
              <div className="text-3xl font-bold mb-2">{balance.toFixed(4)} SOL</div>
              <div className="text-sm text-muted-foreground">{walletAddress}</div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <Button variant="outline" className="flex flex-col items-center p-4">
              <ArrowDown className="h-5 w-5 mb-1" />
              <span className="text-xs">Receive</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center p-4">
              <ArrowUp className="h-5 w-5 mb-1" />
              <span className="text-xs">Send</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center p-4">
              <Swap className="h-5 w-5 mb-1" />
              <span className="text-xs">Swap</span>
            </Button>
          </div>

          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {mockTransactions.map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                  <div className="flex items-center gap-3">
                    {getTransactionIcon(tx.type)}
                    <div>
                      <div className="font-medium text-sm">
                        {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                        {tx.with && ` ${tx.with}`}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatTimeAgo(tx.timestamp)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {tx.type === 'receive' ? '+' : '-'}{tx.amount} SOL
                    </div>
                    {(tx.from || tx.to) && (
                      <div className="text-xs text-muted-foreground">
                        {shortenAddress(tx.from || tx.to || '')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </DrawerContent>
    </Drawer>
  );
}
