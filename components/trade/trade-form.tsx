'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface TradeFormProps {
  onSubmit: (values: any) => void;
  currentPrice: number;
}

const formSchema = z.object({
  action: z.enum(['buy', 'sell']),
  orderType: z.enum(['market', 'limit']),
  quantity: z.number().min(1, {
    message: 'Quantity must be at least 1',
  }),
  price: z.number().optional(),
});

export function TradeForm({ onSubmit, currentPrice }: TradeFormProps) {
  const [tab, setTab] = useState('buy');
  const [orderType, setOrderType] = useState('market');
  const [estimatedTotal, setEstimatedTotal] = useState(0);
  
  const { portfolio } = useSelector((state: RootState) => state.user);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      action: 'buy',
      orderType: 'market',
      quantity: 1,
    },
  });
  
  const watchQuantity = form.watch('quantity');
  const watchPrice = form.watch('price');
  
  // Update action when tab changes
  useEffect(() => {
    form.setValue('action', tab as 'buy' | 'sell');
  }, [tab, form]);
  
  // Update order type
  useEffect(() => {
    form.setValue('orderType', orderType as 'market' | 'limit');
    
    // Set default price for limit orders
    if (orderType === 'limit' && currentPrice) {
      form.setValue('price', currentPrice);
    }
  }, [orderType, currentPrice, form]);
  
  // Calculate estimated total
  useEffect(() => {
    const quantity = watchQuantity || 0;
    const price = orderType === 'market' ? currentPrice : (watchPrice || currentPrice);
    setEstimatedTotal(quantity * price);
  }, [watchQuantity, watchPrice, currentPrice, orderType]);
  
  // Handle form submission
  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit({
      ...values,
      price: values.orderType === 'market' ? currentPrice : values.price,
    });
    
    // Reset form
    form.reset({
      action: values.action,
      orderType: values.orderType,
      quantity: 1,
      price: values.orderType === 'limit' ? values.price : undefined,
    });
  }
  
  const maxAffordableShares = Math.floor(portfolio.availableCapital / currentPrice);

  return (
    <div>
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="buy">Buy</TabsTrigger>
          <TabsTrigger value="sell">Sell</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="orderType"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Order Type</FormLabel>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        setOrderType(value);
                      }}
                      defaultValue={field.value}
                      className="flex"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0 mr-4">
                        <FormControl>
                          <RadioGroupItem value="market" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Market
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="limit" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Limit
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        step="1"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    {tab === 'buy' && (
                      <FormDescription>
                        You can buy up to {maxAffordableShares} shares
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {orderType === 'limit' && (
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Limit Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0.01"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          value={field.value}
                        />
                      </FormControl>
                      <FormDescription>
                        Current price: ${currentPrice.toFixed(2)}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <div className="py-2 px-3 bg-muted rounded-md">
                <div className="flex justify-between text-sm">
                  <span>Est. Total:</span>
                  <span className="font-medium">${estimatedTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full"
                variant={tab === 'buy' ? 'default' : 'destructive'}
              >
                {tab === 'buy' ? 'Buy' : 'Sell'} {orderType === 'market' ? 'at Market Price' : 'with Limit Order'}
              </Button>
            </form>
          </Form>
        </div>
      </Tabs>
    </div>
  );
}