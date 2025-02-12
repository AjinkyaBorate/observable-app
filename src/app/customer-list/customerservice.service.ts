import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer.dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerserviceService {
  url: string = "http://localhost:3000/customers"
  constructor(private http: HttpClient) { }

  getCustomerList(): Observable<any>{
    return this.http.get<any>(this.url);
  }
  addCustomer(c:Customer): Observable<any>{
    return this.http.post<any>(this.url,c);
  }
  deleteCustomer(id:number): Observable<any>{
    return this.http.delete<any>(this.url+"/"+id);
  }
  updateCustomer(c:Customer): Observable<any>{
    return this.http.put<any>(this.url+"/"+c.id,c);
  }
}
