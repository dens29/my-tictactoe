
import { Component, ViewChildren, QueryList, Injectable, OnInit } from '@angular/core';
import { SquareComponent } from '../square/square.component';
import { Movement } from '../../models/movement';
import { PlayerOptions } from '../playerOptions/playerOptions.component';
import { GameService } from '../game.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'singlePlayer',
  templateUrl: './singlePlayer.component.html',
  styleUrls: ['./singlePlayer.component.css'],
})

export class SinglePlayer {

  @ViewChildren(SquareComponent) private squares: QueryList<SquareComponent>;
  movementHistory: Movement[] = [];
  currentPlayer: string = '';
  hasGameFinished: boolean = false;
  finishedAsDraw: boolean = false;
  firstPlayer: string;
  secondPlayer: string;
 
  winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  constructor(private _gameservice: GameService,
              private _sharedService: SharedService){
    this.currentPlayer = this._sharedService.firstPlayerName;
    this.firstPlayer = this._sharedService.firstPlayerName;
    this.secondPlayer = 'Computer';
  }
  
  handleSquareClick(squareNumber: number) { 
    const square = this.getSquare(squareNumber);
    this.movementHistory.push({
      player: this.currentPlayer,
      squareNumber: square.squareNumber
    });

    square.text = this.currentPlayer;
    square.enabled = false;
    if (this.hasCurrentPlayerWon()) {
      this.hasGameFinished = true;
      this.disableAllSquares();
    } else if (this.hasDrawHappend()) {
      this.finishedAsDraw = true;
    } else {
      this.currentPlayer = 
      (this.currentPlayer === this._sharedService.firstPlayerName) 
      ? 'Computer': this._sharedService.firstPlayerName;
    }
  }

  restart() {
    this.hasGameFinished = false;
    this.finishedAsDraw = false;
    this.currentPlayer = this._sharedService.firstPlayerName;
    this.movementHistory = [];
    this.squares.forEach((square) => {
      square.text = '';
      square.enabled = true;
    })

  }

  getMovementsFromPlayer(playerName: string) {
    return this.movementHistory.filter((movement) => movement.player === playerName);
  }

  private getSquare(squareNumber: number): SquareComponent {
    return this.squares.find((square) => square.squareNumber == squareNumber);
  }

  private hasCurrentPlayerWon(): boolean {
    const currentPlayerMovements = 
    this.movementHistory.filter((move) => move.player === this.currentPlayer);

    for (let i = 0; i < this.winningCombinations.length; i++) {
      const [a, b, c] = this.winningCombinations[i];
      const matchingMovements = currentPlayerMovements.filter((move) =>
        move.squareNumber === a ||
        move.squareNumber === b ||
        move.squareNumber === c);

      if (matchingMovements.length === 3) {
        return true;
      }
    }

    return false;
  }

  private hasDrawHappend() {
    return this.movementHistory.length === 9;
  }

  private disableAllSquares() {
    this.squares.forEach((square) => {
      square.enabled = false;
    });
  }
}