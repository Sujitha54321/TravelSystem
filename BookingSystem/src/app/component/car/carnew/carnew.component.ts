import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../model/user';
import { BookingService } from '../../../service/booking.service';

@Component({
  selector: 'app-carnew',
  templateUrl: './carnew.component.html',
  styleUrl: './carnew.component.css'
})
export class CarnewComponent implements OnInit {
  p: number = 1;
  count: number = 5;
  car: any;
  user!: User;
  carDetails: any;

  constructor(
    public bookingservice: BookingService,
    public route: Router,
    public activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(() => this.searchcars());
    this.bookingservice.sendCarDetails(this.carDetails);
    console.log('car Details', this.carDetails);
    this.activateRoute.paramMap.subscribe(
      () => (this.user = JSON.parse(sessionStorage.getItem('user') ?? '{}'))
    );
    console.log(this.user);

    //this.checkSessionAndNavigate();
  }
  searchcars() {
    {
      // Handle the case where source or destination is missing.
      this.bookingservice.getAllCar().subscribe((data) => {
        console.log(data);
        this.car = data;
      });
    }
  }
 navigateToBookCar(carId: number) {
    this.route.navigate(['car-form/' + carId]);
  }

  logout() {
    if (sessionStorage.getItem('train')) {
      sessionStorage.clear();
      localStorage.clear();
      alert('Logout Successfully');
      this.route.navigateByUrl('/user/login');
    } else {
      alert('No user logged in');
    }
  }

  checkSessionAndNavigate() {
    if (!this.car) {
      this.route.navigateByUrl('/user/login');
    }
  }
}

