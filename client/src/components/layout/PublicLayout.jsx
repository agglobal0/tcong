import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingWidgets } from './FloatingWidgets';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const PublicLayout = () => {
  useScrollReveal();

  return (
    <div className="public-wrapper d-flex flex-column min-vh-100 position-relative">
      <Header />
      <main className="main-content flex-grow-1" id="mainContent">
        <Outlet />
      </main>
      <Footer />
      <FloatingWidgets />
    </div>
  );
};

