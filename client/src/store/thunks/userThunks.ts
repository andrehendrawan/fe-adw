import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../index';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { page, pageSize, searchTerm, sortField, sortOrder, filterAge } = state.user;
    let url = `https://dummyjson.com/users/search?q=${searchTerm}&limit=${pageSize}&skip=${(page - 1) * pageSize}`;
    
    if (sortField) {
      url += `&sortBy=${sortField}&order=${sortOrder}`;
    }
    
    if (filterAge) {
      url += `&age=${filterAge}`;
    }

    const response = await axios.get(url);
    return response.data;
  }
);