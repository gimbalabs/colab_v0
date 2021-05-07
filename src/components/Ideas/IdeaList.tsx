import * as React from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { Buttons, Colors, Typography, Sizing, Outlines } from "styles/index";
import { Icon } from "react-native-eva-icons";

export interface IdeaProps {
  value: string;
  key: string;
}

export interface IdeaListProps {
  item: IdeaProps;
  onIdeaInputChange: (value: string, key: string) => void;
  removeIdea: (key: string) => void;
}

export const IdeaList = ({
  item,
  onIdeaInputChange,
  removeIdea,
}: IdeaListProps) => {
  var inputRef: TextInput | null;

  return (
    <View style={styles.ideaItem}>
      <View style={styles.ideaTextWrapper}>
        <TextInput
          ref={(input) => (inputRef = input)}
          onChangeText={(value) => onIdeaInputChange(value, item.key)}
          style={styles.ideaText}
          value={item.value}></TextInput>
      </View>
      <View style={styles.ideaIcons}>
        <Pressable
          onPress={() => {
            console.log(inputRef);
            inputRef && inputRef.focus();
          }}
          style={Buttons.applyOpacity(styles.icon)}>
          <Icon name="edit" width={24} height={24} fill={Colors.neutral.s500} />
        </Pressable>
        <Pressable
          onPress={() => removeIdea(item.key)}
          style={Buttons.applyOpacity(styles.icon)}>
          <Icon
            name="trash-2-outline"
            width={24}
            height={24}
            fill={Colors.danger.s400}
            style={styles.icon}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ideaItem: {
    overflow: "hidden",
    alignItems: "center",
    flexDirection: "row",
  },
  ideaTextWrapper: {
    borderTopWidth: Outlines.borderWidth.hairline,
    borderRadius: Outlines.borderRadius.small,
    width: "90%",
  },
  ideaText: {
    padding: Sizing.x10,
    flex: 1,
    ...Typography.body.x30,
  },
  ideaIcons: {
    alignItems: "center",
    width: "10%",
  },
  icon: {
    marginBottom: Sizing.x5,
  },
});
