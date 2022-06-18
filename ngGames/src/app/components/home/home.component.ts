import { VideoGamesService } from './../../services/video-games.service';
import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  game: Game[] = [];

  selected: Game | null = null;
  newGame: Game | null = new Game ();
  editGame: Game | null = null;


  constructor(
    private gameSvc: VideoGamesService
  ) { }

  ngOnInit(): void {
    this.reload();

  }

  reload() {
    this.gameSvc.index().subscribe({
      next: (show)=>{
        this.game = show;
      },
      error: (fail)=>{
        console.error('VideoGamesComponent.reload: eroor loading listr');
        console.error(fail);
      }
    })
  }

  displayGame(game: Game): void {
    this.selected = game;
  }

  deleteGame(id: number): void {
    this.gameSvc.destroy(id).subscribe({
      next: () => {
        this.reload();
      },
      error: (kill) => {
        console.error('TodoListComonent: error on kill')
        console.error(kill);
      }
    });

  }

  addGame(game: Game) {
    this.gameSvc.create(game).subscribe({
      next: (todos)=>{
        this.reload();
        this.newGame= new Game();
      },
      error: (fail)=>{
        console.error('ERROR in creating a Game');
        console.error(fail);
      }
    });

  }

  setEditGame(): void {
    this.editGame = Object.assign({}, this.selected);
  }

  updateTodo(game: Game): void {
    this.gameSvc.update(game).subscribe({
      next: (updated) =>{
        this.reload();
        this.editGame = null;
      },
      error: (fail) => {
        console.error('TodoListComponent: error on update');
        console.error(fail);
      }
    });


  }

}
