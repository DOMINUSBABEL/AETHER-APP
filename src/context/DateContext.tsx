import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DateContextType {
  userDate: string; // YYYY-MM-DD
  setUserDate: (date: string) => void;
  partnerDate: string; // YYYY-MM-DD
  setPartnerDate: (date: string) => void;
  seed: number;
  partnerSeed: number;
}

const DateContext = createContext<DateContextType | undefined>(undefined);

export const DateProvider = ({ children }: { children: ReactNode }) => {
  const [userDate, setUserDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [partnerDate, setPartnerDate] = useState<string>('');

  const getSeed = (dateStr: string) => {
    if (!dateStr) return 0;
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
      const char = dateStr.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash) === 0 ? 1 : Math.abs(hash);
  };

  const seed = getSeed(userDate);
  const partnerSeed = getSeed(partnerDate);

  return (
    <DateContext.Provider value={{ userDate, setUserDate, partnerDate, setPartnerDate, seed, partnerSeed }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDateContext = () => {
  const context = useContext(DateContext);
  if (!context) throw new Error('useDateContext must be used within a DateProvider');
  return context;
};
