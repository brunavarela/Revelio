import { ImageBackground, Image, View } from "react-native"
import { Text } from "../../../shared/components/text"
import { theme } from "../../../shared/themes/theme"
import { styles } from "../styles/landingPage.style";
import { Button } from "~/shared/components/button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MenuUrl } from "~/shared/enums/MenuUrl.enum";

type Props = { navigation: NativeStackNavigationProp<any> };

const LandingPage = ({ navigation }: Props) => {
    return (
        <ImageBackground
            className="gap-10"
            source={require('../../../assets/Background_Landing_Page.png')}
            style={styles.backgroundLandingPage}
        >
            <Image
                style={styles.logo}
                source={require('../../../assets/logo/revelio_logo.png')}
                resizeMode="contain"
            />
            <View className="gap-4">
                <Text className="w-[300px] text-center" variant="textLPTTitle" color={theme.colors.neutralTheme.white}>
                    O Universo de Harry Potter na palma da sua mão
                </Text>
                <Text className="w-[300px] text-center" variant="textLPTSubTitle" color={theme.colors.grayTheme.gray}>
                    Últimas notícias, Personagens, escolas, casas, varinhas, feitiços e muito mais
                </Text>
            </View>
            <View className="flex flex-row gap-2">
                <Button title="Cadastrar" variant="primary" size="medium" onPress={() => navigation.navigate(MenuUrl.REGISTER)} />
                <Button title="Entrar" variant="secondary" size="medium" onPress={() => navigation.navigate(MenuUrl.LOGIN)} />
            </View>
        </ImageBackground>
    )
};

export default LandingPage;