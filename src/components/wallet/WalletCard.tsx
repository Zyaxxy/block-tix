import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowDown, Copy } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { shortenAddress } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { AddFundsForm } from "./AddFundsForm";
import { Badge } from "@/components/ui/badge";
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export function WalletCard() {
  const { walletAddress, balance, isWalletCreated, refreshBalance } = useWallet();
  const { toast } = useToast();
  const [isAirdropping, setIsAirdropping] = useState(false);

  useEffect(() => {
    if (isWalletCreated) {
      refreshBalance();
    }
  }, [isWalletCreated, refreshBalance]);

  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard"
      });
    }
  };

  const handleAirdrop = async () => {
    if (!walletAddress) return;
    
    setIsAirdropping(true);
    try {
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
      const publicKey = new PublicKey(walletAddress);
      
      const signature = await connection.requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL);
      
      await connection.confirmTransaction(signature);
      
      await refreshBalance();
      
      toast({
        title: "Airdrop successful",
        description: "1 SOL has been added to your wallet"
      });
    } catch (error) {
      console.error("Airdrop failed:", error);
      toast({
        title: "Airdrop failed",
        description: "Could not complete the airdrop. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsAirdropping(false);
    }
  };

  if (!isWalletCreated) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wallet className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Your Wallet</CardTitle>
          </div>
          <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-300">
            Solana Devnet
          </Badge>
        </div>
        <CardDescription>Manage your assets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Address</span>
            <div className="flex items-center gap-2">
              <span className="text-sm">{walletAddress ? shortenAddress(walletAddress) : "Not connected"}</span>
              {walletAddress && (
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopyAddress}>
                  <Copy className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Balance</span>
            <span className="text-sm font-bold">{balance.toFixed(4)} SOL</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-3 flex gap-2">
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={handleAirdrop}
          disabled={isAirdropping}
        >
          <ArrowDown className="h-4 w-4 mr-2" />
          {isAirdropping ? "Requesting..." : "Request Airdrop"}
        </Button>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="default" className="w-full">
              Manage Wallet
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">Manage Your Wallet</h2>
              <AddFundsForm />
            </div>
          </DrawerContent>
        </Drawer>
      </CardFooter>
    </Card>
  );
}
