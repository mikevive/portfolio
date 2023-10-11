import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Required } from 'src/app/decorators/required.decorator';
import { SplashService } from './splash.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements AfterViewInit, OnDestroy {
  @ViewChild('splash', { static: true })
  @Required()
  splashRef!: ElementRef;

  @ViewChild('primaryImg', { static: true })
  @Required()
  primaryImgRef!: ElementRef;

  @ViewChild('oldTexture', { static: true })
  @Required()
  oldTextureRef!: ElementRef;

  @ViewChild('background', { static: true })
  @Required()
  backgroundRef!: ElementRef;

  @ViewChildren('loadImg')
  loadImg!: QueryList<ElementRef>;

  @ViewChildren('secondaryImg')
  secondaryImgRef!: QueryList<ElementRef>;

  constructor(public splashService: SplashService) {}

  ngAfterViewInit(): void {
    const numberOfImagesBeingLoaded = this.loadImg.length;
    this.splashService.addElementsBeingLoaded(numberOfImagesBeingLoaded);

    this.splashService.loadingStatus.subscribe(() => {
      this.primaryImgRef.nativeElement.style.opacity = '1';
      setTimeout(() => {
        this.secondaryImgRef.forEach(
          secondaryImg => (secondaryImg.nativeElement.style.opacity = '1')
        );
      }, 1000);
      setTimeout(() => {
        this.backgroundRef.nativeElement.style.opacity = '0';
        this.oldTextureRef.nativeElement.style.top = '-100vh';
        this.oldTextureRef.nativeElement.style.opacity = '0';
        this.splashRef.nativeElement.style.opacity = '0';
      }, 3000);
    });
  }

  ngOnDestroy(): void {
    // TODO: unsubscribe
  }
}
