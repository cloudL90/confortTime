export interface IBookModel {
    user_id?: string,
    book_id?: string,
    collection_id?: string,
    description: string,
    title: string,
    id?: number,
    file: {
        name: Book_Field.FILEDATA,
        data: Book_Field.FILEDATA
    },
    author: Author,
    timestamp?: null,
    year: string,
    image_url: string
}

export interface Author {
    name: string,
    lastname: string
}

export enum Book_Field {
    USER_ID = "user_id",
    BOOK_ID = "book_id",
    COLLECTION_ID = "collection_id",
    DESCRIPTION = "description",
    TITLE = 'title',
    FILENAME = "file_name",
    FILEDATA = "file_data",
    AUTHOR_NAME = "author_name",
    AUTHOR_GROUP = "author_group",
    TIMESTAMP = "timestamp",
    YEAR = "year",
    IMAGE_URL = "image_url",
}
