import { useEffect } from "react";
import { useForm } from "react-hook-form";

function ProfilePage() {
  const defaultValues = {
    name: "",
    bio: "",
    email: "",
    skills: "React,Node",
    config: {
      mode: "view",
    },
  };

  const methods = useForm({ defaultValues });
  const { watch, reset, setValue, register } = methods;

  useEffect(() => {
    // Simulate backend API response
    const backendResponse = {
      name: "Bishal",
      bio: "This is my bio",
      email: "email@gmail.com",
      skills: "React,Node",
      config: {
        mode: "view",
      },
    };
    reset(backendResponse);
  }, [reset]);

  const data = watch();

  const OnClickEdit = () => setValue("config.mode", "edit");
  const GoBackButton = () => setValue("config.mode", "view");

  return (
    <div className="max-w-md mx-auto mt-10 p-6 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.4)] rounded-xl text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Profile Page</h1>
        {data?.config?.mode === "view" && (
          <button
            onClick={OnClickEdit}
            className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded text-white transition"
          >
            Edit
          </button>
        )}
      </div>

      {data?.config?.mode === "view" && (
        <div className="space-y-3">
          <p>
            <strong>Name:</strong> {data?.name}
          </p>
          <p>
            <strong>Email:</strong> {data?.email}
          </p>
          <p>
            <strong>Bio:</strong> {data?.bio}
          </p>
          <p>
            <strong>Skills:</strong> {data?.skills}
          </p>
        </div>
      )}

      {data?.config?.mode === "edit" && (
        <form className="flex flex-col space-y-4">
          <input
            {...register("name")}
            placeholder="Name"
            className="w-full p-2 rounded border border-gray-500 bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full p-2 rounded border border-gray-500 bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <textarea
            {...register("bio")}
            placeholder="Bio"
            className="w-full p-2 rounded border border-gray-500 bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            {...register("skills")}
            placeholder="Skills"
            className="w-full p-2 rounded border border-gray-500 bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <div className="flex gap-4">
            <button
              type="button"
              onClick={GoBackButton}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white transition"
            >
              Go Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white transition"
            >
              Update
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ProfilePage;
