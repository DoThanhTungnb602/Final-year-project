import * as z from "zod";

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export const ProfileSettingsSchema = z
  .object({
    name: z.string().optional(),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmNewPassword: z.string().optional(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords do not match",
    path: ["confirmNewPassword"],
  })
  .refine(
    (data) => {
      if (!data.currentPassword) {
        return true;
      }
      return data.newPassword !== data.currentPassword;
    },
    {
      message: "New password must be different from the current password",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (
        (data.currentPassword && data.newPassword && data.confirmNewPassword) ||
        (!data.currentPassword && !data.newPassword && !data.confirmNewPassword)
      )
        return true;
      return false;
    },
    {
      message: "Please fill in all password fields",
      path: ["currentPassword"],
    },
  );

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(1, {
      message: "Name is required",
    }),
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const NewPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
