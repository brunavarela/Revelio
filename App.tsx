import { ScreenContent } from '~/shared/components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

import './global.css';

export default function App() {
  return (
    <>
      <ScreenContent></ScreenContent>
      <StatusBar style="auto" />
    </>
  );
}
