import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animate-list',
  templateUrl: './animate-list.page.html',
  styleUrls: ['./animate-list.page.scss'],
})
export class AnimateListPage implements OnInit {

  public messages;

  constructor(){

    this.messages = new Array(100).fill({title: 'Hello'});

  }

  ngOnInit() {
  }

}
