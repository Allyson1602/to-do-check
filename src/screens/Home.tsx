import { Center, Container, Spinner, View, Text } from "native-base";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import HeaderTitle from "../components/HeaderTitle";

type THomeProps = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

const Home: React.FC<THomeProps> = ({ navigation }) => {
  return (
    <View>
      <Center safeArea>
        <HeaderTitle text="Início" />
      </Center>
    </View>
  );
};

export default Home;
