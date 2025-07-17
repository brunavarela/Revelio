import { StatusBar } from 'expo-status-bar';
import Navigation from './src/Navigation';

import './global.css';

export default function App() {

  return (
    <>
      <Navigation />
      <StatusBar style="auto" />
    </>
  );
}
