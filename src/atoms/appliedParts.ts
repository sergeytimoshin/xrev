import { atom } from "recoil";
import { ApplyPartsRequest } from "../api/mirror/applyParts";
import { persistAtom } from "./persistAtom";

export type AppliedParts = Omit<ApplyPartsRequest, 'face_id' | 'preview'>;

export const appliedPartsDefault = {};

export const appliedPartsAtom = atom<AppliedParts>({
  key: "appliedParts",
  default: appliedPartsDefault,
  effects: [persistAtom('appliedParts')],
});
