import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { PlusCircle, MinusCircle, ArrowRightLeft } from "lucide-react";

interface Transaction {
  id: string;
  type: 'add' | 'purchase' | 'transfer';
  amount: number;
  description: string;
  timestamp: string;
}

export function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Load transactions from localStorage
    const storedTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    setTransactions(storedTransactions);
  }, []);

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'add':
        return <PlusCircle className="h-4 w-4 text-green-500" />;
      case 'purchase':
        return <MinusCircle className="h-4 w-4 text-red-500" />;
      case 'transfer':
        return <ArrowRightLeft className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">No transactions yet</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div 
                  key={tx.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {getTransactionIcon(tx.type)}
                    <div>
                      <p className="font-medium text-sm">{tx.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(tx.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <p className={`font-medium ${tx.type === 'add' ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.type === 'add' ? '+' : '-'} {tx.amount.toFixed(2)} SOL
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
