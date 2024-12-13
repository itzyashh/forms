import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import CustomTextInput from '../../components/CustomTextInput';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  PaymentInfoSchema,
  PaymentInfo,
  useCheckoutForm,
} from '../../contexts/CheckoutFormProvider';

export default function PaymentDetailsForm() {
  const { paymentInfo, setPaymentInfo } = useCheckoutForm();
  const form = useForm<PaymentInfo>({
    resolver: zodResolver(PaymentInfoSchema),
    defaultValues: paymentInfo,
  });

  const onNext: SubmitHandler<PaymentInfo> = (data) => {
    console.log('Données de paiement soumises:', data);
    setPaymentInfo(data); // Assurez-vous que cette ligne est bien présente
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
