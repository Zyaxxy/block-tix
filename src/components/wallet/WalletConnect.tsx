
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { Wallet, Copy, ArrowDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { SolanaWalletGenerator } from "./SolanaWalletGenerator";
import { Keypair } from "@solana/web3.js";
import { shortenAddress } from "@/lib/utils";

export function WalletConnect() {
  const { 
    walletAddress, 
    isWalletCreated, 
    createWallet, 
    mnemonic, 
    resetMnemonic, 
    balance,
    refreshBalance,
    disconnectWallet 
  } = useWallet();
  const [isCreating, setIsCreating] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(false);
  const { toast } = useToast();

  // Refresh balance periodically
  useEffect(() => {
    if (isWalletCreated) {
      const interval = setInterval(() => {
        refreshBalance();
      }, 30000); // Every 30 seconds
      
      return () => clearInterval(interval);
    }
  }, [isWalletCreated, refreshBalance]);

  const handleConnect = () => {
    if (isWalletCreated) {
      // Show wallet details
      setShowDialog(true);
    } else {
      // Show wallet creation dialog
      setShowDialog(true);
    }
  };

  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast({
        title: "Copied to clipboard",
        description: "Your wallet address has been copied"
      });
    }
  };

  const handleCreateWallet = async () => {
    setIsCreating(true);
    try {
      await createWallet();
      setShowMnemonic(true);
    } catch (error) {
      console.error("Error creating wallet:", error);
      toast({
        title: "Error",
        description: "Failed to create wallet",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    resetMnemonic();
    setShowMnemonic(false);
  };

  const handleWalletGenerated = (keypair: Keypair) => {
    console.log("Wallet generated:", keypair.publicKey.toString());
  };

  const handleDisconnect = () => {
    disconnectWallet();
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected"
    });
    setShowDialog(false);
  };

  return (
    <>
      <Button 
        onClick={handleConnect} 
        className="flex items-center space-x-2 hover:shadow-md"
        variant={isWalletCreated ? "outline" : "purple"}
      >
        <Wallet className="font-serif h-4 w-4" />
        {isWalletCreated 
          ? <span>{shortenAddress(walletAddress || "")} ({balance.toFixed(2)} SOL)</span>
          : <span>Create Wallet</span>
        }
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isWalletCreated ? "Your Solana Wallet" : "Create New Wallet"}
            </DialogTitle>
            <DialogDescription>
              {isWalletCreated 
                ? "View and manage your Solana wallet"
                : "Generate a new Solana wallet to store your tickets and manage your funds."
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-4">
            <SolanaWalletGenerator 
              mnemonic={mnemonic || ""} 
              onWalletGenerated={handleWalletGenerated}
            />
          </div>

          <DialogFooter className="flex justify-between">
            <Button onClick={handleCloseDialog}>
              Close
            </Button>
            {isWalletCreated && (
              <Button variant="destructive" onClick={handleDisconnect}>
                Disconnect Wallet
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
