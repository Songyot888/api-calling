import { Routes } from '@angular/router';
import { AsyncDemo } from './pages/async-demo/async-demo';
import { CallApi } from './pages/call-api/call-api';
import { Tripdetail } from './pages/tripdetail/tripdetail';
import { UpdateTrips } from './pages/update-trips/update-trips';
import { EditTrips } from './pages/edit-trips/edit-trips';

export const routes: Routes = [
  {
    path: '',
    component: CallApi,
  },
  {
    path: 'detail/:idx',
    component: Tripdetail,
    
  },
  {
    path:'update',
    component: UpdateTrips
  },
  {
    path: 'edit/:idx',
    component: EditTrips
  }
];
