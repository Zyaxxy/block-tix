
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/contexts/WalletContext";
import { Gavel, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { format, addHours } from "date-fns";

export function CreateAuction() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState("");
  const [startingPrice, setStartingPrice] = useState<number>(0.1);
  const [duration, setDuration] = useState<number>(24); // hours
  const { toast } = useToast();
  const { nfts, walletAddress } = useWallet();

  const handleCreateAuction = async () => {
    if (!walletAddress) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive"
      });
      return;
    }

    if (!selectedTicket) {
      toast({
        title: "No ticket selected",
        description: "Please select a ticket to auction",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // In a real implementation, we would call the Solana program to create an auction
      // For demo purposes, we'll simulate a successful auction creation
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Auction created",
        description: "Your ticket is now listed for auction"
      });

      setIsOpen(false);
    } catch (error) {
      console.error("Error creating auction:", error);
      toast({
        title: "Error",
        description: "Failed to create auction",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasTickets = nfts.length > 0;
  const endDate = addHours(new Date(), duration);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="flex items-center space-x-2"
          disabled={!walletAddress || !hasTickets}
        >
          <Gavel className="h-4 w-4" />
          <span>Create Auction</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Auction</DialogTitle>
          <DialogDescription>
            List one of your ticket NFTs for auction.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="ticket">Select Ticket</Label>
            <Select
              value={selectedTicket}
              onValueChange={setSelectedTicket}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a ticket" />
              </SelectTrigger>
              <SelectContent>
                {nfts.map((nft) => (
                  <SelectItem key={nft.id} value={nft.id}>
                    {nft.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="startingPrice">Starting Price (SOL)</Label>
            <Input
              id="startingPrice"
              type="number"
              step="0.01"
              min="0.01"
              value={startingPrice}
              onChange={(e) => setStartingPrice(parseFloat(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Auction Duration</Label>
              <span className="text-sm text-muted-foreground">{duration} hours</span>
            </div>
            <Slider
              defaultValue={[24]}
              max={72}
              step={1}
              value={[duration]}
              onValueChange={(values) => setDuration(values[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 hour</span>
              <span>3 days</span>
            </div>
          </div>

          <div className="rounded-md bg-muted p-3">
            <h4 className="font-medium mb-2">Auction Summary</h4>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Starting Price:</span>
                <span>{startingPrice} SOL</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>End Time:</span>
                <span>{format(endDate, "PPp")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Platform Fee:</span>
                <span>2.5%</span>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleCreateAuction}
            disabled={isLoading || !selectedTicket || startingPrice <= 0}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Auction"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
