export class Game {

  id: number;
  name: string | null;
  genre: string | null;
  rating: string | null;
  price: number;
  console: string | null;
  multiplayer: string | null;


constructor(
  id: number = 0,
  name: string | null = '',
  genre: string | null = '',
  rating: string | null = '',
  price: number = 0,
  console: string | null = '',
  multiplayer: string | null = ''
) {
    this.id = id;
    this.name = name;
    this.genre = genre;
    this.rating = rating;
    this.price = price;
    this.console = console;
    this.multiplayer = multiplayer;

}


}
