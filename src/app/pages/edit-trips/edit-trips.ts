import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Trip } from '../../services/api/trip';
import { routes } from '../../app.routes';
import { ActivatedRoute, Router } from '@angular/router';
import { TripGetResponse } from '../../medel/trip_get_res';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-trips',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    MatButtonModule,
  ],
  templateUrl: './edit-trips.html',
  styleUrl: './edit-trips.scss',
})
export class EditTrips implements OnInit {
  id: string | undefined | null = null;
  trip!: TripGetResponse;

  idx: number = 0;
  countries: any[] = [];
  selectcountry: string = '';

  distinations: Destination[] = [
    { value: 1, name: 'เอเชีย' },
    { value: 2, name: 'ยุโรป' },
    { value: 3, name: 'เอเชียตะวันออกเฉียงใต้' },
    { value: 9, name: 'ประเทศไทย' },
  ];

  constructor(
    private http: HttpClient,
    private tripservice: Trip,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loaddata();
  }

  async editTrip() {
    this.id = this.route.snapshot.paramMap.get('idx');
    if (!this.id) {
      console.error('Trip id is null or undefined.');
      return;
    }

    const trips = await this.tripservice.getTripid(this.id);
    const current: TripGetResponse = Array.isArray(trips) ? trips[0] : trips;


    const body: any = {
      name: this.trip?.name?.trim() || current.name,
      country:
        this.selectcountry?.trim() ||
        this.trip?.country?.trim() ||
        current.country,
      destinationid: this.trip?.destinationid ?? current.destinationid,

      coverimage: this.trip?.coverimage?.trim() || current.coverimage,
      detail: this.trip?.detail?.trim() || current.detail,
      price: this.trip?.price ?? current.price,
      duration: this.trip?.duration ?? current.duration,
    };

    try {
      var res = await this.tripservice.edittrip(this.id, body);
      if (res) {
        console.log('อัปเดตสำเร็จ', res);
      } else {
        console.log('อัปเดตไม่สำเร็จ', res);
      }
    } catch (error) {
      console.log('อัปเดตไม่สำเร็จ', error);
    }
  }

  async loaddata() {
    this.id = this.route.snapshot.paramMap.get('idx');
    if (this.id != null) {
      const trips = await this.tripservice.getTripid(this.id);
      this.trip = Array.isArray(trips) ? trips[0] : trips;
    } else {
      this.trip = {} as TripGetResponse;
      console.error('Trip id is null.');
    }

    const allTrip = await this.tripservice.getTrip();
    this.countries = [...new Set(allTrip.map((t: any) => t.country))].map(
      (c: string) => ({ value: c, name: c })
    );
  }
}

interface Destination {
  value: number;
  name: string;
}
