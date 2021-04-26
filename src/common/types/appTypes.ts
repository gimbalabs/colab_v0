/**
 * @types for appContext.tsx file.
 */

export enum Types {
  ToggleAuth = "TOGGLE_AUTH",
}

/**
 * @name ActionMap
 * @description maps trough indexed types of AppPayload and assigns
 *              the payload accordingly (if the action type isn't undefined)
 */
export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AppPayload = {
  [Types.ToggleAuth]: {
    authentication: boolean;
  };
};

export type AppActions = ActionMap<AppPayload>[keyof ActionMap<AppPayload>];
