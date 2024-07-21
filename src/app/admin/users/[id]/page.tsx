import { StatsComponent } from "~/components/settings/stats";
import { api } from "~/trpc/server";
import { Card, CardTitle, CardHeader, CardFooter } from "~/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { FaUserCircle } from "react-icons/fa";
import moment from "moment";
import CustomTooltip from "~/components/shared/custom-tooltip";
import { Separator } from "~/components/ui/separator";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default async function SettingPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await api.user.getById(params.id);

  return (
    <div className="flex flex-1 flex-col gap-4 bg-background md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div className="space-y-2">
                <CardTitle>User Information</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardFooter className="flex flex-col gap-5 border-t px-4 py-4">
            <div className="flex w-full items-center gap-3">
              <Avatar className="size-16">
                <AvatarImage
                  src={user?.image ?? undefined}
                  alt="avatar"
                  className="object-cover"
                />
                <AvatarFallback>
                  <FaUserCircle className="size-28" />
                </AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <p className="text-lg font-semibold">{user?.name}</p>
                <CustomTooltip content={user?.email ?? ""} side="top">
                  <p className="truncate text-sm font-semibold text-gray-500">
                    {user?.email}
                  </p>
                </CustomTooltip>
                <p className="text-sm italic text-gray-500">
                  Joined on {moment(user?.createdAt).format("MMM DD, YYYY")}
                </p>
              </div>
            </div>
            <Separator />
            <div className="w-full space-y-3">
              <p className="text-lg font-semibold">Classes Enrolled</p>
              <div className="flex justify-center w-full flex-col gap-3">
                {user?.enrolledClasses.map((enrolledClass) => (
                  <Button key={enrolledClass.id} variant="secondary">
                    <Link href={`/class/${enrolledClass.id}`}>
                      {enrolledClass.name}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </CardFooter>
        </Card>
        <StatsComponent userId={params.id ?? ""} />
      </div>
    </div>
  );
}
