import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Const } from '../shared/config/const';
import Buliding from '../shared/model/buliding';
import { BrowserDbService } from '../shared/services/browser-db.service';

@Component({
  selector: 'app-building-management',
  templateUrl: './building-management.component.html',
  styleUrls: ['./building-management.component.scss'],
})
export class BuildingManagementComponent implements OnInit {
  bulidings: Buliding[] = [];
  constructor(
    private browserDbService: BrowserDbService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBulidingList();
    this.listeningBulidingList();
    this.initAddBuliding();
  }

  initAddBuliding() {
    const bulidings = this.browserDbService.getItem(Const.listBuliding);
    if (!bulidings) {
      const bulidingList = [
        {
          id: 1,
          name: 'Buliding 1',
          country: {
            id: 'EGY',
            name: 'Egypt',
            position: [28.212732317073176, 31.432993658536578],
          },
        },
      ];
      this.browserDbService.setItem(Const.listBuliding, bulidingList);
      this.browserDbService.addBuilding.next(bulidingList);
    }
  }

  getBulidingList() {
    this.bulidings = this.browserDbService.getItem(Const.listBuliding);
  }

  listeningBulidingList() {
    this.browserDbService.addBuilding.subscribe((building) => {
      this.bulidings = building;
    });
  }

  deleteBuliding(buliding: Buliding) {
    this.bulidings.splice(this.bulidings.indexOf(buliding), 1);
    if (this.bulidings.length != 0) {
      this.browserDbService.setItem(Const.listBuliding, this.bulidings);
      return;
    }
    localStorage.clear();
  }

  editBuliding(id: any) {
    this.router.navigate(['building-management/add-edit'], {
      queryParams: {
        id,
      },
    });
    event?.stopPropagation();
  }
}
