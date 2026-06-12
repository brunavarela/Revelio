import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '~/shared/components/text';
import { useAuth } from '~/shared/context/AuthContext';
import { mainTheme } from '~/shared/themes/colors';

export function Home() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text variant="textLPTTitle" color={mainTheme.secondary}>
        Olá, {user?.nickname}!
      </Text>
      <Text variant="textLPTSubTitle" color={mainTheme.quinary}>
        Feed em construção...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainTheme.primary,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
});
