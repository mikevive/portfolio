import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TreeService {

  private restrictedAreas: any[] = [];
  private treePositions: any[] = [];
  private $motionBlur: Subject<number> = new Subject<number>();

  constructor() { }

  // TODO: Convert to DTO
  register(top: number, left: number, position: string): boolean {

    const treeCollition = this.treePositions.find((treePosition) => {
      return treePosition.position === position &&
        treePosition.top  + 200  > top  &&
        treePosition.top  - 100   < top  &&
        treePosition.left + 200  > left &&
        treePosition.left - 100   < left ;
    });

    if(treeCollition) return false;

    const restrictedAreaCollition = this.restrictedAreas.find((restrictArea) => {
      return position === 'top' &&
        restrictArea.top - 100  < top  &&
        restrictArea.bottom  > top  &&
        restrictArea.left - 100 < left &&
        restrictArea.right > left ;
    });

    if(restrictedAreaCollition) return false;

    this.treePositions.push({
      top: top,
      left: left,
      position: position
    });

    return true;
  }

  // TODO: Convert to DTO
  addRestrictedArea(top: number, bottom: number, left: number, right: number): void{
    this.restrictedAreas.push({
      top: top,
      bottom: bottom,
      left: left,
      right: right
    });
  }

  setMotionBlur(motionBlur: number){
    if(motionBlur > 100) motionBlur = 100
    if(motionBlur < -100) motionBlur = -100
    this.$motionBlur.next(motionBlur);
  }

  getMotionBlur(): Observable<number> {
    return this.$motionBlur.asObservable();
  }

}
