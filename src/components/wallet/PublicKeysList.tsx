import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { shortenAddress } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface PublicKeysListProps {
  publicKeys: string[];
}

export function PublicKeysList({ publicKeys }: PublicKeysListProps) {
  const { toast } = useToast();

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied",
      description: "Wallet address copied to clipboard",
    });
  };

  if (publicKeys.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Wallet Addresses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {publicKeys.map((address, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-muted rounded-md"
            >
              <code className="text-sm font-mono">
                {shortenAddress(address, 8)}
              </code>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(address)}
                title="Copy address"
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
