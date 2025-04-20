import { useState } from "react";
import { Keypair } from "@solana/web3.js";
import { useToast } from "@/components/ui/use-toast";
import { shortenAddress } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

export interface UseSolanaWalletGenerationProps {
  onWalletGenerated?: (keypair: Keypair) => void;
}

export function useSolanaWalletGeneration({ onWalletGenerated }: UseSolanaWalletGenerationProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [publicKeys, setPublicKeys] = useState<string[]>([]);
  const { toast } = useToast();

  const generateWallet = async () => {
    setIsGenerating(true);
    try {
      const keypair = Keypair.generate();
      const publicKey = keypair.publicKey.toString();
      
      // Store the public key for display
      setPublicKeys(prev => [...prev, publicKey]);
      
      // In a real app, you would securely store the private key
      // and handle user authentication properly
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { error } = await supabase.from('wallets').insert([
          {
            user_id: user.id,
            public_key: publicKey,
            balance: 0
          }
        ]);

        if (error) throw error;
      }
      
      if (onWalletGenerated) {
        onWalletGenerated(keypair);
      }

      toast({
        title: "Wallet created successfully",
        description: `Your new wallet address: ${shortenAddress(publicKey)}`,
      });
      
      return keypair;
    } catch (error) {
      console.error("Error generating wallet:", error);
      toast({
        title: "Error creating wallet",
        description: "An error occurred while creating your wallet",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    generateWallet,
    publicKeys
  };
}
