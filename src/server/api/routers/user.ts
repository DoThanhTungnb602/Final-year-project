import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import bcrypt from "bcryptjs";

import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { UpdateNameSchema, UpdatePasswordSchema } from "~/schemas";

export const userRouter = createTRPCRouter({
  updateName: protectedProcedure
    .input(UpdateNameSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.user.update({
          where: { id: ctx.session.user.id },
          data: { name: input.name },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update name",
        });
      }

      return { success: "Name updated successfully", name: input.name };
    }),

  updateAvatar: protectedProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.isOAuth) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot change avatar for OAuth users",
        });
      }
      try {
        await ctx.db.user.update({
          where: { id: ctx.session.user.id },
          data: { image: input.url },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update avatar",
        });
      }

      return { success: "Avatar updated successfully", url: input.url };
    }),

  updatePassword: protectedProcedure
    .input(UpdatePasswordSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
        select: { password: true },
      });

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found",
        });
      }
      if (ctx.session.user.isOAuth) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot change password for OAuth users",
        });
      }

      const passwordMatch = await bcrypt.compare(
        input.currentPassword,
        user.password as string,
      );

      if (!passwordMatch) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Current password is incorrect",
        });
      }

      const hashedPassword = await bcrypt.hash(input.newPassword, 10);

      try {
        await ctx.db.user.update({
          where: { id: ctx.session.user.id },
          data: { password: hashedPassword },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update password",
        });
      }

      return { success: "Password updated successfully" };
    }),
});
