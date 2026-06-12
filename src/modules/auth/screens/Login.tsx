import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '~/shared/context/AuthContext';
import { Text } from '~/shared/components/text';
import { mainTheme, grayTheme } from '~/shared/themes/colors';
import { MenuUrl } from '~/shared/enums/MenuUrl.enum';

type Props = { navigation: NativeStackNavigationProp<any> };

export function Login({ navigation }: Props) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) return Alert.alert('Preencha todos os campos');
    setLoading(true);
    try {
      await login(email, password);
    } catch {
      Alert.alert('Erro', 'E-mail ou senha inválidos');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text variant="textLPTTitle" color={mainTheme.secondary}>Entrar</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor={grayTheme.grayDark}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={grayTheme.grayDark}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color={mainTheme.primary} />
        ) : (
          <Text variant="textButton" color={mainTheme.primary}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate(MenuUrl.REGISTER)}>
        <Text variant="textLPTSubTitle" color={grayTheme.grayLight}>
          Não tem conta?{' '}
          <Text variant="textLPTSubTitle" color={mainTheme.secondary}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainTheme.primary,
    padding: 24,
    justifyContent: 'center',
    gap: 16,
  },
  input: {
    backgroundColor: mainTheme.quaternary,
    borderRadius: 8,
    padding: 14,
    color: grayTheme.grayLight,
    fontSize: 16,
  },
  button: {
    backgroundColor: mainTheme.secondary,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
});
