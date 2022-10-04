import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { EMPTY, map, switchMap, withLatestFrom } from "rxjs";
import { setAPIStatus } from "src/app/shared/store/app.action";
import { Appstate } from "src/app/shared/store/appstate";
import { BooksService } from "../books.service";
import { bookSaveNewAPI, booksCallSucess, callBooksApi, deleteBookAPI, deleteBookAPISucess, saveBookAPISucess, updateBookAPI, updateBookAPISucess } from "./books.action";
import { selectorBooks } from "./books.selector";

@Injectable()
export class BooksEffects {
    constructor(
        private actions$: Actions,
        private bookService: BooksService,
        private appStore: Store<Appstate>,
        private store: Store
    ){}

    loadAllBooks = createEffect(() => 
        this.actions$.pipe(
            ofType(callBooksApi),
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
            ofType(bookSaveNewAPI),
            switchMap( (action) => {

                this.appStore.dispatch(setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } }))

                return this.bookService
                    .create(action.payload)
                    .pipe(
                        map((data) => {

                            this.appStore.dispatch(setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: 'sucess' } }))

                            return saveBookAPISucess({ response: data })
                        })
                    )

            }) 
        )
    );

    updateBook$ = createEffect( () => 
        this.actions$.pipe(
            ofType(updateBookAPI),
            switchMap( (action) => {

                this.appStore.dispatch(setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } }))

                return this.bookService
                    .upload(action.updateBook)
                    .pipe(
                        map((data) => {

                            this.appStore.dispatch(setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: 'sucess' } }))

                            return updateBookAPISucess({ response: data })
                        })
                    )

            }) 
        )
    );


    deleteBook$ = createEffect( () => 
        this.actions$.pipe(
            ofType(deleteBookAPI),
            switchMap( (action) => {

                this.appStore.dispatch(setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } }))

                return this.bookService
                    .delete(action.id)
                    .pipe(
                        map((data) => {

                            this.appStore.dispatch(setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: 'sucess' } }))

                            return deleteBookAPISucess({id: action.id})
                        })
                    )

            }) 
        )
    );
}
