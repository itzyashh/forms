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

export default function PersonalDetailsForm() {
  const [fullName, setFullName] = useState<string>('');

  const onNext = () => {
    //validate form

    //redirect to next page
    router.push('/checkout/payment');
  };
  return (
    <KeyboardAwareScrollView>
      <CustomTextInput label="Full name" placeholder="John Doe" />

      <CustomTextInput label="Address" placeholder="4 rue de paris" />

      <View style={{ flexDirection: 'row', gap: 5 }}>
        <CustomTextInput
          label="City"
          placeholder="City"
          containerStyle={{ flex: 1 }}
        />
        <CustomTextInput
          label="Post Code"
          placeholder="1234"
          inputMode="numeric"
          containerStyle={{ flex: 1 }}
        />
      </View>

      <CustomTextInput
        label="Phone number"
        placeholder="0610234567"
        inputMode="tel"
      />

      <CustomButton title="Next" onPress={onNext} style={styles.button} />
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
