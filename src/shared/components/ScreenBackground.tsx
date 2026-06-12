import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

interface Props {
  children: React.ReactNode;
  style?: object;
}

export function ScreenBackground({ children, style }: Props) {
  return (
    <ImageBackground
      source={require('~/assets/fundo-revelio.png')}
      style={[styles.container, style]}
      imageStyle={styles.image}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#21212d' },
  image: { opacity: 0.08 },
});
