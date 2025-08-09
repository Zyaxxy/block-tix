
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/main-layout";
import { EventCard } from "@/components/events/event-card";
import { FeaturedEvent } from "@/components/events/featured-event";
import { AuctionCard } from "@/components/auctions/auction-card";
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
      {/* Hero Section - Sci-Fi, Glassmorphic, Neon Style */}
      <section className="relative w-full min-h-[700px] flex flex-col justify-between items-center overflow-hidden bg-black">
        {/* Futuristic Gradient Background with SVG */}
        <div className="absolute inset-0 z-0">
          <img src="/bg-main.svg" alt="background" className="w-full h-full object-cover opacity-80" />
        </div>
        {/* Glassmorphic Navigation Bar */}
        <nav className="absolute top-8 left-1/2 -translate-x-1/2 z-10 flex items-center justify-between w-[90vw] max-w-4xl px-8 py-3 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg shadow-neon-green/30" style={{boxShadow: '0 0 32px 4px #39ff14a0'}}>
          <div className="flex items-center gap-8">
            <span className="font-bold text-white text-lg tracking-wide">BlockTix</span>
            <ul className="flex items-center gap-6 text-white/80 text-base">
              <li><a href="#platforms" className="hover:text-neon-green transition">Platforms</a></li>
              <li><a href="#services" className="hover:text-neon-green transition">Services</a></li>
              <li><a href="#testimonial" className="hover:text-neon-green transition">Testimonial</a></li>
            </ul>
          </div>
          <Button variant="outline" className="rounded-full border-2 border-neon-green text-neon-green px-6 py-2 font-semibold bg-white/10 hover:shadow-[0_0_16px_4px_#39ff14] transition duration-200">
            Contact Us
          </Button>
        </nav>
        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full pt-36 pb-24">
          {/* Pill Tag */}
          <span className="mb-6 px-6 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-neon-green/40 to-white/10 border border-neon-green shadow-[0_0_12px_2px_#39ff14] text-neon-green/90 backdrop-blur-md" style={{boxShadow: '0 0 16px 2px #39ff14a0'}}>
            Software Development
          </span>
          {/* Headline */}
          <h1 className="text-center text-white font-extrabold text-4xl md:text-6xl lg:text-7xl mb-6 drop-shadow-[0_0_24px_#39ff14]">
            Building the Future on the Blockchain
          </h1>
          {/* Subheadline */}
          <p className="text-center text-lg md:text-2xl text-white/70 max-w-2xl mb-10">
            Delivers scalable and secure blockchain solutions, reshaping the infrastructure of the digital world.
          </p>
          {/* Buttons */}
          <div className="flex gap-4 mt-2">
            <Button className="rounded-full px-8 py-3 text-lg font-bold border-2 border-neon-green bg-black/60 text-neon-green shadow-[0_0_16px_2px_#39ff14] hover:bg-neon-green/20 hover:shadow-[0_0_32px_8px_#39ff14] transition duration-200" asChild>
              <Link to="#learn-more">Learn More</Link>
            </Button>
          </div>
        </div>
        {/* Glowing Arc/Planet Shape */}
        <div className="absolute left-1/2 bottom-[-120px] -translate-x-1/2 z-0 pointer-events-none">
          <svg width="600" height="220" viewBox="0 0 600 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="300" cy="110" rx="260" ry="80" fill="#39ff14" fillOpacity="0.18" />
            <ellipse cx="300" cy="110" rx="220" ry="60" fill="#39ff14" fillOpacity="0.12" />
            <ellipse cx="300" cy="110" rx="180" ry="40" fill="#39ff14" fillOpacity="0.08" />
            <ellipse cx="300" cy="110" rx="140" ry="20" fill="#39ff14" fillOpacity="0.05" />
            <filter id="glow" x="0" y="0" width="600" height="220">
              <feGaussianBlur stdDeviation="24" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </svg>
        </div>
      </section>
      
      {/* Features Section */}
  <section className="main-section font-serif py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 page-heading text-gradient font-serif">Why Choose Us ?</h2>
          <div className="events-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/50 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fraud-Proof Tickets</h3>
              <p className="text-foreground">Each ticket is a unique NFT on Solana's blockchain, making it impossible to counterfeit or duplicate.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center ">
              <div className="h-12 w-12 rounded-full bg-primary/50 flex items-center justify-center mb-4">
                <Wallet className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fair Secondary Market</h3>
              <p className="text-foreground">Resell tickets through secure blind auctions with price caps to prevent scalping and ensure fair access.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center ">
              <div className="h-12 w-12 rounded-full bg-primary/50 flex items-center justify-center mb-4">
                <Ticket className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Verification</h3>
              <p className="text-foreground">Dynamic QR codes and on-chain verification make entry to events seamless and secure.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Event Section */}
  <section className="main-section font-serif py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold page-heading text-gradient font-serif">Featured Event</h2>
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
  <section className="main-section font-serif py-16 bg-muted/50">
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
          <div className="font-serif grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Marketplace Section */}
      <section className="font-serif py-16">
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
      <section className="font-serif py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 page-heading text-gradient font-serif">How It Works</h2>
          <div className="events-section grid grid-cols-1 md:grid-cols-4 gap-8">
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
      <section className="font-serif py-16 bg-solana-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold  mb-6">Ready to experience the future of ticketing ?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of event-goers who have made the switch to secure, transparent blockchain ticketing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-solana-dark hover:bg-white/90" asChild>
              <Link to="/events">
                Browse Events
              </Link>
            </Button>
            {/* <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/10" asChild>
              <Link to="/dashboard">
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Link>
            </Button> */}
          </div>
        </div>
      </section>
  </MainLayout>
}
