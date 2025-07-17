import { View } from 'react-native';
import { theme } from '../themes/theme';
import Splash from '../../modules/splash';

export function ScreenContent() {
  return (
    <View className="flex-1 items-center justify-center" style={{ backgroundColor: theme.colors.mainTheme.primary }}>
      <Splash />
    </View>
  );
}
