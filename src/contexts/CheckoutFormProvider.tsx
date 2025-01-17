import { createContext, PropsWithChildren, useContext, useState } from "react";
import * as z from "zod";

type FormContextType = {
    personalInfo?: PersonalInfo;
    setPersonalInfo: (info: PersonalInfo) => void;
    paymentInfo?: PaymentInfo;
    setPaymentInfo: (info: PaymentInfo) => void;
    consoleLog: (data: any) => void;
}

const CheckoutFormContext = createContext<FormContextType>({
    setPersonalInfo: () => { },
    setPaymentInfo: () => { },
    consoleLog: () => { }
});

export const personalInfoSchema = z.object({
    name: z.string({ message: 'Name is required' }).min(2).trim(),
    address: z.string({ message: 'Address is required' }).nonempty(),
    city: z.string({ message: 'City is required' }).nonempty(),
    postCode: z.string({ message: 'Post code is required' }).nonempty(),
    phoneNumber: z.string({ message: 'Phone number is required' }).nonempty(),
    country: z.string({ message: 'Country is required' }).nonempty(),
})
export type PersonalInfo = z.infer<typeof personalInfoSchema>

export const paymentInfoSchema = z.object({
    cardNumber: z.coerce.number({ message: 'Card number is required' }),
    expires: z.string({ message: 'Expires is required' }).regex(new RegExp('^(0[1-9]|1[0-2])\/[0-9]{2}$'), { message: 'Please use the MM/YY format' }),
    cvv: z.coerce.number({ message: 'CVV is required' }).min(100).max(999),
})

export type PaymentInfo = z.infer<typeof paymentInfoSchema>

export default function FormProvider({ children }: PropsWithChildren) {

    const [personalInfo, setPersonalInfo] = useState<PersonalInfo | undefined>();
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | undefined>();

    const consoleLog = (data: any) => {
        console.log('console log in form provider', data)
    }

    return <CheckoutFormContext.Provider value={{
        personalInfo,
        setPersonalInfo,
        paymentInfo,
        setPaymentInfo(data) {
            console.log(data,'setting payment info')
            setPaymentInfo(data)
            },
        consoleLog
          
    }}>{children}</CheckoutFormContext.Provider>;
}

export const useCheckoutForm = () => {
    const context = useContext(CheckoutFormContext);
    if (!context) {
        throw new Error('useForm must be used within a FormProvider');
    }
    return context;
}


