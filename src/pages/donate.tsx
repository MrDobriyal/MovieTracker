import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { paymentService } from '@/services/paymentService';
import { Input } from '@/components/ui/input'; 

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number>(10);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    if (!amount || amount < 1) {
      alert('Please enter a valid amount (₹1 or more)');
      return;
    }

    setLoading(true);
    try {
      const order = await paymentService.createOrder(amount); // use your service

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: 'Donate to MovieTracker',
        description: 'Support & Upgrade',
        image: '/logo.png',
        order_id: order.id,
        handler: function (response: any) {
          alert(`Payment successful! ID: ${response.razorpay_payment_id}`);
          // Store to Supabase if needed
        },
        // prefill: {
        //   name: 'Your Name',
        //   email: 'user@example.com',
        //   contact: '9999999999',
        // },
        theme: {
          color: '#EF4444',
        },
      };

      const razor = new (window as any).Razorpay(options);
      razor.open();
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Support MovieTracker</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6 space-y-6">
        <h1 className="text-3xl font-bold">Support MovieTracker</h1>
        <p className="text-gray-400 text-center">
          Enter the amount you'd like to contribute. Thank you for your support!
        </p>

        <div className="w-full max-w-xs">
          <Input
            type="number"
            min={1}
            placeholder="Enter amount (₹)"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="text-black bg-white"
          />
        </div>

        <Button
          onClick={handlePayment}
          className="bg-red-600 hover:bg-red-700"
          disabled={loading}
        >
          {loading ? 'Processing...' : `Pay ₹${amount}`}
        </Button>
      </main>
    </>
  );
}
