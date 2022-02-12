import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {

  @ViewChild('moonSubcontainer', { static: true }) moonSubcontainerRef: ElementRef;

  img: string = 'assets/img/logo.png'

  top: number = 0;
  topMax: number = 5;
  topMin: number = -5;
  direction: string = 'UP';

  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      const moonSubcontainer= this.moonSubcontainerRef.nativeElement;
      if(this.direction === 'UP'){
        this.top = this.top + 1
        if(this.top >= this.topMax) this.direction = 'DOWN'
      }
      else{
        this.top = this.top - 1
        if(this.top <= this.topMin) this.direction = 'UP'
      }
      moonSubcontainer.style.top = `${this.top}px`
    }, 200)
  }

}
