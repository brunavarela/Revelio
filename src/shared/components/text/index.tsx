import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { useFonts } from 'expo-font';
import clsx from 'clsx';
import { ActivityIndicator } from 'react-native';

type Variant = 'title' | 'subtitle' | 'paragraph' | 'small';
// type Weight = 'thin' | 'light' | 'regular' | 'medium' | 'bold';

interface Props extends RNTextProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

const variantMap: Record<Variant, string> = {
  title: 'text-3xl font-causten-thin',
  subtitle: 'text-xl',
  paragraph: 'text-base',
  small: 'text-sm',
};

// const weightMap: Record<Weight, string> = {
//   thin: 'font-causten-thin',
//   light: 'font-causten-light',
//   regular: 'font-causten-regular',
//   medium: 'font-causten-medium',
//   bold: 'font-causten-bold',
// };

export function Text({
  variant = 'paragraph',
  // weight = 'regular',
  className,
  children,
  ...rest
}: Props) {
  const [fontsLoaded] = useFonts({
    'Causten-Thin': require('../../../assets/fonts/Causten-Thin.otf'),
    'Causten-Light': require('../../../assets/fonts/Causten-Light.otf'),
    'Causten-Regular': require('../../../assets/fonts/Causten-Regular.otf'),
    'Causten-Medium': require('../../../assets/fonts/Causten-Medium.otf'),
    'Causten-Bold': require('../../../assets/fonts/Causten-Bold.otf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator color="#fff" />;
  }

  return (
    <RNText
      className={clsx(variantMap[variant], className)}
      {...rest}
    >
      {children}
    </RNText>
  );
}
