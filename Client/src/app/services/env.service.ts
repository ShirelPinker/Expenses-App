import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {EnvironmentRes} from "../models/EnvironmentRes";

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  constructor(private http: HttpClient) { }

  getEnvironment(): Observable<EnvironmentRes> {
    return this.http.get<EnvironmentRes>(`http://localhost:3001/env`)
  }
}
