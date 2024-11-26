import {RematchDispatch, RematchRootState, init} from '@rematch/core';
import {RootModel, models} from './models';

const store = init({
  models,
});

// const getState = store.getState;
// export {getState};
export default store;
export type IDispatch = RematchDispatch<RootModel>;
export type IStore = RematchRootState<RootModel>;
