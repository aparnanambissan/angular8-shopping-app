import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDxk58V32m_13AB6YfHiLqu2obNdfrv8Es",
      authDomain: "ng-recipe-book-bcef5.firebaseio.com/"
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
