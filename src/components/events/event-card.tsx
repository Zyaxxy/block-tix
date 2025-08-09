
import * as React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/lib/mock-data";
import { formatDate, formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: Event;
}

const MotionLink = motion(Link);

export function EventCard({ event }: EventCardProps) {
  const isSoldOut = event.availableTickets === 0;
  const isAlmostSoldOut = event.availableTickets <= event.totalTickets * 0.1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg hover:shadow-xl transition-all h-full flex flex-col"
      whileHover={{ scale: 1.03 }}
    >
      <div className="relative aspect-video overflow-hidden rounded-t-2xl">
        <img
          src={event.image}
          alt={event.title}
          className="object-cover w-full h-full"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Price Badge */}
        <Badge
          className={cn(
            "absolute top-3 right-3 px-3 py-1 bg-emerald-500 text-white shadow-md",
            "rounded-full font-medium text-sm"
          )}
        >
          {formatPrice(event.price, event.currency)}
        </Badge>

        {/* Featured Badge */}
        {event.featured && (
          <Badge className="absolute top-3 left-3 bg-purple-500/90 backdrop-blur-sm">
            Featured
          </Badge>
        )}

        {/* Sold Out Overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg px-4 py-2">
              Sold Out
            </Badge>
          </div>
        )}
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
          {event.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-300 space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-300 space-x-2">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
        </div>

        <p className="text-sm text-gray-400 line-clamp-2 mb-6">
          {event.description}
        </p>

        {isAlmostSoldOut && !isSoldOut && (
          <p className="text-xs text-orange-400 mb-4">
            Only {event.availableTickets} tickets left!
          </p>
        )}

        <div className="mt-auto">
          <MotionLink
            to={`/events/${event.id}`}
            className="block w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatedButton
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              size="lg"
            >
              {isSoldOut ? "View Details" : "Get Tickets"}
            </AnimatedButton>
          </MotionLink>
        </div>
      </div>
    </motion.div>
  );
}
