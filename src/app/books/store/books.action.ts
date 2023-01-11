import { createAction, props } from "@ngrx/store";
import { Book } from "./book";

export const callBooks = createAction(
    '[Books] Collection of Books'
)

export const booksCallSucess = createAction(
    '[Books] Collection of Books Sucess',
    props<{ allBooks: Book[] }>()
)

export const booksCallFail = createAction(
    '[Books] Collection of Books Fail',
    props<{ allBooks: Book[] }>()
)


export const newBook = createAction(
    '[Book] Create New Book',
    props<{ payload: Book}>()
)

export const newBookSucess = createAction(
    '[Book] Create New Book Sucess',
    props<{ response: Book}>()
)

export const newBookFail = createAction(
    '[Book] Create New book Fail',
    props<{ response: Book}>()
)

export const updateBook = createAction(
    '[Book] Update Book',
    props<{ updateBook: Book}>()
)

export const updateBookSucess = createAction(
    '[Book] Update Book Sucess',
    props<{ response: Book}>()
)

export const updateBookFail = createAction(
    '[Book] Update Book Sucess',
    props<{ response: Book}>()
)


export const deleteBook = createAction(
    '[Book] Delete book',
    props<{ id: number}>()
)

export const deleteBookSucess = createAction(
    '[Book] Delete book Sucess',
    props<{ id: number}>()
)

export const deleteBookFail = createAction(
    '[Book] Delete book Fail',
    props<{ id: number}>()
)
