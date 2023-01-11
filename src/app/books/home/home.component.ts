import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { callBooks, deleteBook } from '../store/books.action';
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
  ) { }

  books$ = this.store.pipe(select(selectorBooks));
  deleteModal: any;
  idTodelete: number = 0;

  ngOnInit(): void {

    this.deleteModal = new  bootstrap.Modal(document.getElementById('deleteModel'));
    this.store.dispatch(callBooks());

  }

  confirmDelete(){
    this.store.dispatch(deleteBook({ id : this.idTodelete}));

    this.deleteModal.hide();

  }


  openDeleteModel(id: number){
    this.idTodelete = id;
    this.deleteModal.show();
  }

}
