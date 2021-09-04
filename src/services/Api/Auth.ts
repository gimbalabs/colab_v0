import axios from "./base";

export class ChallengeRequestDTO {
  constructor(challenge: string, signature: string) {
    this.challenge = challenge;
    this.signature = signature;
  }

  challenge: string;
  signature: string;
}

export class Auth {
  async requestChallenge(id: string): Promise<any | void> {
    try {
      const res = await axios.get(`/auth/${id}/challenge`);
      if (res.data) return res.data;
    } catch (e) {
      if (e.response) console.error(e.response.data);
    }
  }

  async requestAccessToken(
    challenge: string,
    signature: string,
    id: string
  ): Promise<{ index: string } | void> {
    const challengeRequestDTO = new ChallengeRequestDTO(challenge, signature);

    try {
      const res = await axios.post(`/auth/${id}/login`, challengeRequestDTO);
      if (res.data) return res.data;
    } catch (e) {
      if (e.response) console.error(e.response.data);
    }
  }
}
