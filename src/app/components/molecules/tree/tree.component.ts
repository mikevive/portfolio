import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TreeService } from './tree.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  @ViewChild('container', { static: true }) containerRef: ElementRef;
  @ViewChild('sphere', { static: true }) sphereRef: ElementRef;
  @ViewChild('blue', { static: true }) blueRef: ElementRef;
  @ViewChild('red', { static: true }) redRef: ElementRef;
  @ViewChild('green', { static: true }) greenRef: ElementRef;

  @Input() position: string;
  top: number;
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

  private topMax: number;
  private topMin: number;
  private direction: string;

  public lowPolyImg: number;

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
      this.left = Math.floor(Math.random() * parentWidth - 100) + 50;
      isRegister = this.treeService.register(this.top, this.left, this.position)
      this.topMax = this.top + 10
      this.topMin = this.top - 10
    }
    while(!isRegister)

    const blurTranslation = this.blurTranslations[this.position]

    const conatinerElement = this.containerRef.nativeElement;

    conatinerElement.style.top = `${this.top}px`
    conatinerElement.style.left = `${this.left}px`

    this.blueRef.nativeElement.style.transform = `translateX(-${blurTranslation}px) translateY(-${blurTranslation}px)`
    this.redRef.nativeElement.style.transform = `translateX(${blurTranslation}px) translateY(${blurTranslation}px)`
    this.greenRef.nativeElement.style.transform = `translateX(-${blurTranslation}px) translateY(${blurTranslation}px)`

    this.treeService.getMotionBlur().subscribe(motionBlur => {

      const sphereElement = this.sphereRef.nativeElement;

      if(motionBlur > 0) {
        sphereElement.style.bottom = '0';
        sphereElement.style.top = 'auto';
      }
      else if (motionBlur < 0){
        sphereElement.style.top = '0';
        sphereElement.style.bottom = 'auto';
      }
      sphereElement.style.height = `${100 + Math.abs(motionBlur)}px`;

    });

    const interval = Math.floor(Math.random() * 10) + 100

    setInterval(() => {
      const conatinerElement = this.containerRef.nativeElement;
      if(this.direction === 'UP'){
        this.top = this.top + 1
        if(this.top >= this.topMax) this.direction = 'DOWN'
      }
      else{
        this.top = this.top - 1
        if(this.top <= this.topMin) this.direction = 'UP'
      }
      conatinerElement.style.top = `${this.top}px`
    }, interval)

  }

}
