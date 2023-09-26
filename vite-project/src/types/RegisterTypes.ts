export interface RegisterFormValues {
    email: string;
    phoneNumber: string;
    password: string;
  }
  
  export interface RegisterProps {
    handleSubmit: (values: RegisterFormValues) => void;
  }
  