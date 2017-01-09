import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Business } from '../models/Business';
import { Category } from '../models/Category';

@Injectable()
export class FirebaseService {
	businesses: FirebaseListObservable<Business[]>;
	categories: FirebaseListObservable<Category[]>;

	constructor(private _af: AngularFire) {}

	getBusinesses(category: string = null) {
		if (category != null) {
			this.businesses = this._af.database.list('/businesses', 
				{
					query: {
						orderByChild: 'category',
						equalTo: category
					}
				}
			) as FirebaseListObservable<Business[]>;
		} else {
			this.businesses = this._af.database.list('/businesses') as FirebaseListObservable<Business[]>;
		}
	
		return this.businesses;
	}

	getCategories() {
		this.categories = this._af.database.list('/categories') as FirebaseListObservable<Category[]>;
		return this.categories;
	}

	addBusiness(business) {
		return this.businesses.push(business);
	}

}