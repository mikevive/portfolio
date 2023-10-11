import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-highlighted-title',
  templateUrl: './highlighted-title.component.html',
  styleUrls: ['./highlighted-title.component.scss'],
})
export class HighlightedTitleComponent implements OnInit {
  @ViewChild('firstText', { static: true })
  firstTextRef!: ElementRef<HTMLCanvasElement>;

  @ViewChild('firstHighlight', { static: true })
  firstHighlightRef!: ElementRef;

  ngOnInit(): void {
    // TODO: Add highlighted init
  }
}
