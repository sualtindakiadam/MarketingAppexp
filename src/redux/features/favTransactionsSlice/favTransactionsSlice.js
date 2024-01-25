import { createSlice } from "@reduxjs/toolkit";
import { setLocalStorageData } from "../../../publics/storageTransactions";
import { LOCAL_STORAGES } from "../../../publics/publicObject";
const initialState = {
    favList: [],
    favCounter: 0,
}
export const favTransactionsSlice = createSlice({
    name: "favTransactions",
    initialState,
    reducers: {
        changeFavStatus: (state, action) => {
            const existingIndex = state.favList.findIndex(item => item.id === action.payload.id);
            if (existingIndex !== -1) {
                state.favList.splice(existingIndex, 1);
                state.favCounter -= 1;
            } else {
                state.favList = [...state.favList, { ...action.payload }];
                state.favCounter += 1;
            }
            setLocalStorageData(LOCAL_STORAGES.favList, state)
        },
        getStorageFavData: (state, action) => {
            if (action.payload) {
                return action.payload
            }
        }
    }
})

export const { changeFavStatus, getStorageFavData } = favTransactionsSlice.actions
export default favTransactionsSlice.reducer