import { StyleSheet } from 'react-native';
import { theme } from '../../themes/theme';

export const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  primary: {
    backgroundColor: theme.colors.mainTheme.secondary,
  },
  secondary: {
    backgroundColor: theme.colors.mainTheme.tertiary,
  },

  small: {
    width: 129,
    height: 36,
  },
  medium: {
    width: 160,
    height: 50,
  },
  large: {
    width: 370,
    height: 50,
  },
});
 