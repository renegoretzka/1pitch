import React from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { color } from "../../styles/colors";
import { inputError, textInput } from "../../styles/containers";

// TODO: Close button when entering the input field

const TextInputWrapper = ({
  state,
  setState,
  placeholder,
  errorMessage,
  setErrorMessage,
  autoCompleteType,
  autoCapitalize,
  editable,
  keyboardType,
  secureTextEntry,
  textContentType,
  multiline,
  numberOfLines,
  style,
}) => {
  return (
    <>
      <TextInput
        value={state}
        onChangeText={(text) => {
          setState(text);
        }}
        onFocus={
          setErrorMessage
            ? () => {
                setErrorMessage("");
                setState("");
              }
            : null
        }
        editable={editable}
        placeholder={placeholder}
        placeholderTextColor={color.placeholder}
        selectionColor={color.secondary}
        autoCompleteType={autoCompleteType}
        autoCorrect={false}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        keyboardAppearance="dark"
        secureTextEntry={secureTextEntry}
        textContentType={textContentType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={[
          textInput,
          style,
          {
            color: editable === false ? color.lightWhite : color.white,
            paddingTop: multiline ? 10 : 0,
          },
        ]}
      />
      {errorMessage ? <Text style={inputError}>{errorMessage}</Text> : null}
    </>
  );
};

export default TextInputWrapper;
