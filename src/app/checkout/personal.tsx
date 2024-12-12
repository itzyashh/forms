import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import CustomTextInput from '../../components/CustomTextInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';
import {
  useForm,
  SubmitHandler,
  Controller,
  FormProvider,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define a schema for the form
const PersonalInfoSchema = z.object({
  fullName: z
    .string({ message: 'Full name is required!' })
    .min(1, { message: 'Full name must be longer than 1' }),
  address: z.string().min(1, { message: 'Please provide your address!' }),
  city: z.string().min(1, { message: 'City is required!' }),
  postcode: z.string().min(1, { message: 'Postal code is required!' }),
  phone: z.string().min(1, { message: 'Phone is required!' }),
});

type PersonalInfo = z.infer<typeof PersonalInfoSchema>;

export default function PersonalDetailsForm() {
  const form = useForm<PersonalInfo>({
    resolver: zodResolver(PersonalInfoSchema),
  });

  console.log('Errors:', form.formState.errors);

  const onNext: SubmitHandler<PersonalInfo> = (data) => {
    //validate form
    console.log('Data:', data);
    //redirect to next page
    router.push('/checkout/payment');
  };
  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <CustomTextInput
          name="fullName"
          label="Full name"
          placeholder="John Doe"
        />

        <CustomTextInput
          name="address"
          label="Address"
          placeholder="4 rue de paris"
        />

        <View style={{ flexDirection: 'row', gap: 5 }}>
          <CustomTextInput
            name="city"
            label="City"
            placeholder="City"
            containerStyle={{ flex: 1 }}
          />
          <CustomTextInput
            name="postcode"
            label="Post Code"
            placeholder="1234"
            inputMode="numeric"
            containerStyle={{ flex: 1 }}
          />
        </View>

        <CustomTextInput
          name="phone"
          label="Phone number"
          placeholder="0610234567"
          inputMode="tel"
        />

        <CustomButton
          title="Next"
          onPress={form.handleSubmit(onNext)}
          style={styles.button}
        />
      </FormProvider>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    gap: 5,
  },
  button: {
    marginTop: 'auto',
    marginBottom: 20,
  },
});
