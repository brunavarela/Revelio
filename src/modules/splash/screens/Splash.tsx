import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { View, Image } from 'react-native';
import { Text } from '~/shared/components/text';
import { MenuUrl } from '~/shared/enums/MenuUrl.enum';
import { theme } from '~/shared/themes/theme';

const TIME_SLEEP = 5000;

const Splash = () => {
const  { reset } = useNavigation<NavigationProp<ParamListBase>>();

  useEffect(() => {
    const verifyLogin = async () => {
       await new Promise(resolve => setTimeout(resolve, TIME_SLEEP));

       reset({
        index: 0,
        routes: [{ name: MenuUrl.LANDING_PAGE }],
      });
    };

    verifyLogin()
  }, [])

  return (
    <View className="flex-1 justify-center items-center gap-2" style={{ backgroundColor: theme.colors.mainTheme.primary }}>
      <Image
        className="w-[200px] h-[74px]"
        source={require('../../../assets/logo/revelio_logo.png')}
        resizeMode="contain"
      />
      <Text variant="textSplashScreen" color={theme.colors.mainTheme.secondary}>
        Universo de Harry Potter
      </Text>
    </View>
  );
};

export default Splash;
