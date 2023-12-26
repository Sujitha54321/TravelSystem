import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminServiceService } from '../../../service/admin-service.service';
import { BookingService } from '../../../service/booking.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  p: number = 1;
  count: number = 5;
  customer : any;
   user: any;
   constructor(
     private adminService: AdminServiceService,
     public router: Router,
     private activateRoute: ActivatedRoute,private bookingService:BookingService
   ) {}
   ngOnInit(): void {

     const userData = sessionStorage.getItem('admin');

     if (userData) {

       this.user = JSON.parse(userData);
       console.log('User Data:', this.user);
     }
     this.getAllUser();
   }
   isAdmin(): boolean {
     return this.user ? this.user.userRole === 'admin' : false;
   }
   getAllUser() {
     this.adminService.getAllUser().subscribe((data: any) => {
       console.log(data);
       this.customer = data;
     });
   }

  //  navigateToUpdateuser(userid: any) {
  //   this.router.navigate(['/train-update/'+userid]);
  // }

  deleteuser(userid: number) {
    this.bookingService.deleteUser(userid).subscribe(
      (response: any) => {
        console.log('user deleted successfully:', response);
        alert('user deleted successfully');
        window.location.reload();
      },
      (error: any) => {
        console.error('Error deleting user:', error);
      }
    );
  }
  }

