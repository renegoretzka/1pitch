import React from "react";
import { StyleSheet } from "react-native";

import { useUser } from "../../context/User";

import { color } from "../../styles/colors";

const ChatsScreen = ({ navigation }) => {
  const { user, login, logout } = useUser();

  return <></>;
};

const styles = StyleSheet.create({});

export default ChatsScreen;
