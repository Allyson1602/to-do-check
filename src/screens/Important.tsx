import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { View } from "react-native";
import { Box, Center, Spacer, VStack } from "native-base";
import HeaderTitle from "../components/HeaderTitle";
import Title from "../components/Title";
import ToDoItem from "../components/ToDoItem";
import { getCategoryImportant } from "../utils/get-category-important";

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

        <VStack space={"6"} p={"4"} mt={"10"}>
          {getCategoryImportant().map((categoryItem) => {
            return (
              <Box key={categoryItem.id}>
                <Title iconName={categoryItem.iconName}>
                  {categoryItem.title}
                </Title>
                <Spacer h={"1"} />

                <VStack space={"2"}>
                  {categoryItem.todoItems?.map((todoItem) => {
                    return (
                      todoItem.isImportant && (
                        <ToDoItem key={todoItem.id} todoItem={todoItem} />
                      )
                    );
                  })}
                </VStack>
              </Box>
            );
          })}
        </VStack>
      </Box>
    </View>
  );
};

export default Important;
