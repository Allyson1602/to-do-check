import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { View } from "react-native";
import { Box, Center } from "native-base";
import HeaderTitle from "../components/HeaderTitle";

type TImportantProps = {
  navigation: StackNavigationProp<RootStackParamList, "Important">;
};

const Important: React.FC<TImportantProps> = ({ navigation }) => {
  return (
    <View>
      <Box safeArea px={"4"}>
        <Center>
          <HeaderTitle text="Importantes" />
        </Center>
      </Box>
    </View>
  );
};

export default Important;
