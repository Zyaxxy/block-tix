import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Event, Ticket } from "@/lib/mock-data";
import { formatDate, formatPrice } from "@/lib/utils";
import { Calendar, ExternalLink, MapPin, QrCode, Ticket as TicketIcon } from "lucide-react";

interface TicketCardProps {
  ticket: Ticket;
  event: Event;
}

export function TicketCard({ ticket, event }: TicketCardProps) {
  return (
  <Card className="ticket-summary gradient-border overflow-hidden group hover:scale-105 transition-all duration-300 h-full flex flex-col">
  <CardHeader className="pb-2 relative">
        <div className="absolute -top-6 -right-6 bg-solana-purple/10 w-20 h-20 rounded-full blur-xl"/>
        <div className="absolute -bottom-6 -left-6 bg-solana-blue/10 w-20 h-20 rounded-full blur-xl"/>
        <div className="relative">
          <h3 className="text-lg font-semibold truncate text-gradient font-serif">{event.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground space-x-2 font-serif">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground space-x-2 font-serif">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
        </div>
      </CardHeader>
  <CardContent className="pb-2 space-y-3 flex-grow font-serif">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm space-x-2">
            <TicketIcon className="h-4 w-4" />
            <span className="font-medium">Seat {ticket.seatNumber}</span>
          </div>
          <Badge variant={ticket.status === 'minted' ? "outline" : "secondary"} className="score-badge">
            {ticket.status === 'minted' ? 'NFT Minted' : ticket.status}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          Ticket price: {formatPrice(ticket.price, ticket.currency)}
        </div>
        {ticket.mintAddress && (
          <div className="flex items-center text-xs text-muted-foreground space-x-2 overflow-hidden">
            <span className="truncate">NFT: {ticket.mintAddress}</span>
            <a href="#" className="text-primary hover:underline">
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button variant="outline">
          <QrCode className="mr-2 h-4 w-4" />
          View Ticket
        </Button>
        {event.resaleEnabled && ticket.status === 'minted' && (
          <Button variant="outline">
            List for Sale
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
