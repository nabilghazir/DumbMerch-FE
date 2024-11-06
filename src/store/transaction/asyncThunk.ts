import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../libs/api';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { CreateTransactionDTO, TransactionDTO } from '../../entities/transaction-entities';

export const createTransaction = createAsyncThunk(
    'transactions/createTransaction',
    async (transactionData: CreateTransactionDTO, ThunkAPI) => {
        try {
            const response = await api.post('/api/transactions/create', transactionData);
            return response.data as TransactionDTO;
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError && error.response) {
                toast.error(error.response?.data.message);
                return ThunkAPI.rejectWithValue(error.message);
            } else {
                const err = error as Error;
                return ThunkAPI.rejectWithValue(err.message);
            }
        }
    }

);

export const getTransactionById = createAsyncThunk(
    'transactions/getTransactionById',
    async (transactionId: number, ThunkAPI) => {
        try {
            const response = await api.get(`/api/transactions/${transactionId}`);
            return response.data as TransactionDTO;
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError && error.response) {
                toast.error(error.response?.data.message);
                return ThunkAPI.rejectWithValue(error.message);
            } else {
                const err = error as Error;
                return ThunkAPI.rejectWithValue(err.message);
            }
        }

    }
);

export const getAllTransactionsForUser = createAsyncThunk(
    'transactions/getAllTransactionsForUser',
    async (_, ThunkAPI) => {
        try {
            const response = await api.get('/api/transactions/user/all');
            return response.data as TransactionDTO[];
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError && error.response) {
                toast.error(error.response?.data.message);
                return ThunkAPI.rejectWithValue(error.message);
            } else {
                const err = error as Error;
                return ThunkAPI.rejectWithValue(err.message);
            }
        }

    }
);

export const updateTransactionPayment = createAsyncThunk(
    'transactions/updateTransactionPayment',
    async (
        { transactionId, paymentData }: { transactionId: number; paymentData: { paymentMethod: string; paymentUrl: string } },
        ThunkAPI
    ) => {
        try {
            const response = await api.put(`/api/transactions/${transactionId}/payment`, paymentData);
            return response.data;
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError && error.response) {
                toast.error(error.response?.data.message);
                return ThunkAPI.rejectWithValue(error.message);
            } else {
                const err = error as Error;
                return ThunkAPI.rejectWithValue(err.message);
            }
        }
    }
);
