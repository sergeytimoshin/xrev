import { request } from "./request";

export type MintAvatarRequest = {
  recipient: string;
  image: string;
  faceId: string;
};

export type MintAvatarResponse = {
  id: string;
  onChain: {
    status: string,
    chain: string,
  };
};

export async function mintAvatar(data: MintAvatarRequest): Promise<MintAvatarResponse> {
  return request<MintAvatarResponse>('cm_mintNFT', [
    'MAU',
    data.recipient,
    {
      name: "MAU avatar",
      image: data.image,
      description: "MAU avatar",
    },
  ]);
}
