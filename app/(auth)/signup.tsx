import { View, Text, StyleSheet, Alert } from 'react-native';
import { Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import LogoKecil from '../../assets/images/icon.png';
import { auth, database } from '../firebaseConfig'; // Import auth and database
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Save user name and initial progress in the database
      await set(ref(database, `users/${userId}`), {
        name: name, // Save the user's name
        progress: {
          score: 0,
          gamesPlayed: 0,
        },
      });

      Alert.alert('Sign Up Successful', 'You have signed up successfully!', [
        { text: 'OK', onPress: () => router.replace('/(tabs)/home') },
      ]);
    } catch (error) {
      console.error(error);
      const errorMessage = (error as Error).message;
      Alert.alert('Sign Up Failed', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={LogoKecil} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Create An Account</Text>

      <CustomInput
        label="Name"
        value={name}
        onChangeText={setName}
        placeholder="Your Name"
      />
      
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
      
      <CustomInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholder="Confirm Your Password"
      />
      
      <CustomButton
        title="SIGN UP"
        onPress={handleSignUp}
      />
      
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Have an account already? </Text>
        <Text
          style={styles.loginLink}
          onPress={() => router.push('/login')}
        >
          Log in
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
    marginBottom: 40,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#666666',
  },
  loginLink: {
    color: '#002B7F',
    fontWeight: '600',
  },
});

