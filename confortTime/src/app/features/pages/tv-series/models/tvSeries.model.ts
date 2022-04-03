export interface ITvSeriesModel {
    user_id?: string,
    tv_series_id?: string,
    collection_id?: string,
    file: {
        name: string,
        data: string
    },
    author: {
        name: string,
        group: string
    },
    timestamp?: null,
    streaming_provider: {
        name: string,
        year: string
    },
    image_url: string,
    title: string,
    actors: [string],
    season: number,
    episode: number
}

export enum TvSeries_Field {
    USER_ID = "user_id",
    TV_SHOW_ID = "tv_show_id",
    COLLECTION_ID = "collection_id",
    FILENAME = "file_name",
    FILEDATA = "file_data",
    AUTHOR_NAME = "author_name",
    AUTHOR_GROUP = "author_group",
    TIMESTAMP = "timestamp",
    STREAMING_PROVIDER_NAME = "streaming_provider_name",
    STREAMING_PROVIDER_YEAR = "streaming_provider_year",
    IMAGE_URL = "image_url",
    TITLE = "title",
    ACTORS = "actors"
}
