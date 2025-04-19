
import { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { SolanaTicketService } from '@/services/solanaTicketService';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from './use-toast';
import { TicketNFTMetadata } from '@/types/nft-metadata';

export function useSolanaTicket() {
  const { toast } = useToast();
  const { walletAddress, addNFT } = useWallet();
  const [ticketService, setTicketService] = useState<SolanaTicketService | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (walletAddress) {
      // In a real implementation, we would initialize the connection and provider here
      const connection = new Connection('https://api.devnet.solana.com');
      setTicketService(new SolanaTicketService(connection, null));
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
      const eventPublicKey = new PublicKey(eventId);
      const buyerPublicKey = new PublicKey(walletAddress);
      
      const signature = await ticketService.mintTicket(
        eventPublicKey,
        buyerPublicKey,
        seatInfo,
        metadata
      );

      toast({
        title: "Success",
        description: "Ticket minted successfully"
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
        description: "Failed to mint ticket",
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
