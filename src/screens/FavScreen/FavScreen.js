import React from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard';
const FavScreen = () => {
    const favList = useSelector((state) => state.favTransactions.favList)
    return (
        <SafeAreaView style={styles.container}>
            {favList.length > 0 ? <FlatList
                testID={`product-card`}
                data={favList}
                renderItem={({ item }) => <ProductCard productItem={item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
            /> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <Text testID='fav_empty'>
                    Favori List Empty
                </Text>
            </View>}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default FavScreen;
