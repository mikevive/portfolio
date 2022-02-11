import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TreeService } from './tree.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  @ViewChild('blue', { static: true }) blueRef: ElementRef;
  @ViewChild('red', { static: true }) redRef: ElementRef;
  @ViewChild('green', { static: true }) greenRef: ElementRef;

  @Input() position: string;
  top: number;
  bottom: number;
  left: number;
  opacity: number;
  blurOpacity: number;

  scroll: number = 0;
  scrollTime: any;

  private opacities: any = {
    base: 0.2,
    mid: 0.5,
    top: 0.8
  }

  private blurOpacities: any = {
    base: 0.1,
    mid: 0.2,
    top: 0.3
  }

  private blurTranslations: any = {
    base: 6,
    mid: 4,
    top: 2
  }

  private max: number;
  private min: number;
  private direction: string;

  public lowPolyImg

  private isScrolling: boolean = false;

  constructor(
    public elementRef: ElementRef,
    public treeService: TreeService
  ) {
    this.lowPolyImg = Math.floor(Math.random() * 5) + 1;
    this.direction = Math.random() > 0.5? 'UP':'DOWN';
  }

  ngOnInit(): void {
    const parentRef = this.elementRef.nativeElement.parentElement;
    const parentWidth: number = parentRef.clientWidth;
    const parentHeight: number = parentRef.clientHeight;
    this.opacity = this.opacities[this.position];
    this.blurOpacity = this.blurOpacities[this.position];

    let isRegister: boolean;

    do{
      this.top = Math.floor(Math.random() * (parentHeight - 100)) + 50;
      this.bottom = parentHeight - this.top - 100;
      this.left = Math.floor(Math.random() * parentWidth - 100) + 50;
      isRegister = this.treeService.register(this.top, this.left, this.position)
      this.max = this.top + 10
      this.min = this.top - 10
    }
    while(!isRegister)

    const blurTranslation = this.blurTranslations[this.position]

    this.blueRef.nativeElement.style.transform = `translateX(-${blurTranslation}px) translateY(-${blurTranslation}px)`
    this.redRef.nativeElement.style.transform = `translateX(${blurTranslation}px) translateY(${blurTranslation}px)`
    this.greenRef.nativeElement.style.transform = `translateX(-${blurTranslation}px) translateY(${blurTranslation}px)`

    this.treeService.getMotionBlur().subscribe(motionBlur => {

      this.isScrolling = motionBlur !== 0;

      // TODO: Change getElementsByClassName to ViewChildren
      const treeElements= this.elementRef.nativeElement.getElementsByClassName('sphere');
      for (let treeElement of treeElements) {
        if(motionBlur >= 0) {
          treeElement.style.bottom = `${this.bottom}px`;
          treeElement.style.top = `auto`;
        }
        else{
          treeElement.style.top = `${this.top}px`;
          treeElement.style.bottom = `auto`;
        }
        treeElement.style.height = `${100 + Math.abs(motionBlur)}px`;
      }
    });

    const interval = Math.floor(Math.random() * 10) + 100

    setInterval(() => {
      if(!this.isScrolling){
        if(this.direction === 'UP'){
          this.top = this.top + 1
          if(this.top >= this.max) this.direction = 'DOWN'
        }
        else{
          this.top = this.top - 1
          if(this.top <= this.min) this.direction = 'UP'
        }
      }
    }, interval)

  }

}
