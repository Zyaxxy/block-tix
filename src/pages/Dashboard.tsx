
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { events, generateAuctions, generateTickets, users } from "@/lib/mock-data";
import { ConnectWallet } from "@/components/dashboard/connect-wallet";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { TicketsTab } from "@/components/dashboard/tickets-tab";
import { AuctionsTab } from "@/components/dashboard/auctions-tab";
import { TransactionHistoryTab } from "@/components/dashboard/transaction-history-tab";

export default function Dashboard() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  
  useEffect(() => {
    const mockUser = users.find(u => u.walletAddress);
    if (mockUser) {
      setWalletAddress(mockUser.walletAddress);
    }
  }, []);
  
  const handleConnect = async () => {
    if (walletAddress) return;
    
    setIsLoading(true);
    try {
      const address = await connectWallet();
      setWalletAddress(address);
      toast({
        title: "Wallet connected",
        description: `Connected to ${address}`,
      });
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Could not connect to wallet",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!walletAddress) {
    return (
      <MainLayout>
        <div className="main-section">
          <ConnectWallet isLoading={isLoading} onConnect={handleConnect} />
        </div>
      </MainLayout>
    );
  }

  // Get user's tickets
  const tickets = generateTickets().filter(ticket => 
    users.find(u => u.walletAddress === walletAddress)?.tickets.includes(ticket.id)
  );
  
  // Get active bids
  const allAuctions = generateAuctions();
  const userBids = users.find(u => u.walletAddress === walletAddress)?.bids || [];
  const biddingAuctions = allAuctions.filter(auction => 
    auction.bids.some(bid => userBids.includes(bid.id))
  );
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader walletAddress={walletAddress} />
        
        <Tabs defaultValue="tickets">
          <TabsList className="mb-8">
            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="bids">My Bids</TabsTrigger>
            <TabsTrigger value="history">Transaction History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tickets">
            <TicketsTab tickets={tickets} events={events} />
          </TabsContent>
          
          <TabsContent value="bids">
            <AuctionsTab 
              auctions={biddingAuctions} 
              tickets={generateTickets()} 
              events={events} 
            />
          </TabsContent>
          
          <TabsContent value="history">
            <TransactionHistoryTab />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

// Helper function for wallet connection
function connectWallet(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("sample-wallet-address");
    }, 1000);
  });
}
