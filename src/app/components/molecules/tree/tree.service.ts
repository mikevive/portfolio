import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TreeService {

  treePositions: any[] = []

  constructor() { }

  register(top: number, left: number, position: string): boolean {

    const collition = this.treePositions.find((treePosition, index) => {
      return treePosition.position === position &&
        treePosition.top  + 150  > top  &&
        treePosition.top  - 100   < top  &&
        treePosition.left + 150  > left &&
        treePosition.left - 100   < left ;
    });

    if(collition) return false;

    this.treePositions.push({
      top: top,
      left: left,
      position: position
    });

    return true
  }

}
