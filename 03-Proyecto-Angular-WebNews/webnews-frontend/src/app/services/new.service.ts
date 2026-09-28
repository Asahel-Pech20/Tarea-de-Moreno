import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { New } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NewService {
  private apiUrl = 'http://localhost:3000/api/news';

  constructor(private http: HttpClient) {}

  getNews(): Observable<New[]> {
    return this.http.get<New[]>(this.apiUrl);
  }

  getNew(id: number): Observable<New> {
    return this.http.get<New>(`${this.apiUrl}/${id}`);
  }

  createNews(noticia: Partial<New>): Observable<New> {
    return this.http.post<New>(this.apiUrl, noticia);
  }

  updateNews(id: number, noticia: Partial<New>): Observable<New> {
    return this.http.put<New>(`${this.apiUrl}/${id}`, noticia);
  }

  deleteNews(id: number): Observable<{ success: boolean; mensaje: string }> {
    return this.http.delete<{ success: boolean; mensaje: string }>(`${this.apiUrl}/${id}`);
  }
}
