import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class VideoGamesService {

  private url = environment.baseUrl + 'api/games';


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
    return this.http.delete<void>(this.url + '/' + id).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error(
              'TodoService.delete(): error delete todo: ' + err
            )
        );
      })
    );
  }

  create(game: Game): Observable<Game>{
    game.name = '';
    game.genre = '';
    game.rating = '';
    game.price = 0;
    game.console = '';
    game.multiplayer = '';
    return this.http.post<Game>(this.url, game);
  }

  update(todo: Game): Observable<Game> {

    return this.http.put<Game>(this.url + "/" + Game.id, Game);
  }


}
