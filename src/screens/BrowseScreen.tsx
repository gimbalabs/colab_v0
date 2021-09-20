import * as React from "react";
import { View, StyleSheet, Pressable } from "react-native";

import PagerView from "react-native-pager-view";
import SwitchSelector from "react-native-switch-selector";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { Colors, Outlines, Sizing, Typography } from "styles/index";
import { BookingStackParamList } from "common/types/navigationTypes";
import { appContext } from "contexts/contextApi";
import { SearchIcon } from "icons/index";
import { VerticalBrowseList } from "components/lists/VerticalBrowseList";
// import { CardsList } from "components/lists/browseScreen/HorizontalCardsList";

export interface BrowseProps
  extends StackScreenProps<BookingStackParamList, "Browse"> {
  children: React.ReactNode;
}

export const BrowseScreen = ({ navigation }: BrowseProps) => {
  const { colorScheme } = appContext();
  const [page, setPage] = React.useState<number>(0);
  const pagerRef = React.useRef<PagerView>(null);
  const isLightMode = colorScheme !== "dark";

  // const renderFeaturedLists = React.useCallback(() => {
  //   return browseFeatured.map((list, index) => (
  //     <CardsList
  //       horizontal={false}
  //       navigateTo={navigateTo}
  //       key={getRandomKey(index)}
  //       list={list}
  //     />
  //   ));
  // }, [browseFeatured]);
  // const navigateTo = (params: BookingStackParamList["Available Dates"]) => {
  //   navigation.navigate("Available Dates", params);
  // };

  // const onSwitch = (val: number) => setPage(val);

  // const renderPage = React.useMemo(() => {
  //   return (
  //     <View key={page} style={styles.main}>
  //       <VerticalBrowseList cardType={PAGES[page]} />
  //     </View>
  //   );
  // }, [page]);

  return (
    <SafeAreaView
      style={[
        colorScheme == "light" ? styles.safeArea_light : styles.safeaArea_dark,
      ]}>
      <View
        style={[
          styles.topNavContainer,
          {
            borderBottomColor: isLightMode
              ? Colors.primary.s600
              : Colors.primary.neutral,
          },
        ]}>
        {/*<SwitchSelector
          initial={0}
          onPress={onSwitch}
          textColor={isLightMode ? Colors.primary.s600 : Colors.primary.neutral}
          textStyle={{
            ...Typography.header.x30,
          }}
          selectedTextStyle={{ ...Typography.header.x30 }}
          selectedColor={
            isLightMode ? Colors.primary.neutral : Colors.primary.s800
          }
          buttonColor={
            isLightMode ? Colors.primary.s600 : Colors.primary.neutral
          }
          hasPadding
          options={[
            { label: "Events", value: 0 },
            { label: "Organizers", value: 1 },
          ]}
          accessibilityLabel="browse-switch-selector"
          backgroundColor={
            isLightMode ? Colors.primary.neutral : Colors.primary.s600
          }
          borderColor={"transparent"}
          style={{
            width: "85%",
            ...Outlines.shadow.base,
          }}
        />*/}
        <Pressable style={styles.searchIconBtn} onPress={() => {}} hitSlop={10}>
          <SearchIcon
            width={24}
            height={24}
            stroke={
              colorScheme === "light"
                ? Colors.primary.s600
                : Colors.primary.neutral
            }
            strokeWidth={2}
          />
        </Pressable>
      </View>
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        scrollEnabled={true}
        initialPage={0}
        showPageIndicator={false}>
        {renderPage}
      </PagerView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea_light: {
    flex: 1,
    backgroundColor: Colors.primary.neutral,
  },
  safeaArea_dark: {
    flex: 1,
    backgroundColor: Colors.primary.s600,
  },
  container: {
    width: "90%",
  },
  topNavContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    position: "absolute",
    marginTop: Sizing.x10,
    paddingBottom: Sizing.x5,
    top: 0,
    width: "100%",
    borderBottomWidth: Outlines.borderWidth.thin,
    zIndex: 10,
  },
  searchToolContainer: {
    alignItems: "flex-end",
    marginVertical: Sizing.x10,
  },
  searchIconBtn: {
    width: Sizing.x50,
    height: Sizing.x50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Outlines.borderRadius.base,
    ...Outlines.shadow.base,
  },
  main: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
