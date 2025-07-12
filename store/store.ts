import { configureStore} from "@reduxjs/toolkit"
import NoteReducer from "./handler"

export const makeStore = () => configureStore({
    reducer:{
        note:NoteReducer
    }
})

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']