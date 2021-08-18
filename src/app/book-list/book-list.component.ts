import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from "../models/book";
import {Subject, Subscription} from "rxjs";
import {BooksService} from "../services/books.service";
import {Router} from "@angular/router";
import {SubjectSubscription} from "rxjs/internal-compatibility";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[] = [];
  booksSubscription!: Subscription;

  constructor(
    private booksService: BooksService,
    private router: Router) { }

  ngOnInit(): void {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books) => {
        this.books = books;
      }
    );
    this.booksService.emitBooks();
  }

  onNewBook(){
    this.router.navigate(['/books', 'new']);
  }

  onDeleteBook(book: Book){
    this.booksService.removeBook(book);
  }

  onViewBook(id: number){
    this.router.navigate(['/books', 'view', id]);
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
  }

}
