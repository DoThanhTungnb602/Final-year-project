import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { ClassSchema, ExerciseSchema, TestSchema } from "~/schemas";
import { v4 as uuidv4 } from "uuid";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { protectedRoutes } from "~/routes";

export const classRouter = createTRPCRouter({
  all: adminProcedure.query(async ({ ctx }) => {
    try {
      const classes = await ctx.db.class.findMany({
        orderBy: {
          id: "asc",
        },
        include: {
          students: true,
        },
      });
      return classes;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch classes",
      });
    }
  }),

  getEnrolledClasses: protectedProcedure.query(async ({ ctx }) => {
    try {
      const classes = await ctx.db.class.findMany({
        where: {
          students: {
            some: {
              id: ctx.session.user.id,
            },
          },
        },
        orderBy: {
          id: "asc",
        },
        include: {
          students: true,
        },
      });
      return classes;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch classes",
      });
    }
  }),

  getById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      try {
        const class_ = await ctx.db.class.findUnique({
          where: {
            id: input,
          },
          include: {
            students: {
              orderBy: {
                id: "asc",
              },
            },
            exercises: {
              orderBy: {
                id: "asc",
              },
            },
            tests: {
              orderBy: {
                id: "asc",
              },
            },
          },
        });

        if (!class_) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Class not found",
          });
        }

        return class_;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch class",
        });
      }
    }),

  create: adminProcedure.input(ClassSchema).mutation(async ({ ctx, input }) => {
    try {
      return await ctx.db.class.create({
        data: {
          ...input,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create problem",
      });
    }
  }),

  getExerciseById: adminProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      try {
        const exercise = await ctx.db.exercise.findUnique({
          where: {
            id: input,
          },
          include: {
            problems: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        });

        if (!exercise) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Exercise not found",
          });
        }

        return exercise;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch exercise",
        });
      }
    }),

  addExercise: adminProcedure
    .input(
      z.object({
        classroomId: z.string(),
        ...ExerciseSchema.shape,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { classroomId, problems, ...exercise } = input;
      try {
        return await ctx.db.class.update({
          where: {
            id: classroomId,
          },
          data: {
            exercises: {
              create: {
                ...exercise,
                problems: {
                  connect: problems.map((problem) => ({
                    id: problem.id,
                  })),
                },
              },
            },
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to add exercise to class",
        });
      }
    }),

  editExercise: adminProcedure
    .input(z.object({ id: z.string(), ...ExerciseSchema.shape }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { problems, ...exercise } = input;
        return await ctx.db.exercise.update({
          where: {
            id: exercise.id,
          },
          data: {
            ...exercise,
            problems: {
              set: problems.map((problem) => ({
                id: problem.id,
              })),
            },
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update exercise",
        });
      }
    }),

  deleteExercise: adminProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.exercise.delete({
          where: {
            id: input,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete exercise",
        });
      }
    }),

  deleteManyExercises: adminProcedure
    .input(z.array(z.string()))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.exercise.deleteMany({
          where: {
            id: {
              in: input,
            },
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete exercises",
        });
      }
    }),

  addTest: adminProcedure
    .input(
      z.object({
        classroomId: z.string(),
        ...TestSchema.shape,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { classroomId, problems, ...test } = input;
      try {
        return await ctx.db.class.update({
          where: {
            id: classroomId,
          },
          data: {
            tests: {
              create: {
                ...test,
                problems: {
                  connect: problems.map((problem) => ({
                    id: problem.id,
                  })),
                },
              },
            },
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to add test to class",
        });
      }
    }),

  getTestById: adminProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      try {
        const test = await ctx.db.test.findUnique({
          where: {
            id: input,
          },
          include: {
            problems: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        });

        if (!test) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Test not found",
          });
        }

        return test;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch test",
        });
      }
    }),

  editTest: adminProcedure
    .input(z.object({ id: z.string(), ...TestSchema.shape }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { problems, ...test } = input;
        return await ctx.db.test.update({
          where: {
            id: test.id,
          },
          data: {
            ...test,
            problems: {
              set: problems.map((problem) => ({
                id: problem.id,
              })),
            },
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update test",
        });
      }
    }),

  deleteTest: adminProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.test.delete({
          where: {
            id: input,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete test",
        });
      }
    }),

  deleteManyTests: adminProcedure
    .input(z.array(z.string()))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.test.deleteMany({
          where: {
            id: {
              in: input,
            },
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete tests",
        });
      }
    }),

  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        ...ClassSchema.shape,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.class.update({
          where: {
            id: input.id,
          },
          data: {
            ...input,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update class",
        });
      }
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.class.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete class",
        });
      }
    }),

  deleteStudentById: adminProcedure
    .input(
      z.object({
        classId: z.string(),
        studentId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.class.update({
          where: {
            id: input.classId,
          },
          data: {
            students: {
              disconnect: {
                id: input.studentId,
              },
            },
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete student from class",
        });
      }
    }),

  generateInviteCode: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.class.update({
          where: {
            id: input.id,
          },
          data: {
            inviteCode: uuidv4(),
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate invite link",
        });
      }
    }),

  enroll: protectedProcedure
    .input(
      z.object({
        inviteCode: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.db.user.findUnique({
          where: {
            id: ctx.session.user.id,
          },
        });
        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }
        const existingClass = await ctx.db.class.findUnique({
          where: {
            inviteCode: input.inviteCode,
            students: {
              some: {
                id: user.id,
              },
            },
          },
        });
        if (existingClass) {
          return {
            message: "You are already enrolled in this class",
            ...existingClass,
          };
        }
        const class_ = await ctx.db.class.update({
          where: {
            inviteCode: input.inviteCode,
          },
          data: {
            students: {
              connect: {
                id: user.id,
              },
            },
          },
        });
        return {
          message: "Successfully enrolled in class",
          ...class_,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to enroll class",
        });
      }
    }),

  leave: protectedProcedure
    .input(z.object({ classId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.db.user.findUnique({
          where: {
            id: ctx.session.user.id,
          },
        });
        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }
        await ctx.db.class.update({
          where: {
            id: input.classId,
          },
          data: {
            students: {
              disconnect: {
                id: user.id,
              },
            },
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to leave class",
        });
      }
    }),
});
