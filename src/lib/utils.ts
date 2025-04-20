import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

// Combine classes with Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date string 
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return format(date, "PPP");
  } catch (error) {
    return dateString;
  }
}

// Shorten blockchain address
export function shortenAddress(address: string, chars: number = 4): string {
  if (!address) return "";
  return `${address.substring(0, chars)}...${address.substring(address.length - chars)}`;
}

// Format currency with symbol
export function formatCurrency(amount: number, currency: string = "SOL"): string {
  return `${amount.toFixed(2)} ${currency}`;
}

// Track transactions in localStorage
export function logTransaction(
  type: 'add' | 'purchase' | 'transfer',
  amount: number,
  description: string
) {
  const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
  transactions.push({
    id: `tx-${Date.now()}`,
    type,
    amount,
    description,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Format price to display as currency
export function formatPrice(price: number, currency: string = "USD"): string {
  if (currency === "USD") {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  }
  return `${price.toFixed(2)} ${currency}`;
}

export async function connectWallet() {
  // Connect to Solana devnet
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  console.log("Connecting wallet to Solana devnet...");
  
  // In a real app, this would interface with a browser wallet like Phantom
  // For this implementation, we'll just return the address from localStorage
  // or a sample address if none exists
  const savedAddress = localStorage.getItem('walletAddress');
  return savedAddress || "sample-wallet-address";
}

// Define specific types for ticket metadata attributes
interface TicketMetadataAttribute {
  trait_type: string;
  value: string | number | boolean;
}

// Define a specific type for ticket metadata
interface TicketMetadata {
  name?: string;
  description?: string;
  image?: string;
  attributes?: TicketMetadataAttribute[];
}

// Main ticket data interface
export interface TicketData {
  price: number;
  quantity: number;
  metadata?: TicketMetadata;
}

export async function mintTicket(eventId: string, ticketData?: TicketData) {
  // Implement your Solana ticket minting logic here
  console.log(`Minting ticket for event ${eventId}`, ticketData);
  // Return transaction information
  return { success: true, txId: "sample-transaction-id" };
}

// Get Solana balance from devnet
export async function getSolanaBalance(publicKey: string): Promise<number> {
  try {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const key = new PublicKey(publicKey);
    const balanceInLamports = await connection.getBalance(key);
    return balanceInLamports / 1000000000; // Convert lamports to SOL
  } catch (error) {
    console.error("Error fetching Solana balance:", error);
    return 0;
  }
}
