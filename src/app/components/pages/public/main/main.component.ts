import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TreeService } from 'src/app/components/molecules/tree/tree.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild('parallaxWrapper', { static: true }) parallaxWrapper: ElementRef;
  @ViewChild('parallaxGroup', { static: true }) parallaxGroup: ElementRef;

  private INNER_HEIGHT = window.innerHeight;

  public articlesHeight: number[] = [];
  public startScrollTop: number = 0;
  public startScrollTime: number = Date.now();

  constructor(
    public treeService: TreeService
  ) { }

  ngOnInit(): void {

    this.addArticle(1);
    this.addArticle(2);
    const height = this.getArticlesHeight();
    this.parallaxGroup.nativeElement.style.height = `${height}px`;
    this.articlesHeight.forEach((articleHeight, index) => {
      this.restrictArea(index + 1, articleHeight)
    })

    this.parallaxWrapper.nativeElement.addEventListener('scroll', this.scrollListener.bind(this))

    window.addEventListener('resize', () => {
      this.INNER_HEIGHT = window.innerHeight;
      this.parallaxGroup.nativeElement
      this.updateArticleHeight(1,1);
      this.updateArticleHeight(2,2);
      const height = this.getArticlesHeight();
      this.parallaxGroup.nativeElement.style.height = `${height}px`;
    });

  }

  scrollListener(): void {
    const userAgent = navigator.userAgent;
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(userAgent)) {
      const currentTime = Date.now();
      if (currentTime - this.startScrollTime < 50) return

      this.startScrollTime = currentTime;
      const endScrollTop = this.parallaxWrapper.nativeElement.scrollTop;
      const scrollDifference = this.startScrollTop - endScrollTop;

      this.treeService.setMotionBlur(scrollDifference);

      this.startScrollTop = endScrollTop;
      this.startScrollTime = Date.now();

      setTimeout(() => {
        const currentTime = Date.now();
        const timeDifference = currentTime - this.startScrollTime;
        if (timeDifference >= 100) this.treeService.setMotionBlur(0);
      }, 100)
    }
  }

  addArticle(scaleY: number): void {
    this.articlesHeight.push(this.INNER_HEIGHT * scaleY);
  }

  getArticlesHeight(position: number = this.articlesHeight.length): number {
    const articlesHeight = this.articlesHeight.slice(0, position);
    return articlesHeight.reduce((total: number, height: number): number => total + height, 0);
  }

  getArticleHeight(position: number): number {
    return this.articlesHeight[position - 1]
  }

  updateArticleHeight(position: number, scaleY: number): void {
    this.articlesHeight[position - 1] = this.INNER_HEIGHT * scaleY;
  }

  restrictArea(articlePosition: number, articleHeight: number): void {

    const articleHeightPx = articleHeight;
    const articlesHeightPx: number = this.getArticlesHeight(articlePosition);
    const articlesWidthPx: number = window.innerWidth;

    const MARGIN_TOP_PX = 100;
    const MARGIN_BOTTOM_PX = 100;
    const MARGIN_LEFT_PERCENTAGE = 0.15;
    const MARGIN_RIGHT_PERCENTAGE = 0.15;

    const top: number = (articlesHeightPx - articleHeightPx) + MARGIN_TOP_PX;
    const bottom: number = (articlesHeightPx) - MARGIN_BOTTOM_PX;
    const left: number = articlesWidthPx * MARGIN_LEFT_PERCENTAGE;
    const right: number = articlesWidthPx - (articlesWidthPx * MARGIN_RIGHT_PERCENTAGE);

    this.treeService.addRestrictedArea(top, bottom, left, right);
  }

}
