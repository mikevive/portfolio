import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {

  img: string = 'assets/img/logo.png'

  constructor() { }

  ngOnInit(): void {
  }

}
