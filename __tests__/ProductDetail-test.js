import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductDetail from '../src/screens/ProductDetail/ProductDetail'
import { changeFavStatus } from '../src/redux/features/favTransactionsSlice/favTransactionsSlice';
import { addItem } from '../src/redux/features/cardTransactionsSlice/cardTransactionsSlice';
const mockStore = configureStore([]);
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
const productItem = {
  brand: "Smart",
  createdAt: "2023-07-17T02:49:46.692Z",
  description: "Odio et voluptates velit omnis incidunt dolor. Illo sint quisquam tenetur dolore nemo molestiae. Dolorum odio dicta placeat. Commodi rerum molestias quibusdam labore. Odio libero doloribus. Architecto repellendus aperiam nulla at at voluptatibus ipsum. Fugit expedita a quo totam quaerat amet eveniet laboriosam. Ad assumenda atque porro neque iusto. Inventore repudiandae esse non sit veritatis ab reprehenderit quas. Sit qui natus exercitationem quis commodi vero. Iure reiciendis quas corrupti incidunt repellat voluptatem esse eveniet. Aliquid illo cum doloremque similique. Blanditiis corporis repellendus cumque totam quod iusto dolorum. Incidunt a eos eum voluptas tempora voluptas reiciendis autem.",
  id: "2",
  image: "https://loremflickr.com/640/480/food",
  model: "Roadster",
  name: "Aston Martin Durango",
  price: "374.00"

}

jest.mock('@react-navigation/native', () => ({
  useRoute: () => ({
    params: {
      productItem: productItem,
    },
  }),
}));

describe('ProductDetail', () => {

  it('renders correctly and interacts with buttons', async () => {
    const store = mockStore({
      favTransactions: { favList: [] },
    });

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <ProductDetail />
      </Provider>
    );

    // Assert that the product details are rendered correctly
    expect(getByText(productItem.name)).toBeTruthy();
    expect(getByText(productItem.description)).toBeTruthy();
    expect(getByText(productItem.price + '₺')).toBeTruthy();

    // Check the favorite button
    const favButton = getByTestId('fav-button');
    expect(favButton).toBeTruthy();

    // Simulate a press on the favorite button
    fireEvent.press(favButton);

    // Wait for the AsyncStorage operation to complete
    await waitFor(() => {
      // Check if the changeFavStatus action is dispatched
      const actions = store.getActions();
      expect(actions).toContainEqual(changeFavStatus(productItem));
    });

    // Check the "Add to Cart" button
    const addToCartButton = getByText('Add to Cart');
    expect(addToCartButton).toBeTruthy();

    // Simulate a press on the "Add to Cart" button
    fireEvent.press(addToCartButton);

    // Wait for the AsyncStorage operation to complete
    await waitFor(() => {
      // Check if the addItem action is dispatched
      const actions = store.getActions();
      expect(actions).toContainEqual(addItem(productItem));
    });
  });
});