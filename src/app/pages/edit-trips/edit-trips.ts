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
  selectedTrip?: TripGetResponse;
  idx: number = 0;
  countries: any[] = [];
  selectcountry: string = '';
  dataTrip!: TripGetResponse;
  originalTrip: TripGetResponse | null = null;

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
    const o = this.originalTrip;
    console.log("ooo="+
      
      o);
    
    if (!this.id) {
      console.error('Trip id is null or undefined.');
      return;
    }

    // ดึงข้อมูลปัจจุบันจาก API
    const trips = await this.tripservice.getTripid(this.id);
    const tripData = Array.isArray(trips) ? trips[0] : trips;

    // รวมของเดิมกับของใหม่
    const body = {
      ...tripData, // ข้อมูลเก่า
      ...this.trip, // ของที่ผู้ใช้แก้ (ทับของเดิม)
    };

    // เรียก API update
    await this.tripservice.edittrip(body, this.id);
    console.log('อัปเดตสำเร็จ', body);
  }
  // async editTrip() {
  //   const body = {
  //      name: this.name?.trim() || o?.name,
  //     country: this.country?.trim() || o?.country || null,
  //     destinationid: this.destinationId,
  //     coverimage: this.cover?.trim() || o?.coverimage,
  //     detail: this.detail?.trim() || o?.detail,
  //     price: this.price ?? o?.price,
  //     duration: this.duration ?? o?.duration,
  //   };
  //   this.id = this.route.snapshot.paramMap.get('idx');
  //   // this.selectedTrip = this.trip.find((d) => String(d.idx) === this.id);

  //   // const url = 'http://localhost:3000/trip/$`select';
  //   if (this.id) {
  //     const trips = await this.tripservice.getTripid(this.id);
  //     const tripData = trips[0];
  //     let merge = { ...tripData, ...body }
  //     console.log(merge);

  //     // const response = this.tripservice.edittrip(body, this.id);
  //     // console.log(response);
  //   } else {
  //     console.error('Trip id is null or undefined.');
  //   }
  // }
  async loaddata() {
    this.id = this.route.snapshot.paramMap.get('idx');
    if (this.id !== null) {
      const trips = await this.tripservice.getTripid(this.id);
      this.trip = Array.isArray(trips) ? trips[0] : trips;
    } else {
      this.trip = {} as TripGetResponse;
      console.error('Trip id is null.');
    }

    console.log(this.trip);
    const allTrip = await this.tripservice.getTrip(); // API endpoint
    this.countries = [...new Set(allTrip.map((t: any) => t.country))].map(
      (c: string) => ({
        value: c,
        name: c,
      })
    );
    // this.countries = [
    //   {
    //     value: this.trip.country,
    //     name: this.trip.country,
    //   },
    // ];
    console.log(this.countries);
  }
}

interface Destination {
  value: number;
  name: string;
}
