/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TabType } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SpatialAtmosphere } from './components/SpatialAtmosphere';
import { InicioCalculadorasView } from './components/views/InicioCalculadorasView';
import { SolucionesIaView } from './components/views/SolucionesIaView';
import { PlanesPreciosSaasView } from './components/views/PlanesPreciosSaasView';
import { ComoFuncionaContactoView } from './components/views/ComoFuncionaContactoView';
import { InvitacionesDigitalesView } from './components/views/InvitacionesDigitalesView';
import { QuoteModal } from './components/modals/QuoteModal';
import { TicketPassModal } from './components/modals/TicketPassModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('inicio-calculadoras');

  // Modals state
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteData, setQuoteData] = useState<{ planName?: string; price?: string }>({});

  const [isTicketPassOpen, setIsTicketPassOpen] = useState(false);
  const [ticketData, setTicketData] = useState({
    guestName: 'Familia Valenzuela',
    passesCount: 2,
    tableNumber: 'Mesa 08',
  });

  // Handle URL hash changes or routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (
        hash === 'inicio-calculadoras' ||
        hash === 'invitaciones-digitales' ||
        hash === 'planes-precios-saas' ||
        hash === 'soluciones-ia' ||
        hash === 'como-funciona-contacto'
      ) {
        setCurrentTab(hash as TabType);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSelectTab = (tab: TabType) => {
    setCurrentTab(tab);
    window.history.pushState(null, '', `#${tab}`);
  };

  const handleOpenQuoteModal = (planName?: string, price?: string) => {
    setQuoteData({ planName, price });
    setIsQuoteOpen(true);
  };

  const handleOpenTicketPass = (
    guestName = 'Familia Valenzuela',
    passesCount = 2,
    tableNumber = 'Mesa 08'
  ) => {
    setTicketData({ guestName, passesCount, tableNumber });
    setIsTicketPassOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden selection:bg-[#0284c7] selection:text-white bg-[#030712]">
      {/* Cinematic VisionOS Mountain Dusk Atmosphere Background */}
      <SpatialAtmosphere />

      {/* Floating Spatial Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onOpenQuoteModal={() => handleOpenQuoteModal('Proyecto General', undefined)}
      />

      {/* Main Content Area with Animated Tab Transitions */}
      <main className="w-full pt-22 sm:pt-28 flex-1 relative z-10 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -14, filter: 'blur(8px)' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full"
          >
            {currentTab === 'inicio-calculadoras' && (
              <InicioCalculadorasView
                onNavigateTab={handleSelectTab}
                onOpenQuoteModal={handleOpenQuoteModal}
                onOpenDemoPassModal={() => handleOpenTicketPass()}
              />
            )}

            {currentTab === 'invitaciones-digitales' && (
              <InvitacionesDigitalesView
                onNavigateTab={handleSelectTab}
                onOpenQuoteModal={handleOpenQuoteModal}
                onOpenDemoPassModal={handleOpenTicketPass}
              />
            )}

            {currentTab === 'soluciones-ia' && (
              <SolucionesIaView
                onNavigateTab={handleSelectTab}
              />
            )}

            {currentTab === 'planes-precios-saas' && (
              <PlanesPreciosSaasView
                onNavigateTab={handleSelectTab}
                onOpenQuoteModal={handleOpenQuoteModal}
              />
            )}

            {currentTab === 'como-funciona-contacto' && (
              <ComoFuncionaContactoView
                onNavigateTab={handleSelectTab}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Spatial Systems Footer */}
      <Footer onSelectTab={handleSelectTab} />

      {/* Modals */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialType={quoteData.planName}
        estimatedPrice={quoteData.price}
      />

      <TicketPassModal
        isOpen={isTicketPassOpen}
        onClose={() => setIsTicketPassOpen(false)}
        guestName={ticketData.guestName}
        passesCount={ticketData.passesCount}
        tableNumber={ticketData.tableNumber}
      />
    </div>
  );
}
