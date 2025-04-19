import { z } from 'zod';

// Schema untuk data pemain bola
export const TopPlayerSchema = z.object({
  rank: z.number(), // Bisa kosong
  // rank_goals: z.number().optional(), // Bisa kosong
  // rank_assists: z.number().optional(), // Bisa kosong
  name: z.string(),
  image_url: z.string().url(),
  appearances: z.number(),
  goals: z.number(),
  assists: z.number(),
  nation: z.string(),
  nation_code: z.string(),
  club: z.string(),
  // height: z.string(),
  date_of_birth: z.string(),
  position: z.string(),
  jersey_name: z.string(),
  minutes_played: z.number(),
  period: z.string(),
});

// Type yang dihasilkan dari schema
export type TopPlayer = z.infer<typeof TopPlayerSchema>;

// Schema untuk array data pemain bola
export const TopPlayersSchema = z.array(TopPlayerSchema);

// Fungsi untuk memvalidasi data dengan debugging
export const validateTopPlayers = (data: unknown) => {
  try {
    console.log("Validating data:", data);
    const validatedData = TopPlayersSchema.parse(data);
    console.log("Validation successful:", validatedData);
    return validatedData;
  } catch (error) {
    console.error("Validation error:", error);
    throw error;
  }
};