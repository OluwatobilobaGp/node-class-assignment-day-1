import { z } from "zod";

const profileFields = {
  phone: z.string().trim().max(30).optional(),
  address: z.string().trim().max(300).optional(),
  gender: z.string().trim().max(40).optional(),
  bio: z.string().trim().max(500).optional()
};

export const createProfileSchema = z.object({
  body: z.object({
    userId: z.string().regex(/^[a-f\d]{24}$/i).optional(),
    ...profileFields
  }).strict()
});
