import { ProfileSettingComponent } from "~/components/settings/profile-setting";
import { StatsComponent } from "~/components/settings/stats";

export default function SettingPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 bg-background md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
        <ProfileSettingComponent />
        <StatsComponent />
      </div>
    </div>
  );
}
