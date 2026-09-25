export interface Workout {
  id?: string;
  _id?: string;
  name?: string;
  title?: string;
  category?: string;
  muscleGroups?: string[];
  equipment?: string;
  description?: string;
  duration?: number;
  calories?: number;
  caloriesBurned?: number;
  rating?: number;
  image?: string;
  imageUrl?: string;
  completed?: boolean;
}