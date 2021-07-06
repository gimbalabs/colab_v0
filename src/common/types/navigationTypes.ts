// import { NavigatorScreenParams } from "@react-navigation/native";

export type AppStackParamList = {
  // 'undefined' means that no parameters are specified
  Home: undefined;
  "Navigation Screens": undefined;
  "Onboarding Screens": undefined;
  Modal: undefined;
  Attendees: undefined;
  Browse: undefined;
  Confirmation: undefined;
  "Deposit Successful": undefined;
};

export type OrganizerTabParamList = {
  Home: undefined;
  Browse: any;
  Wallet: undefined;
  Availability: undefined;
  Profile: undefined;
};

export type BookingTabParamList = {
  Browse: any;
  "Available Dates": any;
  "Available Times": any;
  "Duration Choice": any;
  "Add Funds": any;
  Confirmation: any;
};
