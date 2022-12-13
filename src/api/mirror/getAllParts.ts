import { request } from "./request";
import { Clothes as ClothesType, Tab } from "./types";

export type GetAllPartsRequest = {
  face_id: string;
};

export type GetAllPartsResponse = {
  clothes: ClothesType;
  tabs: Tab[];
};

export async function getAllParts(data: GetAllPartsRequest): Promise<GetAllPartsResponse> {
  const search = new URLSearchParams();
  search.append('face_id', data.face_id);

  return request<GetAllPartsResponse>(`/v2/get_all_parts?${search.toString()}`, {
    method: 'GET',
  });
}
