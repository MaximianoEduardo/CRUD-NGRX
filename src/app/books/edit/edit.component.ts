import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { Book } from '../store/book';
import { updateBook } from '../store/books.action';
import { selectorBookById } from '../store/books.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private store:Store,
    private route:ActivatedRoute,
    private router:Router,
  ) { }

  bookForm: Book = {
    id: 0,
    title: '',
    author: '',
    value: 100
  }


  ngOnInit(): void {
    let fetchFromData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        var id = Number(params.get('id'));
        return this.store.pipe(select(
          selectorBookById(id)
        ));
      })
    );
    

    fetchFromData$.subscribe((data) => {
      if( data ){
        this.bookForm = {
          ...data
        }
      } else {
        this.router.navigate(['/']);
      }
    })

  }

  update(){
    this.store.dispatch(updateBook({updateBook: {...this.bookForm} }));
    this.router.navigate(['/']);
  }

}
