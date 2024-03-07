import { Center, View, Text, Box, HStack, VStack, Button } from "native-base";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import HeaderTitle from "../components/HeaderTitle";
import { LinearGradient } from "expo-linear-gradient";

type THomeProps = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

const Home: React.FC<THomeProps> = ({ navigation }) => {
  return (
    <View>
      <Box safeArea px={"4"}>
        <Center>
          <HeaderTitle text="Início" />
        </Center>

        <Box bg={"#8A3FFC"} mt={"4"} py={"2"} px={"3"} borderRadius={12}>
          <HStack alignItems="center" justifyContent={"space-between"}>
            <Text
              color={"white"}
              fontSize={"md"}
              bg={"#B382FF"}
              borderRadius={"full"}
              w={30}
              h={30}
              lineHeight={"2xl"}
              textAlign={"center"}
            >
              0
            </Text>
            <Text color={"white"} fontSize={"md"}>
              categorias criadas
            </Text>
          </HStack>

          <HStack alignItems="center" justifyContent={"space-between"} py={"2"}>
            <Text
              color={"white"}
              fontSize={"md"}
              bg={"#B382FF"}
              borderRadius={"full"}
              w={30}
              h={30}
              lineHeight={"2xl"}
              textAlign={"center"}
            >
              0
            </Text>
            <Text color={"white"} fontSize={"md"}>
              afazeres criadas
            </Text>
          </HStack>

          <HStack alignItems="center" justifyContent={"space-between"}>
            <Text
              color={"white"}
              fontSize={"md"}
              bg={"#B382FF"}
              borderRadius={"full"}
              w={30}
              h={30}
              lineHeight={"2xl"}
              textAlign={"center"}
            >
              0
            </Text>
            <Text color={"white"} fontSize={"md"}>
              afazeres realizados
            </Text>
          </HStack>
        </Box>

        <VStack>
          <LinearGradient
            colors={["#8A3FFC", "#CF2CD2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.5, y: 0.5 }}
            style={{
              borderRadius: 5,
              marginTop: 48,
            }}
          >
            <Button variant={"unstyled"}>
              <Text
                color={"white"}
                textAlign={"center"}
                fontSize={"xl"}
                py={"1"}
              >
                Criar nova categoria
              </Text>
            </Button>
          </LinearGradient>
          <Text
            fontSize={"xs"}
            textAlign={"center"}
            w={247}
            mx={"auto"}
            mt={"2"}
            color={"#3B1F65"}
          >
            A partir de uma categoria, você já pode criar afazeres.
          </Text>
        </VStack>
      </Box>
    </View>
  );
};

export default Home;
