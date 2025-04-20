
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Image } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { ScrollArea } from "@/components/ui/scroll-area";

export function NFTGallery() {
  const { nfts, isWalletCreated } = useWallet();

  if (!isWalletCreated) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <Image className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Your NFTs</CardTitle>
        </div>
        <CardDescription>Your digital collectibles</CardDescription>
      </CardHeader>
      <CardContent>
        {nfts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">You don't have any NFTs yet</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px]">
            <div className="grid grid-cols-2 gap-4">
              {nfts.map((nft) => (
                <div key={nft.id} className="rounded-lg overflow-hidden border">
                  <img 
                    src={nft.image} 
                    alt={nft.name} 
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-2">
                    <h3 className="font-medium text-sm truncate">{nft.name}</h3>
                    {nft.event && (
                      <p className="text-xs text-muted-foreground truncate">{nft.event}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
