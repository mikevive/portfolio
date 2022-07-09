import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Required } from 'src/app/decorators/required.decorator';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
/** First page to display when the app is load. */
export class SplashComponent implements OnInit, OnDestroy {
  @ViewChild('oldTexture', { static: true })
  @Required()
  oldTextureRef!: ElementRef;

  @ViewChild('background', { static: true })
  @Required()
  backgroundRef!: ElementRef;

  textHidden: boolean = true;

  /**
   * @returns Void.
   */
  constructor() {}

  /**
   * @returns Void.
   */
  ngOnInit(): void {
    // TODO: Split in async/await funcitons
    setTimeout(() => {
      setTimeout(() => {
        this.textHidden = false;
        setTimeout(() => {
          this.backgroundRef.nativeElement.style.opacity = '0';
          this.oldTextureRef.nativeElement.style.top = '-100vh';
          this.oldTextureRef.nativeElement.style.opacity = '0';
          setTimeout(() => {
            this.textHidden = true;
          }, 100);
        }, 1000);
      }, 200);
    }, 500);
  }

  /**
   * @returns Void.
   */
  ngOnDestroy(): void {}
}
