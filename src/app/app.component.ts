import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  noises: any[];
  scratches: any[];
  isSplash: boolean = true;
  isContent: boolean = false;

  constructor(public elementRef: ElementRef){ }

  ngOnInit(){
    this.noises = Array(27);
    this.scratches = Array(7);
    // TODO: Change getElementsByClassName to ViewChildren
    const noiseElements= this.elementRef.nativeElement.getElementsByClassName('noise');
    const scratchElements= this.elementRef.nativeElement.getElementsByClassName('scratch');

    setTimeout(() => {
      this.isSplash = false;
    },2400)

    setTimeout(() => {
      this.isContent = true;
    },1700)

    setInterval(() => {
      for (let noiseElement of noiseElements) {
        const hidden = Math.random() > 0.05;
        if(hidden){
          noiseElement.style.display = 'none';
        }
        else{
          noiseElement.style.display = 'block';
          noiseElement.style.top = `${Math.random() * 100}%`
          noiseElement.style.left = `${Math.random() * 100}%`
        }
      }

      for (let scratchElement of scratchElements) {
        const hidden = Math.random() > 0.01;
        if(hidden){
          scratchElement.style.display = 'none';
        }
        else{
          scratchElement.style.display = 'block';
          scratchElement.style.top = `${Math.random() * 100}%`
          scratchElement.style.left = `${Math.random() * 100}%`
        }
      }

    }, 10)
  }
}
