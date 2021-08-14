import * as React from "react";
import { Alert } from "react-native";

import * as IP from "expo-image-picker";

export const useMediaLibraryAccess = () => {
  const [access, setAccess] = React.useState<boolean>(false);
  const [mediaObj, setMediaObj] = React.useState<any>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const media = await IP.getMediaLibraryPermissionsAsync();

        setAccess(media.granted);
      } catch {}
    })();
  }, []);

  const requestMediaLibraryAccessAsync = async () => {
    try {
      const access = await IP.requestMediaLibraryPermissionsAsync();
      if (access && !access.granted) {
        Alert.alert(
          "Access needed",
          "We need access to your media library for uploading an image.",
          [{ text: "Close", style: "cancel", onPress: () => {} }]
        );
        return;
      }
      setAccess(access.granted);
    } catch {
      Alert.alert(
        "Something went wrong",
        "Please try uploading your image again. Make sure you granted access to your media library",
        [{ text: "Close", style: "cancel", onPress: () => {} }]
      );
    }
  };

  const launchMediaLibraryAsync = async () => {
    try {
      if (!access) await requestMediaLibraryAccessAsync();
      const res = await IP.launchImageLibraryAsync({
        mediaTypes: IP.MediaTypeOptions.Images,
        allowsEditing: true,
        allowsMultipleSelection: false,
        quality: 0.5,
      });

      if (res && res.cancelled) return;
      setMediaObj(res);
    } catch {
      Alert.alert(
        "Something went wrong",
        "Please try uploading your image again. Make sure you have granted access to your media library",
        [{ text: "Close", style: "cancel", onPress: () => {} }]
      );
    }
  };

  return {
    access,
    mediaObj,
    requestMediaLibraryAccessAsync,
    launchMediaLibraryAsync,
  };
};
