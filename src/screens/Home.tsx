import {
  Center,
  View,
  Text,
  Box,
  HStack,
  VStack,
  Button,
  Input,
  IconButton,
  Icon,
} from "native-base";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import HeaderTitle from "../components/HeaderTitle";
import { LinearGradient } from "expo-linear-gradient";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import getIconByName from "../utils/get-icon-by-name";
import { EIcon } from "../enums/icon";
import { useAppDispatch } from "../hooks";
import { getCategoryMetadata } from "../utils/get-category-metadata";
import categoryService, { ICategoryBody } from "../services/category";
import { setCategory, setCategories } from "../redux/reducers/category";
import { EScreenName } from "../enums/navigation";

type THomeProps = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

const Home: React.FC<THomeProps> = ({ navigation }) => {
  const [newCategoryOpen, setNewCategoryOpen] = useState(false);
  const [iconSelected, setIconSelected] = useState<EIcon | null>(null);
  const [categoryNameValue, setCategoryNameValue] = useState("");

  const toDoMetadata = getCategoryMetadata();
  const dispatch = useAppDispatch();

  useEffect(() => {
    categoryService.listCategories().then((response) => {
      if (response.status === 200) {
        const categories = response.data;
        dispatch(setCategories(categories));
      }
    });
  }, []);

  const handleNewCategory = async () => {
    if (!iconSelected || !categoryNameValue) return;

    const categoryData: ICategoryBody = {
      iconname: iconSelected,
      title: categoryNameValue,
    };

    const response = await categoryService.createCategory(categoryData);

    if (response.status === 201) {
      const categoryCreated = response.data;

      dispatch(setCategory(categoryCreated));

      setNewCategoryOpen(false);
      setCategoryNameValue("");
      navigation.navigate({
        name: EScreenName.TODO,
        key: categoryCreated.id.toString(),
      });
      return;
    }
  };

  const handlePressIconButton = (iconname: EIcon) => {
    setIconSelected(iconname);
  };

  const handleCategoryName = (text: string) => {
    if (text.length > 35) return;

    setCategoryNameValue(text);
  };

  return (
    <View>
      <Box safeArea px={"4"}>
        <Center>
          <HeaderTitle text="Início" />
        </Center>

        <Box bg={"#8A3FFC"} mt={"16"} py={"2"} px={"3"} borderRadius={12}>
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
              {toDoMetadata.categoryCreated}
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
              {toDoMetadata.todoCreated}
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
              {toDoMetadata.todoDone}
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
            <Button
              variant={"unstyled"}
              onPress={() => setNewCategoryOpen(true)}
            >
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

      <Modal
        title="Nova categoria"
        isOpen={newCategoryOpen}
        onClose={() => {
          setNewCategoryOpen(false);
          setCategoryNameValue("");
        }}
      >
        <VStack py={"6"}>
          <VStack pb={"3"}>
            <Text color={"#3B1F65"} pl={"0.5"}>
              Icone:
            </Text>
            <HStack justifyContent={"space-between"}>
              <IconButton
                onPress={() => handlePressIconButton(EIcon.building)}
                icon={
                  <Icon
                    color={iconSelected === EIcon.building ? "#FFF" : "#3B1F65"}
                    as={getIconByName(EIcon.building)}
                  />
                }
                bg={iconSelected === EIcon.building ? "#8A3FFC" : "transparent"}
                borderRadius={5}
              />
              <IconButton
                onPress={() => handlePressIconButton(EIcon.house)}
                icon={
                  <Icon
                    color={iconSelected === EIcon.house ? "#FFF" : "#3B1F65"}
                    as={getIconByName(EIcon.house)}
                  />
                }
                bg={iconSelected === EIcon.house ? "#8A3FFC" : "transparent"}
                borderRadius={5}
              />
              <IconButton
                onPress={() => handlePressIconButton(EIcon.tree)}
                icon={
                  <Icon
                    color={iconSelected === EIcon.tree ? "#FFF" : "#3B1F65"}
                    as={getIconByName(EIcon.tree)}
                  />
                }
                bg={iconSelected === EIcon.tree ? "#8A3FFC" : "transparent"}
                borderRadius={5}
              />
              <IconButton
                onPress={() => handlePressIconButton(EIcon.sun)}
                icon={
                  <Icon
                    color={iconSelected === EIcon.sun ? "#FFF" : "#3B1F65"}
                    as={getIconByName(EIcon.sun)}
                  />
                }
                bg={iconSelected === EIcon.sun ? "#8A3FFC" : "transparent"}
                borderRadius={5}
              />
              <IconButton
                onPress={() => handlePressIconButton(EIcon.hamburguer)}
                icon={
                  <Icon
                    color={
                      iconSelected === EIcon.hamburguer ? "#FFF" : "#3B1F65"
                    }
                    as={getIconByName(EIcon.hamburguer)}
                  />
                }
                bg={
                  iconSelected === EIcon.hamburguer ? "#8A3FFC" : "transparent"
                }
                borderRadius={5}
              />
              <IconButton
                onPress={() => handlePressIconButton(EIcon.paw)}
                icon={
                  <Icon
                    color={iconSelected === EIcon.paw ? "#FFF" : "#3B1F65"}
                    as={getIconByName(EIcon.paw)}
                  />
                }
                bg={iconSelected === EIcon.paw ? "#8A3FFC" : "transparent"}
                borderRadius={5}
              />
              <IconButton
                onPress={() => handlePressIconButton(EIcon.shoppingCart)}
                icon={
                  <Icon
                    color={
                      iconSelected === EIcon.shoppingCart ? "#FFF" : "#3B1F65"
                    }
                    as={getIconByName(EIcon.shoppingCart)}
                  />
                }
                bg={
                  iconSelected === EIcon.shoppingCart
                    ? "#8A3FFC"
                    : "transparent"
                }
                borderRadius={5}
              />
            </HStack>
          </VStack>

          <VStack space={"0.5"}>
            <Text color={"#3B1F65"} pl={"0.5"}>
              Nome da categoria:
            </Text>
            <Input
              placeholder="Digite aqui"
              value={categoryNameValue}
              onChangeText={handleCategoryName}
            />
          </VStack>
        </VStack>

        <Button w={170} mx={"auto"} my={"4"} onPress={handleNewCategory}>
          Criar
        </Button>
      </Modal>
    </View>
  );
};

export default Home;
