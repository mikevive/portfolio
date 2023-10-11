import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { SplashService } from '../../pages/public/splash/splash.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
})
export class QuoteComponent implements AfterViewInit {
  marsImg: string = 'assets/img/mars.png';
  moonSurfaceImg: string = 'assets/img/moon_surface.png';
  astronautImg: string = 'assets/img/astronaut.png';

  @ViewChildren('loadImg')
  loadImg!: QueryList<ElementRef>;

  constructor(public splashService: SplashService) {}

  ngAfterViewInit(): void {
    const numberOfImagesBeingLoaded = this.loadImg.length;
    this.splashService.addElementsBeingLoaded(numberOfImagesBeingLoaded);
  }
}
