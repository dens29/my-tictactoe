import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SquareComponent } from './components/square/square.component';
import { BoardComponent } from './components/board/board.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayerOptions } from './components/playerOptions/playerOptions.component';
import { SharedService } from './components/shared.service';
import { RouterModule} from '@angular/router';
//import { HttpModule } from '@angular/http';
import { SinglePlayer } from './components/singlePlayer/singlePlayer.component';
import { GameService } from './components/game.service';


@NgModule({
  declarations: [
    AppComponent,
    SquareComponent,
    BoardComponent,
    PlayerOptions,
    SinglePlayer
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    SharedService,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
