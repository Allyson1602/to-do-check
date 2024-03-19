import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigation';
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
  useToast,
} from 'native-base';
import HeaderTitle from '../components/HeaderTitle';
import Heart from 'phosphor-react-native/src/icons/Heart';
import Plus from 'phosphor-react-native/src/icons/Plus';
import {RouteProp} from '@react-navigation/native';
import {getCategoryById} from '../utils/get-category-by-id';
import Title from '../components/Title';
import {EScreenName} from '../enums/navigation';
import {
  CategoryState,
  deleteCategory,
  updateCategory,
} from '../redux/reducers/category';
import ToDoItem from '../components/ToDoItem';
import Modal from '../components/Modal';
import {useState} from 'react';
import categoryService from '../services/category';
import {ICategoryModel} from '../models/category';
import {useAppDispatch} from '../hooks';
import toDoService, {IToDoBody} from '../services/to-do';

type TToDoProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ToDo'>;
  route: RouteProp<RootStackParamList, 'ToDo'>;
};

const ToDo: React.FC<TToDoProps> = ({navigation, route}) => {
  const category = getCategoryById(parseInt(route.key)) as CategoryState;
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [newToDoOpen, setNewToDoOpen] = useState(false);
  const [deleteCategoryOpen, setDeleteCategoryOpen] = useState(false);

  const [toDoNameValue, setToDoNameValue] = useState('');
  const [toDoDescriptionValue, setToDoDescriptionValue] = useState('');

  if (category === undefined) {
    navigation.navigate(EScreenName.HOME);
    return <></>;
  }

  const handleToDoName = (text: string) => {
    if (text.length > 35) return;
    setToDoNameValue(text);
  };

  const handleToDoDescription = (text: string) => {
    setToDoDescriptionValue(text);
  };

  const handleIsFavorite = async () => {
    const categoryData: ICategoryModel = {
      ...category,
      isfavorite: !category.isfavorite,
    };

    const response = await categoryService.updateCategory(categoryData);

    if (response.status === 200) {
      dispatch(updateCategory({...response.data}));
      return;
    }
  };

  const handleDeleteCategory = async () => {
    const response = await categoryService.deleteCategory(category.id);
    const categoryid = response.data;

    if (response.status === 200 && categoryid) {
      dispatch(deleteCategory(categoryid));
      setDeleteCategoryOpen(false);
      return;
    }
  };

  const handleNewToDo = async () => {
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

    const toDoData: IToDoBody = {
      categoryid: category.id,
      title: toDoNameValue,
      description: toDoDescriptionValue,
    };

    const response = await toDoService.createToDo(toDoData);

    if (response.status === 201) {
      const toDoCreated = response.data;

      const categoryUpdated = {
        ...category,
        todoitems: [...category.todoitems, toDoCreated],
      };

      dispatch(updateCategory(categoryUpdated));

      setNewToDoOpen(false);
      setToDoNameValue('');
      setToDoDescriptionValue('');
      return;
    }
  };

  return (
    <ScrollView>
      <Box safeArea px={'4'} h={'full'}>
        <Center>
          <HeaderTitle text="Afazeres" />
        </Center>

        <Box position={'relative'} mt={'16'}>
          <IconButton
            position={'absolute'}
            top={-5}
            right={0}
            p={'0'}
            icon={
              <Heart
                size={32}
                weight={category.isfavorite ? 'fill' : 'regular'}
                color="#8A3FFC"
              />
            }
            onPress={handleIsFavorite}
          />

          <Title iconname={category.iconname}>{category.title}</Title>
        </Box>

        <VStack justifyContent={'space-between'} space={'6'}>
          <VStack mt={'2'} space={'2'}>
            <Button
              bg={category.todoitems.length > 0 ? '#8A3FFC40' : '#8A3FFC'}
              borderColor={'#8A3FFC'}
              borderWidth={1}
              borderRadius={12}
              onPress={() => setNewToDoOpen(true)}>
              <Plus
                size={32}
                weight="bold"
                color={category.todoitems.length > 0 ? '#8A3FFC' : 'white'}
              />
            </Button>

            {category.todoitems?.map(todoItem => {
              return <ToDoItem key={todoItem.id} todoItem={todoItem} />;
            })}
          </VStack>

          <Button
            w={'1/2'}
            mx={'auto'}
            variant={'outline'}
            borderColor={'#E41C1C'}
            borderStyle={'solid'}
            borderWidth={1}
            onPress={() => setDeleteCategoryOpen(true)}>
            <Text color={'#E41C1C'}>apagar categoria</Text>
          </Button>
        </VStack>
      </Box>

      <Modal
        title="Apagar categoria"
        isOpen={deleteCategoryOpen}
        onClose={() => setDeleteCategoryOpen(false)}>
        <Text
          textAlign={'center'}
          color={'#3B1F65'}
          py={'4'}
          w={280}
          mx={'auto'}>
          Deseja realmente apagar este categoria?
        </Text>

        <Button
          w={170}
          mx={'auto'}
          my={'4'}
          bg={'#E41C1C'}
          onPress={handleDeleteCategory}>
          Apagar
        </Button>
      </Modal>

      <Modal
        title="Novo afazer"
        isOpen={newToDoOpen}
        onClose={() => {
          setNewToDoOpen(false);
          setToDoNameValue('');
          setToDoDescriptionValue('');
        }}>
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

        <Button w={170} mx={'auto'} my={'4'} onPress={handleNewToDo}>
          Criar
        </Button>
      </Modal>
    </ScrollView>
  );
};

export default ToDo;
