import { StatusBar } from 'expo-status-bar';
import Navigation from './src/Navigation'; // ou onde estiver seu Navigation.tsx

import './global.css';

export default function App() {
  return (
    <>
      <Navigation />
      <StatusBar style="auto" />
    </>
  );
}
