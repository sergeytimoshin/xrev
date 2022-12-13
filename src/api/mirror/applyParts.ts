import { createFormData } from "./formData";
import { request } from "./request";
import { Color, Face, Template } from "./types";

export type ApplyPartsRequest = {
  face_id: string;
  parts?: Record<string, Template['id']>;
  colors?: Record<string, Color['id']>;
  preview?: 0 | 1;
  clothes?: Record<string, Template['id']>;
};

export type ApplyPartsResponse = {
  face: Face;
};

export async function applyParts(data: ApplyPartsRequest): Promise<ApplyPartsResponse> {
  return request<ApplyPartsResponse>('/v2/apply_parts', {
    method: 'POST',
    body: createFormData(data),
  });
}
