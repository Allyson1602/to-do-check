import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import {
  Box,
  Button,
  Center,
  IconButton,
  VStack,
  Text,
  ScrollView,
  Input,
  TextArea,
} from "native-base";
import HeaderTitle from "../components/HeaderTitle";
import Heart from "phosphor-react-native/src/icons/Heart";
import Plus from "phosphor-react-native/src/icons/Plus";
import { RouteProp } from "@react-navigation/native";
import { getCategoryById } from "../utils/get-category-by-id";
import Title from "../components/Title";
import { EScreenName } from "../enums/navigation";
import { CategoryState, updateCategory } from "../redux/reducers/category";
import ToDoItem from "../components/ToDoItem";
import Modal from "../components/Modal";
import { useState } from "react";
import { ITodoItemModel } from "../models/todo-item";
import categoryService from "../services/category";
import { ICategoryModel } from "../models/category";
import { useAppDispatch } from "../hooks";

type TToDoProps = {
  navigation: StackNavigationProp<RootStackParamList, "ToDo">;
  route: RouteProp<RootStackParamList, "ToDo">;
};

const ToDo: React.FC<TToDoProps> = ({ navigation, route }) => {
  const category = getCategoryById(parseInt(route.key)) as CategoryState;
  const dispatch = useAppDispatch();

  const [newToDoOpen, setNewToDoOpen] = useState(false);
  const [deleteCategoryOpen, setDeleteCategoryOpen] = useState(false);

  const [toDoNameValue, setToDoNameValue] = useState("");

  if (!category) navigation.navigate(EScreenName.HOME);

  const handleToDoName = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setToDoNameValue(event.nativeEvent.text);
  };

  const handleIsFavorite = async () => {
    const categoryData: ICategoryModel = {
      ...category,
      isFavorite: !category.isFavorite,
    };

    const response = await categoryService.updateToDo(categoryData);

    if (response.status === 200) {
      const categoryUpdated = response.data;

      dispatch(updateCategory(categoryUpdated));
      return;
    }
  };

  const handleDeleteCategory = () => {
    // - teste deletar no redux e no bd
  };

  const handleNewToDo = () => {
    // - teste criar no redux e no bd
  };

  return (
    <ScrollView>
      <Box safeArea px={"4"} h={"full"}>
        <Center>
          <HeaderTitle text="Afazeres" />
        </Center>

        <Box position={"relative"} mt={"10"}>
          <IconButton
            position={"absolute"}
            top={-5}
            right={0}
            p={"0"}
            icon={
              <Heart
                size={32}
                weight={category.isFavorite ? "fill" : "regular"}
                color="#8A3FFC"
              />
            }
            onPress={handleIsFavorite}
          />

          <Title iconName={category.iconName}>{category.title}</Title>
        </Box>

        <VStack justifyContent={"space-between"} space={"6"}>
          <VStack mt={"2"} space={"2"}>
            <Button
              bg={category.todoItems.length > 0 ? "#8A3FFC40" : "#8A3FFC"}
              borderColor={"#8A3FFC"}
              borderWidth={1}
              borderRadius={12}
              onPress={() => setNewToDoOpen(true)}
            >
              <Plus
                size={32}
                weight="bold"
                color={category.todoItems.length > 0 ? "#8A3FFC" : "white"}
              />
            </Button>

            {category.todoItems?.map((todoItem) => {
              return <ToDoItem key={todoItem.id} todoItem={todoItem} />;
            })}
          </VStack>

          <Button
            w={"1/2"}
            mx={"auto"}
            variant={"outline"}
            borderColor={"#E41C1C"}
            borderStyle={"solid"}
            borderWidth={1}
            onPress={() => setDeleteCategoryOpen(true)}
          >
            <Text color={"#E41C1C"}>apagar categoria</Text>
          </Button>
        </VStack>
      </Box>

      <Modal
        title="Apagar categoria"
        isOpen={deleteCategoryOpen}
        onClose={() => setDeleteCategoryOpen(false)}
      >
        <Text
          textAlign={"center"}
          color={"#3B1F65"}
          py={"4"}
          w={280}
          mx={"auto"}
        >
          Deseja realmente apagar este categoria?
        </Text>

        <Button
          w={170}
          mx={"auto"}
          my={"4"}
          bg={"#E41C1C"}
          onPress={handleDeleteCategory}
        >
          Apagar
        </Button>
      </Modal>

      <Modal
        title="Novo afazer"
        isOpen={newToDoOpen}
        onClose={() => setNewToDoOpen(false)}
      >
        <VStack py={"6"} space={"3"}>
          <VStack space={"0.5"}>
            <Text color={"#3B1F65"} pl={"0.5"}>
              Nome do afazer:
            </Text>
            <Input
              placeholder="Digite aqui"
              value={toDoNameValue}
              onChange={handleToDoName}
            />
          </VStack>

          <VStack space={"0.5"}>
            <Text color={"#3B1F65"} pl={"0.5"}>
              Descrição:
            </Text>
            <TextArea
              p={"2"}
              minHeight={90}
              placeholder="Digite aqui"
              isReadOnly
              value={toDoNameValue}
              autoCompleteType={undefined} // bug
            />
          </VStack>
        </VStack>

        <Button w={170} mx={"auto"} my={"4"} onPress={handleNewToDo}>
          Criar
        </Button>
      </Modal>
    </ScrollView>
  );
};

export default ToDo;
