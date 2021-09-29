import * as React from "react";

import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import axios from "Api/base";
import { AxiosResponse } from "axios";

export const useGoogleAuth = () => {
  const [isRequesting, setIsRequesting] = React.useState<boolean>(false);
  const [isFailed, setIsFailed] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Android specific, for speeding up prompt message
    WebBrowser.warmUpAsync();
    Linking.addEventListener("url", (event) =>
      console.log("linking event : ", event)
    );

    // create url Linking.createUrl()
    // parese url Linking.parse() , and get params out from it
    // eg const {path, queryParams} = Linking.parse(url)
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  const requestAccess = async () => {
    setIsRequesting(true);
    if (isFailed) setIsFailed(false);
    try {
      const res: AxiosResponse<any> = await axios.get("auth/google-oauth-url");
      const { authUrl } = await res.data;

      if (authUrl) {
        const result = await WebBrowser.openAuthSessionAsync(
          authUrl,
          Linking.createURL("/")
        );

        if (result.type !== "success")
          // throw an error
          console.log("result of webbrowser :", result);
      }

      setIsRequesting(false);
      return;
    } catch (err) {
      setIsRequesting(false);
      setIsFailed(true);
      throw new Error(err);
    }
  };
  return {
    isRequesting,
    isFailed,
    requestAccess,
  };
};
