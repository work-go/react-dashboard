import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const jobPostingSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  location: z.string(),
  jobType: z.enum(["Full-time", "Part-time", "Contract", "Freelance"]),
  salary: z.string().optional(),
  companyName: z.string().min(2, "Company name is required"),
  applyLink: z.string().url("Must be a valid URL"),
});

type JobPostingFormData = z.infer<typeof jobPostingSchema>;

export default function JobPosting() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobPostingFormData>({
    resolver: zodResolver(jobPostingSchema),
  });

  const onSubmit = (data: JobPostingFormData) => {
    console.log("Job Posting Data: ", data);
  };

  return (
    <div className="max-w-4xl p-6 mt-10 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
        Create a Job Posting
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            {...register("title")}
            className={`w-full p-3 mt-1 border ${errors.title ? "border-red-500" : "border-gray-300"} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            placeholder="e.g. Software Engineer"
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <textarea
            {...register("description")}
            className={`w-full p-3 mt-1 border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            rows={5}
            placeholder="Describe the job responsibilities and requirements"
          />
          {errors.description && (
            <p className="mt-2 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              {...register("location")}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Remote, New York"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Type
            </label>
            <select
              {...register("jobType")}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salary (Optional)
            </label>
            <input
              type="text"
              {...register("salary")}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. $60,000 - $80,000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              {...register("companyName")}
              className={`w-full p-3 mt-1 border ${errors.companyName ? "border-red-500" : "border-gray-300"} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="Your company name"
            />
            {errors.companyName && (
              <p className="mt-2 text-sm text-red-600">
                {errors.companyName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Apply Link
          </label>
          <input
            type="url"
            {...register("applyLink")}
            className={`w-full p-3 mt-1 border ${errors.applyLink ? "border-red-500" : "border-gray-300"} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            placeholder="e.g. https://company.com/apply"
          />
          {errors.applyLink && (
            <p className="mt-2 text-sm text-red-600">
              {errors.applyLink.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}
