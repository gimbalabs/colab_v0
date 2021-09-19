import { setAuthorizationToken } from "Api/base";
import { getFromEncryptedStorage } from "lib/encryptedStorage";
import { startChallengeSequence } from "lib/helpers";
import * as React from "react";

export const useAppLogin = () => {
  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      try {
        let jwt = await getFromEncryptedStorage("accessToken");
        let sec = await getFromEncryptedStorage("secret");
        let pub = await getFromEncryptedStorage("public");

        if (jwt) {
          if (jwt.expiresAt > new Date().getTime())
            setAuthorizationToken(jwt.accessToken);
          setIsAuthorized(true);
        }

        if (!jwt && sec && pub) {
          const jwtDto = await startChallengeSequence(pub, false);
          if (jwtDto) setAuthorizationToken(jwtDto.accessToken);
          setIsAuthorized(true);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return { isAuthorized };
};
