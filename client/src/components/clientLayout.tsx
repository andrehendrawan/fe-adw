"use client"

import { usePathname } from 'next/navigation';
import SideBar from './sideBar';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showSidebar = pathname !== '/login';

  return (
    <body
      className={`antialiased ${showSidebar ? 'flex' : ''}`}
    >
      {showSidebar && <SideBar />}
      <main className={showSidebar ? 'flex-1' : ''}>
        {children}
      </main>
    </body>
  );
}