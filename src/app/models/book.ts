export class Book {
  public photo: string;

  constructor(
    public title: string,
    public author: string,
    public synopsis: string
  ){
    this.photo = '';
  }
}
