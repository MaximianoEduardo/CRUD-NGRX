export interface Book {
    id:     number;
    title:  string;
    author: string;
    value:  number;
}

export interface BookState{
    books: Book[],
}