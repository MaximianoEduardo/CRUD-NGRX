import { createReducer, on } from "@ngrx/store";
import { Book } from "./book";
import { booksCallSucess, deleteBookAPISucess, saveBookAPISucess, updateBookAPISucess } from "./books.action";

export const initialState: ReadonlyArray<Book> = [];

export const bookReducer = createReducer(
    initialState,
    on(
        booksCallSucess, (state, { allBooks }) =>{
            return allBooks;
        }
    ),
    on(
        saveBookAPISucess, (state, { response }) => {

            let newState = [...state];

            newState.unshift(response);

            return newState;
        }
    ),
    on(updateBookAPISucess, (state, {response}) => {
        let newState = state.filter((_)=> _.id != response.id);

        newState.unshift(response);
        return newState;
    }),
    on(deleteBookAPISucess, (state, {id}) => {

        let newState = state.filter( (_) => _.id != id);

        return newState;
    })
)