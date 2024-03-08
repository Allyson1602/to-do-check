import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { View } from "react-native";
import { Box, Center } from "native-base";
import HeaderTitle from "../components/HeaderTitle";

type TToDoProps = {
  navigation: StackNavigationProp<RootStackParamList, "ToDo">;
};

const ToDo: React.FC<TToDoProps> = ({ navigation }) => {
  return (
    <View>
      <Box safeArea px={"4"}>
        <Center>
          <HeaderTitle text="Afazeres" />
        </Center>
      </Box>
    </View>
  );
};

export default ToDo;
