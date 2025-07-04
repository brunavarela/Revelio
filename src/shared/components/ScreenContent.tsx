import { View } from 'react-native';
import { Text } from 'src/shared/components/text/index'

export function ScreenContent() {
  return (
    <View className="flex-1 items-center justify-center bg-purple-900">
      <Text variant='title'>
        NativeWind Funcionando!
      </Text>
    </View>
  );
}
