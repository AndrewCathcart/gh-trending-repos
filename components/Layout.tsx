import { EyeIcon } from '@heroicons/react/solid';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout: FC<Props> = ({ children, title }) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="A website to explore trending GitHub repositories and add them to your favourites."
        />
      </Head>

      {/* Navbar */}
      <div className="flex flex-col h-screen">
        <header className="top-0 z-50 bg-white border-b shadow-sm">
          <div className="flex justify-between max-w-6xl mx-auto space-x-4 md:max-w-4xl sm:max-w-2xl">
            <EyeIcon className="relative flex-shrink-0 my-2 w-22 md:inline-grid h-11" />

            <nav className="flex items-center justify-end px-4 space-x-4">
              <Link href="/">
                <a className={`duration-150 ease-out hover:scale-105 ${router.asPath === '/' && 'font-bold'}`}>
                  What&apos;s Trending?
                </a>
              </Link>
              <Link href="/favourites">
                <a
                  className={`duration-150 ease-out hover:scale-105 ${router.asPath === '/favourites' && 'font-bold'}`}
                >
                  My Favourites
                </a>
              </Link>
            </nav>
          </div>
        </header>

        {/* Content */}
        <main className="flex-grow px-4 bg-gray-50">{children}</main>

        {/* Footer */}
        <footer className="w-full py-4 text-sm italic font-medium text-center border-t shadow-inner">
          <span>By Andrew Cathcart</span>
        </footer>
      </div>
    </div>
  );
};
export default Layout;
