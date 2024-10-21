import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './components/Context/UserContext';
import { ProjectProvider } from './components/Context/ProjectContext';
import { HelmetProvider } from 'react-helmet-async';
import { TeamProvider } from './components/Context/TeamDet';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <UserProvider>
    <ProjectProvider>
      <HelmetProvider>
        <TeamProvider>
      <App />
      </TeamProvider>
      </HelmetProvider>
    </ProjectProvider>
  </UserProvider>

);
