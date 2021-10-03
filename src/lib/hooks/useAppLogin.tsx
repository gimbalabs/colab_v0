import { setAuthorizationToken } from "Api/base";
import { getFromEncryptedStorage } from "lib/encryptedStorage";
import { startChallengeSequence } from "lib/helpers";
import * as React from "react";

export const useAppLogin = () => {
  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false);
  const [isAuthLoaded, setIsAuthLoaded] = React.useState<boolean>(false);
  const isExpired = (expiration: Date) => expiration > new Date();

  React.useEffect(() => {
    (async () => {
      try {
        let jwt = await getFromEncryptedStorage("accessToken");
        let sec = await getFromEncryptedStorage("secret");
        let pub = await getFromEncryptedStorage("public");

        if (jwt && isExpired(jwt.expiresAt)) {
          setAuthorizationToken(jwt.accessToken);
          setIsAuthorized(true);
        } else if (sec && pub) {
          const jwtDto = await startChallengeSequence(pub, false);
          if (jwtDto) {
            setAuthorizationToken(jwtDto.accessToken);
            setIsAuthorized(true);
          }
        } else {
          setIsAuthorized(false);
        }

        setIsAuthLoaded(true);
      } catch (e) {
        setIsAuthLoaded(true);
      }
    })();
  }, []);

  return { isAuthorized, isAuthLoaded };
};
