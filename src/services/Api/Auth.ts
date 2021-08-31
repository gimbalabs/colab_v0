import axios from "./base";

export class Auth {
  async getChallenge(id: string): Promise<any | void> {
    try {
      const res = await axios.get(`/auth/${id}/challenge`);
      if (res.data) return res.data;
    } catch (e) {
      console.error(e);
    }
  }

  async sendSignedChallenge(challenge: string): Promise<any | void> {}
}
