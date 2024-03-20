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
  useToast,
} from 'native-base';
import React, {useState} from 'react';
import DotsSixVertical from 'phosphor-react-native/src/icons/DotsSixVertical';
import CaretDown from 'phosphor-react-native/src/icons/CaretDown';
import Star from 'phosphor-react-native/src/icons/Star';
import Check from 'phosphor-react-native/src/icons/Check';
import {IToDoItemModel} from '../models/todo-item';
import Modal from './Modal';
import toDoService from '../services/to-do';
import {useAppDispatch, useAppSelector} from '../hooks';
import {CategoryState, updateCategory} from '../redux/reducers/category';
import {getCategoryById} from '../utils/get-category-by-id';

export interface IToDoItemProps {
  todoItem: IToDoItemModel;
}

export default function ToDoItem({todoItem}: IToDoItemProps) {
  const categories = useAppSelector(state => state.category);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const category = getCategoryById(todoItem.categoryid) as CategoryState;

  const [isdone, setIsDone] = useState(todoItem.isdone);
  const [toDoNameValue, setToDoNameValue] = useState(todoItem.title);
  const [toDoDescriptionValue, setToDoDescriptionValue] = useState(
    todoItem.description,
  );

  const [isOpenAccordion, setIsOpenAccordion] = useState(false);
  const [updateTodoOpen, setUpdateToDoOpen] = useState(false);
  const [deleteTodoOpen, setDeleteToDoOpen] = useState(false);

  const updateToDo = async (toDoItemData: IToDoItemModel): Promise<boolean> => {
    const response = await toDoService.updateToDo(toDoItemData);

    let categoryUpdate = categories.find(categoryItem => {
      return categoryItem.todoitems.some(({id}) => id === response.data.id);
    });

    if (response.status === 200 && categoryUpdate) {
      const toDoUpdated = categoryUpdate.todoitems.map(todoIt => {
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

  const handlePressIsImportant = async () => {
    const toDoItemData: IToDoItemModel = {
      ...todoItem,
      isimportant: !todoItem.isimportant,
    };

    updateToDo(toDoItemData);
  };

  const handleDeleteToDo = async () => {
    const response = await toDoService.deleteToDo(todoItem.id);
    const {id: toDoId} = response.data;

    let categoryUpdate = categories.find(categoryItem => {
      return categoryItem.id === todoItem.categoryid;
    });

    if (response.status === 200 && categoryUpdate) {
      const toDoUpdated = categoryUpdate.todoitems.filter(({id}) => {
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
    if (!toDoNameValue && !toast.isActive('new-to-do-error')) {
      toast.show({
        id: 'new-to-do-error',
        render: () => {
          return (
            <Box bg="error.400" px="2" py="1" rounded="sm" mb={3}>
              <Text color={'white'}>Por favor, preencha o nome do afazer</Text>
            </Box>
          );
        },
      });

      return;
    }

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
    const doneToDo = !isdone;

    const toDoItemData: IToDoItemModel = {
      ...todoItem,
      isdone: doneToDo,
    };

    const result = await updateToDo(toDoItemData);

    if (result) {
      setIsDone(doneToDo);
    }
  };

  return (
    <>
      <Box
        bg={todoItem.isimportant ? '#8A3FFC80' : '#8A3FFC40'}
        borderRadius={'xl'}>
        <HStack justifyContent={'space-between'} alignItems={'center'} py={'1'}>
          <DotsSixVertical weight="bold" color="#3B1F65" size={25} />

          <HStack flexGrow={1} pl={'1'}>
            <Checkbox
              isChecked={isdone}
              value="isdone"
              borderColor={'#8A3FFC'}
              bg="transparent"
              _checked={{bg: '#8A3FFC'}}
              _icon={{
                as: Check,
                color: '#3B1F65',
              }}
              onChange={handleToggleCheck}>
              <Text
                color="#3B1F65"
                textDecorationLine={isdone ? 'line-through' : 'none'}>
                {todoItem.title}
              </Text>
            </Checkbox>
          </HStack>

          <HStack>
            <IconButton
              onPress={handlePressIsImportant}
              p={'2'}
              icon={
                <Star
                  size={27}
                  color="#8A3FFC"
                  weight={todoItem.isimportant ? 'fill' : 'regular'}
                />
              }
            />

            <IconButton
              onPress={() => setIsOpenAccordion(!isOpenAccordion)}
              p={'2'}
              icon={
                <PresenceTransition
                  visible={isOpenAccordion}
                  initial={{
                    rotate: '0deg',
                  }}
                  animate={{
                    rotate: '90deg',
                    transition: {
                      duration: 150,
                    },
                  }}>
                  <CaretDown weight="bold" size={30} color="#3B1F65" />
                </PresenceTransition>
              }
            />
          </HStack>
        </HStack>

        <Box px={'3'} pb={'5'} display={isOpenAccordion ? 'block' : 'none'}>
          <TextArea
            p={'2'}
            minHeight={90}
            placeholder="Nenhuma descrição"
            bg={'#F7F2FF'}
            isReadOnly
            value={todoItem.description}
            autoCompleteType={undefined} // bug
          />

          <HStack justifyContent={'space-between'} pt={'3'}>
            <Button
              borderColor={'#E41C1C'}
              variant={'outline'}
              _text={{
                fontWeight: 'normal',
                color: '#E41C1C',
              }}
              onPress={() => setDeleteToDoOpen(true)}>
              apagar
            </Button>

            <Button
              variant={'outline'}
              px={'4'}
              _text={{
                fontWeight: 'normal',
              }}
              onPress={() => setUpdateToDoOpen(true)}>
              editar
            </Button>
          </HStack>
        </Box>
      </Box>

      <Modal
        title="Editar afazer"
        isOpen={updateTodoOpen}
        onClose={() => setUpdateToDoOpen(false)}>
        <VStack py={'6'} space={'3'}>
          <VStack space={'0.5'}>
            <Text color={'#3B1F65'} pl={'0.5'}>
              Nome do afazer:
            </Text>
            <Input
              placeholder="Digite aqui"
              value={toDoNameValue}
              onChangeText={handleToDoName}
            />
          </VStack>

          <VStack space={'0.5'}>
            <Text color={'#3B1F65'} pl={'0.5'}>
              Descrição:
            </Text>
            <TextArea
              p={'2'}
              minHeight={90}
              placeholder="Digite aqui"
              value={toDoDescriptionValue}
              onChangeText={handleToDoDescription}
              autoCompleteType={undefined} // bug
            />
          </VStack>
        </VStack>
        <Button w={170} mx={'auto'} my={'4'} onPress={handleUpdateToDo}>
          Editar
        </Button>
      </Modal>

      <Modal
        title="Apagar afazer"
        isOpen={deleteTodoOpen}
        onClose={() => setDeleteToDoOpen(false)}>
        <Text
          textAlign={'center'}
          color={'#3B1F65'}
          py={'4'}
          w={280}
          mx={'auto'}>
          Deseja realmente apagar este afazer?
        </Text>

        <Button
          w={170}
          mx={'auto'}
          my={'4'}
          bg={'#E41C1C'}
          onPress={handleDeleteToDo}>
          Apagar
        </Button>
      </Modal>
    </>
  );
}
