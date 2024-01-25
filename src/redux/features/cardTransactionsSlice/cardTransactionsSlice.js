import { createSlice } from "@reduxjs/toolkit";
import { setLocalStorageData, getLocalStorageData } from "../../../publics/storageTransactions";
import { LOCAL_STORAGES } from "../../../publics/publicObject";
const initialState = {
  basketList: [],
  basketCounter: 0,
  totalPrice: 0,
}
export const cardTransactionsSlice = createSlice({
  name: "cardTransactions",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.basketList.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.basketList = [...state.basketList, { ...action.payload, count: 1 }];
      }
      state.basketCounter += 1;
      state.totalPrice += parseFloat(action.payload.price);
      setLocalStorageData(LOCAL_STORAGES.basketList, state)
    },
    removeItem: (state, action) => {
      const indexToRemove = state.basketList.findIndex(item => item.id === action.payload.id);
      if (indexToRemove !== -1) {
        state.basketList[indexToRemove].count -= 1;
        if (state.basketList[indexToRemove].count === 0) {
          state.basketList.splice(indexToRemove, 1);
        }
        state.basketCounter -= 1;
        state.totalPrice -= parseFloat(action.payload.price);
      }
      setLocalStorageData(LOCAL_STORAGES.basketList, state)
    },
    getStorageCardData: (state, action) => {
      if (action.payload) {
        return action.payload
      }
    },
    complateBasket: (state) => {
      setLocalStorageData(LOCAL_STORAGES.basketList, initialState)
      return initialState
    },
  }
})

export const { addItem, removeItem, getStorageCardData, complateBasket } = cardTransactionsSlice.actions
export default cardTransactionsSlice.reducer