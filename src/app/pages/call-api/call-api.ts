import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { TripGetResponse } from '../../medel/trip_get_res';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Trip } from '../../services/api/trip';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { T } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-call-api',
  imports: [CommonModule,HttpClientModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatIconModule,MatOptionModule,MatSelectModule,FormsModule],
  templateUrl: './call-api.html',
  styleUrl: './call-api.scss'
})
export class CallApi implements OnInit{
  countries : any[] = [];
  constructor(private http: HttpClient,private tripService : Trip,private router: Router) {}
  async ngOnInit() {
    const trips = await this.tripService.getTrip();  // API endpoint
    this.countries = [...new Set(trips.map(trip =>trip.country))].map(c=> 
      ({
      value: c,
      name: c
  }));
    console.log(trips);
    console.log("Mapped countries:", this.countries);
    this.callApi()
    
  }

  selectcountry: string= '';
 

 trips: TripGetResponse[] = [];
  distinations: Destination[] = [
    { value: 1, name: 'เอเชีย' },
    { value: 2, name: 'ยุโรป' },
    { value: 3, name: 'เอเชียตะวันออกเฉียงใต้' },
    { value: 4, name: 'ประเทศไทย' },
  ];

 async callApi() {
  
    // const url = 'http://10.160.166.204:3000/trip';  
    // let data = await lastValueFrom(this.http.get(url));
    // this.trips = data as TripGetResponse[];
    this.trips = await this.tripService.getTrip();
    console.log(this.trips);
    console.log(this.trips[0].name);
    console.log('Call Completed');
  }
    async findOne(input: HTMLInputElement) {
    console.log(input.value);    
    this.trips = await this.tripService.getTrip(input.value);
    this.trips = this.trips.filter(t => (String)(t.idx) === input.value)
    
    console.log(this.trips);
    console.log('Call Completed');
  }
  async findname(inputname: HTMLInputElement) {
    console.log(inputname.value);
    this.trips = await this.tripService.getTripByName(inputname.value);
    this.trips = this.trips.filter(trip => trip.name.toLowerCase().includes(inputname.value.toLowerCase()
    ));
    console.log(this.trips);
    if(this.trips.length > 0){
        console.log(this.trips[0].name);
    }
    
    console.log('Call Completed');
  }
  async findcountry(inputname: string) {
    console.log(inputname);
    this.trips = await this.tripService.getTrip();
    this.trips = this.trips.filter(c => c.country === inputname);
    
    console.log(this.trips);
    
    // this.trips = this.trips.filter(trip => trip.name.toLowerCase().includes(inputname.value.toLowerCase()
    // ));
    // console.log(this.trips);
    // if(this.trips.length > 0){
    //     console.log(this.trips[0].name);
    // }
    
    // console.log('Call Completed');
  }
  detail(tripdetail : number){
    console.log(tripdetail);
    this.router.navigate(['/detail',tripdetail])
    
    
  }
  
}
interface Destination {
  value: number;
  name: string;
}
