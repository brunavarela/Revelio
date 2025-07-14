import { View } from 'react-native';
import { Text } from 'src/shared/components/text/index'
import { theme } from '../themes/theme';

export function ScreenContent() {
  return (
    <View className="flex-1 items-center justify-center" style={{ backgroundColor: theme.colors.mainTheme.primary }}>
      <Text variant='textButton' color={theme.colors.mainTheme.secondary}>
        NativeWind Funcionandoo!
      </Text>
    </View>
  );
}
