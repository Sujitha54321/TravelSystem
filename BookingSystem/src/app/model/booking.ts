export class Booking {
    bookingId: number;
  date!: Date;
  status!: string;
  source: string;
  destination: string;
  departure: Date;
  arrival: Date;
  static booking_id: string;

  constructor(
    bookingId: number,
  date: Date,
  //status: string,
  source: string,
  destination: string,
  departure: Date,
  arrival: Date,
  )

  {
      this.bookingId = bookingId;
      //this.status=status;
     // this.trainNumber = trainNumber;
     // this.trainName = trainName;
     // this.capacity = capacity;

      this.departure = departure;
      this.arrival = arrival;
      this.source = source;
      this.destination = destination;
     // this.ticket_amount = ticket_amount;


    }

}
