package com.skilldistillery.games.services;

import java.util.List;

import com.skilldistillery.games.entities.Game;

public interface GameService {
	List<Game> index();
	Game createGame(Game name);
	boolean deleteGame(int id);
	Game updateGame(Game game, int id);
	

}
