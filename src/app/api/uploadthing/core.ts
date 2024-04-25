import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "~/server/auth";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const session = await auth();
      if (!session) throw new UploadThingError("Unauthorized");
      return { success: true, userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata }) => {
      return { uploadedBy: metadata.userId };
    }),

  markDownUploader: f({ "text/markdown": { maxFileSize: "64KB" } })
    .middleware(async () => {
      const session = await auth();
      const user = session?.user;
      if (!session) throw new UploadThingError("Unauthorized");
      if (user?.role !== "ADMIN") throw new UploadThingError("Forbidden");
      return { success: true, userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
