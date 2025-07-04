// services/paymentService.ts
import axios from 'axios'

const createOrder = async (amountInINR: number) => {
  const res = await axios.post('https://oebmlugfdavjppyvznvz.supabase.co/functions/v1/bright-service', { amount: amountInINR }
  );
  return res.data; 
};

export const paymentService = {
  createOrder,
};
