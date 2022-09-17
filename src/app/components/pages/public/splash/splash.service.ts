import { Injectable } from '@angular/core';
import { combineLatest, first, map, Observable, Subject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/** Service that handles elements being loaded in order to control de splash. */
export class SplashService {
  private numberOfElementsBeingLoaded: number = 0;
  private isEverythingLoaded$: Subject<boolean> = new Subject<boolean>();

  /**
   * Report to the service the number of elements being loaded by the component.
   *
   * @param {number} numberOfElementsToAdd - Number of elements pending to be
   * loaded.
   * @returns {void}.
   */
  addElementsBeingLoaded(numberOfElementsToAdd: number): void {
    this.numberOfElementsBeingLoaded += numberOfElementsToAdd;
  }

  /**
   * Report to the service that one of the elements in the component was
   * completly loaded.
   *
   * @returns {void}.
   */
  removeElementBeingLoaded(): void {
    this.numberOfElementsBeingLoaded--;
    if (this.numberOfElementsBeingLoaded === 0)
      this.isEverythingLoaded$.next(true);
  }

  /**.
   * An Observable of the state of the elements being loaded.
   *
   * @returns {Observable<any>}.
   */
  isLoadingComplete(): Observable<boolean> {
    return combineLatest([
      this.isEverythingLoaded$.asObservable(),
      timer(1000),
    ]).pipe(
      first(),
      map((): boolean => {
        return true;
      })
    );
  }
}
