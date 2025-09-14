import { Component } from '@angular/core';
import { TripGetResponse } from '../../medel/trip_get_res';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Trip } from '../../services/api/trip';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-async-demo',
  imports: [HttpClientModule,CommonModule,MatFormFieldModule],
  templateUrl: './async-demo.html',
  styleUrl: './async-demo.scss'
})
export class AsyncDemo {
   constructor(private http: HttpClient,private tripService : Trip) {}

 trips: TripGetResponse[] = [];

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
    const url = `http://localhost:3000/trip/${input.value}`;
    let data = await lastValueFrom(this.http.get(url));
    this.trips = [data as TripGetResponse];
    console.log(this.trips);
    console.log(this.trips[0].name);
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
  async delay(ms: number) {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }
  // async btnClick() {
  //   this.normalFunction('1' + new Date());
  //   this.normalFunction('2' + new Date());
  //   await this.delay(2000);
  //   console.log('3 ' + new Date());
  //   await this.delay(2000);
  //   console.log('4 ' + new Date());
  // }
  //   btnClick() {
  //   this.normalFunction('1' + new Date());
  //   this.normalFunction('2' + new Date());

  //   this.delay(2000).then(() => {
  //     console.log('3 ' + new Date());
  //   });

  //   this.delay(2000).then(() => {
  //     console.log('4 ' + new Date());
  //   });
  // }
  //   btnClick() {
  //   this.normalFunction('1' + new Date());
  //   this.normalFunction('2' + new Date());

  //   this.delay(2000).then(() => {
  //     console.log('3 ' + new Date());
  //     this.delay(2000).then(() => {
  //       console.log('4 ' + new Date());
  //     });
  //   });
  // }
    btnClick() {
    this.normalFunction('1' + new Date());
    this.normalFunction('2' + new Date());

    this.delay(2000).then(() => {
      console.log('3 ' + new Date());
      this.delay(2000).then(() => {
        console.log('4 ' + new Date());
      });
    });

     console.log('5 ' + new Date());
  }
   normalFunction(text: string) {
    console.log(text);
  }
}
