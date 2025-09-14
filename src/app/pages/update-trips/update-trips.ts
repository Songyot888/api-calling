import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { lastValueFrom } from 'rxjs';
import { Trip } from '../../services/api/trip';

@Component({
  selector: 'app-update-trips',
  imports: [CommonModule,MatInputModule,MatSelectModule,MatButtonModule,FormsModule,HttpClientModule],
  templateUrl: './update-trips.html',
  styleUrl: './update-trips.scss'
})
export class UpdateTrips {
  name: string = '';
  destination: string = '';
  country: string = '';
  cover: string = '';
  detail: string = '';
  price: number = 0;
  duration: number = 0;

  distinations: Destination[] = [
    { value: 1, name: 'เอเชีย' },
    { value: 2, name: 'ยุโรป' },
    { value: 3, name: 'เอเชียตะวันออกเฉียงใต้' },
    { value: 9, name: 'ประเทศไทย' },
  ];

  constructor(private http: HttpClient,private tripservice : Trip) {}

  async addNew() {
    const body = {
      name: this.name,
      country: this.country,
      destinationid: this.destination,
      coverimage: this.cover,
      detail: this.detail,
      price: this.price,
      duration: this.duration,
    };
    
  try {
    const response = await this.tripservice.newTrips(body); // ใช้ body แทน addnew
    console.log('สร้างทริปใหม่สำเร็จ', response);
  } catch (error) {
    console.error('เกิดข้อผิดพลาด', error);
  }
  }
}

interface Destination {
  value: number;
  name: string;
}

