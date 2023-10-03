import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  text: string = "";
  constructor(){}
  ngOnInit(): void {}
  ifempty(){
    if(this.text == ""){
      this.text = "aaaaaaaa";
    }else{
      this.text = "bbbbbbbb";
    }
  }
}
