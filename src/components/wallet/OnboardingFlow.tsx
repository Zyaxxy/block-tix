import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Wallet, AlertTriangle } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Keypair } from "@solana/web3.js";

export function OnboardingFlow() {
  const { createWallet, completeOnboarding, isWalletCreated } = useWallet();
  const [step, setStep] = useState(1);
  const [walletCreated, setWalletCreated] = useState(false);
  const [createdDate] = useState(new Date());
  const [walletAddress, setWalletAddress] = useState("");
  const [mnemonic] = useState(generateMnemonic());
  const [hasBackedUp, setHasBackedUp] = useState(false);

  const handleCreateWallet = async () => {
    try {
      const result = await createWallet();
      setWalletCreated(true);
      setWalletAddress(result.address);
      setStep(2);
    } catch (error) {
      console.error("Failed to create wallet:", error);
    }
  };

  const handleCompleteOnboarding = () => {
    if (hasBackedUp) {
      completeOnboarding();
    }
  };

  function generateMnemonic() {
    // In a real app, this would generate a cryptographically secure mnemonic
    const words = [
      "apple", "banana", "orange", "grape", "lemon", "cherry",
      "wallet", "block", "chain", "token", "secure", "crypto"
    ];
    
    return Array.from({ length: 12 }, () => {
      const randomIndex = Math.floor(Math.random() * words.length);
      return words[randomIndex];
    });
  }

  if (isWalletCreated) {
    return null;
  }

  return (
    <div className="p-4 md:p-6 max-w-md mx-auto">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center mb-2">
            <Badge variant="outline" className="text-xs">
              {formatDistanceToNow(createdDate, { addSuffix: true })}
            </Badge>
          </div>
          <CardTitle className="text-xl">Create Your Wallet</CardTitle>
          <CardDescription>
            Step {step} of 2: {step === 1 ? "Setup" : "Backup"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-4 flex items-start space-x-4">
                <Wallet className="h-6 w-6 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">BlockTix Wallet</h3>
                  <p className="text-sm text-muted-foreground">
                    Your built-in wallet to manage tickets, NFTs, and funds.
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <p className="text-sm">Securely store your ticket NFTs</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <p className="text-sm">Buy, sell, and transfer tickets</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <p className="text-sm">Manage funds for purchases</p>
                </div>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-4">
              <div className="rounded-lg bg-accent p-4 flex items-start space-x-4">
                <AlertTriangle className="h-6 w-6 text-amber-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Backup Your Recovery Phrase</h3>
                  <p className="text-sm text-muted-foreground">
                    Write down these 12 words in order and keep them in a safe place.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 my-4">
                {mnemonic.map((word, index) => (
                  <div key={index} className="bg-muted rounded p-2 text-center">
                    <span className="text-xs text-muted-foreground">{index + 1}.</span>{" "}
                    <span className="text-sm font-medium">{word}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="backup-confirm"
                  checked={hasBackedUp}
                  onChange={(e) => setHasBackedUp(e.target.checked)}
                  className="rounded text-primary"
                />
                <label htmlFor="backup-confirm" className="text-sm">
                  I have securely backed up my recovery phrase
                </label>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep((prev) => Math.max(1, prev - 1))}
            >
              Back
            </Button>
          )}
          
          {step === 1 ? (
            <Button onClick={handleCreateWallet}>
              Create Wallet
            </Button>
          ) : (
            <Button 
              onClick={handleCompleteOnboarding} 
              disabled={!hasBackedUp}
            >
              Complete Setup
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
