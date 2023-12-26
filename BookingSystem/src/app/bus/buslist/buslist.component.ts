import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BusService } from '../../service/bus.service';
import { User } from '../../model/user';
import { BookingService } from '../../service/booking.service';
import { Observable, switchMap, of } from 'rxjs';

@Component({
  selector: 'app-buslist',
  templateUrl: './buslist.component.html',
  styleUrl: './buslist.component.css'
})
export class BuslistComponent implements OnInit {
  p: number = 1;
  count: number = 5;
  bus: any;
  user!: User;
  busDetails: any;

  constructor(
    public bookingservice: BookingService,
    public route: Router,
    public activateRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(() => this.searchBuses());
    this.bookingservice.sendBusDetails(this.busDetails);
    console.log('Bus Details', this.busDetails);
    this.activateRoute.paramMap.subscribe(
      () => (this.user = JSON.parse(sessionStorage.getItem('user') ?? '{}'))
    );
    console.log(this.user);

   // this.checkSessionAndNavigate();
  }
  // getAllBus() {
  //   this.busService.getAllBus().subscribe((data: any) => {
  //     console.log(data);
  //     this.bus = data;
  //   });
  // }
  searchBuses() {
    {
      // Handle the case where source or destination is missing.
      this.bookingservice.getAllBus().subscribe((data) => {
        console.log(data);
        this.bus = data;
      });
    }
  }
  getUserData():Observable<User | null> {
    return this.activateRoute.paramMap.pipe(
      switchMap(() => {
        const userData = sessionStorage.getItem('user');
        console.log('user',userData);
       return of(userData ? JSON.parse(userData) : null);
     })
    );
  }
  updateBus(busId: number) {
    this.route.navigateByUrl('/bookingForm' + busId);
  }

  navigateToBookBus(busId: number) {
    //this.bookingservice.addBooking(this.bus);
    this.route.navigateByUrl('/bookingForm/'+busId);
  }

  logout() {
    if (sessionStorage.getItem('user')) {
      sessionStorage.clear();
      localStorage.clear();
      alert('Logout Successfully');
      this.route.navigateByUrl('/user/login');
    } else {
      alert('No user loged in');
    }
  }
  checkSessionAndNavigate() {
    if (!this.user) {
      this.route.navigateByUrl('/user/login');
    }
  }
}
