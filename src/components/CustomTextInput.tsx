import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, { ComponentProps } from 'react';

type CustomTextInputProps = {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
} & ComponentProps<typeof TextInput>;

export default function CustomTextInput({
  label,
  containerStyle,
  ...textInputProps
}: CustomTextInputProps) {
  const error = undefined as { message: string } | undefined;
  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        {...textInputProps}
        style={[
          styles.input,
          textInputProps.style,
          error ? styles.errorInput : {},
        ]}
      />
      <Text style={styles.error}>{error?.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'gainsboro',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 2,
  },

  errorInput: {
    borderColor: 'crimson',
  },
  label: {
    fontWeight: '600',
    color: 'dimgrey',
  },
  error: {
    color: 'crimson',
    height: 17,
  },
});
