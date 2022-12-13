import { atom } from "recoil";
import { Face } from "../api/mirror/types";
import { persistAtom } from "./persistAtom";

export const faceAtom = atom<Face | null>({
  key: "face",
  default: null,
  effects: [persistAtom('face')],
});
