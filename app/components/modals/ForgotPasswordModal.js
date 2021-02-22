import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { useUser } from "../../context/User";
import { useNotification } from "../../context/Notifications";
import { useModals } from "../../context/Modals";

import Modal from "../../context/Modals/Modal";

import TextInputWrapper from "../ui/TextInputWrapper";
import SubmitButton from "../ui/SubmitButton";

import { textNormal } from "../../styles/containers";
import { Ionicons } from "@expo/vector-icons";

const ForgotPasswordModal = ({ email, navigation }) => {
  const { confirmForgotPassword } = useUser();
  const { pushNotification } = useNotification();
  const { modalIsShown, hideModal } = useModals();

  const [confirmationCode, setConfirmationCode] = useState("");
  const [errorMessageCode, setErrorMessageCode] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (modalIsShown("ForgotPassword")) {
      setErrorMessageCode("");
      setErrorMessagePassword("");
      setConfirmationCode("");
      setNewPassword("");
    }
  }, [modalIsShown("ForgotPassword")]);

  const ForgotPasswordSuccessIcon = () => (
    <Ionicons name="ios-checkmark-circle-outline" size={30} color="white" />
  );

  const handleForgotPasswordConfirmationSubmit = async () => {
    try {
      setLoading(true);
      const forgotPasswordSuccess = await confirmForgotPassword({
        username: email,
        code: confirmationCode,
        newPassword: newPassword,
      });
      setLoading(false);
      if (forgotPasswordSuccess) {
        pushNotification({
          text: "Password has been successfully set.",
          icon: ForgotPasswordSuccessIcon,
        });
        hideModal("ForgotPassword");
      }
    } catch (error) {
      setLoading(false);
      if (error.message === "CODE_MISMATCH") {
        setErrorMessageCode(
          "Invalid verification code provided, please try again."
        );
      } else if (error.message === "LIMIT_EXCEEDED") {
        setErrorMessagePassword(
          "Attempt limit exceeded, please try after some time."
        );
      } else {
        console.log("Error from handleForgotPasswordConfirmationSubmit", error);
      }
    }
  };

  return (
    <>
      <Modal
        name="ForgotPassword"
        header="Set new password"
        spacing={150}
        navigation={navigation}
      >
        <ScrollView style={styles.content}>
          <Text style={[textNormal, styles.text]}>
            Please confirm your account by entering the confirmation code we
            have send to your email address and set your new password.
          </Text>
          <View style={styles.form}>
            <TextInputWrapper
              state={email}
              placeholder="Email address"
              editable={false}
              style={styles.textInput}
            />
            <TextInputWrapper
              state={confirmationCode}
              setState={setConfirmationCode}
              errorMessage={errorMessageCode}
              setErrorMessage={setErrorMessageCode}
              placeholder="Confirmation code"
              autoCompleteType="off"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="number-pad"
              style={styles.textInput}
            />
            <TextInputWrapper
              state={newPassword}
              setState={setNewPassword}
              errorMessage={errorMessagePassword}
              setErrorMessage={setErrorMessagePassword}
              placeholder="New password"
              autoCompleteType="password"
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true}
              style={styles.textInput}
            />
            <SubmitButton
              onPress={handleForgotPasswordConfirmationSubmit}
              value="Set new password"
              loading={loading}
              style={styles.formButton}
            />
          </View>
        </ScrollView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 10,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    marginBottom: 15,
  },
  form: {
    marginBottom: 20,
  },
  textInput: {
    marginTop: 20,
  },
});

export default ForgotPasswordModal;
