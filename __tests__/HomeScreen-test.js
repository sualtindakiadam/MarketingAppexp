import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen/HomeScreen';
import axios from 'axios';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Mocking axios for unit testing
jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
const mockStore = configureStore([]);
const productList = [{
    brand: "Smart",
    createdAt: "2023-07-17T02:49:46.692Z",
    description: "Odio et voluptates velit omnis incidunt dolor. Illo sint quisquam tenetur dolore nemo molestiae. Dolorum odio dicta placeat. Commodi rerum molestias quibusdam labore. Odio libero doloribus. Architecto repellendus aperiam nulla at at voluptatibus ipsum. Fugit expedita a quo totam quaerat amet eveniet laboriosam. Ad assumenda atque porro neque iusto. Inventore repudiandae esse non sit veritatis ab reprehenderit quas. Sit qui natus exercitationem quis commodi vero. Iure reiciendis quas corrupti incidunt repellat voluptatem esse eveniet. Aliquid illo cum doloremque similique. Blanditiis corporis repellendus cumque totam quod iusto dolorum. Incidunt a eos eum voluptas tempora voluptas reiciendis autem.",
    id: "2",
    image: "https://loremflickr.com/640/480/food",
    model: "Roadster",
    name: "Aston Martin Durango",
    price: "374.00"

}]
const initialState = { cardTransactions: [] };
const store = mockStore(initialState);
describe('HomeScreen', () => {

    it('renders without crashing', () => {
        render(
            <Provider store={store}>
                <HomeScreen />
            </Provider>
        );
    });

    /* it('renders refresh crashing',async () => {
         const store = mockStore([]);
         const { getByTestId } = render(
             <Provider store={store}>
                 <HomeScreen />
             </Provider>
         );
         await waitFor(() => {
             // Check if the changeFavStatus action is dispatched
             const actions = store.getActions();
             expect(actions).toContainEqual(changeFavStatus(productItem));
           });
     });*/


    /*  it('handles search input correctly', async () => {
          const initialState = { cardTransactions: [] };
          const store = mockStore(initialState);
          const { getByTestId } = render(
              <Provider store={store}>
                  <HomeScreen />
              </Provider>
          );
  
          const searchInput = getByTestId('search_input');
          fireEvent.changeText(searchInput, 'example');
  
          await waitFor(() => {
              expect(searchInput.props.value).toBe('example');
          });
      });*/
    /*
        it('refreshes page on button click', async () => {
            const { getByTestId } = render(<HomeScreen />);
    
            const refreshButton = getByTestId('refresh_btn');
            fireEvent.press(refreshButton);
    
            // Assuming fetchData is called when refreshing, you may need to adapt this based on actual implementation
            // Mocking API response for demonstration purposes
            axios.get.mockResolvedValueOnce({ data: [] });
    
            await waitFor(() => {
                // Assuming fetchData is called when refreshing, you may need to adapt this based on actual implementation
                expect(axios.get).toHaveBeenCalledWith(
                    'https://5fc9346b2af77700165ae514.mockapi.io/products',
                    {
                        params: {
                            page: 2,  // Assuming the page will be incremented after pressing refresh
                            limit: 12,
                        },
                    }
                );
            });
    
        });
    */
});
