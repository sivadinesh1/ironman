import { Observable, of, combineLatest, ReplaySubject } from 'rxjs';
import { delay } from 'rxjs/operators';

import { AppShellConfig } from './config/app-shell.config';

export class DataStore<T> {
  // We wait on purpose 2 secs on local environment when fetching from json to simulate the backend roundtrip.
  // However, in production you should set this delay to 0 in the environment.ts file.
  private networkDelay = (AppShellConfig.settings && AppShellConfig.settings.networkDelay) ? AppShellConfig.settings.networkDelay : 0;
  // To debug shell styles, change configuration in the assets/app-shell.config.json file
  private debugMode = (AppShellConfig.settings && AppShellConfig.settings.debug) ? AppShellConfig.settings.debug : false;

  private timeline: ReplaySubject<T> = new ReplaySubject(1);

  constructor(private shellModel: T) { }

  load(dataObservable: Observable<T>): void {
    // Set the shell model as the initial value
    this.timeline.next(this.shellModel);

    const delayObservable = of(true).pipe(
      delay(this.networkDelay)
    );

    // Put both delay and data Observables into a combineLatest operator so when any observable emits a value, emit the
    // latest value from each.
    // This way the intentional delay caused by the delayObservable doesn't get added to the time the dataObservable
    // takes to complete
    combineLatest(
      [delayObservable, dataObservable]
    )
    .subscribe(([delayValue, dataValue]: [boolean, T]) => {
      if (!this.debugMode) {
        this.timeline.next(dataValue);
      }
    });
  }

  public get state(): Observable<T> {
    return this.timeline.asObservable();
  }
}
