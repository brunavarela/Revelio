import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, Alert, TouchableOpacity,
  ActivityIndicator, ScrollView, Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '~/shared/context/AuthContext';
import { MenuUrl } from '~/shared/enums/MenuUrl.enum';
import { ScreenBackground } from '~/shared/components/ScreenBackground';

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
    <ScreenBackground>
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">

      <View style={styles.header}>
        <Text style={styles.title}>Que bom ter você de volta! </Text>
        <Text style={styles.subtitle}>Vamos fazer seu login</Text>
      </View>

      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#f4f4f4" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#f4f4f4" secureTextEntry value={password} onChangeText={setPassword} />

        <TouchableOpacity style={styles.buttonPrimary} onPress={handleLogin} disabled={loading}>
          {loading
            ? <ActivityIndicator color="#21212d" />
            : <Text style={styles.buttonPrimaryText}>Entrar</Text>
          }
        </TouchableOpacity>

        <View style={styles.forgotRow}>
          <Text style={styles.forgotBase}>Esqueceu a </Text>
          <TouchableOpacity onPress={() => Alert.alert('Em breve')}>
            <Text style={styles.forgotLink}>senha</Text>
          </TouchableOpacity>
          <Text style={styles.forgotBase}>?</Text>
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.buttonSocial} onPress={() => Alert.alert('Em breve')}>
          <Image source={require('~/assets/icons/google-logo.png')} style={styles.googleIcon} resizeMode="contain" />
          <Text style={styles.googleText}>Entrar com Google</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.forgotBase}>Não possui conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate(MenuUrl.REGISTER)}>
          <Text style={styles.forgotLink}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
    </ScreenBackground>
  );
}

const font = { fontFamily: 'Causten' };

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { flexGrow: 1, paddingHorizontal: 32, paddingTop: 168, paddingBottom: 40 },
  header: { gap: 8, marginBottom: 56 },
  title: { ...font, fontSize: 24, letterSpacing: 0.7, fontWeight: '500', color: '#f4f4f4' },
  subtitle: { ...font, fontSize: 16, letterSpacing: 0.5, fontWeight: '500', color: '#dcdcdc' },
  form: { gap: 16 },
  input: {
    ...font, fontSize: 16, fontWeight: '500', letterSpacing: 0.5,
    color: '#f4f4f4', backgroundColor: '#2a2a3c',
    borderRadius: 10, height: 50, paddingHorizontal: 16,
  },
  buttonPrimary: {
    backgroundColor: '#7db2ff', borderRadius: 8, height: 50,
    alignItems: 'center', justifyContent: 'center',
  },
  buttonPrimaryText: { ...font, fontSize: 18, fontWeight: '700', letterSpacing: 0.5, color: '#21212d' },
  forgotRow: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' },
  forgotBase: { ...font, fontSize: 14, letterSpacing: 0.4, color: '#f4f4f4' },
  forgotLink: { ...font, fontSize: 14, letterSpacing: 0.4, fontWeight: '500', color: '#b69859' },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#434343' },
  dividerText: { ...font, fontSize: 14, letterSpacing: 0.4, color: '#f4f4f4' },
  buttonSocial: {
    backgroundColor: '#2a2a3c', borderRadius: 10, height: 50,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12,
  },
  googleIcon: { width: 25, height: 25 },
  googleText: { ...font, fontSize: 14, letterSpacing: 0.4, fontWeight: '500', color: '#b69859' },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 32 },
});
