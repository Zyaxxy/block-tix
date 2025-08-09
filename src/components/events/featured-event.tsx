
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Event } from "@/lib/mock-data";
import { formatDate, formatPrice } from "@/lib/utils";
import { Calendar, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedButton } from "@/components/ui/animated-button";

interface FeaturedEventProps {
  event: Event;
}

export function FeaturedEvent({ event }: FeaturedEventProps) {
  const isSoldOut = event.availableTickets === 0;
  const percentageSold = Math.round(((event.totalTickets - event.availableTickets) / event.totalTickets) * 100);
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotate: 1 }}
      className="rounded-2xl overflow-hidden p-[2px] bg-[length:400%] bg-gradient-to-r from-emerald-400 via-purple-500 to-indigo-500 animate-border"
      style={{
        backgroundSize: "200% 200%",
        animation: "borderGradient 4s linear infinite"
      }}
    >
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-emerald-900/20 to-purple-900/20 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="relative aspect-video md:aspect-auto overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
            >
              <img 
                src={event.image || "/images/sample-ticket.png"} 
                alt={event.title} 
                className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:hidden">
                <Badge className="self-start mb-2 bg-emerald-500/80 backdrop-blur-sm">Featured Event</Badge>
                <h2 className="text-2xl font-bold text-white mb-2">{event.title}</h2>
                <div className="flex items-center text-white/90 space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{formatDate(event.date)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        <CardContent className="p-6 flex flex-col justify-between bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-md">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden md:block"
            >
              <Badge className="mb-2 bg-emerald-500/80 backdrop-blur-sm text-white">Featured Event</Badge>
              <h2 className="text-3xl font-bold mb-2 text-white">{event.title}</h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-300"
            >
              {event.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Calendar className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm">{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <MapPin className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Users className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm">{event.availableTickets} tickets left</span>
                </div>
                <p className="text-sm text-gray-300">Organized by {event.organizer}</p>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 space-y-4"
          >
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <motion.div 
                className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-2"
                initial={{ width: 0 }}
                animate={{ width: `${percentageSold}%` }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <div className="flex items-center justify-between text-white">
              <p className="font-medium text-lg">{formatPrice(event.price, event.currency)}</p>
              <p className="text-sm text-emerald-400">{percentageSold}% sold</p>
            </div>
            <AnimatedButton className="w-full bg-emerald-500 hover:bg-emerald-600 text-white" asChild>
              <Link to={`/events/${event.id}`}>
                {isSoldOut ? "Join Waitlist" : "Get Tickets"}
              </Link>
            </AnimatedButton>
          </motion.div>
        </CardContent>
      </div>
    </Card>
  </motion.div>
  );
}
