import * as React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";

import { AddIdea } from "components/ideas/AddIdea";
import { IdeaList } from "components/ideas/IdeaList";
import { Typography, Sizing } from "styles/index";

// export interface AddIdeasProps
//   extends StackScreenProps<OrganizerTabParamList, "Add Ideas"> {}

export interface Todo {
  value: string;
  key: string;
}

export const AddIdeasScreen = () => {
  const [data, setData] = React.useState<Todo[]>([]);

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

  const onIdeaInputChange = (value: string, key: string) => {
    setData((prevTodos) => {
      prevTodos.find((todo) => todo.key === key)!.value = value;
      return [...prevTodos];
    });
  };

  const removeIdea = (key: string) => {
    setData((prevTodos) => {
      var newTodos = prevTodos.filter((todo) => todo.key !== key);
      return [...newTodos];
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
      <View style={styles.ideasList}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <IdeaList
              removeIdea={removeIdea}
              onIdeaInputChange={onIdeaInputChange}
              item={item}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, flexDirection: "column" },
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
  ideasList: {
    //@TODO: Need to add more scalable solution for max height
    maxHeight: 435,
    padding: Sizing.x5,
    marginVertical: Sizing.x20,
    marginHorizontal: Sizing.x30,
    flexDirection: "column",
  },
});
