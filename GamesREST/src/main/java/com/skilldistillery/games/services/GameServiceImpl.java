package com.skilldistillery.games.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.games.entities.Game;
import com.skilldistillery.games.repositories.GameRepository;

@Service
public class GameServiceImpl implements GameService {

	@Autowired
	private GameRepository gamerepo;

	@Override
	public List<Game> index() {
		return gamerepo.findAll();
	}

	@Override
	public Game createGame(Game game) {
		return gamerepo.saveAndFlush(game);
	}

	@Override
	public void deleteGame(Game game, int id) {
//		Optional<Game> op = gamerepo.findById(id);
		
		gamerepo.deleteById(id);
	}

	@Override
	public Game updateGame(Game game, int id) {
		Game g = gamerepo.save(game);
		return g;
	}

}
