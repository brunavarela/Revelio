import { TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import { Text } from '../text';
import { styles } from './button.style';
import { theme } from '~/shared/themes/theme';

type Variant = 'primary' | 'secondary';
type Size = 'small' | 'medium' | 'large';

interface Props extends TouchableOpacityProps {
  title: string;
  variant?: Variant;
  size?: Size;
}

export const Button = ({
  title,
  variant = 'primary',
  size = 'medium',
  style,
  ...rest
}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], styles[size], style as ViewStyle]}
      activeOpacity={0.8}
      {...rest}
    >
      <Text variant="textButton" color={theme.colors.mainTheme.primary}>{title}</Text>
    </TouchableOpacity>
  );
};
