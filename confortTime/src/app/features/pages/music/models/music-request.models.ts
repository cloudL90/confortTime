import { IMusicModel } from "./music.model";

export interface GetMusicRequest {
    user_id: string;
}

export interface GetMusicRequests {
    user_id: string;
    music_id: string;
}

export interface UpdateMusicRequest {
    user_id: string;
    music_id: string;
    data: IMusicModel;
}

export interface DeleteMusicRequest extends GetMusicRequests { }