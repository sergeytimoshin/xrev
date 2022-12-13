import { useCallback } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { getAllParts } from "../api/mirror/getAllParts";
import { Face } from "../api/mirror/types";
import { allPartsAtom } from "../atoms/allParts";
import { appliedPartsAtom } from "../atoms/appliedParts";
import { faceAtom } from "../atoms/face";

export function useFace(): [Face | null, (face?: Face) => Promise<void>] {
  const [face, setFace] = useRecoilState(faceAtom);
  const resetFace = useResetRecoilState(faceAtom);
  const setAllParts = useSetRecoilState(allPartsAtom);
  const resetAllParts = useResetRecoilState(allPartsAtom);
  const resetAppliedParts = useResetRecoilState(appliedPartsAtom);
  const updateFace = useCallback(async (newFace?: Face) => {
      if (!newFace) {
        resetFace();
        resetAllParts();
      } else {
        const allParts = await getAllParts({face_id: newFace.id});
        setFace(newFace);
        setAllParts(allParts);
      }
      resetAppliedParts();
  }, [setFace, setAllParts, resetAppliedParts, resetFace, resetAllParts]);

  return [face, updateFace];
}