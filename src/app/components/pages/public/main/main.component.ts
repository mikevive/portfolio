import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TreeService } from 'src/app/components/molecules/tree/tree.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild('parallaxGroup', { static: true }) parallaxGroup: ElementRef;

  private VIEWPORT_HEIGHT_VH = 100;

  public articlesHeight: number[] = [];

  constructor(
    public treeService: TreeService
  ) { }

  ngOnInit(): void {
    this.addArticle(1);
    this.addArticle(2);
    const height = this.getArticlesHeight();
    this.parallaxGroup.nativeElement.style.height = `${height}vh`;
    this.articlesHeight.forEach((articleHeight, index) => {
      this.restrictArea(index + 1, this.articlesHeight[index])
    })
  }

  addArticle(scaleY: number): void {
    this.articlesHeight.push(this.VIEWPORT_HEIGHT_VH * scaleY);
  }

  getArticlesHeight(position: number = this.articlesHeight.length): number {
    const articlesHeight = this.articlesHeight.slice(0, position);
    return articlesHeight.reduce((total: number, height: number): number => total + height, 0);
  }

  getArticleHeight(position: number): number {
    return this.articlesHeight[position - 1]
  }

  restrictArea(articlePosition: number, articleHeight: number): void {

    const articleHeightPx = articleHeight/this.VIEWPORT_HEIGHT_VH * window.innerHeight;
    const articlesHeightPx: number = this.getArticlesHeight(articlePosition)/this.VIEWPORT_HEIGHT_VH * window.innerHeight;
    const articlesWidthPx: number = window.innerWidth;

    const MARGIN_TOP_PX = 100;
    const MARGIN_BOTTOM_PX = 100;
    const MARGIN_LEFT_PERCENTAGE = 0.2;
    const MARGIN_RIGHT_PERCENTAGE = 0.2;

    const top: number = (articlesHeightPx - articleHeightPx) + MARGIN_TOP_PX;
    const bottom: number = (articlesHeightPx) - MARGIN_BOTTOM_PX;
    const left: number = articlesWidthPx * MARGIN_LEFT_PERCENTAGE;
    const right: number = articlesWidthPx - (articlesWidthPx * MARGIN_RIGHT_PERCENTAGE);

    this.treeService.addRestrictedArea(top, bottom, left, right);
  }

}
