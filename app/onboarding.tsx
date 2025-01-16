import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { CustomButton } from '../components/CustomButton';
import Onboard1 from '../assets/images/onboardcomponent1.png';
import Onboard2 from '../assets/images/onboardcomponent2.png';
import Onboard3 from '../assets/images/onboardcomponent3.png';
import LogoKecil from '../assets/images/icon.png';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    image: Onboard1,
    title: 'Selamat datang di aplikasi CB',
    description: 'Selamat datang di virtual lab pembelajaran TTKI dan Bahasa Indonesia.',
  },
  {
    image: Onboard2,
    title: 'Pilihan Video Pembelajaran',
    description: 'Belajar jadi lebih seru dan mudah! Temukan video pembelajaran TTKI untuk kebutuhanmu',
  },
  {
    image: Onboard3,
    title: 'Kuis Tebak Kata Baku',
    description: 'Asah kemampuan berbahasamu sambil bersenang-senang! Bisakah kamu menebak semua kata baku?',
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace('/(auth)/signup');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.skip} onPress={() => router.replace('/(auth)/signup')}>
        Skip
      </Text>
      <Image
        source={onboardingData[currentIndex].image}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.pagination}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
      <Text style={styles.title}>{onboardingData[currentIndex].title}</Text>
      <Text style={styles.description}>
        {onboardingData[currentIndex].description}
      </Text>
      <View style={styles.buttonContainer}>
        {currentIndex > 0 && (
          <CustomButton
            title="Kembali"
            onPress={() => setCurrentIndex(currentIndex - 1)}
            variant="secondary"
            style={styles.button}
          />
        )}
        <CustomButton
          title="Lanjut"
          onPress={handleNext}
          style={[styles.button, currentIndex === 0 && styles.fullWidthButton]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 20,
  },
  skip: {
    alignSelf: 'flex-end',
    color: '#002B7F',
    fontSize: 16,
    marginTop: 20,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    marginVertical: 40,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#002B7F',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002B7F',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 50,
    marginTop: 'auto',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  button: {
    flex: 1,
    maxWidth: (width - 40) / 2,
  },
  fullWidthButton: {
    maxWidth: width - 32,
  },
});
