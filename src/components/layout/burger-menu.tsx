
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  User,
  Settings,
  LogOut,
  HelpCircle,
  Info,
  Shield,
  CreditCard,
  Bell
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useWallet } from "@/contexts/WalletContext";
import { shortenAddress } from "@/lib/utils";
import { Link } from "react-router-dom";

interface BurgerMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BurgerMenu({ isOpen, onOpenChange }: BurgerMenuProps) {
  const { walletAddress, isWalletCreated } = useWallet();

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[300px] sm:max-w-[350px]">
        <SheetHeader className="mb-6">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        
        {isWalletCreated && walletAddress && (
          <div className="flex items-center space-x-4 mb-6">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${walletAddress}`} alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">My Wallet</p>
              <p className="text-xs text-muted-foreground">{shortenAddress(walletAddress)}</p>
            </div>
          </div>
        )}
        
        <nav className="space-y-1">
          <SheetClose asChild>
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </SheetClose>
          
          <SheetClose asChild>
            <Link to="/events">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Events
              </Button>
            </Link>
          </SheetClose>
          
          <SheetClose asChild>
            <Link to="/marketplace">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Bell className="mr-2 h-4 w-4" />
                Bell
              </Button>
            </Link>
          </SheetClose>
          
          <Separator className="my-4" />
          
          <h3 className="text-sm font-medium px-3 mb-2">Settings</h3>
          
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Account Settings
          </Button>
          
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </Button>
          
          <Separator className="my-4" />
          
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help & Support
          </Button>
          
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Info className="mr-2 h-4 w-4" />
            About
          </Button>
        </nav>
        
        <SheetFooter className="absolute bottom-0 left-0 right-0 p-6">
          <Button variant="outline" size="sm" className="w-full justify-start text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
