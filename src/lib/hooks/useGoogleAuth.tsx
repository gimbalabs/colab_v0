import * as React from "react";

import { AxiosResponse } from "axios";
import { MOBILE_APP_SCHEMA } from "@env";
import * as WebBrowser from "expo-web-browser";
import axios from "Api/base";

export const useGoogleAuth = () => {
  const [isRequesting, setIsRequesting] = React.useState<boolean>(false);

  React.useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  const requestAccess = async () => {
    setIsRequesting(true);
    try {
      const res: AxiosResponse<any> = await axios.get("auth/google-oauth-url");
      const { authUrl } = await res.data;

      if (authUrl) {
        await WebBrowser.openAuthSessionAsync(authUrl, MOBILE_APP_SCHEMA);
      }

      setIsRequesting(false);
      return;
    } catch (err) {
      setIsRequesting(false);
      throw new Error(err);
    }
  };

  return {
    isRequesting,
    requestAccess,
  };
};
