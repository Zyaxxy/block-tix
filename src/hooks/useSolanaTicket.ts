import { useEffect, useState } from 'react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { SolanaTicketService } from '@/services/solanaTicketService';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';
import { TicketNFTMetadata } from '@/types/nft-metadata';
import { logTransaction } from '@/lib/utils';

export function useSolanaTicket() {
  const { toast } = useToast();
  const { walletAddress, addNFT } = useWallet();
  const [ticketService, setTicketService] = useState<SolanaTicketService | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (walletAddress) {
      try {
        // Initialize connection to Solana devnet
        const connection = new Connection('https://api.devnet.solana.com');
        setTicketService(new SolanaTicketService(connection, null));
      } catch (error) {
        console.error("Error initializing Solana ticket service:", error);
      }
    }
  }, [walletAddress]);

  const mintTicket = async (
    eventId: string,
    seatInfo: string,
    metadata: TicketNFTMetadata
  ) => {
    if (!ticketService || !walletAddress) {
      toast({
        title: "Error",
        description: "Wallet not connected",
        variant: "destructive"
      });
      return null;
    }

    setIsLoading(true);
    try {
      if (!eventId || eventId.length < 32) {
        throw new Error("Invalid event ID format");
      }
      
      const eventPublicKey = new PublicKey(eventId);
      const buyerPublicKey = new PublicKey(walletAddress);
      const organizerPublicKey = new PublicKey("HndjAZBimoFvnTiKJoVn8dD73Uc4BMFmExrdMjKqWtbc");
      
      // Mock transaction delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const signature = await ticketService.mintTicket(
        eventPublicKey,
        buyerPublicKey,
        seatInfo,
        metadata
      );

      // Log the transaction
      logTransaction(
        'purchase',
        metadata.properties.ticket_data?.original_price || 0,
        `Purchased ticket for ${metadata.name}`
      );

      toast({
        title: "Success",
        description: `Ticket minted and ${metadata.properties.ticket_data?.original_price / LAMPORTS_PER_SOL} SOL transferred to organizer`
      });

      return {
        signature,
        ticketId: metadata.properties.ticket_data?.ticket_id || `ticket-${Date.now()}`,
        metadata
      };
    } catch (error) {
      console.error('Error minting ticket:', error);
      toast({
        title: "Error",
        description: "Failed to mint ticket: " + (error instanceof Error ? error.message : "Unknown error"),
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mintTicket,
    isReady: !!ticketService && !isLoading,
    isLoading
  };
}
