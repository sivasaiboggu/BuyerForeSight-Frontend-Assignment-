import React from 'react';
import { Sidebar } from './Sidebar.tsx';
import { Header } from './Header.tsx';
import './Layout.css';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}
