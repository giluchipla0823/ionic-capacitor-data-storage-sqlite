import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { StorageApiService } from '../services/storage-api.service';
import { UserService } from '../services/user.service';
import { User } from '../services/user.type';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  users: Array<User> = [];
  cacheCreatedAt?: number | null;

  constructor(
    private userService: UserService,
    private loadingController: LoadingController,
    private storageApiService: StorageApiService
  ) {
    this.loadingController.create({ animated: false }).then((loading) => {
      loading.present();
      loading.dismiss();
    });
  }

  ngOnInit() {}

  async refreshUsers(forceRefresh: boolean) {
    const loading = await this.loadingController.create({
      message: 'Loading data...',
    });

    await loading.present();

    this.userService
      .getUsers(forceRefresh)
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(({ data, createdAt }) => {
        this.users = data;
        this.cacheCreatedAt = createdAt;
      });
  }

  clearData(): void {
    this.users = [];
  }

  clearCache(): void {
    this.storageApiService.clearByPrefixKey();
  }
}
