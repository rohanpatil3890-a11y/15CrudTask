import { Component, inject, OnInit } from '@angular/core';
import { LoderService } from './shared/services/loder/loder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '15CrudTask';

   isLoadeng : boolean = false;
  private _loaderService = inject(LoderService);

  ngOnInit(): void {
    this._loaderService.loadingStatus
    .subscribe(flag => {
      this.isLoadeng = flag
    })
  }
}
