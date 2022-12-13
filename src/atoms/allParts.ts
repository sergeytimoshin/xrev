import { atom } from "recoil";
import { GetAllPartsResponse } from "../api/mirror/getAllParts";
import { persistAtom } from "./persistAtom";

export const allPartsAtom = atom<GetAllPartsResponse | null>({
  key: "allParts",
  default: null,
  effects: [persistAtom('allParts')],
});
