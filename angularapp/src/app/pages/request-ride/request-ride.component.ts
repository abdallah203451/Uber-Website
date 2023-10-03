import { Component, OnInit } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable, from} from 'rxjs';
import {NgFor, AsyncPipe, Time} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-request-ride',
  templateUrl: './request-ride.component.html',
  styleUrls: ['./request-ride.component.css'],
})
export class RequestRideComponent {
  input1: string = '';
  input2: string = '';
  private baseUrl:string = "https://localhost:7248/api/Place/";
  fromList? :string[];
  toList? :string[];
  submit?: number;
  public driverAccept?: number;
  public arr: any;
  constructor (private http: HttpClient) { 
    this.submit=0;
    this.driverAccept=0;
    this.http.get<string[]> (`${this.baseUrl}from`).subscribe(res =>{
    this.fromList = res as string[];
      }
    );
    this.http.get<string[]> (`${this.baseUrl}to`).subscribe(res =>{
      this.toList = res as string[];
        }
      );
  }
  
  onSubmit() {
    var input1 = document.getElementById("from") as HTMLInputElement;
    var input2 = document.getElementById("to") as HTMLInputElement;
    let queryParams = new HttpParams();
    queryParams = queryParams.append("from",input1.value);
    queryParams = queryParams.append("to",input2.value);
    queryParams = queryParams.append("rideType",0);
    this.http.get<any> (`${this.baseUrl}distance`, {params:queryParams}).subscribe({
      next: (res) => {
        this.arr = res.data as any;
      }
    });

    this.submit = 1;
  }

  //Execute function on keyup
   ff() {
    var input = document.getElementById("from") as HTMLInputElement;
    input?.addEventListener("keyup",(e)=>{
    this.removeElements();
    for (let i of this.fromList!) {
      //convert input to lowercase and compare with each string
      
      if (i.toLowerCase().startsWith(this.input1.toLowerCase()) &&
      this.input1 != ""
      ) {
        //create li element
        let listItem = document.createElement("li");
        //One common class name
        listItem.classList.add("list-items");
        listItem.style.cursor = "pointer";
        listItem.addEventListener('click',function(){
          input.value = i;
          let items = document.querySelectorAll(".list-items");
          items.forEach((item) => {
          item.remove();
        });
        });
        //Display matched part in bold
        let word = "<b>" + i.substr(0,  this.input1.length) + "</b>";
        word += i.substr( this.input1.length);
        //display the value in array
        listItem.innerHTML = word;
        document.querySelector(".list")!.appendChild(listItem);
      }
    }
    });
  }
  
  displayNames(value:string) {
    this.input1 = value;
    this.removeElements();
  }
   removeElements() {
    //clear all the item
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) => {
      item.remove();
    });
  }
  resetFrom(){
    var input = document.getElementById("from") as HTMLInputElement;
    input.value='';
  }

////////////////////////////////////

to() {
  var input = document.getElementById("to") as HTMLInputElement;
  input?.addEventListener("keyup",(e)=>{
  this.removeElementsTo();
  for (let i of this.toList!) {
    //convert input to lowercase and compare with each string
    
    if (i.toLowerCase().startsWith(input.value.toLowerCase()) &&
    input.value != ""
    ) {
      //create li element
      let listItem = document.createElement("li");
      //One common class name
      listItem.classList.add('list-items');
      listItem.style.cursor = "pointer";
      listItem.addEventListener('click',async function onclick1(){
        input.value = i;
        let items = document.querySelectorAll(".list-items");
        items.forEach((item) => {
        item.remove();
      });
      });
      //Display matched part in bold
      let word = "<b>" + i.substr(0,  input.value.length) + "</b>";
      word += i.substr( input.value.length);
      //display the value in array
      listItem.innerHTML = word;
      document.querySelector(".list1")!.appendChild(listItem);
    }
  }
  });
}

displayNamesTo(value:string) {
  var input = document.getElementById("to") as HTMLInputElement;
  input.value = value;
  this.removeElementsTo();
}
 removeElementsTo() {
  //clear all the item
  let items = document.querySelectorAll(".list-items");
  items.forEach((item) => {
    item.remove();
  });
}
  resetTo(){
    var input = document.getElementById("to") as HTMLInputElement;
    input.value='';
  }
}