import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { ArticleObject, CommentObject } from './interface/index';
import { JwtTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  urlBase = 'https://reseau.jdedev.fr/api/article';
  httpOptions = {
    headers: new HttpHeaders({
      'content-Type': 'application/json',
      Authorization: 'Bearer' + ' ' + this.tokenService.getToken(),
    }),
  };
  constructor(
    private http: HttpClient,
    private tokenService: JwtTokenService
  ) {}

  getAllArticle(): Observable<Array<ArticleObject>> {
    const token = this.tokenService.getToken();

    return this.http
      .get<Array<ArticleObject>>(this.urlBase, this.httpOptions)
      .pipe(tap((allArticle: Array<ArticleObject>) => allArticle));
  }
  getOneArticle(id: string): Observable<ArticleObject> {
    return this.http
      .get<ArticleObject>(`${this.urlBase}/${id}`, this.httpOptions)
      .pipe(tap((article: ArticleObject) => article));
  }

  postOne(contenu: string, titre: string): Observable<ArticleObject> {
    return this.http
      .post<ArticleObject>(this.urlBase, { titre, contenu }, this.httpOptions)
      .pipe(tap((article: ArticleObject) => article));
  }
  postComment(id_article: number, contenu: string): Observable<CommentObject> {
    return this.http
      .post<CommentObject>(
        `https://reseau.jdedev.fr/api/comment`,
        { idArt: id_article, contenu },
        this.httpOptions
      )
      .pipe(tap((comment: CommentObject) => comment));
  }
  updateOne(
    id: number,
    contenu: string,
    titre: string
  ): Observable<ArticleObject> {
    return this.http
      .put<ArticleObject>(
        `${this.urlBase}/${id}`,
        { titre, contenu },
        this.httpOptions
      )
      .pipe(tap((article: ArticleObject) => article));
  }
  private handleErrors(error: HttpErrorResponse) {}
  getAllcomments(id: string): Observable<Array<CommentObject>> {
    return this.http
      .get<Array<CommentObject>>(
        `${this.urlBase}/${id}/comment`,
        this.httpOptions
      )
      .pipe(tap((allArticle: Array<CommentObject>) => allArticle));
  }
}
