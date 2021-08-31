import axios from "./base";

export class Users {
  async getUser(id: string): Promise<any> {
    try {
      const res = await axios.get(`user/${id}`);
      const data = res.data;
      return data;
    } catch (e) {
      if (e.response) {
        if (e.status === 401) {
          throw new Error("User not authorized");
        } else {
          throw new Error(e.toJSON());
        }
      } else if (e.request) {
        throw new Error("Something went wrong. Please try again later.");
      } else {
        // report problem with creating the request ** e.config **
      }
    }
  }

  public async createAccount(values: any): Promise<void> {
    try {
      await axios.post("/auth/register", values);
    } catch (e) {
      throw new Error(e);
    }
  }
}
