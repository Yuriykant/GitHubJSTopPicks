import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRepository } from '@features/repositories/types';

interface InitialState {
  items: IRepository[];
  currentRepoIndex: number | null;
}

const initialState: InitialState = { items: [], currentRepoIndex: null };

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    setRepositories: (state, action: PayloadAction<IRepository[]>) => {
      state.items = action.payload;
    },
    setCurrentRepoIndex: (state, action: PayloadAction<number>) => {
      state.currentRepoIndex = action.payload;
    },
  },
});

export const { setRepositories, setCurrentRepoIndex } = repositoriesSlice.actions;
export default repositoriesSlice.reducer;
