import { z } from "zod";

export const searchFormSchema = z
  .object({
    origin: z.string().nonempty("Origin is required").length(3),
    destination: z.string().nonempty("Destination is required").length(3),
    date: z.string().nonempty("Date is required"),
  })
  .refine((data) => data.origin !== data.destination, {
    message: "Origin and destination cannot be the same",
    path: ["destination"],
  });

export type SearchFormData = z.infer<typeof searchFormSchema>;
