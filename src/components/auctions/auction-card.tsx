
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Auction, Event, Ticket } from "@/lib/mock-data";
import { formatDate, formatPrice, shortenAddress } from "@/lib/utils";
import { Banknote, Calendar, Clock, MapPin, Ticket as TicketIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface AuctionCardProps {
  auction: Auction;
  event: Event;
  ticket: Ticket;
}

export function AuctionCard({ auction, event, ticket }: AuctionCardProps) {
  const isEnded = new Date(auction.endTime) < new Date();
  const timeLeft = getTimeLeft(auction.endTime);
  
  function getTimeLeft(endTime: string): string {
    const end = new Date(endTime);
    const now = new Date();
    
    if (end <= now) return "Ended";
    
    const diff = end.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  }

  return (
    <Card className="overflow-hidden group hover:scale-105 transition-all duration-300 h-full flex flex-col bg-gradient-to-t from-violet-300 via-violet-100 to-white p-6 rounded-2xl shadow-md">
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="object-cover w-full aspect-video group-hover:opacity-90 transition-opacity duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop";
          }}
        />
        <Badge className="absolute top-2 left-2 bg-solana-blue/90 backdrop-blur-sm group-hover:bg-solana-purple transition-colors duration-300">
          {isEnded ? "Auction Ended" : "Active Auction"}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold line-clamp-1">{event.title}</h3>
        <div className="flex items-center text-sm text-muted-foreground space-x-2">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground space-x-2">
          <MapPin className="h-4 w-4" />
          <span>{event.location}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-2 space-y-2 flex-grow">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm space-x-2">
            <TicketIcon className="h-4 w-4" />
            <span>Seat {ticket.seatNumber}</span>
          </div>
          <div className="flex items-center text-sm space-x-2">
            <Clock className="h-4 w-4" />
            <span className={isEnded ? "text-red-500" : "text-amber-500 font-medium"}>
              {timeLeft}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm space-x-2">
            <Banknote className="h-4 w-4" />
            <span>Starting bid: {formatPrice(auction.startingPrice, auction.currency)}</span>
          </div>
        </div>
        {auction.highestBidder && (
          <div className="text-sm text-muted-foreground">
            Highest bid: {formatPrice(auction.currentPrice, auction.currency)} by {shortenAddress(auction.highestBidder)}
          </div>
        )}
        <div className="text-sm text-muted-foreground">
          {auction.bids.length} {auction.bids.length === 1 ? 'bid' : 'bids'} so far
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button className="w-full bg-purple-500 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300 hover:bg-purple-600 hover:shadow-lg hover:scale-95" asChild>
          <Link to={`/marketplace/${auction.id}`}>
            {isEnded ? "View Results" : "Place Bid"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
