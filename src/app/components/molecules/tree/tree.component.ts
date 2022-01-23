import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  @Input() position: string;
  top: number;
  left: number;
  opacity: number;

  private opacities: any = {
    base: 0.2,
    mid: 0.5,
    top: 1
  }

  constructor(public elementRef: ElementRef) { }

  ngOnInit(): void {
    const parentRef = this.elementRef.nativeElement.parentElement;
    const parentWidth: number = parentRef.clientWidth;
    const parentHeight: number = parentRef.clientHeight;
    this.left = Math.floor(Math.random() * parentWidth);
    this.top = Math.floor(Math.random() * parentHeight);
    this.opacity = this.opacities[this.position];
  }
}
