import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CookieConsent: React.FC = () => {
 const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
 const consent = localStorage.getItem('cookieConsent');
 if (!consent) {
 setIsVisible(true);
 }
 }, []);

 const handleAccept = () => {
 localStorage.setItem('cookieConsent', 'accepted');
 setIsVisible(false);
 };

 const handleDecline = () => {
 localStorage.setItem('cookieConsent', 'declined');
 setIsVisible(false);
 };

 return (
 <AnimatePresence>
 {isVisible && (
 <motion.div
 initial={{ y: 100, opacity: 0 }}
 animate={{ y: 0, opacity: 1 }}
 exit={{ y: 100, opacity: 0 }}
 transition={{ type: 'spring', stiffness: 300, damping: 30 }}
 className="fixed bottom-0 left-0 right-0 z-50 p-4"
 >
 <div className="max-w-4xl mx-auto bg-slate-900 text-white rounded-2xl shadow-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
 <div className="flex-1">
 <h3 className="text-lg font-bold mb-2">We value your privacy</h3>
 <p className="text-sm text-slate-300">
 We use cookies to enhance your browsing experience and analyze our website traffic. By clicking "Accept All", you consent to our use of cookies. Read our <a href="/cookie-policy" className="underline hover:text-white">Cookie Policy</a> for more details.
 </p>
 </div>
 <div className="flex gap-4 shrink-0 w-full sm:w-auto">
 <button
 onClick={handleDecline}
 className="flex-1 sm:flex-none px-6 py-2.5 rounded-full border border-slate-700 hover:bg-slate-800 transition-colors text-sm font-medium"
 >
 Decline
 </button>
 <button
 onClick={handleAccept}
 className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-medium"
 >
 Accept All
 </button>
 </div>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 );
};
