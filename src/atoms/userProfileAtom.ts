/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { atom } from "recoil";

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const userProfileAtom = atom({
  key: "userProfile",
  default: {} as UserProfile,
  effects: [localStorageEffect("userProfile")],
});
