import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MainService } from '../../pages/public/main/main.service';

@Injectable({
  providedIn: 'root',
})
export class TreeService {
  startScrollTop: number = 0;
  startScrollTime: number = Date.now();

  private restrictedAreas: any[] = [];
  private treePositions: any[] = [];
  private $motionBlur: Subject<number> = new Subject<number>();

  constructor(private mainService: MainService) {
    this.mainService.scrollY$.subscribe(
      this.calculateBlurFromScroll.bind(this)
    );
  }

  // TODO: Convert to DTO
  register(top: number, left: number, position: string): boolean {
    const treeCollition = this.treePositions.find(treePosition => {
      return (
        treePosition.position === position &&
        treePosition.top + 200 > top &&
        treePosition.top - 100 < top &&
        treePosition.left + 200 > left &&
        treePosition.left - 100 < left
      );
    });

    if (treeCollition) return false;

    const restrictedAreaCollition = this.restrictedAreas.find(restrictArea => {
      return (
        position === 'top' &&
        restrictArea.top - 100 < top &&
        restrictArea.bottom > top &&
        restrictArea.left - 100 < left &&
        restrictArea.right > left
      );
    });

    if (restrictedAreaCollition) return false;

    this.treePositions.push({
      top: top,
      left: left,
      position: position,
    });

    return true;
  }

  // TODO: Convert to DTO
  addRestrictedArea(
    top: number,
    bottom: number,
    left: number,
    right: number
  ): void {
    this.restrictedAreas.push({
      top: top,
      bottom: bottom,
      left: left,
      right: right,
    });
  }

  setMotionBlur(motionBlur: number): void {
    if (motionBlur > 200) motionBlur = 200;
    if (motionBlur < -200) motionBlur = -200;
    this.$motionBlur.next(motionBlur);
  }

  getMotionBlur(): Observable<number> {
    return this.$motionBlur.asObservable();
  }

  private calculateBlurFromScroll(scrollY): void {
    const userAgent = navigator.userAgent;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
        userAgent
      )
    )
      return;

    const endScrollTime = Date.now();
    if (endScrollTime - this.startScrollTime < 20) return;

    this.startScrollTime = endScrollTime;
    const endScrollTop = scrollY;
    const scrollDifference = this.startScrollTop - endScrollTop;

    this.setMotionBlur(scrollDifference);

    this.startScrollTop = endScrollTop;
    this.startScrollTime = Date.now();

    setTimeout(() => {
      const currentTime = Date.now();
      const timeDifference = currentTime - this.startScrollTime;
      if (timeDifference >= 40) this.setMotionBlur(0);
    }, 40);
  }
}
