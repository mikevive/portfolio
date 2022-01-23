import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TreeService } from './tree.service';

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

  constructor(
    public elementRef: ElementRef,
    public treeService: TreeService
    ) { }

  ngOnInit(): void {
    const parentRef = this.elementRef.nativeElement.parentElement;
    const parentWidth: number = parentRef.clientWidth;
    const parentHeight: number = parentRef.clientHeight;
    this.opacity = this.opacities[this.position];

    let isRegister: boolean;

    do{
      let top: number= Math.floor(Math.random() * (parentHeight - 100)) + 50;
      let left: number = Math.floor(Math.random() * parentWidth - 100) + 50;
      isRegister = this.treeService.register(top, left, this.position)
      this.top = top;
      this.left = left;
    }
    while(!isRegister)
  }

}
