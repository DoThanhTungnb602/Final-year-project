import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  updateAvatar: protectedProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!input.url) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid URL",
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

      return { success: "Avatar updated successfully" };
    }),

  updatePassword: protectedProcedure
    .input(
      z.object({
        currentPassword: z.string(),
        newPassword: z.string(),
        confirmNewPassword: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      
    }),
});
