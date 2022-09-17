import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Required } from 'src/app/decorators/required.decorator';
import { SplashService } from '../../pages/public/splash/splash.service';
import { TreeService } from './tree.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
/** TODO: Comment */
export class TreeComponent implements OnInit, AfterViewInit {
  @ViewChildren('loadImg')
  loadImg!: QueryList<ElementRef>;

  @ViewChild('absoluteContainer', { static: true })
  absoluteContainerRef!: ElementRef;

  @ViewChild('bubble', { static: true })
  bubbleRef!: ElementRef;

  @Input() @Required() position!: string;

  top: number | undefined;
  left: number | undefined;
  treeOpacity: number | undefined;
  blurOpacity: number | undefined;
  lowPolyImg: number = Math.floor(Math.random() * 5) + 1;

  private topMax: number | undefined;
  private topMin: number | undefined;
  private direction: string = Math.round(Math.random()) ? 'UP' : 'DOWN';

  private static MAIN_SPHERE_OPACITIES: any = {
    base: 0.2,
    mid: 0.5,
    top: 0.8,
  };

  private static BUBBLE_BLUR_OPACITIES: any = {
    base: 0.1,
    mid: 0.2,
    top: 0.3,
  };

  private static BUBBLE_BLUR_TRANSLATIONS: any = {
    base: 6,
    mid: 4,
    top: 2,
  };

  /**
   * @param {ElementRef} elementRef
   * @param  {TreeService} treeService
   * @param splashService
   */
  constructor(
    private elementRef: ElementRef,
    private treeService: TreeService,
    public splashService: SplashService
  ) {}

  /**
   * @returns Void.
   */
  ngOnInit(): void {
    const parentRef = this.elementRef.nativeElement.parentElement;
    const parentWidth: number = parentRef.clientWidth;
    const parentHeight: number = parentRef.clientHeight;
    this.treeOpacity = TreeComponent.MAIN_SPHERE_OPACITIES[this.position];
    this.blurOpacity = TreeComponent.BUBBLE_BLUR_OPACITIES[this.position];

    let isRegister: boolean;

    do {
      this.top = Math.floor(Math.random() * (parentHeight - 100)) + 50;
      this.left = Math.floor(Math.random() * parentWidth - 100) + 50;
      isRegister = this.treeService.register(
        this.top,
        this.left,
        this.position
      );
      this.topMax = this.top + 10;
      this.topMin = this.top - 10;
    } while (!isRegister);

    const blurTranslation =
      TreeComponent.BUBBLE_BLUR_TRANSLATIONS[this.position];

    const conatinerElement = this.absoluteContainerRef.nativeElement;

    conatinerElement.style.top = `${this.top}px`;
    conatinerElement.style.left = `${this.left}px`;

    this.treeService.getMotionBlur().subscribe(motionBlur => {
      const bubbleElement = this.bubbleRef.nativeElement;

      if (motionBlur > 0) {
        bubbleElement.style.bottom = '0';
        bubbleElement.style.top = 'auto';
      } else if (motionBlur < 0) {
        bubbleElement.style.top = '0';
        bubbleElement.style.bottom = 'auto';
      }
      bubbleElement.style.height = `${100 + Math.abs(motionBlur)}px`;
    });

    const interval = Math.floor(Math.random() * 10) + 100;

    setInterval(() => {
      const conatinerElement = this.absoluteContainerRef.nativeElement;
      if (this.direction === 'UP') {
        this.top = this.top! + 1;
        if (this.top >= this.topMax!) this.direction = 'DOWN';
      } else {
        this.top = this.top! - 1;
        if (this.top <= this.topMin!) this.direction = 'UP';
      }
      conatinerElement.style.top = `${this.top}px`;
    }, interval);
  }

  ngAfterViewInit(): void {
    const numberOfImagesBeingLoaded = this.loadImg.length;
    this.splashService.addElementsBeingLoaded(numberOfImagesBeingLoaded);
  }
}
