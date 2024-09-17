import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

export const selectUsers = (state: RootState) => state.user.users;
export const selectUserTotal = (state: RootState) => state.user.total;

export const selectUsersByAge = createSelector(
  [selectUsers, (state, minAge: number) => minAge],
  (users, minAge) => users.filter(user => user.age >= minAge)
);