import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Pressable,
} from "react-native";
import { AddIdea } from "components/Ideas/AddIdea";
import { IdeaList } from "components/Ideas/IdeaList";
import { StackScreenProps } from "@react-navigation/stack";
import { OrganizerTabParamList } from "common/types/navigationTypes";
import { Buttons, Colors, Outlines, Typography, Sizing, Forms } from "styles";

export interface AddIdeasProps
  extends StackScreenProps<OrganizerTabParamList, "Add Ideas"> {}

export const AddIdeasScreen = ({ navigation }: AddIdeasProps) => {
  const [data, setData] = React.useState<object[]>([]);

  const submitHandler = (value: string) => {
    setData((prevTodo) => {
      return [
        // need a more scalable solution than Math.random() for keys, this is just a placeholder
        {
          value: value,
          key: Math.random().toString(),
        },
        ...prevTodo,
      ];
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>IDEAS</Text>
        <Text style={styles.subHeader}>
          "Ideas" are how Organizers share their current interests with the
          community
        </Text>
      </View>
      <AddIdea submitHandler={submitHandler} />
      <View style={styles.ideasView}>
        <View style={styles.ideasList}>
          <FlatList
            data={data}
            renderItem={({ item }) => <IdeaList item={item} />}
          />
        </View>
      </View>
      <View style={styles.bottom}>
        <Pressable onPress={() => navigation.popToTop()}>
          <Text style={styles.bottomButtonText}>Back to menu</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    marginTop: Sizing.x20,
    marginHorizontal: Sizing.x20,
  },
  headerText: {
    ...Typography.header.x50,
    margin: Sizing.x10,
  },
  subHeader: {
    margin: Sizing.x10,
    ...Typography.body.x30,
  },
  ideasView: {
    marginHorizontal: Sizing.x20,
  },
  ideasViewHeader: {},
  ideasList: {},
  bottom: {},
  bottomButtonText: {},
});
