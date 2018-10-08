import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { NewsfeedItem } from './newsfeed-item';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AppService {

	private newsfeedItemsUrl = 'http://localhost:3000/api/newsfeed'
	private newsfeedItemsUrlPost = 'http://localhost:3000/api/newsfeedItem'

	getNewsfeedItems(): Observable<NewsfeedItem[]> {
		return this.http.get<NewsfeedItem[]>(this.newsfeedItemsUrl);
	}

	addNewsfeedItem(newsfeedItem: NewsfeedItem): Observable<NewsfeedItem>{
  		return this.http.post<NewsfeedItem>(this.newsfeedItemsUrlPost, newsfeedItem, httpOptions).pipe(
  			catchError(this.handleError<NewsfeedItem>('addNewsfeedItem'))
  		);
  	}

	constructor(private http: HttpClient) { }

	 private handleError<T> (operation = 'operation', result?: T) {
	    return (error: any): Observable<T> => {
	 
	      // TODO: send the error to remote logging infrastructure
	      console.error(error); // log to console instead

	 
	      // Let the app keep running by returning an empty result.
	      return of(result as T);
	    };
  	}
 
}
