import React  from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Text, SafeAreaView, StyleSheet, FlatList, View, TouchableOpacity } from 'react-native';
import ProductLine from '../../components/ProductLine';
import { complateBasket } from '../../redux/features/cardTransactionsSlice/cardTransactionsSlice';
const MyBasket = () => {
  const basket = useSelector((state) => state.cardTransactions)
const dispatch = useDispatch()
  return (
    <SafeAreaView style={styles.container}>
     {basket.basketList && basket.basketList.length ? <View style={{flex:1}}>
        <FlatList
          data={basket.basketList}
          renderItem={({ item }) => <ProductLine productItem={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
        <View style={styles.footerContainer}>
          <View style={{ flex: 3 }}>
            <Text style={{ color: 'royalblue', fontSize: 18 }}>Total:</Text>
            <Text style={styles.priceStyle}>{basket.totalPrice}₺</Text>
          </View>
          <TouchableOpacity testID='complate_btn' style={styles.btnStyle} onPress={() => dispatch(complateBasket())}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 17 }}>Complate</Text>
          </TouchableOpacity>
        </View>
      </View>:<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <Text testID='basket_empty'>
          Basket is Empty
        </Text>
      </View>}

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 15
  },
  btnStyle: {
    flex: 2,
    backgroundColor: 'royalblue',
    height: 35,
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
});

export default MyBasket;
