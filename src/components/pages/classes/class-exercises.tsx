import { Class, Exercise } from "@prisma/client";
import { ClassExerciseItem } from "./class-exercise-item";

interface ClassWithExercises extends Class {
  exercises: Exercise[];
}

export default function ClassExercises({
  classroom,
}: {
  classroom?: ClassWithExercises;
}) {
  return (
    <div className="flex flex-1 flex-col gap-4 bg-background md:gap-8 md:p-10">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="mb-5 text-3xl font-semibold">
          {classroom?.name} Exercises
        </h1>
        {classroom?.exercises.length === 0 && (
          <p className="text-muted-foreground">
            There are no exercises in this class
          </p>
        )}
        <div className="flex flex-col gap-4">
          {classroom?.exercises.map((exercise) => (
            <ClassExerciseItem key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </div>
    </div>
  );
}
