import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { ClassSchema } from "~/schemas";

import {
  adminProcedure,
  createTRPCRouter,
} from "~/server/api/trpc";

export const classRouter = createTRPCRouter({
  all: adminProcedure.query(async ({ ctx }) => {
    try {
      const classes = await ctx.db.class.findMany({
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

  getById: adminProcedure.input(z.string()).query(async ({ ctx, input }) => {
    try {
      const class_ = await ctx.db.class.findUnique({
        where: {
          id: input,
        },
        include: {
          students: true,
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

  delete: adminProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    try {
      await ctx.db.class.delete({
        where: {
          id: input,
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
});
