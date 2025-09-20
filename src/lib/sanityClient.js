import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process?.env?.NEXT_PUBLIC_SANITY_PROJECT_ID || "n4w8o5wo",
  dataset: process?.env?.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  apiVersion: "2023-05-03",
  token: 'skq4MewCYqhZI7Ibjf0e6YqtK7cTfPZ72xOyxJ9dQZfNCmzqmwv1VFgsukEznP3l6nASHeSBPQFOxyJO27aaKM4H2MbXqEBqJ9pNANaSTEtXZmASy9BrUpkT60P8H71IaTWSU6wxdvOtls0lzJg3UMgMtl5Zgiv6gFIVmMHkSO3sDZAJT9QW',
});
