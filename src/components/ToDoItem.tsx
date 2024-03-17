import {
  Box,
  Button,
  Checkbox,
  HStack,
  IconButton,
  Input,
  PresenceTransition,
  Text,
  TextArea,
  VStack,
} from "native-base";
import React, { useState } from "react";
import DotsSixVertical from "phosphor-react-native/src/icons/DotsSixVertical";
import CaretDown from "phosphor-react-native/src/icons/CaretDown";
import Check from "phosphor-react-native/src/icons/Check";
import { GestureResponderEvent, Pressable } from "react-native";
import { IToDoItemModel } from "../models/todo-item";
import Modal from "./Modal";
import toDoService from "../services/to-do";
import { useAppDispatch, useAppSelector } from "../hooks";
import { updateCategory } from "../redux/reducers/category";

export interface IToDoItemProps {
  todoItem: IToDoItemModel;
}

export default function ToDoItem({ todoItem }: IToDoItemProps) {
  const categories = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  const [isOpenAccordion, setIsOpenAccordion] = useState(false);
  const [isdone, setIsDone] = useState(todoItem.isdone || false);

  const [toDoNameValue, setToDoNameValue] = useState(todoItem.title);
  const [toDoDescriptionValue, setToDoDescriptionValue] = useState(
    todoItem.description
  );

  const [updateTodoOpen, setUpdateToDoOpen] = useState(false);
  const [deleteTodoOpen, setDeleteToDoOpen] = useState(false);

  const updateToDo = async (toDoItemData: IToDoItemModel): Promise<boolean> => {
    const response = await toDoService.updateToDo(toDoItemData);

    let categoryUpdate = categories.find((categoryItem) => {
      return categoryItem.todoitems.some(({ id }) => id === response.data.id);
    });

    if (response.status === 200 && categoryUpdate) {
      const toDoUpdated = categoryUpdate.todoitems.map((todoIt) => {
        if (todoIt.id === response.data.id) {
          return response.data;
        }
        return todoIt;
      });

      categoryUpdate = {
        ...categoryUpdate,
        todoitems: toDoUpdated,
      };

      dispatch(updateCategory(categoryUpdate));
      setUpdateToDoOpen(false);
      return true;
    }

    return false;
  };

  const handleLongPress = async (event: GestureResponderEvent) => {
    const toDoItemData: IToDoItemModel = {
      ...todoItem,
      isimportant: !todoItem.isimportant,
    };

    updateToDo(toDoItemData);
  };

  const handleDeleteToDo = async () => {
    const response = await toDoService.deleteToDo(todoItem.id);
    const { id: toDoId } = response.data;

    let categoryUpdate = categories.find((categoryItem) => {
      return categoryItem.id === todoItem.categoryid;
    });

    if (response.status === 200 && categoryUpdate) {
      const toDoUpdated = categoryUpdate.todoitems.filter(({ id }) => {
        return id != toDoId;
      });

      const categoryUpdated = {
        ...categoryUpdate,
        todoitems: toDoUpdated,
      };

      dispatch(updateCategory(categoryUpdated));
      setDeleteToDoOpen(false);
      return;
    }
  };

  const handleUpdateToDo = async () => {
    const toDoData: IToDoItemModel = {
      ...todoItem,
      title: toDoNameValue,
      description: toDoDescriptionValue,
    };

    updateToDo(toDoData);
  };

  const handleToDoName = (text: string) => {
    if (text.length > 35) return;

    setToDoNameValue(text);
  };

  const handleToDoDescription = (text: string) => {
    setToDoDescriptionValue(text);
  };

  const handleToggleCheck = async () => {
    const done = !isdone;

    const toDoItemData: IToDoItemModel = {
      ...todoItem,
      isdone: done,
    };

    const result = await updateToDo(toDoItemData);

    if (result) {
      setIsDone(done);
    }
  };

  return (
    <>
      <Pressable onLongPress={handleLongPress}>
        <Box
          bg={todoItem.isimportant ? "#8A3FFC80" : "#8A3FFC40"}
          borderRadius={"xl"}
        >
          <HStack
            justifyContent={"space-between"}
            alignItems={"center"}
            py={"1"}
          >
            <Pressable>
              <DotsSixVertical weight="bold" color="#3B1F65" size={25} />
            </Pressable>

            <HStack flexGrow={1} pl={"1"}>
              <Checkbox
                isChecked={isdone}
                value="isdone"
                borderColor={"#8A3FFC"}
                bg="transparent"
                _checked={{ bg: "#8A3FFC" }}
                _icon={{
                  as: Check,
                  color: "#3B1F65",
                }}
                onChange={handleToggleCheck}
              >
                <Text
                  color="#3B1F65"
                  textDecorationLine={isdone ? "line-through" : "none"}
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
                onPress={() => setDeleteToDoOpen(true)}
              >
                apagar
              </Button>

              <Button
                variant={"outline"}
                px={"4"}
                _text={{
                  fontWeight: "normal",
                }}
                onPress={() => setUpdateToDoOpen(true)}
              >
                editar
              </Button>
            </HStack>
          </Box>
        </Box>
      </Pressable>

      <Modal
        title="Editar afazer"
        isOpen={updateTodoOpen}
        onClose={() => setUpdateToDoOpen(false)}
      >
        <VStack py={"6"} space={"3"}>
          <VStack space={"0.5"}>
            <Text color={"#3B1F65"} pl={"0.5"}>
              Nome do afazer:
            </Text>
            <Input
              placeholder="Digite aqui"
              value={toDoNameValue}
              onChangeText={handleToDoName}
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
              value={toDoDescriptionValue}
              onChangeText={handleToDoDescription}
              autoCompleteType={undefined} // bug
            />
          </VStack>
        </VStack>
        <Button w={170} mx={"auto"} my={"4"} onPress={handleUpdateToDo}>
          Editar
        </Button>
      </Modal>

      <Modal
        title="Apagar afazer"
        isOpen={deleteTodoOpen}
        onClose={() => setDeleteToDoOpen(false)}
      >
        <Text
          textAlign={"center"}
          color={"#3B1F65"}
          py={"4"}
          w={280}
          mx={"auto"}
        >
          Deseja realmente apagar este afazer?
        </Text>

        <Button
          w={170}
          mx={"auto"}
          my={"4"}
          bg={"#E41C1C"}
          onPress={handleDeleteToDo}
        >
          Apagar
        </Button>
      </Modal>
    </>
  );
}
