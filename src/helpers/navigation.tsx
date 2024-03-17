import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { createStackNavigator } from "@react-navigation/stack";
import { EScreenName } from "../enums/navigation";
import Home from "../screens/Home";
import Menu from "../components/Menu";
import Important from "../screens/Important";
import ToDo from "../screens/ToDo";

const Stack = createStackNavigator<RootStackParamList>();

const NavigationConfig: React.FC = () => {
  return (
    <NavigationContainer>
      <Menu />

      <Stack.Navigator initialRouteName={EScreenName.HOME}>
        <Stack.Screen
          name={EScreenName.HOME}
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={EScreenName.IMPORTANT}
          component={Important}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={EScreenName.TODO}
          component={ToDo}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationConfig;
