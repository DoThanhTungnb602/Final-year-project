import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { ClassSchema } from "~/schemas";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const classRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const role = ctx.session?.user.role;
    if (role != "ADMIN") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You are not authorized to fetch classes",
      });
    }
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

  getById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const role = ctx.session?.user.role;
      if (role != "ADMIN") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to fetch classes",
        });
      }

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

  create: protectedProcedure
    .input(ClassSchema)
    .mutation(async ({ ctx, input }) => {
      const role = ctx.session?.user.role;

      if (role != "ADMIN") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to create a class",
        });
      }

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

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        ...ClassSchema.shape,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const role = ctx.session?.user.role;

      if (role != "ADMIN") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to update a class",
        });
      }

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

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const role = ctx.session?.user.role;

      if (role != "ADMIN") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to delete a class",
        });
      }

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
});
