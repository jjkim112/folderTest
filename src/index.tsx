import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import firebase from 'firebase/compat/app';
import { SidebarProvider } from './contexts/SidebarContext';
import { NavermapsProvider } from 'react-naver-maps';
import App from './App';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <NavermapsProvider
        ncpClientId={`${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}`}
      >
        <SidebarProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SidebarProvider>
      </NavermapsProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
