
import { MainLayout } from "@/components/layout/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { AuctionCard } from "@/components/auctions/auction-card";
import { events, generateAuctions, generateTickets } from "@/lib/mock-data";
import { Search, SlidersHorizontal, Gavel } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useWallet } from "@/contexts/WalletContext";
import { CreateAuction } from "@/components/auctions/create-auction";
import { PlaceBid } from "@/components/auctions/place-bid";

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showActiveOnly, setShowActiveOnly] = useState(true);
  const { walletAddress } = useWallet();
  
  const tickets = generateTickets();
  const allAuctions = generateAuctions();
  
  const filteredAuctions = allAuctions.filter(auction => {
    const matchesSearch = events.find(e => e.id === auction.eventId)?.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = auction.currentPrice >= priceRange[0] && auction.currentPrice <= priceRange[1];
    const matchesStatus = showActiveOnly ? auction.status === 'active' : true;
    return matchesSearch && matchesPrice && matchesStatus;
  });
  
  return <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="mb-4 text-4xl font-bold text-left">Live Auctions</h1>
            <p className="text-muted-foreground text-lg">
              Bid on tickets for sold-out events through our secure auction system.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <CreateAuction />
          </div>
        </header>
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch mb-8">
          <div className="relative flex-grow">
            <Input placeholder="Search auctions..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <Select defaultValue="ending-soon">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ending-soon">Ending Soon</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="most-bids">Most Bids</SelectItem>
            </SelectContent>
          </Select>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Auctions</SheetTitle>
                <SheetDescription>
                  Adjust filters to find the perfect tickets.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-6">
                <div className="space-y-2">
                  <Label>Price Range (USDC)</Label>
                  <div className="flex justify-between mb-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <Slider defaultValue={[0, 500]} max={500} step={10} value={priceRange} onValueChange={setPriceRange} />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Status</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="active-only" checked={showActiveOnly} onCheckedChange={() => setShowActiveOnly(!showActiveOnly)} />
                    <label htmlFor="active-only" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Show active auctions only
                    </label>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Event Categories</Label>
                  {Array.from(new Set(events.map(event => event.category))).map(category => <div key={category} className="flex items-center space-x-2">
                      <Checkbox id={`category-${category}`} />
                      <label htmlFor={`category-${category}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {category}
                      </label>
                    </div>)}
                </div>
                <Button className="w-full mt-4">Apply Filters</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Auctions List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              {filteredAuctions.length} {filteredAuctions.length === 1 ? 'Auction' : 'Auctions'} Found
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuctions.map(auction => {
              const ticket = tickets.find(t => t.id === auction.ticketId)!;
              const event = events.find(e => e.id === auction.eventId)!;
              
              // Custom rendering with bid button
              return (
                <div key={auction.id} className="flex flex-col h-full">
                  <AuctionCard auction={auction} ticket={ticket} event={event} />
                  {walletAddress && !auction.bids.some(bid => bid.bidder === walletAddress) && (
                    <div className="mt-2">
                      <PlaceBid 
                        auction={auction} 
                        currentHighestBid={auction.currentPrice} 
                        currency={auction.currency}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {filteredAuctions.length === 0 && <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No auctions found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>}
        </div>
      </div>
    </MainLayout>;
}
