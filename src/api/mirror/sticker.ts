import { request } from "./request";

export type StickerRequest = {
  face_id: string;
  sticker: string;
};

export type StickerResponse = {
  url: string;
};

export async function sticker(data: StickerRequest): Promise<StickerResponse> {
  const search = new URLSearchParams();
  search.append('face_id', data.face_id);
  search.append('sticker', data.sticker);

  return request<StickerResponse>(`/v2/sticker?${search.toString()}`, {
    method: 'GET',
  });
}
