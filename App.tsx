import { StatusBar } from 'expo-status-bar';
import Navigation from './src/Navigation';
import { AuthProvider } from './src/shared/context/AuthContext';

import './global.css';

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
      <StatusBar style="light" />
    </AuthProvider>
  );
}
