import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
}

export const CustomButton: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, variant === 'secondary' && styles.buttonSecondary, style]}
      onPress={onPress}
    >
      <Text style={[styles.text, variant === 'secondary' && styles.textSecondary]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#002B7F',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  textSecondary: {
    color: '#002B7F',
  },
});

