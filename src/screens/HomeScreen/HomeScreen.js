import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { StyleSheet, FlatList, SafeAreaView, ActivityIndicator, View, TextInput, Text, TouchableOpacity, Modal } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import RadioGroup from 'react-native-radio-buttons-group';
import ProductCard from '../../components/ProductCard';
import { getStorageFavData } from '../../redux/features/favTransactionsSlice/favTransactionsSlice';
import { getLocalStorageData } from '../../publics/storageTransactions';
import { getStorageCardData } from '../../redux/features/cardTransactionsSlice/cardTransactionsSlice';
import { LOCAL_STORAGES, radioBtnSort } from '../../publics/publicObject';
const HomeScreen = () => {
  const dispatch = useDispatch();
  const [searchedText, setSearchedText] = useState(null);
  const [searchedBrandText, setSearchedBrandText] = useState(null);
  const [searchedModelText, setSearchedModelText] = useState(null);
  const [filteredList, setFilteredList] = useState([])
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [radioFilter, setRadioFilter] = useState(2)
  const [brandsList, setBrandsList] = useState([])
  const [modelsList, setModelsList] = useState([])
  const [checkedBrandItems, setCheckedBrandItems] = useState({});
  const [checkedModelItems, setCheckedModelItems] = useState({});
  const radioButtons = useMemo(() => (radioBtnSort), []);
  useEffect(() => {
    async function getLocal() {
      const localStorageBasketData = JSON.parse(await getLocalStorageData(LOCAL_STORAGES.basketList))
      dispatch(getStorageCardData(localStorageBasketData))
      const localStorageFavData = JSON.parse(await getLocalStorageData(LOCAL_STORAGES.favList))
      dispatch(getStorageFavData(localStorageFavData))
    }
    getLocal()
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get('https://5fc9346b2af77700165ae514.mockapi.io/products', {
        params: {
          page: page,
          limit: 12,
        },
      });
      const listData = (prevList) => {
        const existingIds = new Set(prevList.map(item => item.id));
        const newData = response.data.filter(item => !existingIds.has(item.id));
        return [...prevList, ...newData];
      };
      setProductList(listData);
      const newBrands = new Set(response.data.map(item => item.brand));
      setBrandsList(prevBrandList => new Set([...prevBrandList, ...newBrands]));
      const newModels = new Set(response.data.map(item => item.model));
      setModelsList(prevModelList => new Set([...prevModelList, ...newModels]));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [page]);
  useEffect(() => {
    if (!loading) {
      if (searchedText && searchedText.length > 0) {
        const filteredList = productList.filter((item) =>
          item.name.toLowerCase().includes(searchedText.toLowerCase())
        );
        setFilteredList(filteredList)
      }
    }
  }, [searchedText, page]);
  const handleLoadMore = () => {
    setPage(page + 1);
  };
  const primaryFilters = () => {
    let listToFilter;
    if (searchedText) {
      listToFilter = filteredList

    } else {
      listToFilter = productList
    }
    switch (radioFilter) {
      case '0':
        const sortedListOldToNew = [...listToFilter].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        return sortedListOldToNew
        break;
      case '1':
        const sortedListNewToOld = [...listToFilter].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        return sortedListNewToOld
        break;
      case '2':
        const sortedListPriceHighToLow = [...listToFilter].sort(
          (a, b) => b.price - a.price
        );

        return sortedListPriceHighToLow
        break;
      case '3':
        const sortedListPriceLowToHigh = [...listToFilter].sort(
          (a, b) => a.price - b.price
        );
        return sortedListPriceLowToHigh
        break;
      default:
        return listToFilter
        break;
    }
  };
  const primaryClick = () => {
    let filteredBrandProducts = []
    let filteredModelProducts = []
    if (checkedBrandItems) {
      filteredBrandProducts = productList.filter(
        (product) => checkedBrandItems[product.brand]
      );
    }
    if (checkedModelItems) {
      filteredModelProducts = productList.filter(
        (product) => checkedModelItems[product.model]
      );
    }
    let filteredProducts = [...filteredBrandProducts, ...filteredModelProducts]
    if (filteredProducts.length == 0) {
      setProductList([])
      if (page == 1) {
        setLoading(true)
        fetchData()
      } else {
        setPage(1)
      }

    } else {
      setProductList([...filteredBrandProducts, ...filteredModelProducts])
    }
    setModalVisible(!modalVisible)
  }
  const handleBrandCheckboxChange = (item) => {
    setCheckedBrandItems((prevCheckedItems) => {
      const newCheckedItems = { ...prevCheckedItems };
      if (newCheckedItems[item]) {
        delete newCheckedItems[item];
      } else {
        newCheckedItems[item] = true;
      }
      return newCheckedItems;
    });
  };
  const handleModelCheckboxChange = (item) => {
    setCheckedModelItems((prevCheckedItems) => {
      const newCheckedItems = { ...prevCheckedItems };
      if (newCheckedItems[item]) {
        delete newCheckedItems[item];
      } else {
        newCheckedItems[item] = true;
      }
      return newCheckedItems;
    });
  };
  const refhreshPage = () => {
    setLoading(true)
    fetchData()
  }
  const searchCheckboxFilter = (list, searchText) => {
    if (searchText && searchText.length > 0) {
      const filteredList = list.filter((item) =>
        item.toLowerCase().includes(searchText.toLowerCase())
      );
      return filteredList
    } else {
      return list
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Filter</Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setRadioFilter}
              selectedId={radioFilter}
              containerStyle={{ alignItems: 'flex-start', marginBottom: 10, borderBottomWidth: 1 }}
            />
            <TextInput
              testID='search_input'
              style={[styles.input, { marginHorizontal: 0 }]}
              onChangeText={setSearchedBrandText}
              value={searchedBrandText}
              placeholder='Search'
            />
            <FlatList
              data={searchCheckboxFilter(Array.from(brandsList), searchedBrandText)}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', marginVertical: 5, height: 40 }}>
                  <CheckBox
                    disabled={false}
                    value={checkedBrandItems[item]}
                    boxType='square'
                    onValueChange={() => handleBrandCheckboxChange(item)}
                    style={{ width: 20, height: 20, alignSelf: 'center' }}
                  />
                  <Text style={{ marginLeft: 10 }}>{item}</Text>
                </View>
              )}
              keyExtractor={(item) => item.toString()}
              style={{ height: 150, marginBottom: 10, borderBottomWidth: 1 }}
            />
            <TextInput
              testID='search_input'
              style={[styles.input, { marginHorizontal: 0 }]}
              onChangeText={setSearchedModelText}
              value={searchedModelText}
              placeholder='Search'
            />
            <FlatList
              data={searchCheckboxFilter(Array.from(modelsList), searchedModelText)}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', marginVertical: 5, height: 40 }}>
                  <CheckBox
                    disabled={false}
                    value={checkedModelItems[item]}
                    boxType='square'
                    onValueChange={() => handleModelCheckboxChange(item)}
                    style={{ width: 20, height: 20, alignSelf: 'center' }}
                  />
                  <Text style={{ marginLeft: 10 }}>{item}</Text>
                </View>
              )}
              keyExtractor={(item) => item.toString()}
              style={{ height: 150, marginBottom: 10, borderBottomWidth: 1 }}
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => primaryClick()}>
              <Text style={styles.textStyle}>Primart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {productList.length > 0 ?
        <View>
          <TextInput
            testID='search_input'
            style={styles.input}
            onChangeText={setSearchedText}
            value={searchedText}
            placeholder='Search'
          />
          <View style={styles.filtersContainer}>
            <Text style={styles.filtersTitle}>Filters:</Text>
            <TouchableOpacity style={styles.filtersBtn} onPress={() => setModalVisible(true)}>
              <Text testID='select_filter' style={{ textAlign: 'center' }}>Select Filter</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={primaryFilters()}
            renderItem={({ item }) => <ProductCard productItem={item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            onScrollEndDrag={handleLoadMore}
            ListFooterComponent={loading && <ActivityIndicator size="large" color="royalblue" />}
          />
        </View> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          {loading == false ? <TouchableOpacity testID='refresh_btn' onPress={() => refhreshPage()}>
            <Text>
              Refresh
            </Text>
          </TouchableOpacity> : <ActivityIndicator size="large" color="royalblue" />}
        </View>}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: 'gainsboro'
  },
  filtersContainer: {
    flexDirection: 'row',
    margin: 12,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersBtn: {
    flex: 1,
    marginLeft: 20,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gainsboro'
  },
  filtersTitle: {
    flex: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 10
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

});
export default HomeScreen;
