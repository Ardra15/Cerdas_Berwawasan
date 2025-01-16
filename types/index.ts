export interface InputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    placeholder?: string;
    keyboardType?: 'default' | 'email-address';
  }
  
  export interface ButtonProps {
    onPress: () => void;
    title: string;
    variant?: 'primary' | 'secondary';
  }
  
  