import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-primary">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold drop-shadow-md text-secondary">
          Simple Store
        </h1>
        <h5 className="text-lg text-secondary">Yasser Farhadi</h5>
        <Button variant="secondary" size="lg">
          <Link href="/store">See Store</Link>
        </Button>
      </div>
    </main>
  );
}
