import { setAuthorizationToken } from "Api/base";
import { getFromEncryptedStorage } from "lib/encryptedStorage";
import { startChallengeSequence } from "lib/helpers";
import * as React from "react";

export const useAppLogin = () => {
  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false);
  const [isAuthLoaded, setIsAuthLoaded] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<any>(null);
  const isExpired = (expiration: Date) => expiration > new Date();

  React.useEffect(() => {
    (async () => {
      try {
        let at = await getFromEncryptedStorage("accessToken");
        let sec = await getFromEncryptedStorage("secret");
        let pub = await getFromEncryptedStorage("public");

        if (at && !isExpired(at.expiresAt)) {
          setAuthorizationToken(at.accessToken);
          setIsAuthorized(true);
          setUser({
            username: at.username,
            profileType: at.profileType,
            id: at.id,
          });
        } else if (sec && pub) {
          const atDto = await startChallengeSequence(pub, false);
          if (atDto) {
            setAuthorizationToken(atDto.accessToken);
            setIsAuthorized(true);
            setUser({
              username: atDto.username,
              profileType: atDto.profileType,
              id: atDto.id,
            });
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

  // const setUserInfo = (args: any): void => {
  //   const { id, username, name } = args;
  //   setId(id);
  //   setUsername(username);
  //   setProfileType(name);
  // };

  return { isAuthorized, isAuthLoaded, user };
};
