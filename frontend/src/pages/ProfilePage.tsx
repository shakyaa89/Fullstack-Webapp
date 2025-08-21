import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  User,
  Mail,
  FileText,
  Code,
  Save,
  Edit3,
  ArrowLeft,
} from "lucide-react";

interface ProfileData {
  user: {
    name: string;
    email: string;
  };
  bio: string;
  skills: Array<{
    name: string;
    level: string;
  }>;
  github: string;
  linkedin: string;
  portfolioUrl: string;
  profilePicture: string;
}

function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const defaultValues = {
    name: "",
    bio: "",
    email: "",
    skills: "",
    github: "",
    linkedin: "",
    portfolioUrl: "",
  };

  const methods = useForm({ defaultValues });
  const { watch, reset, register, handleSubmit } = methods;

  // Fetch profile data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          setError("Please login to view your profile");
          setIsLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/users/profile/me",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = response.data.profile;
        setProfileData(data);

        // Update form with fetched data
        reset({
          name: data.user?.name || "",
          email: data.user?.email || "",
          bio: data.bio || "",
          skills: data.skills?.map((skill: any) => skill.name).join(", ") || "",
          github: data.github || "",
          linkedin: data.linkedin || "",
          portfolioUrl: data.portfolioUrl || "",
        });
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

  const data = watch();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original data
    if (profileData) {
      reset({
        name: profileData.user?.name || "",
        email: profileData.user?.email || "",
        bio: profileData.bio || "",
        skills:
          profileData.skills?.map((skill: any) => skill.name).join(", ") || "",
        github: profileData.github || "",
        linkedin: profileData.linkedin || "",
        portfolioUrl: profileData.portfolioUrl || "",
      });
    }
  };

  const onSubmit = async (formData: any) => {
    setIsUpdating(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const updateData = {
        bio: formData.bio,
        skills: formData.skills.split(",").map((skill: string) => ({
          name: skill.trim(),
          level: "Intermediate",
        })),
        github: formData.github,
        linkedin: formData.linkedin,
        portfolioUrl: formData.portfolioUrl,
      };

      const response = await axios.put(
        "http://localhost:3000/users/profile",
        updateData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setProfileData(response.data.profile);
      setIsEditing(false);
      setError("");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.4)] rounded-xl text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3E5641] mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.4)] rounded-xl text-white">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#3E5641] hover:bg-cyan-900 text-white px-4 py-2 rounded-md transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.4)] rounded-xl text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold flex items-center">
          <User size={24} className="mr-2 text-[#3E5641]" />
          Profile
        </h1>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-[#3E5641] hover:bg-cyan-900 text-white rounded-md transition flex items-center"
          >
            <Edit3 size={16} className="mr-2" />
            Edit
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {!isEditing ? (
        // View Mode
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
              <User size={20} className="text-[#3E5641]" />
              <div>
                <p className="text-sm text-gray-400">Name</p>
                <p className="font-medium">{data.name || "Not set"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
              <Mail size={20} className="text-[#3E5641]" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="font-medium">{data.email || "Not set"}</p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white/10 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <FileText size={20} className="text-[#3E5641]" />
              <p className="text-sm text-gray-400">Bio</p>
            </div>
            <p className="font-medium">{data.bio || "No bio added yet"}</p>
          </div>

          <div className="p-3 bg-white/10 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Code size={20} className="text-[#3E5641]" />
              <p className="text-sm text-gray-400">Skills</p>
            </div>
            <p className="font-medium">
              {data.skills || "No skills added yet"}
            </p>
          </div>

          {data.github && (
            <div className="p-3 bg-white/10 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">GitHub</p>
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition"
              >
                {data.github}
              </a>
            </div>
          )}

          {data.linkedin && (
            <div className="p-3 bg-white/10 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">LinkedIn</p>
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition"
              >
                {data.linkedin}
              </a>
            </div>
          )}

          {data.portfolioUrl && (
            <div className="p-3 bg-white/10 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">Portfolio</p>
              <a
                href={data.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition"
              >
                {data.portfolioUrl}
              </a>
            </div>
          )}
        </div>
      ) : (
        // Edit Mode
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input
                {...register("name")}
                placeholder="Your name"
                className="w-full p-3 rounded border border-gray-500 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#3E5641] text-white"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">
                Name cannot be changed
              </p>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                {...register("email")}
                placeholder="Your email"
                className="w-full p-3 rounded border border-gray-500 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#3E5641] text-white"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">
                Email cannot be changed
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Bio</label>
            <textarea
              {...register("bio")}
              placeholder="Tell us about yourself"
              rows={3}
              className="w-full p-3 rounded border border-gray-500 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#3E5641] text-white resize-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Skills</label>
            <input
              {...register("skills")}
              placeholder="e.g., React, Node.js, TypeScript"
              className="w-full p-3 rounded border border-gray-500 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#3E5641] text-white"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate skills with commas
            </p>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              GitHub URL
            </label>
            <input
              {...register("github")}
              placeholder="https://github.com/yourusername"
              className="w-full p-3 rounded border border-gray-500 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#3E5641] text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              LinkedIn URL
            </label>
            <input
              {...register("linkedin")}
              placeholder="https://linkedin.com/in/yourusername"
              className="w-full p-3 rounded border border-gray-500 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#3E5641] text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Portfolio URL
            </label>
            <input
              {...register("portfolioUrl")}
              placeholder="https://yourportfolio.com"
              className="w-full p-3 rounded border border-gray-500 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#3E5641] text-white"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-white transition flex items-center"
            >
              <ArrowLeft size={16} className="mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-6 py-2 bg-[#3E5641] hover:bg-cyan-900 text-white rounded-md transition flex items-center disabled:opacity-50"
            >
              <Save size={16} className="mr-2" />
              {isUpdating ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ProfilePage;
