import { useEffect } from 'react';
import { router } from 'expo-router';
import SplashScreenComponent from './splashScreen';

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return <SplashScreenComponent />;
} 