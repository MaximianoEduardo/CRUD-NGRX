import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Book } from "./book";

export const selectorBooks = createFeatureSelector<Book[]>('mybooks');

export const selectorBookById = (bookId: number) => {

    return createSelector(
        selectorBooks,
        (books: Book[]) => {
            var bookById = books.filter( _ => _.id == bookId);
            if(bookById.length === 0){
                return null;
            }

            return bookById[0];
        });

};