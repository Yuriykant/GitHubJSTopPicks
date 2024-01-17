import { configureStore, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import repositories from '@features/repositories/slice';

export const store = configureStore({
  reducer: {
    repositories: repositories,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type AppAction<R> = ThunkAction<R, RootState, unknown, PayloadAction>;
