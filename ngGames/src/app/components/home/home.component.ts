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
  newGame: Game = new Game ();
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
        console.error('VideoGameComonent: error on kill')
        console.error(kill);
      }
    });

  }

  addGame(game: Game) {
    this.gameSvc.create(game).subscribe({
      next: (todos)=>{
        this.newGame= new Game();
        this.reload();
      },
      error: (fail)=>{
        console.error('ERROR in creating a Game');
        console.error(fail);
      }
    });

  }

  setEditGame(game: Game): void {
    this.editGame = Object.assign({}, this.selected);
  }

  updateGame(game: Game): void {
    console.log(game);
    this.gameSvc.update(game).subscribe({
      next: (updated) =>{
        this.reload();
        this.editGame = new Game();
      },
      error: (fail) => {
        console.error('VideoGameComponent: error on update');
        console.error(fail);
      }
    });


  }

  displayTable() {
    this.selected = null;
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    this.game.forEach((g) => {
      totalPrice += g.price;
    });
    return totalPrice;
  }

}
