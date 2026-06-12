import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '~/shared/components/text';
import { useAuth } from '~/shared/context/AuthContext';
import { mainTheme } from '~/shared/themes/colors';
import { ScreenBackground } from '~/shared/components/ScreenBackground';

export function Home() {
  const { user } = useAuth();

  return (
    <ScreenBackground style={styles.container}>
      <Text variant="textLPTTitle" color={mainTheme.secondary}>
        Olá, {user?.nickname}!
      </Text>
      <Text variant="textLPTSubTitle" color={mainTheme.quinary}>
        Feed em construção...
      </Text>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
});
