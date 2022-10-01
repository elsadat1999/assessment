import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/shared/model/country';
import { FormBuilder } from '@angular/forms';
import { BrowserDbService } from 'src/app/shared/services/browser-db.service';
import { Const } from 'src/app/shared/config/const';
import { Router, ActivatedRoute } from '@angular/router';
import Buliding from 'src/app/shared/model/buliding';
@Component({
  selector: 'app-add-edit-buliding',
  templateUrl: './add-edit-buliding.component.html',
  styleUrls: ['./add-edit-buliding.component.scss'],
})
export class AddEditBulidingComponent implements OnInit {
  countries: Country[] = [];
  form: FormGroup = new FormGroup({});
  loading: boolean = false;
  listBuliding = this.browserDbService.getItem(Const.listBuliding);

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private browserDbService: BrowserDbService,
    private router: Router,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCountries();
    this.initForm();
    this.handleEditBuliding();
  }

  initForm() {
    this.form = this.fb.group({
      name: this.fb.control(null, Validators.required),
      country: this.fb.control(null, Validators.required),
    });
  }

  handleEditBuliding() {
    const bulidingId = this.activatedRoute.snapshot.queryParams['id'];
    if (!bulidingId) return;
    const bulidingData = this.listBuliding.find(
      (buliding: Buliding) => buliding.id == bulidingId
    );
    this.form.patchValue({
      name: bulidingData.name,
      country: bulidingData.country.id,
    });
  }

  getCountries() {
    this.http.get('assets/json/countriesList.json').subscribe((res: any) => {
      this.countries = res;
    });
  }

  addBuliding() {
    this.loading = true;
     let newList: any = [];
    const buliding = {
      name: this.form.value.name,
      country: this.getSelectedCountry(),
      id: this.listBuliding?.length + 1 || 2,
    };
    if (!!this.listBuliding) {
      newList = [...this.listBuliding];
      newList.push(buliding);
    } else {
      newList = [buliding];
    }
    setTimeout(() => {
      this.browserDbService.setItem(Const.listBuliding, newList);
      this.browserDbService.addBuilding.next(newList);
      this.loading = false;
      this.router.navigate(['/building-management/map-view', buliding.id]);
    }, 500);
  }

  editBuliding() {
    const bulidingId = this.activatedRoute.snapshot.queryParams['id'];
    if (!bulidingId) return;
     const newList = [...this.listBuliding];
    const buliding = {
      name: this.form.value.name,
      country: this.getSelectedCountry(),
      id: bulidingId,
    };
    newList[bulidingId - 1] = buliding;
    this.browserDbService.setItem(Const.listBuliding, newList);
    this.browserDbService.addBuilding.next(newList);
    this.router.navigate(['/building-management/map-view', buliding.id]);
  }

  getSelectedCountry() {
    return this.countries.find(
      (country) => country.id == this.form.value.country
    );
  }
}
