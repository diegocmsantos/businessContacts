import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

import { Business } from './models/Business';
import { Category } from './models/Category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ FirebaseService ]
})
export class AppComponent implements OnInit {
  title = 'app works!';

  businesses: Business[];
  categories: Category[];

  appState: string;
  activeKey: string;

  constructor(private _firebaseService: FirebaseService) {}

  ngOnInit() {
  	this._firebaseService.getBusinesses()
  		.subscribe(businesses => this.businesses = businesses);

  	this._firebaseService.getCategories()
  		.subscribe(categories => this.categories = categories);
  }

  changeState(state, key) {
  	if (key) {
  		this.activeKey = key;
  	}
  	this.appState = state;
  }

  filterCategory(category) {
  	category = category != 0 ? category : null;
  	this._firebaseService.getBusinesses(category)
  		.subscribe(businesses => this.businesses = businesses);
  }

  addBusiness(
  	company:string,
  	category:string,
  	years_in_business:number,
  	description:string,
  	phone:string,
  	email:string,
  	street_adress:string,
  	city:string,
  	state:string,
  	zipcode:string
  ) {

  	const created_at = new Date().toString();

  	const newBusiness = {
  		company: company,
  		category: category,
  		years_in_business: years_in_business,
  		description: description,
  		phone: phone,
  		email: email,
  		street_adress: street_adress,
  		city: city,
  		state: state,
  		zipcode: zipcode,
  		created_at: created_at
  	}

  	this._firebaseService.addBusiness(newBusiness);

  	this.changeState('default');

  }

}
