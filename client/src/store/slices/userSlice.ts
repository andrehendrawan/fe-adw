import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers } from '../thunks/userThunks';
import { UserState } from '@/app/types/interface';

const initialState: UserState = {
  users: [],
  total: 0,
  status: 'idle',
  error: null,
  page: 1,
  pageSize: 10,
  searchTerm: '',
  sortField: '',
  sortOrder: 'asc',
  filterAge: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.page = 1;
    },
    setSortField: (state, action: PayloadAction<string>) => {
      state.sortField = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    setFilterAge: (state, action: PayloadAction<string>) => {
      state.filterAge = action.payload;
      state.page = 1;
    },
    resetFilters: (state) => {
      state.sortField = '';
      state.sortOrder = 'asc';
      state.filterAge = '';
      state.searchTerm = '';
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload.users;
        state.total = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const {
  setPage,
  setPageSize,
  setSearchTerm,
  setSortField,
  setSortOrder,
  setFilterAge,
  resetFilters,
} = userSlice.actions;

export default userSlice.reducer;