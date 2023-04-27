import { Component } from '@angular/core';
import { StorageApiService } from './services/storage-api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storageApiService: StorageApiService) {
    this.storageApiService.init();
  }
}
