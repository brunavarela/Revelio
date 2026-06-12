import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, Alert, TouchableOpacity,
  ActivityIndicator, ScrollView, Modal, FlatList,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '~/shared/context/AuthContext';
import { House } from '~/services/auth.service';
import { MenuUrl } from '~/shared/enums/MenuUrl.enum';
import { ScreenBackground } from '~/shared/components/ScreenBackground';

type Props = { navigation: NativeStackNavigationProp<any> };

const HOUSES: House[] = ['Grifinoria', 'Sonserina', 'Lufa-Lufa', 'Corvinal'];

export function Register({ navigation }: Props) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [house, setHouse] = useState<House | null>(null);
  const [houseModal, setHouseModal] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !nickname || !email || !password || !confirmPassword || !house)
      return Alert.alert('Preencha todos os campos');
    if (password !== confirmPassword)
      return Alert.alert('Erro', 'As senhas não coincidem');
    if (!acceptedTerms)
      return Alert.alert('Erro', 'Aceite os termos de uso para continuar');
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
    <ScreenBackground>
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">

      <View style={styles.header}>
        <Text style={styles.title}>Boas vindas, Potterhead!</Text>
        <Text style={styles.subtitle}>Vamos fazer seu cadastro</Text>
      </View>

      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Nome completo" placeholderTextColor="#f4f4f4" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Apelido" placeholderTextColor="#f4f4f4" autoCapitalize="none" value={nickname} onChangeText={setNickname} />

        <TouchableOpacity style={styles.dropdown} onPress={() => setHouseModal(true)}>
          <Text style={[styles.dropdownText, !house && { color: '#f4f4f4' }]}>{house ?? 'Casa'}</Text>
          <Text style={styles.dropdownArrow}>›</Text>
        </TouchableOpacity>

        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#f4f4f4" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#f4f4f4" secureTextEntry value={password} onChangeText={setPassword} />
        <TextInput style={styles.input} placeholder="Repetir senha" placeholderTextColor="#f4f4f4" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

        <View style={styles.termsRow}>
          <TouchableOpacity style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]} onPress={() => setAcceptedTerms(!acceptedTerms)}>
            {acceptedTerms && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.termsText}> Li e aceito os </Text>
          <TouchableOpacity onPress={() => Alert.alert('Termos de uso', 'Em breve')}>
            <Text style={styles.termsLink}>termos de uso</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.buttonPrimary} onPress={handleRegister} disabled={loading}>
          {loading
            ? <ActivityIndicator color="#21212d" />
            : <Text style={styles.buttonPrimaryText}>Cadastrar</Text>
          }
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Já possui conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate(MenuUrl.LOGIN)}>
          <Text style={styles.footerLink}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={houseModal} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setHouseModal(false)}>
          <View style={styles.modalBox}>
            <FlatList
              data={HOUSES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalOption} onPress={() => { setHouse(item); setHouseModal(false); }}>
                  <Text style={[styles.modalOptionText, house === item && { color: '#b69859' }]}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

    </ScrollView>
    </ScreenBackground>
  );
}

const font = { fontFamily: 'Causten' };

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { flexGrow: 1, paddingHorizontal: 32, paddingTop: 168, paddingBottom: 40 },
  header: { gap: 8, marginBottom: 40 },
  title: { ...font, fontSize: 24, letterSpacing: 0.7, fontWeight: '500', color: '#f4f4f4' },
  subtitle: { ...font, fontSize: 16, letterSpacing: 0.5, fontWeight: '500', color: '#dcdcdc' },
  form: { gap: 16 },
  input: {
    ...font, fontSize: 16, fontWeight: '500', letterSpacing: 0.5,
    color: '#f4f4f4', backgroundColor: '#2a2a3c',
    borderRadius: 10, height: 50, paddingHorizontal: 16,
  },
  dropdown: {
    backgroundColor: '#2a2a3c', borderRadius: 10, height: 50,
    paddingHorizontal: 16, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between',
  },
  dropdownText: { ...font, fontSize: 16, fontWeight: '500', letterSpacing: 0.5, color: '#b69859' },
  dropdownArrow: { ...font, fontSize: 20, color: '#f4f4f4' },
  termsRow: { flexDirection: 'row', alignItems: 'center' },
  checkbox: {
    width: 20, height: 20, borderRadius: 2,
    borderWidth: 1, borderColor: '#ffffff',
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: '#b69859', borderColor: '#b69859' },
  checkmark: { ...font, fontSize: 12, color: '#21212d' },
  termsText: { ...font, fontSize: 14, letterSpacing: 0.4, color: '#f4f4f4' },
  termsLink: { ...font, fontSize: 14, letterSpacing: 0.4, fontWeight: '500', color: '#b69859', textDecorationLine: 'underline' },
  buttonPrimary: {
    backgroundColor: '#b69859', borderRadius: 8, height: 50,
    alignItems: 'center', justifyContent: 'center', marginTop: 8,
  },
  buttonPrimaryText: { ...font, fontSize: 18, fontWeight: '700', letterSpacing: 0.5, color: '#21212d' },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  footerText: { ...font, fontSize: 14, letterSpacing: 0.4, color: '#f4f4f4' },
  footerLink: { ...font, fontSize: 14, letterSpacing: 0.4, fontWeight: '500', color: '#7db2ff' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { backgroundColor: '#2a2a3c', borderRadius: 12, width: 280, overflow: 'hidden' },
  modalOption: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#21212d' },
  modalOptionText: { ...font, fontSize: 16, fontWeight: '500', color: '#f4f4f4' },
});
