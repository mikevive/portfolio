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
export class PresentationComponent implements AfterViewInit {
  @ViewChildren('loadImg')
  loadImg!: QueryList<ElementRef>;

  img: string = 'assets/img/logo.png';

  constructor(public splashService: SplashService) {}

  ngAfterViewInit(): void {
    const numberOfImagesBeingLoaded = this.loadImg.length;
    this.splashService.addElementsBeingLoaded(numberOfImagesBeingLoaded);
  }
}
