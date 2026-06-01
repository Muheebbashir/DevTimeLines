import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProviderWithRouter } from './ClerkProviderWithRouter';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProviderWithRouter />
    </BrowserRouter>
  </StrictMode>,
);