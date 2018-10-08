import { Component } from '@angular/core';
import { AppService } from './app.service';
import { NewsfeedItem } from './newsfeed-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'newsfeedApp';

  newsfeedItems: NewsfeedItem[] = [];

  constructor(private appService: AppService){}

  newsfeedItem: NewsfeedItem = {
  	text:'',
  	date: ''
  };

  ngOnInit() {
  	this.getNewsfeedItems();
  }

  getNewsfeedItems(): void {
  	this.appService.getNewsfeedItems().subscribe(newsfeedItems => this.newsfeedItems = newsfeedItems);
  }

  addNewsfeedItem(): void{
  	console.log(this.newsfeedItem.text);
  	console.log(this.newsfeedItem.date);
  	if(!this.newsfeedItem) return;
  	this.appService.addNewsfeedItem(this.newsfeedItem)
  		.subscribe(resNewsfeedItem => {
  			this.newsfeedItems.push(resNewsfeedItem);
  		});
  	var sorted = this.newsfeedItems.sort(function(a, b){
  		return b.date > a.date ? 1 : -1;
  	});
  	this.newsfeedItems = sorted;
  	location.reload();
  }
}
