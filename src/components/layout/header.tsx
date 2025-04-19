
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Menu, Ticket, Wallet } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { shortenAddress } from "@/lib/utils";
import { useWallet } from "@/contexts/WalletContext";
import { BurgerMenu } from "./burger-menu";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { WalletDashboard } from "@/components/wallet/WalletDashboard";
import { WalletConnect } from "@/components/wallet/WalletConnect";

export function Header() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const { walletAddress, isWalletCreated } = useWallet();

  return <header className="border-b bg-card">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsBurgerMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
          
          <BurgerMenu 
            isOpen={isBurgerMenuOpen} 
            onOpenChange={setIsBurgerMenuOpen} 
          />
          
          <Link to="/" className="flex items-center space-x-2">
            <Ticket className="h-6 w-6 text-primary" />
            <span className="text-xl hidden sm:inline-block font-semibold">Block Tix</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/events" className="font-medium hover:text-primary transition-colors">
              Events
            </Link>
            <Link to="/marketplace" className="font-medium hover:text-primary transition-colors">
              Marketplace
            </Link>
            {isWalletCreated && <Link to="/dashboard" className="font-medium hover:text-primary transition-colors">
                My Tickets
              </Link>}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          {isWalletCreated && walletAddress ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary" />
                <span className="sr-only">Notifications</span>
              </Button>
              
              <Drawer>
                <DrawerTrigger asChild>
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <div className="text-right hidden md:block">
                      <p className="text-sm font-medium">{shortenAddress(walletAddress)}</p>
                    </div>
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${walletAddress}`} alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </div>
                </DrawerTrigger>
                <DrawerContent className="h-[80vh]">
                  <WalletDashboard />
                </DrawerContent>
              </Drawer>
            </>
          ) : (
            <WalletConnect />
          )}
        </div>
      </div>
    </header>;
}
