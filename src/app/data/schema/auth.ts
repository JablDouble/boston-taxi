import { Profile } from 'src/app/shared/interfaces';

export interface AuthDataUser {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface FirebaseAuthResponse {
  idToken: string;
  expiresIn: string;
  email: string;
  localId: string;
}

export interface FirebaseProfileDTO {
  kind: string;
  users: Profile[];
}
