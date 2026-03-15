import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {brand} from '../theme';

interface LoginScreenProps {
  onLogin: (msisdn: string) => void;
}

export function LoginScreen({onLogin}: LoginScreenProps): React.JSX.Element {
  const [phone, setPhone] = useState('+971');

  const handleLogin = () => {
    if (phone.length >= 10) {
      onLogin(phone);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>We</Text>
        </View>
        <Text style={styles.title}>WeConnect</Text>
        <Text style={styles.subtitle}>Your telecom, simplified</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="+971 50 123 4567"
          placeholderTextColor={brand.textSecondary}
          keyboardType="phone-pad"
          autoFocus
        />

        <TouchableOpacity
          style={[styles.button, phone.length < 10 && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={phone.length < 10}
          activeOpacity={0.8}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.hint}>
          Enter any phone number to sign in (dev mode)
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brand.purple,
    justifyContent: 'center',
    padding: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: brand.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '800',
    color: brand.purple,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: brand.white,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: brand.purpleLight,
  },
  form: {
    backgroundColor: brand.white,
    borderRadius: 20,
    padding: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: brand.textPrimary,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: brand.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    color: brand.textPrimary,
    marginBottom: 16,
    letterSpacing: 1,
  },
  button: {
    backgroundColor: brand.purple,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: brand.white,
    fontSize: 18,
    fontWeight: '700',
  },
  hint: {
    textAlign: 'center',
    color: brand.textSecondary,
    fontSize: 12,
    marginTop: 12,
  },
});
