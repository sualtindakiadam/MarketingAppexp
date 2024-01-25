import React from 'react'
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HOME_SCREEN, MY_BASKET, PRODUCT_DETAIL, HOME_TAB_STACK, FAV_SCREEN } from './src/publics/publicObject.js';
import Ionicons from "react-native-vector-icons/Ionicons"
import { Provider } from 'react-redux'
import { store } from './src/redux/store/store.js';
import ProductDetail from './src/screens/ProductDetail/ProductDetail.js';
import HomeScreen from './src/screens/HomeScreen/HomeScreen.js';
import MyBasket from './src/screens/MyBasket/MyBasket.js';
import FavScreen from './src/screens/FavScreen/FavScreen.js';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabBar = () => {
  const basketCounter = useSelector((state) => state.cardTransactions.basketCounter)
  const favCounter = useSelector((state) => state.favTransactions.favCounter)



  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          switch (route.name) {
            case HOME_TAB_STACK.id:
              iconName = HOME_TAB_STACK.icon
              break;
            case MY_BASKET.id:
              iconName = MY_BASKET.icon
              break;
            case FAV_SCREEN.id:
              iconName = FAV_SCREEN.icon
              break;
            default:
              break;
          }
          return (<View style={{ flex: 1, justifyContent: 'center' }}>
            <Ionicons name={iconName} color={color} size={35} />

          </View>)
        },
        tabBarBadge: (() => {
          if (route.name === MY_BASKET.id && basketCounter &&basketCounter > 0) {
            return basketCounter;
          } else if (route.name === FAV_SCREEN.id && favCounter > 0) {
            return favCounter; // FAV_SCREEN için özel badge değeri
          } else {
            return null;
          }
        })(),

        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarShowLabel: false

      })}

      initialRouteName={HOME_TAB_STACK.id}
    >
      <Tab.Screen name={HOME_TAB_STACK.id} component={HomeTabStack} />
      <Tab.Screen name={MY_BASKET.id} component={MyBasket} options={{ headerShown: true,title: MY_BASKET.title }} />
      <Tab.Screen name={FAV_SCREEN.id} component={FavScreen} options={{ headerShown: true,title: FAV_SCREEN.title }} />

    </Tab.Navigator>

  )
}
const HomeTabStack = () => {
  return (
    <Stack.Navigator initialRouteName={HOME_SCREEN.id}>
      <Stack.Screen name={HOME_SCREEN.id} component={HomeScreen}   options={{ headerShown: true,title: HOME_SCREEN.title }}/>
      
      <Stack.Screen name={PRODUCT_DETAIL.id} component={ProductDetail} options={{ headerShown: true,title: PRODUCT_DETAIL.title, headerBackTitle:'' }}  />

    </Stack.Navigator>
  );

}

const App = () => {
  return (
    <Provider store={store}>

      <NavigationContainer>
        <TabBar />
      </NavigationContainer>
    </Provider>


  )
}
export default App;