import { createSlice } from '@reduxjs/toolkit';
import { TransactionDTO } from '../../entities/transaction-entities';
import { createTransaction, getTransactionById, getTransactionByCartId, getAllTransactionsForUser, updateTransactionPayment } from './asyncThunk';

interface TransactionState {
    transactions: TransactionDTO[];
    currentTransaction: TransactionDTO | null;
    loading: boolean;
    error: string | null;
}

const initialState: TransactionState = {
    transactions: [],
    currentTransaction: null,
    loading: false,
    error: null,
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Create transaction
            .addCase(createTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions.push(action.payload);
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Get transaction by ID
            .addCase(getTransactionById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTransactionById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentTransaction = action.payload;
            })
            .addCase(getTransactionById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Get transaction by Cart ID (new logic)
            .addCase(getTransactionByCartId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTransactionByCartId.fulfilled, (state, action) => {
                state.loading = false;
                state.currentTransaction = action.payload; // Update currentTransaction with the fetched transaction
            })
            .addCase(getTransactionByCartId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Get all transactions for user
            .addCase(getAllTransactionsForUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllTransactionsForUser.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(getAllTransactionsForUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(updateTransactionPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTransactionPayment.fulfilled, (state, action) => {
                state.loading = false;
                if (state.currentTransaction && state.currentTransaction.id === action.meta.arg.transactionId) {
                    state.currentTransaction.payment = action.payload;
                }
            })
            .addCase(updateTransactionPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default transactionSlice.reducer;
