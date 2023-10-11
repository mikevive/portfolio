import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private scrollYSubject: Subject<number> = new Subject<number>();

  public set scrollY(scrollY: number) {
    this.scrollYSubject.next(scrollY);
  }

  public get scrollY$(): Observable<number> {
    return this.scrollYSubject.asObservable();
  }
}
