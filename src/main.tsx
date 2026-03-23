import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DateProvider } from './context/DateContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DateProvider>
      <App />
    </DateProvider>
  </StrictMode>,
);
