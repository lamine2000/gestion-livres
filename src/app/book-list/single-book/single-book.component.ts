import {Component, OnInit} from '@angular/core';
import {Book} from "../../models/book";
import {BooksService} from "../../services/books.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-single',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {

  book!: Book;
  constructor(
    private booksService: BooksService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.book = new Book('', '', '');
    const id = this.route.snapshot.params['id'];
    this.booksService.getSingleBook(+id).then(
      (retrievedBook: Book) => {
        this.book = retrievedBook;
      }
    );
  }

  onBack(): void {
    this.router.navigate(['/books']);
  }

}
