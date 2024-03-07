import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { createStackNavigator } from "@react-navigation/stack";
import { EScreenName } from "../enums/navigation";
import Home from "../screens/Home";

const Stack = createStackNavigator<RootStackParamList>();

const NavigationConfig: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={EScreenName.HOME}>
        <Stack.Screen
          name={EScreenName.HOME}
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationConfig;
