import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";

import { useUser } from "../../context/User";
import { useNotification } from "../../context/Notifications";
import { useModals } from "../../context/Modals";

import Modal from "../../context/Modals/Modal";

import TextInputWrapper from "../ui/TextInputWrapper";
import SubmitButton from "../ui/SubmitButton";

import { textLink, textNormal } from "../../styles/containers";
import { Ionicons } from "@expo/vector-icons";

const UserConfirmationModal = ({ email, navigation }) => {
  const { signUpConfirmation, resendConfirmation } = useUser();
  const { pushNotification } = useNotification();
  const { modalIsShown, hideAllModals, showModal } = useModals();

  const [confirmationCode, setConfirmationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (modalIsShown("UserConfirmation")) {
      setErrorMessage("");
      setConfirmationCode("");
    }
  }, [modalIsShown("UserConfirmation")]);

  const ResendConfirmationIcon = () => (
    <Ionicons name="ios-send" size={30} color="white" />
  );

  const handleResendConfirmation = async () => {
    try {
      await resendConfirmation({ username: email });
      pushNotification({
        text: `A new confirmation code has been send to ${email}.`,
        icon: ResendConfirmationIcon,
      });
    } catch (error) {
      console.log("Error from handleResendConfirmation", error);
    }
  };

  const SuccessConfirmationIcon = () => (
    <Ionicons name="ios-checkmark-circle-outline" size={30} color="white" />
  );

  const handleSignUpConfirmationSubmit = async () => {
    try {
      setLoading(true);
      const user = await signUpConfirmation({
        username: email,
        code: confirmationCode,
      });
      setLoading(false);
      if (user === "SUCCESS") {
        hideAllModals();
        navigation.goBack();
        pushNotification({
          text:
            "You have successfully registered and verified your account. Please login to your newly created account.",
          icon: SuccessConfirmationIcon,
        });
      }
    } catch (error) {
      setLoading(false);
      if (error.message === "CODE_MISMATCH") {
        setErrorMessage(
          "Invalid verification code provided, please try again."
        );
      } else if (error.message === "LIMIT_EXCEEDED") {
        setErrorMessage("Attempt limit exceeded, please try after some time.");
      } else {
        console.log("Error from handleSignUpConfirmationSubmit", error);
      }
    }
  };

  return (
    <>
      <Modal
        name="UserConfirmation"
        header="Account confirmation"
        spacing={150}
        navigation={navigation}
        hideNavigation={true}
      >
        <ScrollView style={styles.content}>
          <Text style={[textNormal, styles.text]}>
            Please confirm your account by entering the confirmation code we
            have send to your email address.
          </Text>
          <Pressable onPress={handleResendConfirmation} style={styles.row}>
            <Text style={textNormal}>
              Didnt receive your confirmation code?
            </Text>
            <Text style={textLink}> Click here to resend it.</Text>
          </Pressable>
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
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              placeholder="Confirmation code"
              autoCompleteType="off"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="number-pad"
              style={styles.textInput}
            />
            <SubmitButton
              onPress={handleSignUpConfirmationSubmit}
              value="Confirm"
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

export default UserConfirmationModal;
