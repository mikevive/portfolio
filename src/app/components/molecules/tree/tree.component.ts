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

  constructor(
    public elementRef: ElementRef,
    public treeService: TreeService
  ) { }

  ngOnInit(): void {
    const parentRef = this.elementRef.nativeElement.parentElement;
    const parentWidth: number = parentRef.clientWidth;
    const parentHeight: number = parentRef.clientHeight;
    this.opacity = this.opacities[this.position];
    this.blurOpacity = this.blurOpacities[this.position];

    let isRegister: boolean;

    do{
      let top: number= Math.floor(Math.random() * (parentHeight - 100)) + 50;
      let left: number = Math.floor(Math.random() * parentWidth - 100) + 50;
      isRegister = this.treeService.register(top, left, this.position)
      this.top = top;
      this.left = left;
    }
    while(!isRegister)

    const blurTranslation = this.blurTranslations[this.position]

    this.blueRef.nativeElement.style.transform = `translateX(-${blurTranslation}px) translateY(-${blurTranslation}px)`
    this.redRef.nativeElement.style.transform = `translateX(${blurTranslation}px) translateY(${blurTranslation}px)`
    this.greenRef.nativeElement.style.transform = `translateX(-${blurTranslation}px) translateY(${blurTranslation}px)`

    document.getElementById('parallax-wrapper').addEventListener(
      'scroll',
      () => {

          this.scrollTime = Date.now();

          // TODO: remove document selector
          const scrollTop = document.getElementById('parallax-wrapper').scrollTop;
          const diff = this.scroll - scrollTop
          this.scroll = scrollTop

          const treeElements= this.elementRef.nativeElement.getElementsByClassName('tree')
          for (let treeElement of treeElements) {
            treeElement.style.height = `${100 + Math.abs(diff)}px`;
            if(diff > 0) {
              treeElement.style.top = `${this.top - diff}px`
            };
          }

          setTimeout(() => {
            const currentTime = Date.now();
            const timeDiff = currentTime - this.scrollTime;
            console.log('timeDiff: ', currentTime - this.scrollTime)
            if(timeDiff >= 100){
              const treeElements= this.elementRef.nativeElement.getElementsByClassName('tree')
              for (let treeElement of treeElements) {
                treeElement.style.height = `100px`;
                treeElement.style.top = `${this.top}px`
              }
            }

          }, 100 )
      },
      false
    )
  }

}
