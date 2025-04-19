
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  price: number;
  currency: string;
  totalTickets: number;
  availableTickets: number;
  category: string;
  featured: boolean;
  organizer: string;
  resaleEnabled: boolean;
  resalePriceCap: number;
}

export interface Ticket {
  id: string;
  eventId: string;
  mintAddress?: string;
  seatNumber: string;
  price: number;
  currency: string;
  status: 'available' | 'sold' | 'minted' | 'used';
  owner?: string;
  qrCode?: string;
  metadata?: {
    eventId: string;
    seatNumber: string;
    eventDate: string;
    qrHash: string;
    resaleStatus: boolean;
  };
}

export interface Auction {
  id: string;
  ticketId: string;
  eventId: string;
  startPrice: number;
  currentPrice: number;
  currency: string;
  startTime: string;
  endTime: string;
  highestBidder?: string;
  status: 'active' | 'ended' | 'cancelled';
  bids: Bid[];
}

export interface Bid {
  id: string;
  auctionId: string;
  bidder: string;
  amount: number;
  timestamp: string;
}

export interface User {
  id: string;
  walletAddress: string;
  displayName?: string;
  tickets: string[]; // Array of ticket IDs
  bids: string[]; // Array of bid IDs
  createdEvents?: string[]; // Array of event IDs (for organizers)
}

// Mock events data
export const events: Event[] = [
  {
    id: "evt-001",
    title: "Solana Summer Hackathon 2025",
    description: "Join the biggest Solana hackathon of the year! Build, learn, and connect with the Solana community.",
    date: "2025-07-15T10:00:00Z",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&q=80&w=2070",
    price: 150,
    currency: "USDC",
    totalTickets: 500,
    availableTickets: 127,
    category: "Conference",
    featured: true,
    organizer: "Solana Foundation",
    resaleEnabled: true,
    resalePriceCap: 180
  },
  {
    id: "evt-002",
    title: "DeFi Summit 2025",
    description: "The premier conference for decentralized finance. Network with the top DeFi protocols on Solana.",
    date: "2025-08-22T09:00:00Z",
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1594122230689-45895aace0c9?auto=format&fit=crop&q=80&w=2070",
    price: 200,
    currency: "USDC",
    totalTickets: 300,
    availableTickets: 42,
    category: "Conference",
    featured: true,
    organizer: "DeFi Alliance",
    resaleEnabled: true,
    resalePriceCap: 240
  },
  {
    id: "evt-003",
    title: "Metaplex Art Exhibition",
    description: "Explore digital art on Solana. Meet artists and collectors in this exclusive NFT showcase.",
    date: "2025-06-10T18:00:00Z",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2064",
    price: 75,
    currency: "USDC",
    totalTickets: 200,
    availableTickets: 15,
    category: "Arts & Culture",
    featured: false,
    organizer: "Metaplex Studios",
    resaleEnabled: true,
    resalePriceCap: 90
  },
  {
    id: "evt-004",
    title: "Phantom Wallet Workshop",
    description: "Learn how to secure your Solana assets and use advanced features of Phantom wallet.",
    date: "2025-05-18T14:00:00Z",
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1590034752726-32687c3d7643?auto=format&fit=crop&q=80&w=2070",
    price: 50,
    currency: "USDC",
    totalTickets: 100,
    availableTickets: 68,
    category: "Workshop",
    featured: false,
    organizer: "Phantom Labs",
    resaleEnabled: false,
    resalePriceCap: 0
  },
  {
    id: "evt-005",
    title: "Solana Gaming Festival",
    description: "The first-ever gaming festival built on Solana. Play, compete, and win NFT prizes!",
    date: "2025-09-05T12:00:00Z",
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&q=80&w=2071",
    price: 120,
    currency: "USDC",
    totalTickets: 1000,
    availableTickets: 752,
    category: "Gaming",
    featured: true,
    organizer: "Solana Gaming DAO",
    resaleEnabled: true,
    resalePriceCap: 144
  },
  {
    id: "evt-006",
    title: "Crypto Music Festival",
    description: "A three-day music festival where all tickets are NFTs on Solana.",
    date: "2025-07-28T16:00:00Z",
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=2070",
    price: 180,
    currency: "USDC",
    totalTickets: 2000,
    availableTickets: 1205,
    category: "Music",
    featured: true,
    organizer: "Crypto Sounds DAO",
    resaleEnabled: true,
    resalePriceCap: 216
  }
];

// Generate some tickets for each event
export const generateTickets = (): Ticket[] => {
  const tickets: Ticket[] = [];
  
  events.forEach(event => {
    for (let i = 1; i <= event.totalTickets; i++) {
      const seatNumber = `A${i.toString().padStart(3, '0')}`;
      const status = i <= (event.totalTickets - event.availableTickets) ? 'sold' : 'available';
      
      tickets.push({
        id: `tkt-${event.id}-${i}`,
        eventId: event.id,
        seatNumber,
        price: event.price,
        currency: event.currency,
        status,
      });
    }
  });
  
  return tickets;
};

// Generate some sample auctions
export const generateAuctions = (): Auction[] => {
  const auctions: Auction[] = [];
  const tickets = generateTickets();
  
  // Get some sold tickets from events with resale enabled
  const soldTickets = tickets.filter(ticket => 
    ticket.status === 'sold' && 
    events.find(e => e.id === ticket.eventId)?.resaleEnabled
  ).slice(0, 10);
  
  soldTickets.forEach((ticket, index) => {
    const event = events.find(e => e.id === ticket.eventId)!;
    const now = new Date();
    const startTime = new Date(now);
    startTime.setDate(now.getDate() - Math.floor(Math.random() * 5));
    
    const endTime = new Date(now);
    endTime.setDate(now.getDate() + Math.floor(Math.random() * 10) + 1);
    
    const bids: Bid[] = [];
    const numBids = Math.floor(Math.random() * 5);
    
    for (let i = 0; i < numBids; i++) {
      bids.push({
        id: `bid-${index}-${i}`,
        auctionId: `auc-${index}`,
        bidder: `wallet-${Math.floor(Math.random() * 100)}`,
        amount: event.price + Math.floor(Math.random() * (event.resalePriceCap - event.price)),
        timestamp: new Date(startTime.getTime() + Math.random() * (now.getTime() - startTime.getTime())).toISOString()
      });
    }
    
    auctions.push({
      id: `auc-${index}`,
      ticketId: ticket.id,
      eventId: ticket.eventId,
      startPrice: event.price,
      currentPrice: bids.length > 0 ? Math.max(...bids.map(b => b.amount)) : event.price,
      currency: event.currency,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      highestBidder: bids.length > 0 ? bids.reduce((prev, current) => (prev.amount > current.amount) ? prev : current).bidder : undefined,
      status: endTime > now ? 'active' : 'ended',
      bids
    });
  });
  
  return auctions;
};

export const mockUserAddress = "BFefyp8hB5uyHmZnVgvKYqJMCcjkZ3Nw5u5GQNKZkAdx";

// Generate sample user data
export const users: User[] = [
  {
    id: "usr-001",
    walletAddress: mockUserAddress,
    displayName: "Solana Enthusiast",
    tickets: [],
    bids: []
  }
];

// Populate user tickets with some purchased tickets
export const populateUserTickets = (): void => {
  const tickets = generateTickets();
  const ticketsToAssign = tickets.filter(t => t.status === 'sold').slice(0, 5);
  
  users[0].tickets = ticketsToAssign.map(t => t.id);
  
  // Update ticket owners
  ticketsToAssign.forEach(ticket => {
    ticket.owner = users[0].walletAddress;
    ticket.status = 'minted';
    ticket.mintAddress = `NFT${Math.random().toString(36).substring(2, 10)}`;
    ticket.metadata = {
      eventId: ticket.eventId,
      seatNumber: ticket.seatNumber,
      eventDate: events.find(e => e.id === ticket.eventId)?.date || "",
      qrHash: Math.random().toString(36).substring(2, 15),
      resaleStatus: false
    };
    ticket.qrCode = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdgI2RJGzOAAAAABJRU5ErkJggg==`;
  });
};

// Initialize data
populateUserTickets();
