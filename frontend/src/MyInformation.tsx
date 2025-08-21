import "./index.css";
import { User, Mail, Hash } from "lucide-react";

const MyInformation = ({
  id,
  name,
  email,
}: {
  id: string;
  name: string;
  email?: string;
}) => {
  return (
    <div className="w-80 bg-[#1a1a1a] backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.4)] rounded-2xl p-6 text-[#F0F0F0] transition-transform transform hover:scale-105 hover:shadow-2xl">
      <div className="space-y-4">
        {/* Name */}
        <div className="flex items-center gap-3 bg-[#000]/20  p-3 rounded-lg">
          <User className="w-5 h-5 text-blue-400 shrink-0" />
          <div className="min-w-0">
            <span className="text-sm text-gray-400">Name</span>
            <p className="font-medium text-base truncate">{name}</p>
          </div>
        </div>

        {/* Email */}
        {email && (
          <div className="flex items-center gap-3 bg-[#000]/20  p-3 rounded-lg">
            <Mail className="w-5 h-5 text-pink-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-sm text-gray-400">Email</span>
              <p className="font-medium text-base break-words">{email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInformation;
