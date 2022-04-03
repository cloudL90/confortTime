import { IBookModel } from "./book.model";

export interface GetBooksRequest {
    user_id: string;
}

export interface GetBookRequest {
    user_id: string;
    book_id: string;
}

export interface UpdateBookRequest {
    user_id: string;
    book_id: string;
    data: IBookModel
}

export interface DeleteBookRequest extends GetBookRequest { }