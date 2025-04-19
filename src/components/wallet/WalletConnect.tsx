
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { Wallet, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { SolanaWalletGenerator } from "./SolanaWalletGenerator";
import { Keypair } from "@solana/web3.js";

export function WalletConnect() {
  const { walletAddress, isWalletCreated, createWallet, mnemonic, resetMnemonic } = useWallet();
  const [isCreating, setIsCreating] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(false);
  const { toast } = useToast();

  const handleConnect = () => {
    setShowDialog(true);
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

  return (
    <>
      <Button onClick={handleConnect} disabled={isWalletCreated} className="flex items-center space-x-2">
        <Wallet className="h-4 w-4" />
        <span>{isWalletCreated ? "Wallet Connected" : "Create Wallet"}</span>
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Wallet</DialogTitle>
            <DialogDescription>
              Generate a new Solana wallet to store your tickets and manage your funds.
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-4">
            <SolanaWalletGenerator 
              mnemonic={mnemonic || ""} 
              onWalletGenerated={handleWalletGenerated}
            />
          </div>

          <DialogFooter>
            <Button onClick={handleCloseDialog}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
