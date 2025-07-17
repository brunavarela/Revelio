import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { useFonts } from 'expo-font';
import clsx from 'clsx';
import { ActivityIndicator } from 'react-native';

type Variant =
  | 'textTitleCredentials'
  | 'textSubtitleCredentials'
  | 'title'
  | 'subtitle'
  | 'paragraph'
  | 'textButton'
  | 'textInput'
  | 'textSmall'
  | 'textLPTTitle'
  | 'textLPTSubTitle'
  | 'textCategory'
  | 'textCard'
  | 'textNavigateByCategory'
  | 'textSplashScreen'

interface Props extends RNTextProps {
  variant?: Variant;
  className?: string;
  color?: string; 
  children: React.ReactNode;
}

const variantMap: Record<Variant, string> = {
  textLPTTitle: 'text-2xl font-causten-bold',
  textLPTSubTitle: 'text-base font-causten-bold',
  textTitleCredentials: 'text-2xl font-causten-medium',
  textSubtitleCredentials: 'text-base font-causten-medium',
  title: 'text-2xl font-causten-light',
  subtitle: 'text-xs font-causten-light',
  paragraph: 'text-xl font-causten-light',
  textCategory: 'text-xl font-causten-light',
  textCard: 'text-sm font-causten-light',
  textSmall: 'text-sm font-causten-regular',
  textButton: 'text-xl font-causten-bold',
  textInput: 'text-base font-causten-medium',
  textNavigateByCategory: 'text-sm font-causten-bold',
  textSplashScreen: 'text-2xl font-causten-regular',
};

export function Text({
  variant = 'paragraph',
  className,
  color,
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
      style={[{ color }, rest.style]} 
      {...rest}
    >
      {children}
    </RNText>
  );
}
