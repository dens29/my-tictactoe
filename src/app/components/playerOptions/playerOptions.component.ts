import {Component, OnInit} from '@angular/core';
import {FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';
import { SharedService } from '../shared.service';


@Component({
    selector: 'player-options',
    templateUrl: './playerOptions.component.html'

    })

export class PlayerOptions {
   
  nameplayerone;
  nameplayertwo;
  formdata;
  formdatanew;
  loadBoard: boolean = false;
  loadSingleUser: boolean = false;
  twoUsers;
  

  constructor(private _sharedService: SharedService){

  }
  ngOnInit() {
     this.formdata = new FormGroup({
      nameplayerone: new FormControl("", Validators.compose([])),});

        this.formdatanew = new FormGroup({
          nameplayertwo: new FormControl("", Validators.compose([])),});
  }
 
  onClickSubmit(data) {
    this.nameplayerone = data.nameplayerone;
    this._sharedService.firstPlayerName = this.nameplayerone;
  }

  onClickSubmitNew(data) {
    this.nameplayertwo = data.nameplayertwo;
    this._sharedService.secondPlayerName = this.nameplayertwo;
  }

  redirectPage(players: string){

    if(players == "twoUsers"){
      this.loadBoard = true;
    }
  else {
    this.loadSingleUser = true;}
  }
}