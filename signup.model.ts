export interface Signup {
    id: string;
    name: string;
    email: string;
    password: string;
    profile : string;
    userType: string;
  }

  export interface Login {
    email: string;
    password: string;
  }  