import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { combineLatest, tap, timer } from 'rxjs';
import { SplashService } from './components/pages/public/splash/splash.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
/** TODO: Comment */
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChildren('loadImg')
  loadImg!: QueryList<ElementRef>;

  noises: void[] = Array(27);
  scratches: void[] = Array(7);
  isLoadingComplete: boolean = false;

  /**
   * @param elementRef
   * @param splashService
   */
  constructor(
    private elementRef: ElementRef,
    public splashService: SplashService
  ) {}

  /**
   * @returns Void.
   */
  ngOnInit(): void {
    // TODO: Change getElementsByClassName to ViewChildren
    const noiseElements =
      this.elementRef.nativeElement.getElementsByClassName('noise');
    const scratchElements =
      this.elementRef.nativeElement.getElementsByClassName('scratch');

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

  ngAfterViewInit(): void {
    const numberOfImagesBeingLoaded = this.loadImg.length;
    this.splashService.addElementsBeingLoaded(numberOfImagesBeingLoaded);

    this.splashService.isLoadingComplete().subscribe(() => {
      setTimeout(() => {
        this.isLoadingComplete = true;
      }, 3400);
    });
  }
}
