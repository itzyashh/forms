import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';

const personalInfo = {
  fullName: 'Vadim Savin',
  address: 'Poblenou',
  city: 'Barcelona',
  postcode: '1234',
  phone: '60123123123',
  country: 'ES',
};

const paymentInfo = {
  cardNumber: '1234123412341234',
  expires: '01/30',
  cvv: '123',
};

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
    <KeyboardAwareScrollView>
      <View style={{ gap: 10, flex: 1 }}>
        {personalInfo && (
          <View style={styles.dataContainer}>
            <View style={styles.dataContainerHeader}>
              <Text style={styles.title}>Personal</Text>
              <Link
                href={'/checkout'}
                style={{ color: '#005055', fontWeight: '600' }}
              >
                Edit
              </Link>
            </View>
            {Object.entries(personalInfo).map(([key, value]) => (
              <Text key={key}>
                {key}: {value}
              </Text>
            ))}
          </View>
        )}

        {paymentInfo && (
          <View style={styles.dataContainer}>
            <View style={styles.dataContainerHeader}>
              <Text style={styles.title}>Payment</Text>
              <Link
                href={'/checkout/payment'}
                style={{ color: '#005055', fontWeight: '600' }}
              >
                Edit
              </Link>
            </View>
            {Object.entries(paymentInfo).map(([key, value]) => (
              <Text key={key}>
                {key}: {value}
              </Text>
            ))}
          </View>
        )}

        <CustomButton title="Submit" onPress={onNext} style={styles.button} />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    paddingBottom: 25,
    gap: 15,
  },
  dataContainer: {
    borderWidth: 1,
    borderColor: 'gainsboro',
    padding: 10,
    borderRadius: 10,
    gap: 3,
  },
  dataContainerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
});
