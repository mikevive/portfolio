import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('noiseRef', { read: ViewContainerRef }) noiseRef: ViewContainerRef;

  imgs: any[];

  constructor(public elementRef: ElementRef){ }

  ngOnInit(){
    this.imgs = Array(27);
    const noiseElements= this.elementRef.nativeElement.getElementsByClassName('noise')

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
    }, 10)
  }
}
