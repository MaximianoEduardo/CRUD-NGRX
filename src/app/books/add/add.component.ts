import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Book } from '../store/book';
import { newBook } from '../store/books.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(
    private store: Store,
    private router:Router
  ) { }

  bookForm: Book = {
    id: 0,
    title: '',
    author: '',
    value: 100
  }


  ngOnInit(): void {
  }

  save(){
    this.store.dispatch(newBook({ payload: {...this.bookForm} }));
    this.router.navigate(['/']);

  }

}
