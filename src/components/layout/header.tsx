import { Button } from "@/components/ui/button";
import { Bell, Menu, Ticket } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { BurgerMenu } from "./burger-menu";
import { WalletConnect } from "@/components/wallet/WalletConnect";
import { WalletButton } from "@/components/wallet/WalletButton";
import { motion } from "framer-motion";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

export function Header() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const { walletAddress, isWalletCreated } = useWallet();
  const hasScrolled = useScroll();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-white/10",
        hasScrolled
          ? "bg-black/50 shadow-lg"
          : "bg-white/5"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-white/70 hover:text-white hover:bg-white/10" 
            onClick={() => setIsBurgerMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
          
          <BurgerMenu isOpen={isBurgerMenuOpen} onOpenChange={setIsBurgerMenuOpen} />
          
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Ticket className="h-6 w-6 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
            </motion.div>
            <span className="text-xl hidden sm:inline-block font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-purple-500">
              Blocktix
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/events" 
              className="font-medium text-white/70 hover:text-emerald-400 transition-colors duration-200"
            >
              Events
            </Link>
            <Link 
              to="/marketplace" 
              className="font-medium text-white/70 hover:text-emerald-400 transition-colors duration-200"
            >
              Marketplace
            </Link>
            {isWalletCreated && (
              <Link 
                to="/dashboard" 
                className="font-medium text-white/70 hover:text-emerald-400 transition-colors duration-200"
              >
                My Tickets
              </Link>
            )}
          </nav>
        </div>
        
        <div className="flex items-center space-x-6">
          {isWalletCreated && walletAddress ? (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative bg-emerald-500/5 border border-emerald-400/20 rounded-2xl backdrop-blur-lg shadow-lg hover:bg-emerald-500/10 hover:border-emerald-400/40 hover:shadow-emerald-500/20 hover:scale-[1.02] transition-all duration-300 ease-out"
                >
                  <Bell className="h-5 w-5 text-white/70 group-hover:text-white" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <WalletButton />
              </motion.div>
            </>
          ) : (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <WalletConnect />
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
}