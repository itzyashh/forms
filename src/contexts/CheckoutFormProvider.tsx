import { createContext, useContext, PropsWithChildren, useState } from 'react';

import * as z from 'zod';

// Define a schema for the personal info form
export const PersonalInfoSchema = z.object({
  fullName: z
    .string({ message: 'Full name is required!' })
    .min(1, { message: 'Full name must be longer than 1' }),
  address: z.string().min(1, { message: 'Please provide your address!' }),
  city: z.string().min(1, { message: 'City is required!' }),
  postcode: z.string().min(1, { message: 'Postal code is required!' }),
  phone: z.string().min(1, { message: 'Phone is required!' }),
});

export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;

// Define a schema for the payement form
export const PaymentInfoSchema = z.object({
  cardNumber: z.string().length(16, {
    message: 'Card number is required!',
  }),
  expireDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, {
    message: 'Expiry date is required!',
  }),

  cvv: z.coerce.number().min(100, { message: 'Cvv is required!' }).max(999),
});

export type PaymentInfo = z.infer<typeof PaymentInfoSchema>;

// Define the context type
type CheckoutFormContext = {
  personalInfo: PersonalInfo | undefined;
  setPersonalInfo: (data: PersonalInfo) => void;
  paymentInfo: PaymentInfo | undefined;
  setPaymentInfo: (data: PaymentInfo) => void;
};

const CheckoutFormContext = createContext<CheckoutFormContext>({
  personalInfo: undefined,
  setPersonalInfo: () => {},
  paymentInfo: undefined,
  setPaymentInfo: () => {},
});

export default function CheckoutFormProvider({ children }: PropsWithChildren) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>();

  return (
    <CheckoutFormContext.Provider
      value={{
        personalInfo,
        setPersonalInfo,
        paymentInfo,
        setPaymentInfo,
      }}
    >
      {children}
    </CheckoutFormContext.Provider>
  );
}

export const useCheckoutForm = () => useContext(CheckoutFormContext);
