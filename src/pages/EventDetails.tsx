import { MainLayout } from "@/components/layout/main-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { events } from "@/lib/mock-data";
import { formatDate, formatPrice, mintTicket } from "@/lib/utils";
import { CalendarIcon, Clock, ExternalLink, MapPin, MinusCircle, PlusCircle, Share2, Ticket, Users } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BuyTicket } from "@/components/tickets/BuyTicket";

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const event = events.find((e) => e.id === id);
  
  if (!event) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <a href="/events">Browse Events</a>
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  const isSoldOut = event.availableTickets === 0;
  const maxTickets = Math.min(event.availableTickets, 5);

  const handleQuantityChange = (value: number) => {
    if (value < 1) value = 1;
    if (value > maxTickets) value = maxTickets;
    setQuantity(value);
  };

  const handlePurchase = async () => {
    if (!event) return;
    
    setIsLoading(true);
    try {
      // In a real app, this would be a call to your smart contract
      const result = await mintTicket('mock-ticket-id');
      
      if (result.success) {
        toast({
          title: "Purchase successful!",
          description: `You've successfully purchased ${quantity} ticket${quantity > 1 ? 's' : ''} to ${event.title}`,
        });
      }
    } catch (error) {
      toast({
        title: "Purchase failed",
        description: "There was an error processing your purchase. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <MainLayout>
      <div className="relative overflow-hidden bg-gradient-to-b from-solana-dark to-black text-white">
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-50" 
          style={{ backgroundImage: `url(${event.image})` }}
        ></div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <Badge className="mb-4 bg-solana-purple">{event.category}</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{event.title}</h1>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-white/80 space-x-2">
                  <CalendarIcon className="h-5 w-5" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center text-white/80 space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-white/80 space-x-2">
                  <Users className="h-5 w-5" />
                  <span>{event.availableTickets} tickets left</span>
                </div>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View on Explorer
                </Button>
              </div>
            </div>
            <div className="md:w-1/3">
              <Card className="w-full backdrop-blur-md bg-white/10 border-white/20">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-1">{formatPrice(event.price)}</h3>
                    <p className="text-white/60">per ticket</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Available</span>
                      <span className={isSoldOut ? "text-red-400" : ""}>{isSoldOut ? "Sold Out" : `${event.availableTickets} tickets`}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Limit</span>
                      <span>5 per transaction</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Resale</span>
                      <span>{event.resaleEnabled ? "Allowed" : "Not Allowed"}</span>
                    </div>
                    {event.resaleEnabled && (
                      <div className="flex items-center justify-between">
                        <span>Resale Cap</span>
                        <span>{formatPrice(event.resalePriceCap)}</span>
                      </div>
                    )}
                    <Separator className="bg-white/20" />
                    <div>
                      <label className="block mb-2">Quantity</label>
                      <div className="flex">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="bg-white/10 border-white/20 hover:bg-white/20"
                          onClick={() => handleQuantityChange(quantity - 1)}
                          disabled={quantity <= 1 || isSoldOut}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                        <Input 
                          type="number" 
                          min={1} 
                          max={maxTickets}
                          value={quantity} 
                          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                          className="mx-2 bg-white/10 border-white/20 text-center"
                          disabled={isSoldOut}
                        />
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="bg-white/10 border-white/20 hover:bg-white/20"
                          onClick={() => handleQuantityChange(quantity + 1)}
                          disabled={quantity >= maxTickets || isSoldOut}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(event.price * quantity)}</span>
                    </div>
                    
                    <BuyTicket
                      eventId={event.id}
                      eventName={event.title}
                      eventDate={event.date}
                      venueName={event.location}
                      ticketPrice={event.price}
                      currency={event.currency}
                      disabled={isSoldOut}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">About This Event</h2>
            <p className="text-muted-foreground whitespace-pre-line mb-8">
              {event.description}
              
              {"\n\n"}
              Join us for an unforgettable experience at {event.title}! This event brings together the best in the industry for a day filled with learning, networking, and fun.
              
              {"\n\n"}
              What to expect:
              {"\n"}- Keynote speeches from industry leaders
              {"\n"}- Interactive workshops
              {"\n"}- Networking opportunities
              {"\n"}- Exclusive demos
              {"\n"}- Special performances
              
              {"\n\n"}
              Don't miss this chance to be part of something special. Secure your tickets now!
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Event Details</h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <CalendarIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Date and Time</h3>
                  <p className="text-muted-foreground">{formatDate(event.date)}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-muted-foreground">{event.location}</p>
                  <p className="text-muted-foreground text-sm">123 Event Street, Suite 500</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Duration</h3>
                  <p className="text-muted-foreground">3 hours</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Organizer</h3>
                  <p className="text-muted-foreground">{event.organizer}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Location</h2>
            <div className="bg-muted rounded-lg h-64 flex items-center justify-center mb-6">
              <MapPin className="h-8 w-8 text-muted-foreground" />
              <span className="text-muted-foreground ml-2">Map Preview</span>
            </div>
            <address className="not-italic text-muted-foreground mb-6">
              123 Event Street, Suite 500<br />
              {event.location}<br />
              United States
            </address>
            <Button variant="outline" className="w-full">
              <MapPin className="mr-2 h-4 w-4" />
              View Directions
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
