import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';

export default function PaymentDetailsForm() {
  const onNext = () => {
    //validate form

    //redirect to next page
    router.push('/checkout/confirm');
  };
  return (
    <KeyboardAwareScrollView>
      <Text>Payment details</Text>
      <CustomButton title="Next" onPress={onNext} style={styles.button} />
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
