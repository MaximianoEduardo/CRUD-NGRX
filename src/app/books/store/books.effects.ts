import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { EMPTY, map, switchMap, withLatestFrom } from "rxjs";
import { BooksService } from "../books.service";
import { newBook, booksCallSucess, newBookSucess, callBooks, updateBook, updateBookSucess, deleteBook, deleteBookSucess } from "./books.action";
import { selectorBooks } from "./books.selector";

@Injectable()
export class BooksEffects {
    constructor(
        private actions$: Actions,
        private bookService: BooksService,
        private store: Store
    ){}

   
    loadAllBooks = createEffect(() => 
        this.actions$.pipe(
            ofType(callBooks),
            withLatestFrom(
                this.store.pipe(select(selectorBooks))
            ),
            switchMap(( [, booksFromStore] ) => {
                if(booksFromStore.length > 0){
                    return EMPTY;
                }
                return this.bookService
                    .get()
                    .pipe(
                        map((data) => booksCallSucess({ allBooks: data }))
                    )
            })
        )
    );

    saveNewBook$ = createEffect( () => 
        this.actions$.pipe(
            ofType(newBook),
            switchMap( (action) => {

                return this.bookService
                    .create(action.payload)
                    .pipe(
                        map((data) => {

                            return newBookSucess({ response: data })
                        })
                    )

            }) 
        )
    );

    updateBook$ = createEffect( () => 
        this.actions$.pipe(
            ofType(updateBook),
            switchMap( (action) => {

                return this.bookService
                    .upload(action.updateBook)
                    .pipe(
                        map((data) => {

                            return updateBookSucess({ response: data })
                        })
                    )

            }) 
        )
    );


    deleteBook$ = createEffect( () => 
        this.actions$.pipe(
            ofType(deleteBook),
            switchMap( (action) => {


                return this.bookService
                    .delete(action.id)
                    .pipe(
                        map((data) => {

                            return deleteBookSucess({id: action.id})
                        })
                    )

            }) 
        )
    );
}
