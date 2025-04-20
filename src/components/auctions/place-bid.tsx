
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/contexts/WalletContext";
import { ArrowUp, Loader2 } from "lucide-react";
import { Auction } from "@/lib/mock-data";

interface PlaceBidProps {
  auction: Auction;
  currentHighestBid: number;
  minBidIncrement?: number;
  currency?: string;
}

export function PlaceBid({ 
  auction, 
  currentHighestBid, 
  minBidIncrement = 0.01,
  currency = "SOL"
}: PlaceBidProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bidAmount, setBidAmount] = useState<number>(currentHighestBid + minBidIncrement);
  const { toast } = useToast();
  const { walletAddress, balance } = useWallet();

  const handlePlaceBid = async () => {
    if (!walletAddress) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive"
      });
      return;
    }

    if (bidAmount <= currentHighestBid) {
      toast({
        title: "Bid too low",
        description: `Your bid must be higher than ${currentHighestBid} ${currency}`,
        variant: "destructive"
      });
      return;
    }

    if (balance < bidAmount) {
      toast({
        title: "Insufficient funds",
        description: `You need at least ${bidAmount} ${currency} to place this bid`,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // In a real implementation, we would call the Solana program to place a bid
      // For demo purposes, we'll simulate a successful bid
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Bid placed successfully",
        description: `You placed a bid of ${bidAmount} ${currency}`
      });

      setIsOpen(false);
    } catch (error) {
      console.error("Error placing bid:", error);
      toast({
        title: "Error",
        description: "Failed to place bid",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="w-full flex items-center justify-center space-x-2"
          disabled={!walletAddress || auction.status !== 'active'}
        >
          {auction.status === 'active' ? (
            <>
              <ArrowUp className="h-4 w-4" />
              <span>Place Bid</span>
            </>
          ) : (
            <span>Auction Ended</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Place a Bid</DialogTitle>
          <DialogDescription>
            Enter your bid amount for this ticket auction.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <label htmlFor="bidAmount" className="text-sm font-medium">
              Bid Amount ({currency})
            </label>
            <Input
              id="bidAmount"
              type="number"
              step="0.01"
              min={currentHighestBid + minBidIncrement}
              value={bidAmount}
              onChange={(e) => setBidAmount(parseFloat(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">
              Minimum bid: {(currentHighestBid + minBidIncrement).toFixed(2)} {currency}
            </p>
          </div>

          <div className="rounded-md bg-muted p-3">
            <h4 className="font-medium mb-2">Bid Summary</h4>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Current Highest Bid:</span>
                <span>{currentHighestBid.toFixed(2)} {currency}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Your Bid:</span>
                <span>{bidAmount.toFixed(2)} {currency}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Your Balance:</span>
                <span className={balance < bidAmount ? "text-destructive" : ""}>
                  {balance.toFixed(2)} {currency}
                </span>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handlePlaceBid}
            disabled={isLoading || bidAmount <= currentHighestBid || balance < bidAmount}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Place Bid"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
