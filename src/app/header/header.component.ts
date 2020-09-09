import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Output() linkClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onClickLink(link: string) {
    this.linkClicked.emit(link);
  }

}
