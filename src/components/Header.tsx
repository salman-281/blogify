"use client";
import React from 'react';
import { SidebarTrigger } from './ui/sidebar';
import { Separator } from '@radix-ui/react-separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from './ui/breadcrumb';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Header: React.FC = () => {
  const pathname = usePathname();


  // Convert path to segments
  const segments: string[] = pathname
    .split('/')
    .filter((segment: string) => segment.length > 0);

  // Capitalize utility with proper typing
  const toTitleCase = (str: string): string =>
    str
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (char: string) => char.toUpperCase());



  return (
    <header className="flex fixed top-0 z-50 h-16 justify-between bg-white border-b  px-5 shrink-0 items-center gap-2 w-full">
      <div className="flex items-center gap-2 px-3 dm_sans">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
       <span className='max-[500px]:hidden sm:block'>
         <Breadcrumb>
          <BreadcrumbList>
            {segments.map((segment: string, index: number) => {
              const href: string = '/' + segments.slice(0, index + 1).join('/');
              const isLast: boolean = index === segments.length - 1;

              return (
                <React.Fragment key={href}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{toTitleCase(segment)}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link className='font-sans' href={href}>{toTitleCase(segment)}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
       </span>
      </div>
    </header>
  );
};

export default Header;