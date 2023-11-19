import { createSlice } from "@reduxjs/toolkit";
import { TaskModel } from "../models/task.model";

const initialState: { tasks: TaskModel[], completed: TaskModel[] } =
{
    tasks: [
        
    ],
    completed: []
};
const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, { payload }: { payload: TaskModel }) => {
            state.tasks.push(payload)
            console.log(payload);
        },
        completeTask: (state, { payload }: { payload: TaskModel }) => {
            state.tasks = state.tasks.filter(element => element.id != payload.id);
            state.completed.push(payload)
            console.log(payload);
        },
        moveBack: (state, { payload }: { payload: TaskModel }) => {
            state.completed = state.completed.filter(element => element.id != payload.id);
            state.tasks.push(payload)
            console.log(payload);
        },
        deleteTask: (state, { payload }: { payload: TaskModel }) => {
            const index = state.tasks.findIndex(element => element.id === payload.id);
            if(index != -1){
                state.tasks = state.tasks.filter(element => element.id != payload.id)
                return
            }
            state.completed = state.completed.filter(element => element.id != payload.id)
            
        },
        updateTask: (state, {payload}: {payload: TaskModel}) => {
            let index = state.tasks.findIndex(task => task.id === payload.id)
            if(index === -1){
                index = state.completed.findIndex(task => task.id === payload.id)
                if(index === -1)
                {
                    console.error('update task error: task was not found')
                    return
                }
                state.completed[index] = payload
                return
            }
            state.tasks[index] = payload
        }
    }
})

export const { addTask, completeTask, moveBack, deleteTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;