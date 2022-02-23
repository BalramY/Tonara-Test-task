import * as React from 'react';
import {View, TextInput as TextField, StyleSheet, Text} from 'react-native';

interface Data {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  width?: number;
  error?: boolean;
}

export default function TextInput(props: Data) {
  // Text input component
  const {placeholder, value, onChangeText, width, error} = props;
  return (
    <View
      style={{
        width: width ? width : '100%',
        alignItems: width ? null : 'center',
        marginBottom: 15,
      }}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: '700',
          marginBottom: 8,
          alignSelf: 'flex-start',
        }}>
        {placeholder}
      </Text>

      <TextField
        placeholder={'Enter here'}
        value={value}
        style={[
          styles.input,
          {
            width: width || 300,
            height: 40,
            borderColor: error ? 'red' : '#D8D8D8',
          },
        ]}
        onChangeText={(e: string) => {
          onChangeText(e);
        }}
        placeholderTextColor={'black'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
});
