import { v4 as uuidv4 } from 'uuid';

export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  category: string;
  organizer: string;
  ticketPrice: number;
  price: number;
  currency: string;
  totalTickets: number;
  soldTickets: number;
  availableTickets: number;
  featured: boolean;
  resaleEnabled: boolean;
  resalePriceCap?: number;
}

export interface Ticket {
  id: string;
  eventId: string;
  name: string;
  price: number;
  currency: string;
  available: boolean;
  seatNumber: string;
  status: string;
  mintAddress?: string;
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
  highestBidder?: string;
}

export interface Bid {
  id: string;
  bidder: string;
  amount: number;
  timestamp: string;
}

export interface User {
  id: string;
  walletAddress: string;
  balance: number;
  tickets: string[];
  bids: string[];
}

export const users = [
  {
    id: "user1",
    walletAddress: "3Eq1dtcPnC4WuPpW3ugCcxwXzWwEXUkgkTU89rQRWCdQ",
    balance: 10.5,
    tickets: ["tkt1", "tkt3"],
    bids: ["bid1", "bid2"]
  }
];

export const events = [
  {
    id: "evt1",
    title: "Solana Summer Hackathon 2025",
    description: "Join the biggest Solana hackathon of the summer...",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop",
    date: "2025-07-15",
    time: "09:00",
    venue: "Virtual Event",
    location: "Virtual Event",
    category: "Technology",
    organizer: "Solana Foundation",
    ticketPrice: 1,
    price: 1,
    currency: "SOL",
    totalTickets: 1000,
    soldTickets: 450,
    availableTickets: 550,
    featured: true,
    resaleEnabled: true,
    resalePriceCap: 1.5
  },
  {
    id: "evt2",
    title: "DeFi Summit 2025",
    description: "Explore the future of decentralized finance at DeFi Summit 2025.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop",
    date: "2025-08-20",
    time: "10:00",
    venue: "New York, NY",
    location: "New York, NY",
    category: "Finance",
    organizer: "DeFi Events Inc.",
    ticketPrice: 0.5,
    price: 0.5,
    currency: "SOL",
    totalTickets: 500,
    soldTickets: 320,
    availableTickets: 180,
    featured: false,
    resaleEnabled: true,
    resalePriceCap: 0.75
  },
  {
    id: "evt3",
    title: "Metaplex Art Exhibition",
    description: "A showcase of the best digital art powered by Metaplex.",
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&auto=format&fit=crop",
    date: "2025-09-05",
    time: "14:00",
    venue: "Miami, FL",
    location: "Miami, FL",
    category: "Art",
    organizer: "Metaplex Studios",
    ticketPrice: 2,
    price: 2,
    currency: "SOL",
    totalTickets: 300,
    soldTickets: 280,
    availableTickets: 20,
    featured: false,
    resaleEnabled: false,
    resalePriceCap: 0
  },
  {
    id: "evt4",
    title: "Web3 Gaming Conference",
    description: "Discover the latest trends in blockchain gaming.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop",
    date: "2025-10-10",
    time: "09:30",
    venue: "Online",
    location: "Online",
    category: "Gaming",
    organizer: "Web3 Gaming Corp",
    ticketPrice: 0.75,
    price: 0.75,
    currency: "SOL",
    totalTickets: 1500,
    soldTickets: 1200,
    availableTickets: 300,
    featured: true,
    resaleEnabled: true,
    resalePriceCap: 1.0
  },
  {
    id: "evt5",
    title: "Blockchain Developers Workshop",
    description: "Hands-on workshop for building decentralized applications.",
    image: "https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8?w=800&auto=format&fit=crop",
    date: "2025-11-15",
    time: "11:00",
    venue: "San Francisco, CA",
    location: "San Francisco, CA",
    category: "Technology",
    organizer: "Blockchain Academy",
    ticketPrice: 1.2,
    price: 1.2,
    currency: "SOL",
    totalTickets: 200,
    soldTickets: 180,
    availableTickets: 20,
    featured: false,
    resaleEnabled: false,
    resalePriceCap: 0
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
      price: event.price,
      currency: event.currency,
      available: true,
      seatNumber: `A${i}`,
      status: i % 3 === 0 ? 'minted' : 'purchased'
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
      currentPrice: 1.5,
      startingPrice: 1,
      minBidIncrement: 0.1,
      currency: "SOL",
      status: "active",
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      highestBidder: "0x123",
      bids: [
        {
          id: "bid1",
          bidder: "0x123",
          amount: 1.5,
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString()
        }
      ]
    },
    {
      id: "auc2",
      eventId: "evt2",
      ticketId: "tkt2",
      currentPrice: 0.8,
      startingPrice: 0.5,
      minBidIncrement: 0.05,
      currency: "SOL",
      status: "active",
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString(),
      highestBidder: "0x789",
      bids: [
        {
          id: "bid2",
          bidder: "0x456",
          amount: 0.7,
          timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString()
        },
        {
          id: "bid3",
          bidder: "0x789",
          amount: 0.8,
          timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString()
        }
      ]
    },
    {
      id: "auc3",
      eventId: "evt3",
      ticketId: "tkt3",
      currentPrice: 2.5,
      startingPrice: 2,
      minBidIncrement: 0.2,
      currency: "SOL",
      status: "ended",
      endTime: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      highestBidder: "0xdef",
      bids: [
        {
          id: "bid4",
          bidder: "0xabc",
          amount: 2.3,
          timestamp: new Date(Date.now() - 1000 * 60 * 70).toISOString()
        },
        {
          id: "bid5",
          bidder: "0xdef",
          amount: 2.5,
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString()
        }
      ]
    },
    {
      id: "auc4",
      eventId: "evt4",
      ticketId: "tkt4",
      currentPrice: 1,
      startingPrice: 0.75,
      minBidIncrement: 0.05,
      currency: "SOL",
      status: "active",
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString(),
      highestBidder: "0xbabe",
      bids: [
        {
          id: "bid6",
          bidder: "0xcafe",
          amount: 0.9,
          timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString()
        },
        {
          id: "bid7",
          bidder: "0xbabe",
          amount: 1,
          timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString()
        }
      ]
    },
    {
      id: "auc5",
      eventId: "evt5",
      ticketId: "tkt5",
      currentPrice: 1.8,
      startingPrice: 1.2,
      minBidIncrement: 0.1,
      currency: "SOL",
      status: "ended",
      endTime: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      highestBidder: "0xbeef",
      bids: [
        {
          id: "bid8",
          bidder: "0xfeed",
          amount: 1.5,
          timestamp: new Date(Date.now() - 1000 * 60 * 80).toISOString()
        },
        {
          id: "bid9",
          bidder: "0xbeef",
          amount: 1.8,
          timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString()
        }
      ]
    }
  ];
}
