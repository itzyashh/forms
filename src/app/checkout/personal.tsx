import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';

export default function PersonalDetailsForm() {
  const onNext = () => {
    //validate form

    //redirect to next page
    router.push('/checkout/payment');
  };
  return (
    <View style={styles.container}>
      <Text>Personal details</Text>
      <CustomButton title="Next" onPress={onNext} style={styles.button} />
    </View>
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
