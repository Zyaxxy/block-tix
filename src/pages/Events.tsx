
import { MainLayout } from "@/components/layout/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EventCard } from "@/components/events/event-card";
import { events } from "@/lib/mock-data";
import { Search, Calendar, Tag, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedButton } from "@/components/ui/animated-button";
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
      <div className="min-h-screen bg-gradient-to-br from-purple-900/50 via-indigo-900/50 to-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-16">
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="text-5xl font-bold mb-4 text-white">
              Upcoming Events
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Discover and book tickets for the hottest events on{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-purple-500">
                Solana
              </span>
              .
            </p>
          </motion.header>
          
          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg p-6 mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <div>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900/95 border-white/10 text-white backdrop-blur-xl">
                    <SelectItem value="all" className="hover:bg-white/10">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="hover:bg-white/10">{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <AnimatedButton size="lg" className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600">
                <Search className="mr-2 h-4 w-4" />
                Find Events
              </AnimatedButton>
            </div>
          </motion.div>
          
          {/* Events List */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-between mb-8"
            >
              <h2 className="text-2xl font-semibold text-white">
                {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Found
              </h2>
              <Select defaultValue="dateAsc">
                <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900/95 border-white/10 text-white backdrop-blur-xl">
                  <SelectItem value="dateAsc" className="hover:bg-white/10">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Date: Soonest</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="dateDesc" className="hover:bg-white/10">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Date: Latest</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="priceAsc" className="hover:bg-white/10">
                    <div className="flex items-center">
                      <Tag className="mr-2 h-4 w-4" />
                      <span>Price: Low to High</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="priceDesc" className="hover:bg-white/10">
                    <div className="flex items-center">
                      <Tag className="mr-2 h-4 w-4" />
                      <span>Price: High to Low</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="location" className="hover:bg-white/10">
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>Location</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </motion.div>
            
            {filteredEvents.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <h3 className="text-xl font-semibold mb-2 text-white">No events found</h3>
                <p className="text-gray-400">
                  Try adjusting your search or filter criteria.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
