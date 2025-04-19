import { v4 as uuidv4 } from 'uuid';

export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  organizer: string;
  ticketPrice: number;
  totalTickets: number;
  soldTickets: number;
}

export interface Ticket {
  id: string;
  eventId: string;
  name: string;
  price: number;
  available: boolean;
}

export interface Auction {
  id: string;
  eventId: string;
  ticketId: string;
  currentPrice: number;
  startingPrice: number;
  minBidIncrement: number;
  currency: string;
  status: string;
  endTime: string;
  bids: Bid[];
}

export interface Bid {
  bidder: string;
  amount: number;
  timestamp: string;
}

export const events = [
  {
    id: "evt1",
    title: "Solana Summer Hackathon 2025",
    description: "Join the biggest Solana hackathon of the summer...",
    image: "/events/hackathon.jpg",
    date: "2025-07-15",
    time: "09:00",
    venue: "Virtual Event",
    category: "Technology",
    organizer: "Solana Foundation",
    ticketPrice: 1, // Changed from USDC to SOL
    totalTickets: 1000,
    soldTickets: 450
  },
  {
    id: "evt2",
    title: "DeFi Summit 2025",
    description: "Explore the future of decentralized finance at DeFi Summit 2025.",
    image: "/events/defi.jpg",
    date: "2025-08-20",
    time: "10:00",
    venue: "New York, NY",
    category: "Finance",
    organizer: "DeFi Events Inc.",
    ticketPrice: 0.5, // Changed from USDC to SOL
    totalTickets: 500,
    soldTickets: 320
  },
  {
    id: "evt3",
    title: "Metaplex Art Exhibition",
    description: "A showcase of the best digital art powered by Metaplex.",
    image: "/events/art.jpg",
    date: "2025-09-05",
    time: "14:00",
    venue: "Miami, FL",
    category: "Art",
    organizer: "Metaplex Studios",
    ticketPrice: 2, // Changed from USDC to SOL
    totalTickets: 300,
    soldTickets: 280
  },
  {
    id: "evt4",
    title: "Web3 Gaming Conference",
    description: "Discover the latest trends in blockchain gaming.",
    image: "/events/gaming.jpg",
    date: "2025-10-10",
    time: "09:30",
    venue: "Online",
    category: "Gaming",
    organizer: "Web3 Gaming Corp",
    ticketPrice: 0.75, // Changed from USDC to SOL
    totalTickets: 1500,
    soldTickets: 1200
  },
  {
    id: "evt5",
    title: "Blockchain Developers Workshop",
    description: "Hands-on workshop for building decentralized applications.",
    image: "/events/workshop.jpg",
    date: "2025-11-15",
    time: "11:00",
    venue: "San Francisco, CA",
    category: "Technology",
    organizer: "Blockchain Academy",
    ticketPrice: 1.2, // Changed from USDC to SOL
    totalTickets: 200,
    soldTickets: 180
  }
];

export function generateTickets(count: number = 5): Ticket[] {
  const tickets: Ticket[] = [];
  for (let i = 1; i <= count; i++) {
    const event = events[i % events.length];
    tickets.push({
      id: `tkt${i}`,
      eventId: event.id,
      name: `${event.title} Ticket ${i}`,
      price: event.ticketPrice,
      available: true
    });
  }
  return tickets;
}

export function generateAuctions() {
  return [
    {
      id: "auc1",
      eventId: "evt1",
      ticketId: "tkt1",
      currentPrice: 1.5, // Changed from USDC to SOL
      startingPrice: 1,  // Changed from USDC to SOL
      minBidIncrement: 0.1, // Changed from USDC to SOL
      currency: "SOL",   // Updated currency
      status: "active",
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      bids: [
        {
          bidder: "0x123",
          amount: 1.5,  // Changed from USDC to SOL
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString()
        }
      ]
    },
    {
      id: "auc2",
      eventId: "evt2",
      ticketId: "tkt2",
      currentPrice: 0.8,  // Changed from USDC to SOL
      startingPrice: 0.5, // Changed from USDC to SOL
      minBidIncrement: 0.05, // Changed from USDC to SOL
      currency: "SOL",   // Updated currency
      status: "active",
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString(),
      bids: [
        {
          bidder: "0x456",
          amount: 0.7,  // Changed from USDC to SOL
          timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString()
        },
        {
          bidder: "0x789",
          amount: 0.8,  // Changed from USDC to SOL
          timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString()
        }
      ]
    },
    {
      id: "auc3",
      eventId: "evt3",
      ticketId: "tkt3",
      currentPrice: 2.5,  // Changed from USDC to SOL
      startingPrice: 2, // Changed from USDC to SOL
      minBidIncrement: 0.2, // Changed from USDC to SOL
      currency: "SOL",   // Updated currency
      status: "ended",
      endTime: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      bids: [
        {
          bidder: "0xabc",
          amount: 2.3,  // Changed from USDC to SOL
          timestamp: new Date(Date.now() - 1000 * 60 * 70).toISOString()
        },
        {
          bidder: "0xdef",
          amount: 2.5,  // Changed from USDC to SOL
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString()
        }
      ]
    },
    {
      id: "auc4",
      eventId: "evt4",
      ticketId: "tkt4",
      currentPrice: 1,  // Changed from USDC to SOL
      startingPrice: 0.75, // Changed from USDC to SOL
      minBidIncrement: 0.05, // Changed from USDC to SOL
      currency: "SOL",   // Updated currency
      status: "active",
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString(),
      bids: [
        {
          bidder: "0xcafe",
          amount: 0.9,  // Changed from USDC to SOL
          timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString()
        },
        {
          bidder: "0xbabe",
          amount: 1,  // Changed from USDC to SOL
          timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString()
        }
      ]
    },
    {
      id: "auc5",
      eventId: "evt5",
      ticketId: "tkt5",
      currentPrice: 1.8,  // Changed from USDC to SOL
      startingPrice: 1.2, // Changed from USDC to SOL
      minBidIncrement: 0.1, // Changed from USDC to SOL
      currency: "SOL",   // Updated currency
      status: "ended",
      endTime: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      bids: [
        {
          bidder: "0xfeed",
          amount: 1.5,  // Changed from USDC to SOL
          timestamp: new Date(Date.now() - 1000 * 60 * 80).toISOString()
        },
        {
          bidder: "0xbeef",
          amount: 1.8,  // Changed from USDC to SOL
          timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString()
        }
      ]
    }
  ];
}
