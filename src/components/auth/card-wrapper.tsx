'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { FaGithub } from 'react-icons/fa';

interface Props {
  topHeader: string;
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  topHeader,
  backButtonHref,
  backButtonLabel,
  children,
  headerLabel,
  showSocial,
}: Props) => {
  return (
    <Card className="w-[400px] shadow-md bg-primary text-secondary">
      <CardHeader>
        <div className="w-full flex flex-col gap-y-6 items-center">
          <h1 className="text-3xl font-semibold">{topHeader}</h1>
          <p className="text-muted-foreground text-sm">{headerLabel}</p>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Button
            size="lg"
            className="w-full bg-primary text-secondary space-x-3 hover:bg-slate-800 hover:text-secondary"
            variant="outline"
            onClick={() => {}}
          >
            <FaGithub className="h-5 w-5" />{' '}
            <span className=" tracking-wider">Github</span>
          </Button>
        </CardFooter>
      )}
      <CardFooter>
        <Button
          variant="link"
          className="font-normal w-full text-secondary"
          size="sm"
          asChild
        >
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
