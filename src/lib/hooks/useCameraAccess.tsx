import * as React from "react";
import { Alert } from "react-native";

import * as IP from "expo-image-picker";

export const useCameraAccess = () => {
  const [access, setAccess] = React.useState<boolean>(false);
  const [imageObj, setImgObj] = React.useState<any>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const media = await IP.getCameraPermissionsAsync();

        setAccess(media.granted);
      } catch {}
    })();
  }, []);

  const requestCameraAccessAsync = async () => {
    try {
      const access = await IP.requestCameraPermissionsAsync();
      if (access && !access.granted) {
        Alert.alert(
          "Access needed",
          "We need access to your devices camera for uploading an image.",
          [{ text: "Close", style: "cancel", onPress: () => {} }]
        );
        return;
      }
      setAccess(access.granted);
    } catch {
      Alert.alert(
        "Something went wrong",
        "Please try taking a picture again. Make sure you have granted access to your devices camera.",
        [{ text: "Close", style: "cancel", onPress: () => {} }]
      );
    }
  };

  const launchCameraAsync = async () => {
    try {
      if (!access) await requestCameraAccessAsync();
      const res = await IP.launchCameraAsync({
        mediaTypes: IP.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.5,
      });

      if (res && res.cancelled) return;
      setImgObj(res);
    } catch {
      Alert.alert(
        "Something went wrong",
        "Please try taking a picture again. Make sure you have granted access to your devices camera.",
        [{ text: "Close", style: "cancel", onPress: () => {} }]
      );
    }
  };

  return { access, imageObj, requestCameraAccessAsync, launchCameraAsync };
};
