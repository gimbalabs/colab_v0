import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

import Modal from "react-native-modal";
import { Sizing } from "styles/index";

export interface ErrorModalProps {
  isModalVisible: boolean;
}

export const ErrorModal = ({ isModalVisible }: ErrorModalProps) => {
  return (
    <Modal isVisible={isModalVisible} style={styles.modal}>
      <Text>Hello World</Text>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    height: Sizing.x25,
    width: "100%",
  },
});
