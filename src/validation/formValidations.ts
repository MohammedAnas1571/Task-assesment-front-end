import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().trim().min(1, 'Password is required').min(6, 'Password must be at least 6 characters long'),
});

export const roleSchema = z.object({
  rolename: z.string().trim().min(1, { message: "Role name is required" }),
});

export const editSchema = z.object({
  rolename: z.string().trim().min(1, { message: "Role name is required" }),
  isBlock:z.string()
})


export const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email({ message: "Invalid email address" }),
  mobile: z.string().min(1, "Mobile is required").regex(/^\d{10}$/, "Invalid mobile number. It should contain exactly 10 digits."),
  role: z.string().min( 1, "Role is required" ),
  image: z.union([
    z.instanceof(File,{message:"please provide a image file"}).refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "Image size should be less than 10MB",
    }).refine((file) => {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      return validImageTypes.includes(file.type);
    }, {
      message: "Invalid file type",
    }),
    z.string()
  ])
});


export const userEditSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email({ message: "Invalid email address" }),
  mobile: z.string().min(1, "Mobile is required").regex(/^\d{10}$/, "Invalid mobile number. It should contain exactly 10 digits."),
  role: z.string().min( 1, "Role is required" ),
  isBlock:z.string(),
  image: z.union([
    z.instanceof(File).refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "Image size should be less than 10MB",
    }).refine((file) => {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      return validImageTypes.includes(file.type);
    }, {
      message: "Invalid file type",
    }),
    z.string()
  ])
});