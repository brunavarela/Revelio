import { View, Image } from 'react-native';
import { styles } from '../styles/splash.style';
import { Text } from '~/shared/components/text';
import { theme } from '~/shared/themes/theme';

const Splash = () => {
  return (
    <View className='justify-center items-center gap-2'>
        <Image 
            style={styles.logo}
            source={require('../../../assets/logo/revelio_logo.png')} 
            resizeMode="contain"
        />
        <Text variant='textSplashScreen' color={theme.colors.mainTheme.secondary}>Universo de Harry Potter</Text>
    </View>
  );
};

export default Splash;