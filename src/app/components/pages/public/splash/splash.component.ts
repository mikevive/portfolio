import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  @ViewChild('splash', { static: true }) splashRef: ElementRef;
  @ViewChild('background', { static: true }) backgroundRef: ElementRef;
  @ViewChild('oldTexture', { static: true }) oldTextureRef: ElementRef;

  public brush: number = 1;
  public brushHidden: boolean = false;
  public textHidden: boolean = true;

  constructor() { }

  ngOnInit(): void {

    const brushInterval = setInterval(() => {
      if(this.brush < 5){
        this.brush += 1
      }
      else{
        this.brush = 1
      }
    },100)

    setTimeout(() => {
      this.brushHidden = true;
      setTimeout(() => {
        this.textHidden = false;
        setTimeout(() => {
          this.backgroundRef.nativeElement.style.opacity = '0';
          this.oldTextureRef.nativeElement.style.top = '-100vh';
          this.oldTextureRef.nativeElement.style.opacity = '0';
          setTimeout(() => {
            this.textHidden = true;
          },100)
        },1000)
      },200)
    },500)
  }

}
