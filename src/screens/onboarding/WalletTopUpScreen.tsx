import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";

import ViewPager from "react-native-pager-view";
import QRCode from "react-native-qrcode-svg";
import { CustomPlainInput } from "components/forms/CustomPlainInput";
import { DuplicateIcon, LeftArrowIcon } from "icons/index";
import { Typography, Colors, Sizing, Outlines, Forms } from "styles/index";
import { appContext } from "contexts/contextApi";
import { FullWidthButton } from "components/buttons/fullWidthButton";
import { BodyText } from "components/rnWrappers/bodyText";
import { ProfileContext } from "contexts/profileContext";
import { WalletSetUpModal } from "components/modals/walletSetUpModal";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { CopyMessage } from "components/popups/copyMessage";

export interface WalletTopUpScreenProps {
  pagerRef?: React.RefObject<ViewPager>;
  navigation?: any;
  route?: any;
}

export const WalletTopUpScreen = ({
  route,
  pagerRef,
}: WalletTopUpScreenProps) => {
  const navigation = useNavigation();
  var { colorScheme, ref } = appContext();
  const [isLightMode, setIsLightMode] = React.useState<boolean>(false);
  const [address, setAddress] = React.useState<string>("");
  const [amount, setAmount] = React.useState<string>("");
  const [copyMsgActive, setCopyMsgActive] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isVisibleModal, setIsVisibleModal] = React.useState<boolean>(false);
  const { hasSyncedWallet, walletBalance, setWalletBalance } = React.useContext(
    ProfileContext
  );
  const windowWidth = useWindowDimensions().width;

  const isRegistrationScreen = pagerRef?.current instanceof ViewPager;
  const isBookingScreen = route != null && route.params?.isBookingScreen;
  const isDisabled = !address || !amount;

  const onTextChangeCallback = (value: any) => setAddress(value);
  const onAmountChangeCallback = (value: any) => setAmount(value);

  const onBackNavigationPress = () => navigation.goBack();

  const wait = (ms: number): Promise<void> =>
    new Promise((res) => setTimeout(res, ms));

  const processPayment = async () => {
    // if user hasn't synced any wallet yet:
    if (!hasSyncedWallet) return setIsVisibleModal(true);

    setIsLoading(true);
    //@TODO change in production
    await wait(2000);
    setWalletBalance(Number(walletBalance) + Number(amount));
    setIsLoading(false);

    // this means we are on the onboarding screen
    if (isRegistrationScreen) {
      navigation.navigate("Deposit Successful", {
        fromScreen: "User Registration Screens",
      });
    }

    if (route != null && route.params?.fromScreen != null) {
      navigation.navigate("Deposit Successful", {
        fromScreen: route.params.fromScreen,
      });
    }

    // navigation.navigate("Deposit Successful", { isBookingWalletTopUp: true });
  };

  const hideModal = () => setIsVisibleModal(false);

  const WalletTopUpModal = React.useMemo(
    () => (
      <View>
        <WalletSetUpModal hideModal={hideModal} isVisible={isVisibleModal} />
      </View>
    ),
    [isVisibleModal]
  );

  const onCopyPress = () => {
    Clipboard.default.setString(address);
    setCopyMsgActive(true);
    setTimeout(() => setCopyMsgActive(false), 2000);
  };

  React.useEffect(() => {
    if (pagerRef?.current instanceof ViewPager) {
      setIsLightMode(false);
    } else {
      setIsLightMode(colorScheme === "light");
    }
  }, [colorScheme]);

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isLightMode
            ? Colors.primary.neutral
            : Colors.primary.s800,
        }}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={40}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[
            isLightMode ? styles.container_light : styles.container_dark,
          ]}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}>
            {!isRegistrationScreen ? (
              <View style={styles.navigation}>
                <Pressable onPress={onBackNavigationPress} hitSlop={10}>
                  <LeftArrowIcon
                    width={24}
                    height={24}
                    color={
                      isLightMode ? Colors.primary.s600 : Colors.primary.neutral
                    }
                  />
                </Pressable>
              </View>
            ) : (
              <View style={{ marginTop: Sizing.x20 }} />
            )}
            <View style={styles.header}>
              <Text
                style={[
                  isLightMode
                    ? styles.headerText_light
                    : styles.headerText_dark,
                ]}>
                {isBookingScreen ? "Add funds" : "Set up your wallet"}
              </Text>
              {isBookingScreen ? (
                <BodyText
                  colors={[Colors.primary.s600, Colors.primary.neutral]}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum venenatis quam sem, eget bibendum lorem convallis
                  et. Donec velit ante, efficitur at ante eu, consequat
                  hendrerit augue. Vivamus quis eros ex
                </BodyText>
              ) : (
                <Text
                  style={[
                    isLightMode
                      ? styles.subHeaderText_light
                      : styles.subHeaderText_dark,
                  ]}>
                  Deposit /withdrawl ADA into your wallet to make payments, and
                  receive payments.
                </Text>
              )}
            </View>
            <View style={styles.main}>
              <View style={styles.qrCodeContainer}>
                <QRCode
                  value="https://gimbalabs.com"
                  size={windowWidth / 2}
                  backgroundColor={Colors.primary.neutral}
                />
              </View>
            </View>
            <CustomPlainInput
              label="Address"
              placeholder="addr9czf30t9dzbdsxe79a2vtf8io"
              icon={DuplicateIcon}
              styles={Object.assign(
                styles,
                isLightMode ? formStyleLight : formStyleDark
              )}
              onChangeCallback={onTextChangeCallback}
              onPressHandler={onCopyPress}
              customChild={<CopyMessage isActive={copyMsgActive} />}
            />
            <CustomPlainInput
              label="Amount"
              placeholder="50 ₳"
              styles={Object.assign(
                styles,
                isLightMode ? formStyleLight : formStyleDark
              )}
              keyboardType="numeric"
              onChangeCallback={onAmountChangeCallback}
              onPressHandler={() => {}}
            />
            <View style={styles.buttonWrapper}>
              <FullWidthButton
                onPressCallback={processPayment}
                text={"Deposit"}
                colorScheme={colorScheme}
                disabled={isDisabled}
                loadingIndicator={isLoading}
                buttonType={!isLightMode ? "transparent" : "filled"}
                lightMode={isLightMode}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        {isVisibleModal && WalletTopUpModal}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container_light: {
    backgroundColor: Colors.primary.neutral,
    alignItems: "center",
  },
  container_dark: {
    backgroundColor: Colors.primary.s600,
    alignItems: "center",
  },
  header: {
    width: "100%",
  },
  scrollView: {
    width: "90%",
    height: "100%",
  },
  headerText_light: {
    ...Typography.header.x65,
    color: Colors.primary.s800,
    marginBottom: Sizing.x5,
  },
  headerText_dark: {
    ...Typography.header.x65,
    color: Colors.primary.neutral,
    marginBottom: Sizing.x5,
  },
  main: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Sizing.x25,
  },
  qrCodeContainer: {
    padding: Sizing.x25,
    backgroundColor: Colors.primary.neutral,
    borderRadius: Outlines.borderRadius.base,
  },
  subHeaderText_light: {
    ...Typography.subHeader.x35,
    fontFamily: "Roboto-Regular",
    color: Colors.primary.s600,
  },
  subHeaderText_dark: {
    ...Typography.subHeader.x35,
    fontFamily: "Roboto-Regular",
    color: Colors.primary.neutral,
  },
  navigation: {
    flexDirection: "row",
    width: "90%",
    marginVertical: Sizing.x15,
  },
  buttonWrapper: {
    marginVertical: Sizing.x12,
  },
  /**
   * styles passed as prop to CustomPlainInput
   */
  inputContainer: {
    width: "100%",
    marginBottom: Sizing.x10,
  },
  labelContainer: {
    width: "100%",
  },
  textInputWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    left: -40,
    width: Sizing.x35,
    height: Sizing.x35,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: Sizing.x30,
    height: Sizing.x30,
  },
});

const formStyleLight = StyleSheet.create({
  label: {
    ...Forms.inputLabel.primary_light,
  },
  input: {
    width: "100%",
    ...Forms.input.primary_light,
    ...Outlines.shadow.lifted,
  },
  placeholderText: {
    color: Colors.primary.s300,
  },
});

const formStyleDark = StyleSheet.create({
  label: {
    ...Forms.inputLabel.primary_dark,
  },
  input: {
    width: "100%",
    ...Forms.input.primary_dark,
    ...Outlines.shadow.lifted,
  },
  placeholderText: {
    color: Colors.primary.s300,
  },
});
