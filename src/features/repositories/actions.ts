import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetchPopularRepositories } from '@app/api';
import { setCurrentRepoIndex, setRepositories } from '@features/repositories/slice';

export const fetchRepositories = createAsyncThunk('api/fetchRepositoires', (_, thunkAPI) => {
  return apiFetchPopularRepositories().then((repositories) => {
    thunkAPI.dispatch(setRepositories(repositories));
    if (repositories.length > 0) {
      thunkAPI.dispatch(setCurrentRepoIndex(0));
    }
  });
});
