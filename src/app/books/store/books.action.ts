import { createAction, props } from "@ngrx/store";
import { Book } from "./book";

export const callBooksApi = createAction(
    '[Books API] call books api'
)

export const booksCallSucess = createAction(
    '[Books API] books sucess from API',
    props<{ allBooks: Book[] }>()
)


export const bookSaveNewAPI = createAction(
    '[Books API] create new book',
    props<{ payload: Book}>()
)

export const saveBookAPISucess = createAction(
    '[Books API] new book save Sucess',
    props<{ response: Book}>()
)

export const updateBookAPI = createAction(
    '[Books API] update book',
    props<{ updateBook: Book}>()
)

export const updateBookAPISucess = createAction(
    '[Books API] update book Sucess',
    props<{ response: Book}>()
)

export const deleteBookAPI = createAction(
    '[Books API] delete book',
    props<{ id: number}>()
)

export const deleteBookAPISucess = createAction(
    '[Books API] delete book Sucess',
    props<{ id: number}>()
)
