import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FavScreen from '../src/screens/FavScreen/FavScreen';


// Mock Redux store
const mockStore = configureStore([]);

// Mock ProductCard component if needed
jest.mock('../src/components/ProductCard', () => jest.fn(() => null));

describe('FavScreen', () => {
    it('renders correctly with empty favList', () => {
        const store = mockStore({
            favTransactions: { favList: [] },
        });

        const { getByTestId } = render(
            <Provider store={store}>
                <FavScreen />
            </Provider>
        );

        expect(getByTestId('fav_empty')).toBeTruthy();
    });
    //        favTransactions: { favList:  [{"brand": "Smart", "createdAt": "2023-07-17T02:49:46.692Z", "description": "Odio et voluptates velit omnis incidunt dolor. Illo sint quisquam tenetur dolore nemo molestiae. Dolorum odio dicta placeat. Commodi rerum molestias quibusdam labore. Odio libero doloribus. Architecto repellendus aperiam nulla at at voluptatibus ipsum.Fugit expedita a quo totam quaerat amet eveniet laboriosam. Ad assumenda atque porro neque iusto. Inventore repudiandae esse non sit veritatis ab reprehenderit quas. Sit qui natus exercitationem quis commodi vero.Iure reiciendis quas corrupti incidunt repellat voluptatem esse eveniet. Aliquid illo cum doloremque similique. Blanditiis corporis repellendus cumque totam quod iusto dolorum. Incidunt a eos eum voluptas tempora voluptas reiciendis autem.", "id": "2", "image": "https://loremflickr.com/640/480/food", "model": "Roadster", "name": "Aston Martin Durango", "price": "374.00"}, {"brand": "Volkswagen", "createdAt": "2023-07-17T05:04:01.235Z", "description": "Similique iste repellat minima recusandae similique. Voluptates omnis perferendis eius possimus dolor aut dignissimos temporibus. Quo molestias praesentium quasi rerum. Vitae harum pariatur recusandae reprehenderit. Blanditiis deleniti delectus quia. Suscipit blanditiis quod sunt expedita animi quis.Inventore provident molestiae dicta aut corrupti. Dicta odio dolore minima voluptatibus velit velit ea voluptatibus. Aliquam occaecati magnam consectetur illum natus. Ipsum est ut quia est ab. Eius ad tempore libero ipsa ea atque.Pariatur aperiam voluptas similique occaecati repellendus. Voluptas necessitatibus ut exercitationem non tenetur enim. Iure aliquam maiores eveniet consequatur nihil.", "id": "4", "image": "https://loremflickr.com/640/480/transport", "model": "Jetta", "name": "Rolls Royce Taurus", "price": "779.00"}]},

    it('renders correctly with empty favList', () => {
        const store = mockStore({
            favTransactions: {  favList: [
                {
                    "brand": "Smart",
                    "createdAt": "2023-07-17T02:49:46.692Z",
                    "description": "Odio et voluptates velit omnis incidunt dolor. Illo sint quisquam tenetur dolore nemo molestiae. Dolorum odio dicta placeat. Commodi rerum molestias quibusdam labore. Odio libero doloribus. Architecto repellendus aperiam nulla at at voluptatibus ipsum.Fugit expedita a quo totam quaerat amet eveniet laboriosam. Ad assumenda atque porro neque iusto. Inventore repudiandae esse non sit veritatis ab reprehenderit quas. Sit qui natus exercitationem quis commodi vero.Iure reiciendis quas corrupti incidunt repellat voluptatem esse eveniet. Aliquid illo cum doloremque similique. Blanditiis corporis repellendus cumque totam quod iusto dolorum. Incidunt a eos eum voluptas tempora voluptas reiciendis autem.",
                    "id": "2",
                    "image": "https://loremflickr.com/640/480/food",
                    "model": "Roadster",
                    "name": "Aston Martin Durango",
                    "price": "374.00"
                },
                {
                    "brand": "Volkswagen",
                    "createdAt": "2023-07-17T05:04:01.235Z",
                    "description": "Similique iste repellat minima recusandae similique. Voluptates omnis perferendis eius possimus dolor aut dignissimos temporibus. Quo molestias praesentium quasi rerum. Vitae harum pariatur recusandae reprehenderit. Blanditiis deleniti delectus quia. Suscipit blanditiis quod sunt expedita animi quis.Inventore provident molestiae dicta aut corrupti. Dicta odio dolore minima voluptatibus velit velit ea voluptatibus. Aliquam occaecati magnam consectetur illum natus. Ipsum est ut quia est ab. Eius ad tempore libero ipsa ea atque.Pariatur aperiam voluptas similique occaecati repellendus. Voluptas necessitatibus ut exercitationem non tenetur enim. Iure aliquam maiores eveniet consequatur nihil.",
                    "id": "4",
                    "image": "https://loremflickr.com/640/480/transport",
                    "model": "Jetta",
                    "name": "Rolls Royce Taurus",
                    "price": "779.00"
                }
            ] },
        });

        const componentTree = render(
            <Provider store={store}>
                <FavScreen />
            </Provider>
        );
    
        // FlatList içindeki her öğe için bir test ID belirtmek önemlidir
        const flatListItems = componentTree.getAllByTestId('product-card');
    
        // Belirtilen sayıda öğe olup olmadığını kontrol etmek için expect kullanabilirsiniz
        expect(flatListItems).toHaveLength(1);
    
    });
});
