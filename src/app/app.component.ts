import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
/** TODO: Comment */
export class AppComponent implements OnInit {
  noises: void[] = Array(27);
  scratches: void[] = Array(7);
  isSplash: boolean = true;
  isContent: boolean = false;

  /**
   * @param elementRef
   */
  constructor(private elementRef: ElementRef) {}

  /**
   * @returns Void.
   */
  ngOnInit(): void {
    // TODO: Change getElementsByClassName to ViewChildren
    const noiseElements =
      this.elementRef.nativeElement.getElementsByClassName('noise');
    const scratchElements =
      this.elementRef.nativeElement.getElementsByClassName('scratch');

    setTimeout(() => {
      this.isSplash = false;
    }, 2400);

    setTimeout(() => {
      this.isContent = true;
    }, 1700);

    setInterval(() => {
      for (let noiseElement of noiseElements) {
        const hidden = Math.random() > 0.05;
        if (hidden) {
          noiseElement.style.display = 'none';
        } else {
          noiseElement.style.display = 'block';
          noiseElement.style.top = `${Math.random() * 100}%`;
          noiseElement.style.left = `${Math.random() * 100}%`;
        }
      }

      for (let scratchElement of scratchElements) {
        const hidden = Math.random() > 0.01;
        if (hidden) {
          scratchElement.style.display = 'none';
        } else {
          scratchElement.style.display = 'block';
          scratchElement.style.top = `${Math.random() * 100}%`;
          scratchElement.style.left = `${Math.random() * 100}%`;
        }
      }
    }, 10);
  }
}
