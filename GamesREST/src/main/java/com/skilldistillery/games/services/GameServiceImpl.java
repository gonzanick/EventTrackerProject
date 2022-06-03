package com.skilldistillery.games.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.games.entities.Game;
import com.skilldistillery.games.repositories.GameRepository;

@Service
public class GameServiceImpl implements GameService{
	
	@Autowired
	private GameRepository gamerepo;

	@Override
	public List<Game> index() {
		return gamerepo.findAll();
	}

}
