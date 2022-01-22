import { Component, Input, OnInit } from '@angular/core';

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

  opacities: any = {
    base: 0.2,
    mid: 0.5,
    top: 1
  }

  constructor() {
    this.top = Math.floor(Math.random() * 5 * window.innerHeight);
    this.left = Math.floor(Math.random() * window.innerWidth);
  }

  ngOnInit(): void {
    this.opacity = this.opacities[this.position]
  }

}
