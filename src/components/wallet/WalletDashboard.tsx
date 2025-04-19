
import React from "react";
import { WalletCard } from "./WalletCard";
import { NFTGallery } from "./NFTGallery";
import { useWallet } from "@/contexts/WalletContext";
import { OnboardingFlow } from "./OnboardingFlow";

export function WalletDashboard() {
  const { isOnboarded, isWalletCreated } = useWallet();

  if (!isOnboarded) {
    return <OnboardingFlow />;
  }

  if (!isWalletCreated) {
    return <OnboardingFlow />;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <h2 className="text-2xl font-bold">Your Wallet</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WalletCard />
        <NFTGallery />
      </div>
    </div>
  );
}
