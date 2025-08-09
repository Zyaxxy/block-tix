
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/main-layout";
import { EventCard } from "@/components/events/event-card";
import { FeaturedEvent } from "@/components/events/featured-event";
import { AuctionCard } from "@/components/auctions/auction-card";
import { HeroSection } from "@/components/sections/Hero";
import { events, generateAuctions, generateTickets } from "@/lib/mock-data";
import { ArrowRight, Calendar, MapPinned, ShieldCheck, Ticket, Timer, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const featuredEvent = events.find(event => event.featured) || events[0];
  const upcomingEvents = events.slice(0, 3);
  const tickets = generateTickets();
  const auctions = generateAuctions().slice(0, 3);
  
  return (
    <MainLayout>
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose SolanaTickets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fraud-Proof Tickets</h3>
              <p className="text-muted-foreground">Each ticket is a unique NFT on Solana's blockchain, making it impossible to counterfeit or duplicate.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fair Secondary Market</h3>
              <p className="text-muted-foreground">Resell tickets through secure blind auctions with price caps to prevent scalping and ensure fair access.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Ticket className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Verification</h3>
              <p className="text-muted-foreground">Dynamic QR codes and on-chain verification make entry to events seamless and secure.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Event Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Event</h2>
            <Button variant="ghost" className="group" asChild>
              <Link to="/events" className="flex items-center">
                View All 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <FeaturedEvent event={featuredEvent} />
        </div>
      </section>
      
      {/* Upcoming Events Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Upcoming Events</h2>
            <Button variant="ghost" className="group" asChild>
              <Link to="/events" className="flex items-center">
                View All 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Marketplace Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Active Auctions</h2>
            <Button variant="ghost" className="group" asChild>
              <Link to="/marketplace" className="flex items-center">
                View All 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
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
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white text-lg font-bold h-8 w-8 rounded-full flex items-center justify-center">
                1
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mt-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Find Events</h3>
              <p className="text-muted-foreground text-sm">Browse upcoming events and select the ones you want to attend.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white text-lg font-bold h-8 w-8 rounded-full flex items-center justify-center">
                2
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mt-4">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Purchase Tickets</h3>
              <p className="text-muted-foreground text-sm">Connect your Solana wallet and purchase tickets directly on the blockchain.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white text-lg font-bold h-8 w-8 rounded-full flex items-center justify-center">
                3
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mt-4">
                <Ticket className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Receive NFT Tickets</h3>
              <p className="text-muted-foreground text-sm">Your tickets are minted as NFTs and sent to your wallet with all event details.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white text-lg font-bold h-8 w-8 rounded-full flex items-center justify-center">
                4
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mt-4">
                <MapPinned className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Attend Event</h3>
              <p className="text-muted-foreground text-sm">Show your dynamic QR code for easy entry verification at the event.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-solana-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to experience the future of ticketing?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of event-goers who have made the switch to secure, transparent blockchain ticketing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-solana-dark hover:bg-white/90" asChild>
              <Link to="/events">
                Browse Events
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/10" asChild>
              <Link to="/dashboard">
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
