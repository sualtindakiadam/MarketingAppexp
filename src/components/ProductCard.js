import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { PRODUCT_DETAIL } from '../publics/publicObject';
import { addItem } from '../redux/features/cardTransactionsSlice/cardTransactionsSlice';
import { changeFavStatus } from '../redux/features/favTransactionsSlice/favTransactionsSlice';
import Ionicons from "react-native-vector-icons/Ionicons"
const ProductCard = ({ productItem }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const favList = useSelector((state) => state.favTransactions.favList)
    const navigateToDetail = () => {
        navigation.navigate(PRODUCT_DETAIL.id, { productItem });
    };
    return (
        <TouchableOpacity style={styles.cardContainer} onPress={() => navigateToDetail()}>
            <Image
                style={styles.imgStyle}
                source={{
                    uri: productItem.image,
                }}
            />
            <TouchableOpacity style={styles.favButton} onPress={() => dispatch(changeFavStatus(productItem))}>
                <Ionicons
                    name="star-sharp"
                    size={35}
                    color={favList.some(item => item.id === productItem.id) ? 'orange' : 'white'}
                />
            </TouchableOpacity>
            <View style={{ flex: 1, width: '100%' }}>
                <Text style={[styles.textStyle, { color: 'royalblue' }]}>{productItem.price}₺</Text>
                <Text style={styles.textStyle}>{productItem.name}</Text>
                <TouchableOpacity style={styles.btnStyle} onPress={() => dispatch(addItem(productItem))}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 17 }}>Add to Card</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        borderWidth: 1,
        margin: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 5,
        borderColor: 'gainsboro',
        position: 'relative',
    },
    favButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        margin: 15,
    },
    imgStyle: {
        flex: 1,
        width: '100%',
        height: 150,
        marginVertical: 15,
    },
    textStyle: {
        textAlign: 'left',
        marginBottom: 15,
        fontSize: 15,
        fontWeight: '500'
    },
    btnStyle: {
        backgroundColor: 'royalblue',
        height: 35,
        justifyContent: 'center',
        borderRadius: 5,
        marginVertical: 10

    }

})

export default ProductCard;