import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

import { AuthProvider } from './context/AuthContext';
import { SoundProvider } from './context/SoundContext';
import { AuctionProvider } from './context/AuctionContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SoundProvider>
        <AuthProvider>
          <AuctionProvider>
            <App />
          </AuctionProvider>
        </AuthProvider>
      </SoundProvider>
    </BrowserRouter>
  </React.StrictMode>
);
