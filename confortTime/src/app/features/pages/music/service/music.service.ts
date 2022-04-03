import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSessionService } from 'src/app/core/userSession/services/user-session.service';
import url from 'src/app/shared/constants/url';
import { DeleteMusicRequest, GetMusicRequest, UpdateMusicRequest } from '../models/music-request.models';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private httpClient: HttpClient,private userSessionService: UserSessionService) { }

  public registerMusic(music: any) {
    return this.httpClient.post<any>(url.apiNerdyAppMusic, music);
  }

  public getMusic(request: GetMusicRequest) {
    const user_id = this.userSessionService.getUserData()['user_id'];
    return this.httpClient.get<any>(url.apiNerdyAppMusic + '/' + user_id);
  }

  public updateMusic(request: UpdateMusicRequest) {
    const user_id = this.userSessionService.getUserData()['user_id'];
    return this.httpClient.put(url.apiNerdyAppMusic + '/' + user_id + '/' + request.music_id, request);
  }

  public deleteMusic(request: DeleteMusicRequest) {
    const user_id = this.userSessionService.getUserData()['user_id'];
    return this.httpClient.delete(url.apiNerdyAppMusic + '/' + user_id + '/' + request.music_id);
  }
}
