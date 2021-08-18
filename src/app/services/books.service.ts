import { Injectable } from '@angular/core';
import {Book} from "../models/book";
import {Subject} from "rxjs";
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  booksSubject : Subject<Book[]> = new Subject<Book[]>();

  constructor() { this.getBooks(); }

  emitBooks(){
    this.booksSubject.next(this.books.slice());
  }

  saveBooks(){
    firebase.default.database().ref('/books').set(this.books);
  }

  getBooks(){
    firebase.default.database().ref('/books').on(
      'value',
      (data) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      }
    );
  }

  getSingleBook(id: number){
    return new Promise<Book>(
      (resolve, reject) => {
        firebase.default.database().ref('/books/'+id).once('value').then(
          (data) => {resolve(data.val());},
          (error) => {reject(error);}
        );
      }
    );
  }

  createNewBook(book: Book){
    this.books.push(book);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book){
    const bookIndexToRemove = this.books.indexOf(book);
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }
}
