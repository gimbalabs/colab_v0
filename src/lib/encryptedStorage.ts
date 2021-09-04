import * as SC from "expo-secure-store";

export const setToEncryptedStorage = async (
  key: string,
  value: any
): Promise<void> => {
  try {
    value = JSON.stringify(value);

    await SC.setItemAsync(key, value);
  } catch (e) {
    throw new Error(e);
  }
};

export const removeFromEncryptedStorage = async (key: string) => {
  try {
    await SC.deleteItemAsync(key);
  } catch (e) {
    throw new Error(e);
  }
};

export const isAvailableEncrptedStorage = async (): Promise<boolean> => {
  try {
    return await SC.isAvailableAsync();
  } catch {
    return false;
  }
};

export const getFromEncryptedStorage = async (
  key: string
): Promise<string | null> => {
  try {
    const val = await SC.getItemAsync(key);

    if (val != null) {
      return JSON.parse(val);
    } else {
      return null;
    }
  } catch (e) {
    throw new Error(e);
  }
};
