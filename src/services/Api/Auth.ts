import axios from "./base";

export class ChallengeRequestDTO {
  constructor(challenge: string, signature: string, userCredential: any) {
    this.challenge = challenge;
    this.signature = signature;
    this.userCredential = userCredential;
  }

  challenge: string;
  signature: string;
  userCredential: UserCredential;
}

export type UserCredential = { [index: string]: any };

export class Auth {
  public static async requestChallenge(
    credential: UserCredential
  ): Promise<any | void> {
    try {
      const res = await axios.post("/auth/challenge", credential);
      if (res.data) return res.data;
    } catch (e) {
      if (e.response) console.error(e.response.data);
    }
  }

  public static async requestAccessToken(
    challenge: string,
    signature: string,
    userCredential: UserCredential
  ): Promise<{ index: string } | void> {
    const challengeRequestDTO = new ChallengeRequestDTO(
      challenge,
      signature,
      userCredential
    );

    try {
      const res = await axios.post(`/auth/login`, challengeRequestDTO);
      if (res.data) return res.data;
    } catch (e) {
      if (e.response) console.error(e.response.data);
    }
  }
}
