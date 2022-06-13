package com.skilldistillery.games.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.games.entities.Game;
import com.skilldistillery.games.services.GameService;

@RequestMapping("api")
@RestController
public class GameContoller {
	
	@Autowired
	private GameService gameserv;
	
	@GetMapping("games")
	public List<Game> index(){
	return gameserv.index();
	}
	
	@PostMapping("games/create")
	public Game createGame(@RequestBody Game game, HttpServletResponse res ) {
		Game g = null;
		
		try {
			g = gameserv.createGame(game);
			res.setStatus(201);
			return g;
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return g;
	}
	
	@DeleteMapping("games/delete/{id}")
	public void deleteGame(@PathVariable int id, HttpServletResponse res) {
		try {
			gameserv.deleteGame(id);
			res.setStatus(204);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
	}
	
	@PatchMapping("games/{id}")
	public Game updateGame(@PathVariable int id, @RequestBody Game game, HttpServletResponse res) {
		game = gameserv.updateGame(game, id);
		if(game == null) {
			res.setStatus(404);
		}
		return game;
	}

}
