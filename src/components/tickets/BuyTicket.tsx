
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Ticket } from "lucide-react";
import { generateTicketNFTMetadata } from "@/types/nft-metadata";
import { useSolanaTicket } from "@/hooks/useSolanaTicket";
import { useWallet } from "@/contexts/WalletContext";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface BuyTicketProps {
  eventId: string;
  eventName: string;
  eventDate: string;
  venueName: string;
  ticketPrice: number;
  currency?: string;
  disabled?: boolean;
}

export function BuyTicket({
  eventId,
  eventName,
  eventDate,
  venueName,
  ticketPrice,
  currency = "SOL",
  disabled = false
}: BuyTicketProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const { toast } = useToast();
  const { mintTicket, isReady } = useSolanaTicket();
  const { walletAddress, addNFT, balance } = useWallet();

  const handleBuyTicket = async () => {
    if (!walletAddress || !isReady) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive"
      });
      return;
    }

    if (balance < ticketPrice) {
      toast({
        title: "Insufficient funds",
        description: `You need at least ${ticketPrice} ${currency} to purchase this ticket`,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Generate random seat info
      const section = String.fromCharCode(65 + Math.floor(Math.random() * 5)); // A-E
      const row = String(Math.floor(Math.random() * 10) + 1); // 1-10
      const seat = String(Math.floor(Math.random() * 30) + 1); // 1-30
      
      // Generate ticket ID
      const ticketId = `tkt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Create metadata for the ticket NFT
      const metadata = generateTicketNFTMetadata(
        eventName,
        eventDate,
        venueName,
        section,
        row,
        seat,
        eventId,
        ticketId,
        walletAddress, // creator address is the wallet address
        undefined, // use default image
        ticketPrice * 1000000000 // convert SOL to lamports
      );

      // Mint the ticket NFT
      const result = await mintTicket(
        eventId,
        `${section}${row}${seat}`,
        metadata
      );

      if (result) {
        // Add NFT to wallet context for display
        addNFT({
          id: ticketId,
          name: metadata.name,
          image: metadata.image,
          event: eventName,
          date: eventDate,
          seat: `${section}${row}${seat}`
        });

        setPurchaseComplete(true);
      }
    } catch (error) {
      console.error("Error minting ticket:", error);
      toast({
        title: "Error",
        description: "Failed to mint ticket",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    if (purchaseComplete) {
      setPurchaseComplete(false);
      // Redirect to "My Tickets" or reload
      window.location.href = "/dashboard";
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button 
          disabled={disabled || !walletAddress || !isReady}
          className="flex items-center space-x-2"
        >
          <Ticket className="h-4 w-4" />
          <span>Buy Ticket</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {purchaseComplete ? (
          <>
            <DialogHeader>
              <DialogTitle>Purchase Complete!</DialogTitle>
              <DialogDescription>
                Your ticket has been minted as an NFT and added to your wallet.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-4 text-center">
                  <Ticket className="h-16 w-16 mx-auto my-4 text-emerald-500" />
                  <h3 className="text-lg font-semibold">{eventName}</h3>
                  <p className="text-sm text-muted-foreground">{formatDate(eventDate)}</p>
                  <p className="text-sm mt-2">{venueName}</p>
                </CardContent>
              </Card>
              <p className="text-sm mt-4 text-center text-muted-foreground">
                You can view your tickets in the "My Tickets" section of your dashboard.
              </p>
            </div>
            <DialogFooter>
              <Button onClick={handleClose}>View My Tickets</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Confirm Purchase</DialogTitle>
              <DialogDescription>
                You are about to purchase a ticket for {eventName}.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Event:</span>
                  <span>{eventName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Date:</span>
                  <span>{formatDate(eventDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Venue:</span>
                  <span>{venueName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Price:</span>
                  <span>{ticketPrice} {currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Your Balance:</span>
                  <span className={balance < ticketPrice ? "text-destructive" : ""}>
                    {balance.toFixed(2)} {currency}
                  </span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                onClick={handleBuyTicket}
                disabled={isLoading || balance < ticketPrice}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm Purchase"
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
