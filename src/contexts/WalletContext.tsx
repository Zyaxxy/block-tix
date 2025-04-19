import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Keypair } from '@solana/web3.js';

// Define the NFT type
export interface NFT {
  id: string;
  name: string;
  image: string;
  event?: string;
  date?: string;
  seat?: string;
}

// Define the WalletContextType
export interface WalletContextType {
  walletAddress: string | null;
  isWalletCreated: boolean;
  isOnboarded: boolean;
  balance: number;
  nfts: NFT[];
  createWallet: () => Promise<{ address: string }>;
  completeOnboarding: () => void;
  addFunds: (amount: number) => void;
  addNFT: (nft: NFT) => void;
}

// Create the context with default values
const WalletContext = createContext<WalletContextType>({
  walletAddress: null,
  isWalletCreated: false,
  isOnboarded: false,
  balance: 0,
  nfts: [],
  createWallet: async () => ({ address: '' }),
  completeOnboarding: () => {},
  addFunds: () => {},
  addNFT: () => {}
});

// Provider component
interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isWalletCreated, setIsWalletCreated] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [balance, setBalance] = useState(0);
  const [nfts, setNfts] = useState<NFT[]>([]);

  // Initialize from localStorage on component mount
  useEffect(() => {
    const storedWallet = localStorage.getItem('walletAddress');
    const storedIsWalletCreated = localStorage.getItem('isWalletCreated') === 'true';
    const storedIsOnboarded = localStorage.getItem('isOnboarded') === 'true';
    const storedBalance = parseFloat(localStorage.getItem('walletBalance') || '0');
    const storedNfts = JSON.parse(localStorage.getItem('walletNfts') || '[]');

    if (storedWallet) setWalletAddress(storedWallet);
    if (storedIsWalletCreated) setIsWalletCreated(true);
    if (storedIsOnboarded) setIsOnboarded(true);
    setBalance(storedBalance);
    setNfts(storedNfts);
  }, []);

  // Create wallet function
  const createWallet = async () => {
    // Here we would actually generate a Solana keypair
    // For now, we'll simulate it with a random address
    const address = `${Math.random().toString(36).substring(2, 15)}`;
    
    setWalletAddress(address);
    setIsWalletCreated(true);
    
    // Save to localStorage
    localStorage.setItem('walletAddress', address);
    localStorage.setItem('isWalletCreated', 'true');
    
    return { address };
  };

  // Complete onboarding function
  const completeOnboarding = () => {
    setIsOnboarded(true);
    localStorage.setItem('isOnboarded', 'true');
  };

  // Add funds function
  const addFunds = (amount: number) => {
    const newBalance = balance + amount;
    setBalance(newBalance);
    localStorage.setItem('walletBalance', newBalance.toString());
  };

  // Add NFT function
  const addNFT = (nft: NFT) => {
    const newNfts = [...nfts, nft];
    setNfts(newNfts);
    localStorage.setItem('walletNfts', JSON.stringify(newNfts));
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        isWalletCreated,
        isOnboarded,
        balance,
        nfts,
        createWallet,
        completeOnboarding,
        addFunds,
        addNFT
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// Hook for using the wallet context
export const useWallet = () => useContext(WalletContext);
