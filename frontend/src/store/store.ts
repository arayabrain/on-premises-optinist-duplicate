import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit'
import elementReducer from './slice/Element/Element'
import algorithmReducer from './slice/Algorithm/Algorithm'
import uploadImageReducer from './slice/UploadImage/UploadImage'
import plotDataReducer from './slice/PlotData/PlotData'

export const store = configureStore({
  reducer: combineReducers({
    element: elementReducer,
    algorithm: algorithmReducer,
    uploadImage: uploadImageReducer,
    plotData: plotDataReducer,
  }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export type ThunkApiConfig<T = unknown> = {
  state: RootState
  dispatch: AppDispatch
  rejectValue: T
}