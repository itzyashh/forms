import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';

export default function ConfirmForm() {
  const onNext = () => {
    //validate form

    //submit data

    //redirect to next page

    router.dismissAll();
    if (router.canGoBack()) {
      router.back();
    } else {
      // Handle the case where there is no screen to go back to
      console.warn('No screen to go back to');
    }
  };
  return (
    <View style={styles.container}>
      <Text>Confirm form</Text>
      <CustomButton title="Submit" onPress={onNext} style={styles.button} />
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
