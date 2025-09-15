import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "n4w8o5wo", 
  dataset: "production",
  useCdn: true,
});


