import { View, Text, StyleSheet, Alert} from 'react-native';
import { Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import LogoKecil from '../../assets/images/icon.png';
import { auth } from '../firebaseConfig'; // Import auth from firebaseConfig
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Login Successful', 'You have logged in successfully!', [
        { text: 'OK', onPress: () => router.push('/(tabs)/home') },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Login Failed', (error as Error).message); // Type assertion for error
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source= {LogoKecil}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to continue</Text>
      
      <CustomInput
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        placeholder="Your Email"
        keyboardType="email-address"
      />
      
      <CustomInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Your password"
      />
      
      <Text
        style={styles.forgotPassword}
        onPress={() => {}}
      >
        Forgot Password?
      </Text>
      
      <CustomButton
        title="LOG IN"
        onPress={handleLogin}
      />
      
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <Text
          style={styles.signupLink}
          onPress={() => router.push('/signup')}
        >
          Sign up now
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002B7F',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#002B7F',
    textAlign: 'center',
    marginBottom: 40,
  },
  forgotPassword: {
    color: '#002B7F',
    textAlign: 'right',
    marginBottom: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#666666',
  },
  signupLink: {
    color: '#002B7F',
    fontWeight: '600',
  },
});

