import * as z from "zod";
import { Difficulty } from "@prisma/client";

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

export const SubmissionSchema = z.object({
  code: z.string().min(1),
  languageId: z.string().min(1),
  problemId: z.string().min(1),
  exerciseId: z.string().optional(),
  testId: z.string().optional(),
});

export const ProblemFilterSchema = z.object({
  difficulty: z.nativeEnum(Difficulty).optional(),
  tags: z.array(z.string()).optional(),
  status: z.nativeEnum(Status).optional(),
  search: z.string().optional(),
});

export const ProblemSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().min(1),
  difficulty: z.nativeEnum(Difficulty),
  isPublic: z.boolean(),
  tags: z.array(z.object({ id: z.string(), name: z.string() })).optional(),
  timeLimit: z.number().optional(),
  memoryLimit: z.number().optional(),
  skeletons: z.array(
    z.object({
      languageId: z.string(),
      code: z.string(),
    }),
  ),
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
  testCaseDrivers: z.array(
    z.object({ languageId: z.string(), code: z.string() }),
  ),
  solution: z.string().optional(),
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
  dueDate: z.date({
    invalid_type_error: "Due date is required",
  }),
  problems: z.array(z.object({ id: z.string() })).min(1, {
    message: "At least one problem is required",
  }),
});

export const TestSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  startTime: z.date({
    invalid_type_error: "Start time is required",
  }),
  duration: z.coerce
    .number({
      invalid_type_error: "Duration is required",
    })
    .int()
    .positive(),
  problems: z.array(z.object({ id: z.string() })).min(1, {
    message: "At least one problem is required",
  }),
});

export const JoinClassSchema = z.object({
  inviteCode: z.string().nonempty(),
});
