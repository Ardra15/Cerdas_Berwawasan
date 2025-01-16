// Previous KBBIScreen component
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Buku from '../../assets/images/buku_kbbi.png'

export default function KBBI() {
  const openKBBILink = () => {
    Linking.openURL('https://kbbi.kemdikbud.go.id/'); // Replace with the actual KBBI website link
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Bingung dengan arti dari kata Bahasa Indonesia???
        </Text>

        <Image
          source={Buku}
          style={styles.illustration}
        />

        <Text style={styles.description}>
          Sampai saat ini Indonesia memiliki kosakota berkisar di angka 120.000. 
          Langsung saja klik KBBI untuk menjelajahi kosakota Bahasa Indonesia
        </Text>

        <TouchableOpacity style={styles.button} onPress={openKBBILink}>
          <Text style={styles.buttonText}>KBBI</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  illustration: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#FF69B4',
    borderRadius: 8,
    paddingVertical: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});