import { configureStore } from '@reduxjs/toolkit'
import cardTransactionsSlice from '../features/cardTransactionsSlice/cardTransactionsSlice'
import favTransactionsSlice from '../features/favTransactionsSlice/favTransactionsSlice'
export const store = configureStore({
  reducer: {
    cardTransactions: cardTransactionsSlice,
    favTransactions: favTransactionsSlice
  },
})