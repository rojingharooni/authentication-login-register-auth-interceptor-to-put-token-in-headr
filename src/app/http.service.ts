import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class httpService {
  isSuccessfull= false;

  constructor(private http: HttpClient) { }
  // sends an HTTP request,
  //and returns an Observable that emits the requested data when the response is received.


  public get<T>(url: string): Observable<T> {//The get() method takes two arguments; the endpoint URL from which to fetch, and an options object that you can use to configure the request.
    return this.http.get<T>(url);//datayi k AZ URL DARI MIGIRI JENSESH T HAST
  }



  public post<T>(url: string, bodycontent: any): Observable<T> { //t jens datayie ke dare post barmigardoone az server
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<T>(url, bodycontent, { headers: headers });

     //post yek url ba yek conttent vorodi migire va posteshon mikone
     //sepas return mikone yek observable az jens t masalan response is ok
  }





  public postAsync<T>(url: string, bodycontent: any): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

     this.http.post<any>(url, bodycontent, { headers: headers }).subscribe(res=>{console.log('post async:'+JSON.stringify(res)); this.isSuccessfull = res.successfuly;
      localStorage.setItem('token', JSON.stringify(res.token)) }  )
  }











  public postdatatobackProgress(url: string, bodycontent: any,options:any): Observable<any> {
      return this.http.post(url, bodycontent, options);
  }



  public putdatatoback<T>(url: string, bodycontent: any): Observable<T> {
    return this.http.put<T>(url, bodycontent);
  }



  public deletebackdata<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
