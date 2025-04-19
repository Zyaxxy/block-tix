import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { DrawerClose } from "@/components/ui/drawer";
import { logTransaction } from "@/lib/utils";

export function AddFundsForm() {
  const [amount, setAmount] = useState<string>("");
  const { addFunds, walletAddress } = useWallet();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      addFunds(numAmount);
      
      // Log the transaction
      logTransaction('add', numAmount, 'Added funds to wallet');
      
      setAmount("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="amount" className="text-sm font-medium">
          Amount (SOL)
        </label>
        <Input
          id="amount"
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0.01"
          step="0.01"
          required
        />
      </div>
      
      <div className="flex flex-col space-y-2">
        <DrawerClose asChild>
          <Button 
            type="submit" 
            disabled={!amount || parseFloat(amount) <= 0 || !walletAddress}
          >
            Add Funds
          </Button>
        </DrawerClose>
        
        <p className="text-xs text-muted-foreground mt-2">
          Note: This is a demo wallet. In a real application, this would connect to a payment processor.
        </p>
      </div>
    </form>
  );
}
