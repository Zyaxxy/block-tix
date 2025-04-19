
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Event } from "@/lib/mock-data";
import { formatDate, formatPrice } from "@/lib/utils";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const isSoldOut = event.availableTickets === 0;
  const isAlmostSoldOut = event.availableTickets <= event.totalTickets * 0.1;

  return (
    <Card className="overflow-hidden group hover:scale-105 transition-all duration-300 h-full flex flex-col bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:shadow-lg hover:shadow-emerald-500/10">
      <Link to={`/events/${event.id}`} className="relative block overflow-hidden aspect-video">
        <img
          src={event.image}
          alt={event.title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop";
          }}
        />
        {event.featured && (
          <Badge className="absolute top-2 left-2 bg-solana-purple/90 backdrop-blur-sm">
            Featured
          </Badge>
        )}
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg px-4 py-2">
              Sold Out
            </Badge>
          </div>
        )}
      </Link>
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
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div>
          <p className="text-lg font-semibold">{formatPrice(event.price, event.currency)}</p>
          {isAlmostSoldOut && !isSoldOut && (
            <p className="text-xs text-orange-500">Only {event.availableTickets} left!</p>
          )}
        </div>
        <Button asChild>
          <Link to={`/events/${event.id}`}>
            {isSoldOut ? "View Details" : "Get Tickets"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
