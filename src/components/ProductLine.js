import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons"
import { useDispatch } from 'react-redux'
import { addItem, removeItem } from '../redux/features/cardTransactionsSlice/cardTransactionsSlice'
const ProductLine = ({ productItem }) => {
    const dispatch = useDispatch()
    return (
        <View style={styles.container}>
            <View style={{ flex: 3 }}>
                <Text> {productItem.name} </Text>
                <Text style={{ color: 'royalblue' }}>{productItem.price}₺</Text>
            </View>
            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={{ flex: 2, backgroundColor: 'orange', alignItems: 'center', justifyContent: 'center', height: 50 }} onPress={() => dispatch(removeItem(productItem))}>
                    <Ionicons name="remove" size={20} color="white" />
                </TouchableOpacity>
                <View style={{ flex: 3, backgroundColor: 'royalblue', alignItems: 'center', justifyContent: 'center', height: 50 }}>
                    <Text style={{ color: 'white' }}>{productItem.count}</Text>
                </View>
                <TouchableOpacity style={{ flex: 2, backgroundColor: 'orange', alignItems: 'center', justifyContent: 'center', height: 50 }} onPress={() => dispatch(addItem(productItem))}>
                    <Ionicons name="add" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 8,
        height: 50,
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: 'gainsboro',
        flexDirection: 'row',
    },
})
export default ProductLine;
