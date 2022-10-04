import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { callBooksApi, deleteBookAPI } from '../store/books.action';
import { selectorBooks } from '../store/books.selector';


declare var bootstrap: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
  ) { }

  books$ = this.store.pipe(select(selectorBooks));
  deleteModal: any;
  idTodelete: number = 0;

  ngOnInit(): void {

    this.deleteModal = new  bootstrap.Modal(document.getElementById('deleteModel'))
    this.store.dispatch(callBooksApi())

  }

  confirmDelete(){
    this.store.dispatch(deleteBookAPI({ id : this.idTodelete}));
    let appState$ = this.appStore.pipe(select(selectAppState));

    appState$.subscribe(( data ) => {
      if(data.apiStatus === 'sucess'){
        this.appStore.dispatch(setAPIStatus({ apiStatus: { apiStatus:'', apiResponseMessage: '' }}))
      }
      this.deleteModal.hide();
    });
  }


  openDeleteModel(id: number){
    this.idTodelete = id;
    this.deleteModal.show();
  }

}
