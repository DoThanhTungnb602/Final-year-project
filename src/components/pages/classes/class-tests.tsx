import { ClassroomById } from "~/server/api/client";
import { ClassTestItem } from "./class-test-item";

export default function ClassTests({
  classroom,
}: {
  classroom?: ClassroomById;
}) {
  return (
    <div className="flex flex-1 flex-col gap-4 bg-background md:gap-8 md:p-10">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="mb-5 text-3xl font-semibold">{classroom?.name} Tests</h1>
        {classroom?.tests.length === 0 && (
          <p className="text-muted-foreground">
            There are no test in this class
          </p>
        )}
        <div className="flex flex-col gap-4">
          {classroom?.tests.map((test) => (
            <ClassTestItem key={test.id} test={test} />
          ))}
        </div>
      </div>
    </div>
  );
}
