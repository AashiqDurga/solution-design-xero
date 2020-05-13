export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  destination: string;
  scheduledDepartureTime: Date;
  estimateDepartureTime: Date;
  actualDepartureTime: Date;
  status: Stauts;
  depatureGate: string;
}
export enum Stauts {
  OnTime = "On Time",
  CheckIn = "Check In",
  Left = "Boarding",
  Departed = "Departed",
  Cancelled = "Cancelled",
  Delayed = "Delayed",
}