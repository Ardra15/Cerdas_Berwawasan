import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Image } from "react-native";

function SplashScreen() {
  const circleScale = useRef(new Animated.Value(0)).current;  // for scaling the circle
  const opacityLogo = useRef(new Animated.Value(0)).current; // for logo fade in

  useEffect(() => {
    // Start the animation when the screen loads
    Animated.sequence([
      Animated.timing(circleScale, {
        toValue: 20,  // scale the circle to cover the screen
        duration: 1000,  // duration of the circle expansion
        useNativeDriver: true,
      }),
      Animated.timing(opacityLogo, {
        toValue: 1,  // fade in logo
        duration: 1000,  // fade-in duration
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Animated Circle */}
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ scale: circleScale }],
          },
        ]}
      />
      
      {/* Logo and name with fade effect */}
      <Animated.View style={[styles.logoContainer, { opacity: opacityLogo }]}>
        <Image
          source={require("../assets/images/logo-putih.png")}  // Replace with your actual logo
          style={styles.logo}
        />
        <Text style={styles.logoText}>Cerdas Berwawasan</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#003787",  // Blue color for the circle
    position: "absolute",
    zIndex:2
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3, // Ensure the logo is on top of the circle
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",  // White color for the text
    zIndex: 3,  // Ensure the text is on top of the circle
    // textShadowColor: '#000',  // Text shadow to improve visibility
    // textShadowOffset: { width: 1, height: 1 },
    // textShadowRadius: 5,
  },
});

export default SplashScreen;