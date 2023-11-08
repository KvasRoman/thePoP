import { createSlice } from "@reduxjs/toolkit";
import { useAppDispatch } from "./hooks";
import { addTask } from "./task.reducer";
import { TaskModel } from "../models/task.model";

const initialState: TaskModel[] = [];
const completedTaskSlice = createSlice({
    name: 'completedTasks',
    initialState,
    reducers:{
        deleteCompletedTask: (state, {payload}: {payload: TaskModel}) => {
            state = state.filter(element => element.id != payload.id)
        },
        addCompletedTask: (state, { payload }: { payload: TaskModel }) => {
            state.push(payload)
            console.log(payload);
        },
    }
})
export const {addCompletedTask, deleteCompletedTask} = completedTaskSlice.actions;
export default completedTaskSlice.reducer;