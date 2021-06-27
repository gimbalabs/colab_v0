import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Alert,
  LayoutChangeEvent,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Buttons, Outlines, Typography, Sizing, Colors } from "styles/index";
import { StackScreenProps } from "@react-navigation/stack";
import { OrganizerTabParamList } from "common/types/navigationTypes";
import { appContext } from "contexts/contextApi";
import { RefreshIcon, RightArrowIcon, SearchIcon } from "icons/index";
import { TransactionsList } from "components/wallet/transactionsList";

// @TODO: Implement navigationTypes type
export interface WalletScreenProps
  extends StackScreenProps<OrganizerTabParamList, "Wallet"> {}

function wait(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

export const WalletScreen = ({}: WalletScreenProps) => {
  const { colorScheme } = appContext();
  const [layoutHeight, setLayoutHeight] = React.useState<any>(null);
  const [isSmallScreen, setIsSmallScreen] = React.useState<boolean>(true);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const darkGradient: string[] = [Colors.primary.s800, Colors.primary.s600];
  const lightGradient: string[] = [Colors.primary.s200, Colors.primary.neutral];

  React.useEffect(() => {}, []);

  const addFunds = () => {
    Alert.alert(
      // title
      "No wallet connected yet!",
      // message
      "Connect to your wallet to add funds and make transactions",
      // array of buttons
      [{ text: "Return", style: "cancel" }]
    );
  };

  const onLayout = (e: LayoutChangeEvent) => {
    setLayoutHeight(e.nativeEvent.layout.height);

    if (layoutHeight && layoutHeight < 300) {
      setIsSmallScreen(true);
    }
  };

  const onRefreshPress = async () => {
    setIsLoading(true);
    await wait(2000);
    setIsLoading(false);
  };

  return (
    <SafeAreaView
      style={[
        colorScheme == "light" ? styles.safeArea_light : styles.safeaArea_dark,
      ]}>
      <View style={styles.container}>
        <View style={styles.searchToolContainer}>
          <SearchIcon
            width={28}
            height={28}
            stroke={
              colorScheme === "light"
                ? Colors.primary.s800
                : Colors.primary.neutral
            }
            strokeWidth={1.6}
          />
        </View>
        <LinearGradient
          colors={colorScheme === "light" ? darkGradient : lightGradient}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.walletContainer}>
          <Text
            style={[
              colorScheme == "light"
                ? styles.walletHeader_ligth
                : styles.walletHeader_dark,
              { marginRight: "auto" },
            ]}>
            Current balance
          </Text>
          <Text
            style={[
              colorScheme == "light"
                ? styles.walletBalance_ligth
                : styles.walletBalance_dark,
            ]}>
            52 ₳
          </Text>
          <Pressable
            onPress={addFunds}
            pressRetentionOffset={15}
            hitSlop={15}
            style={Buttons.applyOpacity(
              colorScheme == "light"
                ? styles.walletButton_light
                : styles.walletButton_dark
            )}>
            <Text
              style={[
                colorScheme == "light"
                  ? styles.walletButtonText_light
                  : styles.walletButtonText_dark,
              ]}>
              Add funds
            </Text>
          </Pressable>
        </LinearGradient>
        <View onLayout={onLayout} style={styles.transactionsContainer}>
          <View style={styles.transactionsHeaderContainer}>
            <View style={styles.transactionsHeader}>
              <Text
                style={
                  colorScheme === "light"
                    ? styles.transactionsHeaderText_light
                    : styles.transactionsHeaderText_dark
                }>
                Transaction
              </Text>
              <Text
                style={
                  colorScheme === "light"
                    ? styles.transactionsSubheaderText_light
                    : styles.transactionsSubheaderText_dark
                }>
                Last 30 days
              </Text>
            </View>
            <View style={styles.iconWrapper}>
              {isSmallScreen && (
                <Pressable onPress={onRefreshPress} hitSlop={5}>
                  <RefreshIcon
                    width={22}
                    height={22}
                    stroke={
                      colorScheme === "light"
                        ? !isLoading
                          ? Colors.primary.s600
                          : Colors.primary.s800
                        : Colors.primary.neutral
                    }
                    strokeWidth={!isLoading ? 1.5 : 1.6}
                  />
                </Pressable>
              )}
              <RightArrowIcon
                width={28}
                height={28}
                color={
                  colorScheme === "light"
                    ? Colors.primary.s600
                    : Colors.primary.neutral
                }
                style={{ marginLeft: "auto" }}
              />
            </View>
          </View>
          <TransactionsList
            isLoading={isLoading}
            isSmallScreen={isSmallScreen}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea_light: {
    flex: 1,
    backgroundColor: Colors.primary.neutral,
    alignItems: "center",
  },
  safeaArea_dark: {
    flex: 1,
    backgroundColor: Colors.primary.s600,
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "90%",
  },
  searchToolContainer: {
    alignItems: "flex-end",
    marginTop: Sizing.x10,
  },
  walletContainer: {
    height: 220,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Sizing.x25,
    padding: Sizing.x15,
    borderRadius: Outlines.borderRadius.base,
    ...Outlines.shadow.lifted,
  },
  walletHeader_ligth: {
    ...Typography.header.x35,
    color: Colors.primary.s180,
  },
  walletHeader_dark: {
    ...Typography.header.x35,
    color: Colors.primary.s600,
  },
  walletBalance_ligth: {
    fontFamily: "Roboto-Medium",
    fontSize: 64,
    color: Colors.primary.neutral,
  },
  walletBalance_dark: {
    fontFamily: "Roboto-Medium",
    fontSize: 64,
    color: Colors.primary.s800,
  },
  walletButton_light: {
    paddingVertical: Sizing.x2,
    paddingHorizontal: Sizing.x7,
    borderWidth: 4,
    borderColor: Colors.primary.neutral,
    borderRadius: Outlines.borderRadius.base,
    marginBottom: Sizing.x20,
    backgroundColor: "transparent",
  },
  walletButton_dark: {
    paddingVertical: Sizing.x2,
    paddingHorizontal: Sizing.x7,
    borderWidth: 4,
    borderColor: Colors.primary.s800,
    borderRadius: Outlines.borderRadius.base,
    marginBottom: Sizing.x20,
    backgroundColor: "transparent",
  },
  walletButtonText_light: {
    ...Typography.header.x30,
    textAlign: "center",
    color: Colors.primary.neutral,
  },
  walletButtonText_dark: {
    ...Typography.header.x30,
    textAlign: "center",
    color: Colors.primary.s800,
  },
  transactionsContainer: {
    flex: 1,
    marginTop: Sizing.x40,
  },
  transactionsHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionsHeader: {},
  transactionsHeaderText_light: {
    ...Typography.header.x35,
    marginBottom: Sizing.x5,
    color: Colors.primary.s800,
  },
  transactionsHeaderText_dark: {
    ...Typography.header.x35,
    marginBottom: Sizing.x5,
    color: Colors.primary.neutral,
  },
  transactionsSubheaderText_light: {
    ...Typography.subHeader.x10,
    color: Colors.primary.s600,
  },
  transactionsSubheaderText_dark: {
    ...Typography.subHeader.x10,
    color: Colors.primary.s180,
  },
  iconWrapper: {
    width: "20%",
    flexDirection: "row",
    marginLeft: "auto",
    alignItems: "center",
  },
});
