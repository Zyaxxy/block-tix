
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Event } from "@/lib/mock-data";
import { formatDate, formatPrice } from "@/lib/utils";
import { Calendar, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface FeaturedEventProps {
  event: Event;
}

export function FeaturedEvent({ event }: FeaturedEventProps) {
  const isSoldOut = event.availableTickets === 0;
  const percentageSold = Math.round(((event.totalTickets - event.availableTickets) / event.totalTickets) * 100);
  
  return (
    <Card className="overflow-hidden border-0 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="relative aspect-video md:aspect-auto">
          <img 
            src={event.image} 
            alt={event.title} 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex flex-col justify-end p-6 md:hidden">
            <Badge className="self-start mb-2 bg-solana-purple">Featured Event</Badge>
            <h2 className="text-2xl font-bold text-white mb-2">{event.title}</h2>
            <div className="flex items-center text-white/80 space-x-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">{formatDate(event.date)}</span>
            </div>
          </div>
        </div>
        <CardContent className="p-6 flex flex-col justify-between bg-gradient-to-br from-solana-purple/10 to-solana-blue/10">
          <div className="space-y-4">
            <div className="hidden md:block">
              <Badge className="mb-2 bg-solana-purple">Featured Event</Badge>
              <h2 className="text-3xl font-bold mb-2">{event.title}</h2>
            </div>
            <p className="text-muted-foreground">{event.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{event.availableTickets} tickets left</span>
                </div>
                <p className="text-sm text-muted-foreground">Organized by {event.organizer}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full"
                style={{ width: `${percentageSold}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium">{formatPrice(event.price, event.currency)}</p>
              <p className="text-sm text-muted-foreground">{percentageSold}% sold</p>
            </div>
            <Button className="w-full" asChild>
              <Link to={`/events/${event.id}`}>
                {isSoldOut ? "Join Waitlist" : "Get Tickets"}
              </Link>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
