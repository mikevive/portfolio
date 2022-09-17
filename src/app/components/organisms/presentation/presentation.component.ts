import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { SplashService } from '../../pages/public/splash/splash.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss'],
})
/** TODO: Comment */
export class PresentationComponent implements OnInit, AfterViewInit {
  @ViewChildren('loadImg')
  loadImg!: QueryList<ElementRef>;

  @ViewChild('moonSubcontainer', { static: true })
  moonSubcontainerRef!: ElementRef;

  img: string = 'assets/img/logo.png';

  top: number = 0;
  topMax: number = 5;
  topMin: number = -5;
  direction: string = 'UP';

  constructor(public splashService: SplashService) {}

  /**
   * @returns Void.
   */
  ngOnInit(): void {
    setInterval(() => {
      const moonSubcontainer = this.moonSubcontainerRef.nativeElement;
      if (this.direction === 'UP') {
        this.top = this.top + 1;
        if (this.top >= this.topMax) this.direction = 'DOWN';
      } else {
        this.top = this.top - 1;
        if (this.top <= this.topMin) this.direction = 'UP';
      }
      moonSubcontainer.style.top = `${this.top}px`;
    }, 200);
  }

  ngAfterViewInit(): void {
    const numberOfImagesBeingLoaded = this.loadImg.length;
    this.splashService.addElementsBeingLoaded(numberOfImagesBeingLoaded);
  }
}
