import { Injectable } from '@angular/core';
import { combineLatest, first, map, Observable, Subject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SplashService {
  private numberOfElementsBeingLoaded: number = 0;
  private isEverythingLoadedSubject: Subject<boolean> = new Subject<boolean>();

  public addElementsBeingLoaded(numberOfElementsToAdd: number): void {
    this.numberOfElementsBeingLoaded += numberOfElementsToAdd;
  }

  public removeElementBeingLoaded(): void {
    this.numberOfElementsBeingLoaded--;
    if (this.numberOfElementsBeingLoaded === 0)
      this.isEverythingLoadedSubject.next(true);
  }

  public get loadingStatus(): Observable<boolean> {
    return combineLatest([
      this.isEverythingLoadedSubject.asObservable(),
      timer(1000),
    ]).pipe(
      first(),
      map((): boolean => {
        return true;
      })
    );
  }
}
