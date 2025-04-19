
import React from "react";
import { Keypair } from "@solana/web3.js";
import { Button } from "@/components/ui/button";
import { useSolanaWalletGeneration } from "@/hooks/useSolanaWalletGeneration";
import { PublicKeysList } from "./PublicKeysList";

interface SolanaWalletGeneratorProps {
  mnemonic?: string;
  onWalletGenerated?: (keypair: Keypair) => void;
}

export function SolanaWalletGenerator({ onWalletGenerated, mnemonic }: SolanaWalletGeneratorProps) {
  const { publicKeys, isGenerating, generateWallet } = useSolanaWalletGeneration({
    onWalletGenerated
  });

  return (
    <div className="space-y-4">
      {mnemonic && (
        <div className="p-3 bg-muted rounded-md">
          <p className="text-sm font-mono break-all">{mnemonic}</p>
        </div>
      )}
      
      <Button 
        onClick={generateWallet} 
        disabled={isGenerating}
        className="w-full"
      >
        {isGenerating ? "Generating..." : "Generate Solana Wallet"}
      </Button>
      
      {publicKeys.length > 0 && <PublicKeysList publicKeys={publicKeys} />}
    </div>
  );
}
