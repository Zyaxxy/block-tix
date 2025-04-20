
import { Button } from "@/components/ui/button";
import { AuctionCard } from "@/components/auctions/auction-card";
import { Event, Auction, Ticket } from "@/lib/mock-data";

interface AuctionsTabProps {
  auctions: Auction[];
  tickets: Ticket[];
  events: Event[];
}

export function AuctionsTab({ auctions, tickets, events }: AuctionsTabProps) {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          Your Active Bids ({auctions.length})
        </h2>
      </div>
      
      {auctions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.map((auction) => {
            const ticket = tickets.find(t => t.id === auction.ticketId)!;
            const event = events.find(e => e.id === auction.eventId)!;
            return (
              <AuctionCard 
                key={auction.id} 
                auction={auction} 
                ticket={ticket} 
                event={event} 
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-muted/30 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">No active bids</h3>
          <p className="text-muted-foreground mb-6">
            You haven't placed any bids on ticket auctions yet.
          </p>
          <Button asChild>
            <a href="/marketplace">Browse Auctions</a>
          </Button>
        </div>
      )}
    </>
  );
}
