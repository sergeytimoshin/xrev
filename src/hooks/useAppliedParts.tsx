import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { applyParts } from '../api/mirror/applyParts';
import { AppliedParts, appliedPartsAtom } from '../atoms/appliedParts';
import { faceAtom } from '../atoms/face';
import { makeCancelable } from '../utils/makeCancelable';

export type ApplyHanlder = (type: keyof AppliedParts, name: string, value: number) => void;

export function useAppliedParts(): [AppliedParts, ApplyHanlder] {
  const [appliedParts, setAppliedParts] = useRecoilState(appliedPartsAtom);
  const [face, setFace] = useRecoilState(faceAtom);

  const handleAppliedParts = useCallback<ApplyHanlder>((type, name, value) => {
    if (face?.id) {
      const newAppliedParts: AppliedParts = {
        ...appliedParts,
        [type]: {
          ...appliedParts[type],
          [name]: value,
        },
      };

      setAppliedParts(newAppliedParts);

      const [promise, cancel] = makeCancelable(applyParts({
        ...newAppliedParts,
        face_id: face.id,
      }));

      promise
        .then(({face}) => setFace(face))
        .catch(console.error);

      return cancel;
    }
  }, [appliedParts, face]);

  return [appliedParts, handleAppliedParts];
}
