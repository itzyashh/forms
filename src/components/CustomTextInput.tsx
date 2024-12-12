import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, { ComponentProps } from 'react';
import { useController } from 'react-hook-form';

type CustomTextInputProps = {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  name: string;
} & ComponentProps<typeof TextInput>;

export default function CustomTextInput({
  label,
  containerStyle,
  name,
  ...textInputProps
}: CustomTextInputProps) {
  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useController({ name });

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        {...textInputProps}
        value={value}
        onBlur={onBlur}
        onChangeText={onChange}
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
