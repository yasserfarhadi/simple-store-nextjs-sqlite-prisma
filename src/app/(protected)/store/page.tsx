import React from 'react';
import { auth, signOut } from '../../../../auth';

const StorePapge = async () => {
  const session = await auth();
  return (
    <div>
      user: {JSON.stringify(session?.user)}
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
};

export default StorePapge;
