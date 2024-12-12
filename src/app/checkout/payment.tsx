import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import CustomTextInput from '../../components/CustomTextInput';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const PaymentInfoSchema = z.object({
  cardNumber: z.string().length(16, {
    message: 'Card number is required!',
  }),
  expireDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, {
    message: 'Expiry date is required!',
  }),

  cvv: z.coerce.number().min(100, { message: 'Cvv is required!' }).max(999),
});

type PaymentInfo = z.infer<typeof PaymentInfoSchema>;

export default function PaymentDetailsForm() {
  const form = useForm<PaymentInfo>({
    resolver: zodResolver(PaymentInfoSchema),
  });
  const onNext: SubmitHandler<PaymentInfo> = (data) => {
    //validate form

    //redirect to next page
    router.push('/checkout/confirm');
  };
  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <CustomTextInput
          name="cardNumber"
          label="Card number"
          placeholder="1234556788"
        />
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <CustomTextInput
            name="expireDate"
            label="Expiry date"
            placeholder="01/23"
            containerStyle={{ flex: 1 }}
          />
          <CustomTextInput
            name="cvv"
            label="Cvv"
            placeholder="123"
            inputMode="numeric"
            containerStyle={{ flex: 1 }}
          />
        </View>
      </FormProvider>

      <CustomButton
        title="Next"
        onPress={form.handleSubmit(onNext)}
        style={styles.button}
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  button: {
    marginTop: 'auto',
    marginBottom: 20,
  },
});
