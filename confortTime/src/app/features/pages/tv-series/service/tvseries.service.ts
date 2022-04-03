import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSessionService } from 'src/app/core/userSession/services/user-session.service';
import url from 'src/app/shared/constants/url';
import { DeleteTvSeriesRequest, GetTvSeriesRequest, GetTvSeriesRequests, UpdateTvSeriesRequest } from '../models/tvSeries-request.models';

@Injectable({
  providedIn: 'root'
})
export class TvseriesService {

  constructor(private httpClient: HttpClient,private userSessionService: UserSessionService) { }

  public registerTvSeries(tvSeries: any) {
    return this.httpClient.post<any>(url.apiNerdyAppTvSeries, tvSeries);
  }

  public getAllTvSeries(request: GetTvSeriesRequest) {
    const user_id = this.userSessionService.getUserData()['user_id'];
    return this.httpClient.get<any>(url.apiNerdyAppTvSeries + '/' + user_id);
  }                                                                                          

  public getTvSeries(request: GetTvSeriesRequests) {
    const user_id = this.userSessionService.getUserData()['user_id'];
    return this.httpClient.get(url.apiNerdyAppTvSeries + '/' + user_id + '/' + request.tv_series_id);
  }

  public updateTvSeries(request: UpdateTvSeriesRequest) {
    const user_id = this.userSessionService.getUserData()['user_id'];
    return this.httpClient.put(url.apiNerdyAppTvSeries + '/' + user_id + '/' + request.tv_series_id, request);
  }

  public deletetvSeries(request: DeleteTvSeriesRequest) {
    const user_id = this.userSessionService.getUserData()['user_id'];
    return this.httpClient.delete(url.apiNerdyAppTvSeries + '/' + user_id + '/' + request.tv_series_id);
  }
}
