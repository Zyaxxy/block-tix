
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Plus, Copy } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { shortenAddress } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { AddFundsForm } from "./AddFundsForm";

export function WalletCard() {
  const { walletAddress, balance, isWalletCreated } = useWallet();
  const { toast } = useToast();

  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard"
      });
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
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>Add Funds</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="p-4 md:p-6">
                <h2 className="text-lg font-semibold mb-4">Add Funds to Your Wallet</h2>
                <AddFundsForm />
              </div>
            </DrawerContent>
          </Drawer>
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
            <span className="text-sm font-bold">{balance.toFixed(2)} SOL</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-3">
        <Button variant="outline" className="w-full">View Transaction History</Button>
      </CardFooter>
    </Card>
  );
}
