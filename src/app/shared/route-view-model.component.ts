import { Directive, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, switchMap, takeUntil } from 'rxjs';

@Directive()
export abstract class RouteViewModelComponent<TVm> implements OnInit, OnDestroy {
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);

  private readonly destroy$ = new Subject<void>();
  private readonly vmSubject = new BehaviorSubject<TVm>(this.getInitialVm());
  readonly vm$ = this.vmSubject.asObservable();

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => this.buildViewModel$(params)),
        takeUntil(this.destroy$),
      )
      .subscribe((vm) => this.vmSubject.next(vm));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected get destroyed$(): Observable<void> {
    return this.destroy$.asObservable();
  }

  protected get currentVm(): TVm {
    return this.vmSubject.value;
  }

  protected abstract getInitialVm(): TVm;

  protected abstract buildViewModel$(params: Params): Observable<TVm>;
}
