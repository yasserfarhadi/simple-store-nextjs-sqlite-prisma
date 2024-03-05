'use client';

import React from 'react';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const FilterBar = () => {
  const [search, setSearch] = React.useState('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort');
  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  React.useEffect(() => {
    const timer = setTimeout(() => {
      router.push(pathname + '?' + createQueryString('q', search));
    }, 300);
    return () => clearTimeout(timer);
  }, [createQueryString, pathname, router, search]);
  return (
    <div className="flex flex-col gap-y-5 items-center sm:flex-row sm:gap-x-2">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title..."
      />
      <DropdownMenu>
        <DropdownMenuTrigger className="border w-full p-1.5 rounded-md sm:min-w-[150px] sm:max-w-[150px]">
          {sort ? `Price: ${sort}` : 'Sort by price'}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[420px] sm:min-w-[150px] sm:max-w-[150px]">
          <DropdownMenuItem
            onClick={() =>
              router.push(pathname + '?' + createQueryString('sort', 'asc'))
            }
            className="flex align-center justify-between"
          >
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(pathname + '?' + createQueryString('sort', 'desc'))
            }
            className="flex align-center justify-between"
          >
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FilterBar;
