
import { MainLayout } from "@/components/layout/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EventCard } from "@/components/events/event-card";
import { events } from "@/lib/mock-data";
import { Search, Calendar, MapPin, Tag } from "lucide-react";
import { useState } from "react";

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  
  const categories = Array.from(new Set(events.map(event => event.category)));
  
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = category === "all" || event.category === category;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Events</h1>
          <p className="text-muted-foreground text-lg">
            Discover and book tickets for the hottest events on Solana.
          </p>
        </header>
        
        {/* Search and Filters */}
        <div className="bg-card rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full md:w-auto">
              <Search className="mr-2 h-4 w-4" />
              Find Events
            </Button>
          </div>
        </div>
        
        {/* Events List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Found
            </h2>
            <Select defaultValue="dateAsc">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dateAsc">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Date: Soonest</span>
                  </div>
                </SelectItem>
                <SelectItem value="dateDesc">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Date: Latest</span>
                  </div>
                </SelectItem>
                <SelectItem value="priceAsc">
                  <div className="flex items-center">
                    <Tag className="mr-2 h-4 w-4" />
                    <span>Price: Low to High</span>
                  </div>
                </SelectItem>
                <SelectItem value="priceDesc">
                  <div className="flex items-center">
                    <Tag className="mr-2 h-4 w-4" />
                    <span>Price: High to Low</span>
                  </div>
                </SelectItem>
                <SelectItem value="location">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>Location</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
