import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TreeService } from 'src/app/components/molecules/tree/tree.service';
import { SplashService } from '../splash/splash.service';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChild('parallaxWrapper', { static: true }) parallaxWrapper!: ElementRef;
  @ViewChild('parallaxGroup', { static: true }) parallaxGroup!: ElementRef;

  private INNER_HEIGHT = window.innerHeight;

  articlesHeight: number[] = [];

  isLoadingComplete: boolean = false;

  constructor(
    private splashService: SplashService,
    private mainService: MainService,
    private treeService: TreeService
  ) {}

  ngOnInit(): void {
    this.addArticle(2);
    this.addArticle(2);
    this.addArticle(2);
    this.addArticle(2);
    this.addArticle(2);
    const height = this.getArticlesHeight();
    this.parallaxGroup.nativeElement.style.height = `${height}px`;
    this.articlesHeight.forEach((articleHeight, index) => {
      this.restrictArea(index + 1, articleHeight);
    });

    this.parallaxWrapper.nativeElement.addEventListener('scroll', () => {
      this.mainService.scrollY = this.parallaxWrapper.nativeElement.scrollTop;
    });

    window.addEventListener('resize', () => {
      this.INNER_HEIGHT = window.innerHeight;
      this.parallaxGroup.nativeElement;
      this.updateArticleHeight(1, 2);
      this.updateArticleHeight(2, 2);
      this.updateArticleHeight(3, 2);
      this.updateArticleHeight(4, 2);
      this.updateArticleHeight(5, 2);
      const height = this.getArticlesHeight();
      this.parallaxGroup.nativeElement.style.height = `${height}px`;
    });
  }

  addArticle(scaleY: number): void {
    this.articlesHeight.push((this.INNER_HEIGHT * scaleY) / 2);
  }

  getArticlesHeight(position: number = this.articlesHeight.length): number {
    const articlesHeight = this.articlesHeight.slice(0, position);
    return articlesHeight.reduce(
      (total: number, height: number): number => total + height,
      0
    );
  }

  getArticleHeight(position: number): number {
    return this.articlesHeight[position - 1];
  }

  updateArticleHeight(position: number, scaleY: number): void {
    this.articlesHeight[position - 1] = (this.INNER_HEIGHT * scaleY) / 2;
  }

  restrictArea(articlePosition: number, articleHeight: number): void {
    const articleHeightPx = articleHeight;
    const articlesHeightPx: number = this.getArticlesHeight(articlePosition);
    const articlesWidthPx: number = window.innerWidth;

    const MARGIN_TOP_PX = 100;
    const MARGIN_BOTTOM_PX = 100;
    const MARGIN_LEFT_PERCENTAGE = 0.15;
    const MARGIN_RIGHT_PERCENTAGE = 0.15;

    const top: number = articlesHeightPx - articleHeightPx + MARGIN_TOP_PX;
    const bottom: number = articlesHeightPx - MARGIN_BOTTOM_PX;
    const left: number = articlesWidthPx * MARGIN_LEFT_PERCENTAGE;
    const right: number =
      articlesWidthPx - articlesWidthPx * MARGIN_RIGHT_PERCENTAGE;

    this.treeService.addRestrictedArea(top, bottom, left, right);
  }

  ngAfterViewInit(): void {
    this.splashService.loadingStatus.subscribe(() => {
      setTimeout(() => {
        console.log('animation');
        this.isLoadingComplete = true;
      }, 2960);
    });
  }
}
