import { View, Image } from "react-native"
import { Text } from "~/shared/components/text"
import { theme } from "~/shared/themes/theme"

const LandingPage = () => {
    return (
        <View className="flex-1 justify-center items-center gap-2" style={{ backgroundColor: theme.colors.mainTheme.primary }}>
            <Image
                className="w-[200px] h-[74px]"
                source={require('../../../assets/logo/revelio_logo.png')}
                resizeMode="contain"
                />
            <Text variant="textSplashScreen" color={theme.colors.mainTheme.secondary}>
            Landing Page
            </Text>
        </View>
    )
};

export default LandingPage;