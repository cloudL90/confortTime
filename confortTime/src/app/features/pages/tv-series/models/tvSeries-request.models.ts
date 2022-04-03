import { ITvSeriesModel } from "./tvSeries.model";

export interface GetTvSeriesRequest {
    user_id: string;
}

export interface GetTvSeriesRequests {
    user_id: string;
    tv_series_id: string;
}

export interface UpdateTvSeriesRequest {
    user_id: string;
    tv_series_id: string;
    data: ITvSeriesModel
}

export interface DeleteTvSeriesRequest extends GetTvSeriesRequests { }