import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { StyleSheet, SafeAreaView, Image, View, TouchableOpacity, Text,ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { addItem } from '../../redux/features/cardTransactionsSlice/cardTransactionsSlice';
import Ionicons from "react-native-vector-icons/Ionicons"
import { changeFavStatus } from '../../redux/features/favTransactionsSlice/favTransactionsSlice';
const ProductDetail = () => {
    const route = useRoute();
    const dispatch = useDispatch()
    const favList = useSelector((state) => state.favTransactions.favList)
    const { productItem } = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={styles.imgStyle}
                source={{
                    uri: productItem.image,
                }}
            />
              <TouchableOpacity testID='fav-button' style={styles.favButton} onPress={() => dispatch(changeFavStatus(productItem))}>
                <Ionicons
                    name="star-sharp"
                    size={45}
                    color={favList.some(item => item.id === productItem.id) ? 'orange' : 'white'}
                />
            </TouchableOpacity>
            <View style={styles.infoContainer}>
                <Text style={styles.titleStyle}>{productItem.name}</Text>
                <ScrollView>
                    <Text style={styles.descriptionStyle}>{productItem.description}</Text>
                </ScrollView>
            </View>
            <View style={styles.footerContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'royalblue', fontSize: 18 }}>Price:</Text>
                    <Text style={styles.priceStyle}>{productItem.price}₺</Text>
                </View>
                <TouchableOpacity style={styles.btnStyle} onPress={() => dispatch(addItem(productItem))}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 17 }}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
    },
    infoContainer: {
        flex: 1,
        width: '100%'
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop:15
    },
    favButton: {
        position: 'absolute',
        top: 15,
        right: 0,
        margin: 15,
    },
    imgStyle: {
        flex: 1,
        width: '100%',
        height: 130,
        marginVertical: 15,
    },
    titleStyle: {
        textAlign: 'left',
        marginBottom: 15,
        fontSize: 25,
        fontWeight: '700',
    },
    descriptionStyle: {
        textAlign: 'justify',
        fontSize: 20,
    },
    priceStyle: {
        flex: 1,
        textAlign: 'left',
        fontSize: 15,
        fontWeight: '700',
    },
    btnStyle: {
        flex: 1,
        backgroundColor: 'royalblue',
        height: 35,
        justifyContent: 'center',
        borderRadius: 5,
        marginVertical: 10,
    },
});

export default ProductDetail;
