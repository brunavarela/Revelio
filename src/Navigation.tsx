import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from './modules/splash';
import LandingPage from './modules/landingPage';
import { Login } from './modules/auth/screens/Login';
import { Register } from './modules/auth/screens/Register';
import { Home } from './modules/home/screens/Home';
import { MenuUrl } from './shared/enums/MenuUrl.enum';
import { useAuth } from './shared/context/AuthContext';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name={MenuUrl.HOME} component={Home} />
        ) : (
          <>
            <Stack.Screen name={MenuUrl.SPLASH} component={Splash} />
            <Stack.Screen name={MenuUrl.LANDING_PAGE} component={LandingPage} />
            <Stack.Screen name={MenuUrl.LOGIN} component={Login} />
            <Stack.Screen name={MenuUrl.REGISTER} component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
