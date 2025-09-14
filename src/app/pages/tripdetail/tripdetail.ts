import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../../services/api/trip';
import { TripGetResponse } from '../../medel/trip_get_res';

@Component({
  selector: 'app-tripdetail',
  imports: [CommonModule],
  templateUrl: './tripdetail.html',
  styleUrl: './tripdetail.scss'
})
export class Tripdetail implements OnInit {
  trip: TripGetResponse[] = [];
  id: string | null = null;
  constructor(private route: ActivatedRoute, private tripservice: Trip, private router: Router) {

  }
  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('idx');
    console.log(this.id);
    if (this.id) {
      this.trip = await this.tripservice.getTrip(this.id);
      this.trip = this.trip.filter(dt=>(String)(dt.idx) == this.id)
      console.log(this.trip);
    }

  }
  goEdit(idx:number){
    this.router.navigate(['/edit', idx]);
  }
  


}
