import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments.dev';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
 public http = inject(HttpClient)
  constructor() { }
    public sendGetRequest<T>(
    target: string,
    pathParams?: (string | number)[],
    queryParams?: { [key: string]: any }
  ): Observable<T> {
    // Without params
    // this.sendGetRequest<any>('/get-users');
    // With query
    // this.sendGetRequest<any>('/get-users', [], { search: 'Ali' });
    // With path param
    // this.sendGetRequest<any>('/user/details', [123]);
    // With both
    // this.sendGetRequest<any>('/sessions', [123], { start_date: '2024-01-01' });
    let httpParams = new HttpParams();
    if (queryParams) {
      Object.keys(queryParams).forEach(key => {
        const value = queryParams[key];
        if (value !== null && value !== undefined && value !== '') {
          httpParams = httpParams.set(key, value);
        }
      });
    }
    if (pathParams && pathParams.length) {
      const joinedParams = pathParams.map(p => encodeURIComponent(p)).join('/');
      target = `${target}/${joinedParams}`;
    }
    return this.http.get<T>(`${environment.apiUrl}${target}`, { params: httpParams });
  }
/** Post Request **/
public sendPostRequest<T>(
  target: string,
  data: any,
  pathParams?: (string | number)[]
): Observable<T> {
  const cleanedData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== null && value !== '')
  );
  if (pathParams && pathParams.length) {
    const joinedParams = pathParams.map(p => encodeURIComponent(p)).join('/');
    target = `${target}/${joinedParams}`;
  }
  return this.http.post<T>(environment.apiUrl + target, cleanedData, {
    withCredentials: true
  });
}
  /** Put Request **/
  public sendPutRequest(target: string, data: any): Observable<any[]> {
    return this.http.put<any[]>(environment.apiUrl + target, data);
  }
  /** Delete Request **/
  public sendDeleteRequest<T>(target: string, id: any): Observable<T> {
    return this.http.delete<T>(`${environment.apiUrl}${target}/${id}`);
  }
}
