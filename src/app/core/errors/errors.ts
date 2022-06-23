export const SERVER_ERRORS: { [key: string]: string } = {
  EMAIL_NOT_FOUND: 'User was not found in our service. Please sign up or try again.',
  INVALID_PASSWORD: 'Password or email is incorrect. Please try again.',
  EMAIL_EXISTS: 'This user is already exists. Please try again or sign in.',
  'Permission denied': 'You are not logged in or session is expired. Please sign in.',
};

export const LOCAL_ERRORS: { [key: string]: string } = {
  INVALID_TRIP: 'The trip cannot be created, make sure the start point and end point are set',
  TRIP_NOT_CREATED: 'Unfortunately the trip was not created, please try again or try again later',
};
