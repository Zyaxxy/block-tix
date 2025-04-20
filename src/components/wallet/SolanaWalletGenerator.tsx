
import React, { useState } from "react";
import { Keypair, Connection, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
import { Button } from "@/components/ui/button";
import { PublicKeysList } from "./PublicKeysList";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Wallet, Copy } from "lucide-react";

interface SolanaWalletGeneratorProps {
  mnemonic?: string;
  onWalletGenerated?: (keypair: Keypair) => void;
}

export function SolanaWalletGenerator({ onWalletGenerated, mnemonic }: SolanaWalletGeneratorProps) {
  const [publicKeys, setPublicKeys] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [keypair, setKeypair] = useState<Keypair | null>(null);
  const [privateKey, setPrivateKey] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const { toast } = useToast();

  const generateWallet = async () => {
    setIsGenerating(true);
    try {
      // Generate a new Solana keypair
      const newKeypair = Keypair.generate();
      setKeypair(newKeypair);
      
      const publicKey = newKeypair.publicKey.toString();
      setPublicKeys(prev => [...prev, publicKey]);
      
      // Convert private key to base58 for display
      const privateKeyBase58 = Buffer.from(newKeypair.secretKey).toString('hex');
      setPrivateKey(privateKeyBase58);
      
      // Check balance from devnet
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
      const balanceInLamports = await connection.getBalance(newKeypair.publicKey);
      setBalance(balanceInLamports / LAMPORTS_PER_SOL);
      
      if (onWalletGenerated) {
        onWalletGenerated(newKeypair);
      }

      toast({
        title: "Wallet created successfully",
        description: `Your new wallet address: ${publicKey.slice(0, 6)}...${publicKey.slice(-4)}`,
      });

      // Store the keypair in localStorage (encrypted in a real app)
      localStorage.setItem('solanaKeypair', JSON.stringify(Array.from(newKeypair.secretKey)));
      
      return newKeypair;
    } catch (error) {
      console.error("Error generating wallet:", error);
      toast({
        title: "Error creating wallet",
        description: "An error occurred while creating your wallet",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: message,
    });
  };

  const toggleShowPrivateKey = () => {
    setShowPrivateKey(!showPrivateKey);
  };

  // Load saved keypair on component mount
  React.useEffect(() => {
    const savedKeypair = localStorage.getItem('solanaKeypair');
    if (savedKeypair) {
      try {
        const secretKey = new Uint8Array(JSON.parse(savedKeypair));
        const loadedKeypair = Keypair.fromSecretKey(secretKey);
        setKeypair(loadedKeypair);
        setPublicKeys([loadedKeypair.publicKey.toString()]);
        setPrivateKey(Buffer.from(loadedKeypair.secretKey).toString('hex'));
        
        // Fetch current balance
        const fetchBalance = async () => {
          const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
          const balanceInLamports = await connection.getBalance(loadedKeypair.publicKey);
          setBalance(balanceInLamports / LAMPORTS_PER_SOL);
        };
        
        fetchBalance();
      } catch (error) {
        console.error("Error loading saved keypair:", error);
      }
    }
  }, []);

  return (
    <div className="space-y-4">
      {mnemonic && (
        <div className="p-3 bg-muted rounded-md">
          <p className="text-sm font-mono break-all">{mnemonic}</p>
        </div>
      )}
      
      {!keypair ? (
        <Button 
          onClick={generateWallet} 
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? "Generating..." : "Generate Solana Wallet"}
        </Button>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Solana Wallet</h3>
              </div>
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                Devnet
              </div>
            </div>
            
            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-muted-foreground">Balance</span>
                </div>
                <div className="text-xl font-semibold">{balance.toFixed(4)} SOL</div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-muted-foreground">Public Key</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 px-2" 
                    onClick={() => copyToClipboard(keypair.publicKey.toString(), "Public key copied to clipboard")}
                  >
                    <Copy className="h-3 w-3 mr-1" /> Copy
                  </Button>
                </div>
                <code className="text-xs bg-muted p-2 rounded-md block overflow-auto">
                  {keypair.publicKey.toString()}
                </code>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-muted-foreground">Private Key</span>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-6 px-2"
                      onClick={toggleShowPrivateKey}
                    >
                      {showPrivateKey ? "Hide" : "Show"}
                    </Button>
                    {showPrivateKey && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 px-2" 
                        onClick={() => copyToClipboard(privateKey, "Private key copied to clipboard")}
                      >
                        <Copy className="h-3 w-3 mr-1" /> Copy
                      </Button>
                    )}
                  </div>
                </div>
                {showPrivateKey ? (
                  <code className="text-xs bg-muted p-2 rounded-md block overflow-auto break-all">
                    {privateKey}
                  </code>
                ) : (
                  <div className="bg-muted p-2 rounded-md flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Hidden for security</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {publicKeys.length > 0 && !keypair && <PublicKeysList publicKeys={publicKeys} />}
    </div>
  );
}
