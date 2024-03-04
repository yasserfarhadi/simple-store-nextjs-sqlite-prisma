import React from 'react';
import { auth } from '../../../../auth';

const StorePapge = async () => {
  const session = await auth();
  return <div>user: {JSON.stringify(session?.user)}</div>;
};

export default StorePapge;
