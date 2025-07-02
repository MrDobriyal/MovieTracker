
import React from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();
  return router.push('/movies');
};

export default Index;
