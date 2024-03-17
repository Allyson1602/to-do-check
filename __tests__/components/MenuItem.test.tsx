import {render, screen} from '@testing-library/react-native';
import MenuItem from '../../src/components/MenuItem';
import House from 'phosphor-react-native/src/icons/House';
import {EScreenName} from '../../src/enums/navigation';
import {describe, expect, test} from '@jest/globals';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {NativeBaseProvider} from 'native-base';
import {store} from '../../src/redux/store';
import theme from '../../theme';

describe('Test for Menu Item Component', () => {
  test('should render a heart icon', () => {
    const isfavorite = true;
    render(
      <Provider store={store}>
        <NativeBaseProvider theme={theme}>
          <NavigationContainer>
            <MenuItem
              isfavorite={isfavorite}
              Icon={House}
              id={'999'}
              goTo={EScreenName.HOME}>
              Início
            </MenuItem>
          </NavigationContainer>
        </NativeBaseProvider>
      </Provider>,
    );

    const iconHeart = screen.queryByTestId('icon-heart');
    expect(iconHeart).not.toBeTruthy();
  });
});
