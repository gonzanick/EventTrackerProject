import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class VideoGamesService {

  private url = environment.baseUrl + 'api/games/';
  headers = { headers: new Headers({"Content-Type": "application/json"})};


  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<Game[]> {
    return this.http.get<Game[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error(
              'VideoGamesService.update(): error retrieving games: ' + err
            )
        );
      })
    );
  }

  destroy(id: number): Observable<void> {

    return this.http.delete<void>(this.url + 'delete/' + id).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error(
              'GamesService.delete(): error delete game: ' + err
            )
        );
      })
    );
  }

  create(game: Game): Observable<Game>{
    // game.name = '';
    // game.genre = '';
    // game.rating = '';
    // game.price = 0;
    // game.console = '';
    // game.multiplayer = '';
    return this.http.post<Game>(this.url+ 'create', game).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error(
              'VideoGamesService.create(): error creating games: ' + err
            )
        );
      })
    );
  }

  update(game: Game): Observable<Game> {

    return this.http.put<Game>(this.url + game.id, game).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error(
              'VideoGamesService.update(): error updating games: ' + err
            )
        );
      })
    );;
  }




}
