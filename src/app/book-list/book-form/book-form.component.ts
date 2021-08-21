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
  fileIsUploading: boolean = false;
  fileUrl!: any;
  fileUploaded: boolean = false

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

    if(this.fileUrl && this.fileUrl !== ''){
      newBook.photo = this.fileUrl;
    }

    this.booksService.createNewBook(newBook);
    this.router.navigate(['/books']);
  }

  onUploadFile(file: File){
    this.fileIsUploading = true;
    this.booksService.uploadFile(file).then(
      (url: any) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event: Event){
    // @ts-ignore
    this.onUploadFile(event.target.files[0]);
  }

}
