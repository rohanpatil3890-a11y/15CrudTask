import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoderService } from './shared/services/loder/loder.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private _loderService: LoderService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this._loderService.loadingStatus.next(true);
    const reqClone = request.clone({
      setHeaders: {
        'auth': 'JWT token witch was stored in LS'
      }
    })
    return next.handle(request).pipe(
      finalize(() => {
        this._loderService.loadingStatus.next(false);
      })
    )
  }
}
