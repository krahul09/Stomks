'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { WatchlistItem } from '@/types/stock';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { setAlertPrice, toggleAlert } from '@/redux/slices/watchlistSlice';

interface WatchlistAlertModalProps {
  item: WatchlistItem;
  currentPrice: number;
}

export function WatchlistAlertModal({ item, currentPrice }: WatchlistAlertModalProps) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [alertPrice, setAlertPriceState] = useState(item.alertPrice || currentPrice);
  
  const handleSaveAlert = () => {
    dispatch(toggleAlert({
      symbol: item.symbol,
      enabled: true
    }));
    
    dispatch(setAlertPrice({
      symbol: item.symbol,
      price: alertPrice
    }));
    
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" disabled={!item.alertEnabled}>
          {item.alertPrice ? `$${item.alertPrice.toFixed(2)}` : 'Set Price'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Price Alert for {item.symbol}</DialogTitle>
          <DialogDescription>
            Set a price target to receive an alert when the stock reaches that price.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="alert-price" className="text-right">
              Alert Price
            </Label>
            <div className="col-span-3">
              <Input
                id="alert-price"
                type="number"
                step="0.01"
                min="0.01"
                value={alertPrice}
                onChange={(e) => setAlertPriceState(parseFloat(e.target.value) || 0)}
                className="col-span-3"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 rounded-md bg-muted p-3">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm text-muted-foreground">
              Current price: ${currentPrice.toFixed(2)}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveAlert}
            disabled={!alertPrice || alertPrice <= 0}
          >
            Save Alert
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}