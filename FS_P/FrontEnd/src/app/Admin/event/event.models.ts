export interface Event{
  id:string|null;
  title:string;
  date:string;
  organization:string|null;
  location:string;
  capacity:Number;
  category:string;

  TicketC1:string;
  // TicketC2:string;
  // TicketC3:string;

  TicketP1:Number;
  // TicketP2:Number;
  // TicketP3:Number;

  TicketQ1:Number;
  // TicketQ2:Number;
  // TicketQ3:Number;

  description:string;
  imagePath: string;
}
