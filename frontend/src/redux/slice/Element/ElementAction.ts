import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ELEMENT_SLICE_NAME } from './ElementType'
import { AlgoNodeData, NODE_DATA_TYPE } from 'const/NodeData'
import { ThunkApiConfig } from 'redux/store'
import { flowElementsSelector } from './ElementSelector'
import { isInputNodeData, isAlgoNodeData } from 'utils/ElementUtils'
import { algoParamByIdSelector } from '../Algorithm/AlgorithmSelector'

export const clickNode = createAction<{ id: string; type: NODE_DATA_TYPE }>(
  `${ELEMENT_SLICE_NAME}/clickNode`,
)

type OutputPathsDTO = {
  [key: string]: {
    image_dir?: {
      path: string
      max_index: number
    }
    fluo_path?: string
  }
}

export const runPipeline = createAsyncThunk<
  { message: string; outputPaths: OutputPathsDTO },
  void,
  ThunkApiConfig
>(`${ELEMENT_SLICE_NAME}/runPipeline`, async (_, thunkAPI) => {
  const nodeDataListForRun = flowElementsSelector(thunkAPI.getState())
    .filter((element) => isInputNodeData(element) || isAlgoNodeData(element))
    .map((element) => {
      if (element.data && element.data.type === 'algo') {
        const param = algoParamByIdSelector(element.id)(thunkAPI.getState())
        const data: AlgoNodeData = {
          ...element.data,
          param,
        }
        return data
      } else {
        return element.data
      }
    })
  try {
    const response = await axios.post(
      'http://localhost:8000/api/run',
      nodeDataListForRun,
    )
    return response.data
  } catch (e) {
    return thunkAPI.rejectWithValue(e)
  }
})

export const stopPipeline = createAction<void>(
  `${ELEMENT_SLICE_NAME}/stopPipeline`,
)