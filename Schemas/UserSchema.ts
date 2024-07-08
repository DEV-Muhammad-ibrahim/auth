import {z} from 'zod';

export const userSchema = z.object({
  name:z.string().min(3,{message:"Must be 3 or more characters long"}),
  email:z.string().email({message:"Invalid email address"})
}) 