import JobPosting from "@/components/layout/job-posting/job-posting";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_dashboard/find-jobs")({
  component: () => <FindJobs />,
});

const FindJobs = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <JobPosting />
    </div>
  );
};
