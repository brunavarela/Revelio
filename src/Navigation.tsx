import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from './modules/splash';
import LandingPage from './modules/landingPage';
import { MenuUrl } from './shared/enums/MenuUrl.enum';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={MenuUrl.SPLASH}>
        <Stack.Screen
          name={MenuUrl.SPLASH}
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={MenuUrl.LANDING_PAGE}
          component={LandingPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
