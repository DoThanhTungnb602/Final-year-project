import * as z from "zod";
import { Difficulty, Topic } from "@prisma/client";

enum Status {
  TODO = "TODO",
  SOLVED = "SOLVED",
  ATTEMPTED = "ATTEMPTED",
}

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export const UpdateNameSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const UpdatePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    newPassword: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    confirmNewPassword: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "New password must be different from the current password",
    path: ["newPassword"],
  });

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

export const SolutionSchema = z.object({
  code: z.string().min(1, {
    message: "Solution is required",
  }),
  languageId: z.number(),
  problemId: z.number(),
});

export const ProblemFilterSchema = z.object({
  difficulty: z.nativeEnum(Difficulty).optional(),
  tags: z.array(z.string()),
  status: z.nativeEnum(Status).optional(),
  search: z.string(),
});

export const ProblemSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  difficulty: z.nativeEnum(Difficulty),
  tags: z.array(z.nativeEnum(Topic)).min(1, {
    message: "At least one tag is required",
  }),
  timeLimit: z.number().optional(),
  memoryLimit: z.number().optional(),
  testcases: z
    .string()
    .min(1, {
      message: "Test cases are required",
    })
    .refine(
      (data) => {
        try {
          JSON.parse(data);
          return true;
        } catch (e) {
          return false;
        }
      },
      {
        message: "Invalid test cases. Please enter a valid JSON array",
      },
    ),
  solution: z.string().min(1, {
    message: "Solution is required",
  }),
});

export const ClassSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const ExerciseSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  assignedDate: z.date({
    errorMap: (issue, { defaultError }) => ({
      message:
        issue.code === "invalid_type"
          ? "Assigned date is required"
          : defaultError,
    }),
  }),
  dueDate: z.date({
    errorMap: (issue, { defaultError }) => ({
      message:
        issue.code === "invalid_type"
          ? "Due date is required"
          : defaultError,
    }),
  }),
  problems: z.array(z.string()).min(1, {
    message: "At least one problem is required",
  }),
});
