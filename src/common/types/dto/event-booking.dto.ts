export interface EventBookingDto {
  eventId: string;
  attendeeId: string;
  txHash?: string;
  bookedDay: number;
  bookedTimeSlot: number;
  bookedDuration: number;
}
