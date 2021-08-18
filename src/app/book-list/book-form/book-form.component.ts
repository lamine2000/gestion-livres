import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BooksService} from "../../services/books.service";
import {Router} from "@angular/router";
import {Book} from "../../models/book";

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  bookForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private booksService: BooksService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      synopsis: ''
    });
  }

  onSaveBook() {
    // @ts-ignore
    const title = this.bookForm.get('title').value;
    // @ts-ignore
    const author = this.bookForm.get('author').value;
    // @ts-ignore
    const synopsis = this.bookForm.get('synopsis').value;
    // @ts-ignore
    const newBook = new Book(title, author, synopsis);
    this.booksService.createNewBook(newBook);
    this.router.navigate(['/books']);
  }

}
