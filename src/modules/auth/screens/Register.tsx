import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '~/shared/context/AuthContext';
import { Text } from '~/shared/components/text';
import { mainTheme, grayTheme } from '~/shared/themes/colors';
import { House } from '~/services/auth.service';
import { MenuUrl } from '~/shared/enums/MenuUrl.enum';

type Props = { navigation: NativeStackNavigationProp<any> };

const HOUSES: House[] = ['Grifinoria', 'Sonserina', 'Lufa-Lufa', 'Corvinal'];

export function Register({ navigation }: Props) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [house, setHouse] = useState<House | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !nickname || !email || !password || !house)
      return Alert.alert('Preencha todos os campos');
    setLoading(true);
    try {
      await register({ name, nickname, email, password, house });
    } catch (err: any) {
      const msg = err?.response?.data?.error ?? 'Erro ao cadastrar';
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="textLPTTitle" color={mainTheme.secondary}>Criar conta</Text>

      <TextInput style={styles.input} placeholder="Nome completo" placeholderTextColor={grayTheme.grayDark} value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Apelido" placeholderTextColor={grayTheme.grayDark} autoCapitalize="none" value={nickname} onChangeText={setNickname} />
      <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor={grayTheme.grayDark} keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Senha" placeholderTextColor={grayTheme.grayDark} secureTextEntry value={password} onChangeText={setPassword} />

      <Text variant="textLPTSubTitle" color={grayTheme.grayLight}>Sua casa</Text>
      <View style={styles.houses}>
        {HOUSES.map((h) => (
          <TouchableOpacity
            key={h}
            style={[styles.houseButton, house === h && styles.houseSelected]}
            onPress={() => setHouse(h)}
          >
            <Text variant="textButton" color={house === h ? mainTheme.primary : grayTheme.grayLight}>{h}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? (
          <ActivityIndicator color={mainTheme.primary} />
        ) : (
          <Text variant="textButton" color={mainTheme.primary}>Cadastrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate(MenuUrl.LOGIN)}>
        <Text variant="textLPTSubTitle" color={grayTheme.grayLight}>
          Já tem conta?{' '}
          <Text variant="textLPTSubTitle" color={mainTheme.secondary}>Entrar</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  houses: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  houseButton: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: mainTheme.quinary,
  },
  houseSelected: {
    backgroundColor: mainTheme.secondary,
    borderColor: mainTheme.secondary,
  },
  button: {
    backgroundColor: mainTheme.secondary,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
});
