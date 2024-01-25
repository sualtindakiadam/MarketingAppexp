import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MyBasket from '../src/screens/MyBasket/MyBasket';

const mockStore = configureStore([]);
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
describe('MyBasket component', () => {
  it('renders empty basket message when the basket is empty', () => {
    const initialState = { cardTransactions: { basketList: [] } };
    const store = mockStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <MyBasket />
      </Provider>
    );

    const emptyBasketMessage = getByTestId('basket_empty');
    expect(emptyBasketMessage).toBeTruthy();
  });

  it('renders basket items and total price when the basket is not empty', () => {
    const initialState = {
      cardTransactions: {
        basketList: [
          { id: 1, name: 'Product 1', price: 10 },
          { id: 2, name: 'Product 2', price: 20 },
        ],
        totalPrice: 30,
      },
    };
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <MyBasket />
      </Provider>
    );

    const product1 = getByText('Product 1');
    const product2 = getByText('Product 2');
    const totalText = getByText('Total:');
    const totalPrice = getByText('30₺');

    expect(product1).toBeTruthy();
    expect(product2).toBeTruthy();
    expect(totalText).toBeTruthy();
    expect(totalPrice).toBeTruthy();
  });
const cardTransaction = {
    basketCounter: 1,
    basketList: [
      {
        brand: "Lamborghini",
        count: 1,
        createdAt: "2023-07-17T07:21:02.529Z",
        description: "Quasi adipisci sint veniam delectus. Illum laboriosam minima dignissimos natus earum facere consequuntur eius vero. Itaque facilis at tempore ipsa. Accusamus nihil fugit velit possimus expedita error porro aliquid. Optio magni mollitia veritatis repudiandae tenetur nemo. Id consectetur fuga ipsam quidem voluptatibus sed magni dolore. Facilis commodi dolores sapiente delectus nihil ex a perferendis. Totam deserunt assumenda inventore. Incidunt nesciunt adipisci natus porro deleniti nisi incidunt laudantium soluta. Nostrum optio ab facilis quisquam. Soluta laudantium ipsa ut accusantium possimus rem. Illo voluptatibus culpa incidunt repudiandae placeat animi. Delectus id in animi incidunt autem. Ipsum provident beatae nisi cumque nulla iure.",
        id: "1",
        image: "https://loremflickr.com/640/480/food",
        model: "CTS",
        name: "Bentley Focus",
        price: "51.00"
      }
    ],
    totalPrice: 51
  }
  
  it('dispatches complateBasket action when "Complete" button is pressed', () => {
    const initialState = { cardTransactions: cardTransaction };
    const store = mockStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <MyBasket />
      </Provider>
    );
      const completeButton = getByTestId('complate_btn');
      fireEvent.press(completeButton);
    const actions = store.getActions();
    expect(actions.length).toBe(1);
    expect(actions[0].type).toBe('cardTransactions/complateBasket');
  });
});
