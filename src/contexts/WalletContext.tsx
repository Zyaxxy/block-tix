
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Keypair, Connection, LAMPORTS_PER_SOL, clusterApiUrl, PublicKey } from '@solana/web3.js';

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
  mnemonic: string | null;
  keypair: Keypair | null;
  createWallet: () => Promise<{ address: string }>;
  completeOnboarding: () => void;
  addFunds: (amount: number) => void;
  addNFT: (nft: NFT) => void;
  resetMnemonic: () => void;
  refreshBalance: () => Promise<void>;
  disconnectWallet: () => void;
}

// Create the context with default values
const WalletContext = createContext<WalletContextType>({
  walletAddress: null,
  isWalletCreated: false,
  isOnboarded: false,
  balance: 0,
  nfts: [],
  mnemonic: null,
  keypair: null,
  createWallet: async () => ({ address: '' }),
  completeOnboarding: () => {},
  addFunds: () => {},
  addNFT: () => {},
  resetMnemonic: () => {},
  refreshBalance: async () => {},
  disconnectWallet: () => {}
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
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [keypair, setKeypair] = useState<Keypair | null>(null);

  // Initialize from localStorage on component mount
  useEffect(() => {
    const storedIsOnboarded = localStorage.getItem('isOnboarded') === 'true';
    const storedNfts = JSON.parse(localStorage.getItem('walletNfts') || '[]');

    if (storedIsOnboarded) setIsOnboarded(true);
    setNfts(storedNfts);
    
    // Try to load keypair from localStorage
    const savedKeypair = localStorage.getItem('solanaKeypair');
    if (savedKeypair) {
      try {
        const secretKey = new Uint8Array(JSON.parse(savedKeypair));
        const loadedKeypair = Keypair.fromSecretKey(secretKey);
        setKeypair(loadedKeypair);
        setWalletAddress(loadedKeypair.publicKey.toString());
        setIsWalletCreated(true);
        
        // Fetch current balance
        refreshBalanceFromChain(loadedKeypair.publicKey);
      } catch (error) {
        console.error("Error loading saved keypair:", error);
      }
    }
  }, []);

  // Refresh balance from Solana chain
  const refreshBalanceFromChain = async (publicKey: PublicKey) => {
    try {
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
      const balanceInLamports = await connection.getBalance(publicKey);
      const solBalance = balanceInLamports / LAMPORTS_PER_SOL;
      setBalance(solBalance);
      return solBalance;
    } catch (error) {
      console.error("Error fetching balance:", error);
      return 0;
    }
  };

  // Refresh balance function
  const refreshBalance = async () => {
    if (keypair) {
      await refreshBalanceFromChain(keypair.publicKey);
    }
  };

  // Create wallet function
  const createWallet = async () => {
    // Generate a real Solana keypair
    const newKeypair = Keypair.generate();
    const address = newKeypair.publicKey.toString();
    
    // Generate a mnemonic (in a real app, this would be generated properly)
    setMnemonic("Please save this keypair securely. You won't be able to recover it if lost.");
    setWalletAddress(address);
    setIsWalletCreated(true);
    setKeypair(newKeypair);
    
    // Save keypair to localStorage (in a real app, this would be encrypted)
    localStorage.setItem('solanaKeypair', JSON.stringify(Array.from(newKeypair.secretKey)));
    localStorage.setItem('walletAddress', address);
    localStorage.setItem('isWalletCreated', 'true');
    
    // Get initial balance
    await refreshBalanceFromChain(newKeypair.publicKey);
    
    return { address };
  };

  const resetMnemonic = () => {
    setMnemonic(null);
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

  // Disconnect wallet function
  const disconnectWallet = () => {
    setKeypair(null);
    setWalletAddress(null);
    setIsWalletCreated(false);
    setBalance(0);
    localStorage.removeItem('solanaKeypair');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('isWalletCreated');
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        isWalletCreated,
        isOnboarded,
        balance,
        nfts,
        mnemonic,
        keypair,
        createWallet,
        completeOnboarding,
        addFunds,
        addNFT,
        resetMnemonic,
        refreshBalance,
        disconnectWallet
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// Hook for using the wallet context
export const useWallet = () => useContext(WalletContext);
