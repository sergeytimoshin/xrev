import { PublicKey } from "@solana/web3.js";
import { useCallback } from "react";
import { mintAvatar, MintAvatarRequest, MintAvatarResponse } from "../api/solana/mintAvatar";
import { useReady } from "./xnft-hooks";

export type MintResult = {
  request: MintAvatarRequest,
  response: MintAvatarResponse
};

export function useMint() {
  return useCallback(async (image: string, faceId: string): Promise<MintResult> => {
    const publicKey = window.xnft?.solana?.publicKey as PublicKey | undefined;
    if (!publicKey) {
      throw new Error('No publicKey');
    }

    const request = { recipient: `solana:${publicKey.toString()}`, image: image, faceId: faceId};
    const response = await mintAvatar(request);
    return {
      request,
      response,
    };
  }, []);
}
