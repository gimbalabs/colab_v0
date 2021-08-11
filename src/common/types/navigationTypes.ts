export type AppStackParamList = {
  "Log In": undefined;
  Initial: undefined;
  Pricing: undefined;
  "Create Account": undefined;
  "Deposit Successful":
    | {
        isBookingWalletTopUp: boolean | undefined;
        fromScreen: any;
      }
    | undefined;
  Confirmation:
    | {
        isBookingWalletTopUp: boolean | undefined;
        isBookingConfirmation: boolean | undefined;
      }
    | undefined;
  "Add Funds": { fromScreen: string };
  "Navigation Screens": undefined;
  "User Registration Screens": undefined;
  "Onboarding Screens": undefined;
  "Duration Choice": any;
  Wallet: undefined;
};

export type OrganizerTabParamList = {
  Home: undefined;
  Browse: any;
  Wallet: undefined;
  "Add Funds": { fromScreen: string };
  Availability: undefined;
  Profile: undefined;
};

export type BookingStackParamList = {
  Browse: any;
  "Available Dates":
    | {
        alias: string | undefined;
        selectedEvent: any | undefined;
      }
    | undefined;
  "Available Times": any;
  "Duration Choice": any;
  "Event Description": any;
  "Add Funds": any;
  "Booking Confirmation": any;
  Confirmation: any;
};

export type EventCreationParamList = {
  Home: undefined;
  "New Event Description": undefined;
  "Available Days Selection": undefined;
  "Available Time Selection": undefined;
  "Image Cover Selection": undefined;
};
