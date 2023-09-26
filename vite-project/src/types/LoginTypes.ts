import { FormikProps } from 'formik';

export interface Props {
  loading: boolean;
  formikProps: FormikProps<{ email: string; password: string }>;
}
