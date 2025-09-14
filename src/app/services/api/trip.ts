import { Injectable } from '@angular/core';
import { Constants } from '../../config/constant';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { TripGetResponse } from '../../medel/trip_get_res';
import { addBodyClass } from '@angular/cdk/schematics';

@Injectable({
  providedIn: 'root',
})
export class Trip {
  constructor(private constants: Constants, private http: HttpClient) {}

  public async getTrip(options?: any) {
    const url = this.constants.API_ENDPOINT + '/trip';
    const response = await lastValueFrom(this.http.get(url));
    return response as TripGetResponse[];
  }
  public async getTripid(id : string) {
    const url = `${this.constants.API_ENDPOINT}/trip/${id}`;
    const response = await lastValueFrom(this.http.get(url));
    return response as TripGetResponse[];
  }
  public async getTripByName(name: string, options?: any) {
    const url = this.constants.API_ENDPOINT + '/trip';
    const response = await lastValueFrom(
      this.http.get(url, {
        params: {
          name: name,
        },
      })
    );
    return response as TripGetResponse[];
  }
  public async newTrips(body: any){
    const url = this.constants.API_ENDPOINT + '/trip';
    try {
      const response = await lastValueFrom(this.http.post(url, body));
      return response;
    } catch (error) {
      console.error('Error creating trip:', error);
      throw error;
    }
  }
  public async edittrip(id:any,body:any)
  {
     const url = this.constants.API_ENDPOINT + 'trip/' + id;
    try {
      const response = await lastValueFrom(this.http.put(url, body));
      return response;
    } catch (error) {
      console.error('Error creating trip:', error);
      throw error;
    }
  }
}
