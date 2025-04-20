
import { Button } from "@/components/ui/button";
import { TicketCard } from "@/components/tickets/ticket-card";
import { Event, Ticket } from "@/lib/mock-data";

interface TicketsTabProps {
  tickets: Ticket[];
  events: Event[];
}

export function TicketsTab({ tickets, events }: TicketsTabProps) {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          Your Tickets ({tickets.length})
        </h2>
      </div>
      
      {tickets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => {
            const event = events.find(e => e.id === ticket.eventId)!;
            return (
              <TicketCard 
                key={ticket.id} 
                ticket={ticket} 
                event={event} 
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-muted/30 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">No tickets yet</h3>
          <p className="text-muted-foreground mb-6">
            You haven't purchased any tickets yet.
          </p>
          <Button asChild>
            <a href="/events">Browse Events</a>
          </Button>
        </div>
      )}
    </>
  );
}
