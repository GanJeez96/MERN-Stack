import { Component } from '@angular/core';

@Component({
  //The selector,templateUrl and styleUrls are type of mete data
  selector: 'app-root',
  templateUrl: './app.component.html',  //the url in which the below descripted component is going to be displayed on
  styleUrls: ['./app.component.css']    //the css file for the below descripted component.
})

//The above mentioned meta data is attached to the below class in a form of decorator
//Below mentioned is a class
export class AppComponent {
  title = 'codeevolution';
}
