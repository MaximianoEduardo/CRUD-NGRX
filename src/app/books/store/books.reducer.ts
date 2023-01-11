import { createReducer, on } from "@ngrx/store";
import { Book } from "./book";
import { booksCallSucess, deleteBookSucess, newBookSucess, updateBookSucess, } from "./books.action";

export const initialState: ReadonlyArray<Book> = [];

export const bookReducer = createReducer(
    initialState,
    on(
        booksCallSucess, (state, { allBooks }) =>{
            return allBooks;
        }
    ),
    on(
        newBookSucess, (state, { response }) => {

            let newState = [...state];

            newState.unshift(response);

            return newState;
        }
    ),
    on(updateBookSucess, (state, {response}) => {
        let newState = state.filter((_)=> _.id != response.id);

        newState.unshift(response);
        return newState;
    }),
    on(deleteBookSucess, (state, {id}) => {

        let newState = state.filter( (_) => _.id != id);

        return newState;
    })
)