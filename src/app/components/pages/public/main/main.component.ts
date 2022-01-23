import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TreeService } from 'src/app/components/molecules/tree/tree.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild('parallaxGroup', { static: true }) parallaxGroup: ElementRef;

  public articlesHeight = [];

  constructor(
    public treeService: TreeService
  ) { }

  ngOnInit(): void {
    this.addArticle(1);
    this.addArticle(1);
    const height = this.getArticlesTotalHeight();
    this.parallaxGroup.nativeElement.style.height = `${height}vh`;
  }

  addArticle(scaleY: number): void {
    const viewportHeight = 100;
    this.articlesHeight.push(viewportHeight * scaleY);
  }

  getArticlesTotalHeight(): number {
    return this.articlesHeight.reduce((total: number, height: number): number => total + height, 0)
  }

}
