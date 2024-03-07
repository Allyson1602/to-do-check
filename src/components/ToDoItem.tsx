import {
  Box,
  Button,
  Checkbox,
  HStack,
  IconButton,
  PresenceTransition,
  Text,
  TextArea,
} from "native-base";
import React from "react";
import DotsSixVertical from "phosphor-react-native/src/icons/DotsSixVertical";
import CaretDown from "phosphor-react-native/src/icons/CaretDown";
import Check from "phosphor-react-native/src/icons/Check";
import { GestureResponderEvent, Pressable } from "react-native";
import { ITodoItemModel } from "../models/todo-item";

export interface IToDoItemProps {
  todoItem: ITodoItemModel;
}

export default function ToDoItem({ todoItem }: IToDoItemProps) {
  const [isOpenAccordion, setIsOpenAccordion] = React.useState(false);
  const [isDone, setIsDone] = React.useState(todoItem.isDone || false);

  const handleLongPress = (event: GestureResponderEvent) => {};

  return (
    <Pressable onLongPress={handleLongPress}>
      <Box bg={"#8A3FFC40"}>
        <HStack justifyContent={"space-between"} alignItems={"center"} py={"1"}>
          <Pressable>
            <DotsSixVertical weight="bold" color="#3B1F65" size={25} />
          </Pressable>

          <HStack flexGrow={1} pl={"1"}>
            <Checkbox
              isChecked={isDone}
              value="isDone"
              borderColor={"#8A3FFC"}
              bg="transparent"
              _checked={{ bg: "#8A3FFC" }}
              _icon={{
                as: Check,
                color: "#3B1F65",
              }}
              onChange={() => {
                setIsDone(!isDone);
              }}
            >
              <Text
                color="#3B1F65"
                textDecorationLine={isDone ? "line-through" : "none"}
              >
                {todoItem.title}
              </Text>
            </Checkbox>
          </HStack>

          <IconButton
            onPress={() => setIsOpenAccordion(!isOpenAccordion)}
            p={"2"}
            icon={
              <PresenceTransition
                visible={isOpenAccordion}
                initial={{
                  rotate: "0deg",
                }}
                animate={{
                  rotate: "90deg",
                  transition: {
                    duration: 150,
                  },
                }}
              >
                <CaretDown weight="bold" size={30} color="#3B1F65" />
              </PresenceTransition>
            }
          />
        </HStack>

        <Box px={"3"} pb={"5"} display={isOpenAccordion ? "block" : "none"}>
          <TextArea
            p={"2"}
            minHeight={90}
            placeholder="Digite aqui"
            bg={"#F7F2FF"}
            isReadOnly
            value={todoItem.description}
            autoCompleteType={undefined} // bug
          />

          <HStack justifyContent={"space-between"} pt={"3"}>
            <Button
              borderColor={"#E41C1C"}
              variant={"outline"}
              _text={{
                fontWeight: "normal",
                color: "#E41C1C",
              }}
            >
              apagar
            </Button>

            <Button
              variant={"outline"}
              px={"4"}
              _text={{
                fontWeight: "normal",
              }}
            >
              editar
            </Button>
          </HStack>
        </Box>
      </Box>
    </Pressable>
  );
}
