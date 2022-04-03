export interface IMusicModel {
    user_id?: string,
    music_id?: string,
    collection_id?: string,
    title: string;
    id?: number;
    image_url: string;
    description: string;
    file: {
        name: string,
        data: string
    },
    artist: {
        name: string,
        group: string
    },
    timestamp?: null,
    album: {
        name: string,
        year: string
    }
}

export enum Music_Field {
    USER_ID = "user_id",
    MUSIC_ID = "movie_id",
    COLLECTION_ID = "collection_id",
    FILENAME = "file_name",
    FILEDATA = "file_data",
    AUTHOR_NAME = "author_name",
    AUTHOR_GROUP = "author_group",
    TIMESTAMP = "timestamp",
    ALBUM_NAME = "album_name",
    ALBUM_YEAR = "album_year",
}