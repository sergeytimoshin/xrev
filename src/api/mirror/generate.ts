import { createFormData } from "./formData";
import { request } from "./request";
import { Face } from "./types";

export type GenerateRequest = {
  photo: File;
  style?: 'kenga' | 'anime' | 'mau'
};

export type GenerateResponse = {
  face: Face;
};

export async function generate({photo, style = 'kenga'}: GenerateRequest): Promise<GenerateResponse> {
  const search = new URLSearchParams();
  search.append('style', style);

  return request<GenerateResponse>(`/v2/generate?${search.toString()}`, {
    method: 'POST',
    body: createFormData({photo}),
  });
}
