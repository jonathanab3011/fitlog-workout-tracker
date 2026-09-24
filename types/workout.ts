export interface Workout {
  id: number;
  name: string;
  image: string;
  imageUrl?: string;    
  img?: string;          
  thumbnail?: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}