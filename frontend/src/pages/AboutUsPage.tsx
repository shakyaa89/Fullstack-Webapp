import { Code, Database } from "lucide-react";

const AboutUsPage = () => {
  return (
    <div>
      {/* Technology Stack */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Technology Stack
            </h2>
            <p className="text-gray-300 text-lg">
              Built with modern technologies for optimal performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-[0_0_25px_rgba(0,0,0,0.4)]">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <Code size={30} className="text-[#3E5641] mr-3" />
                Frontend
              </h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center justify-between">
                  <span>React</span>
                  <span className="text-[#3E5641]">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>TypeScript</span>
                  <span className="text-[#3E5641]">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tailwind CSS</span>
                  <span className="text-[#3E5641]">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Vite</span>
                  <span className="text-[#3E5641]">✓</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-[0_0_25px_rgba(0,0,0,0.4)]">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <Database size={30} className="text-[#3E5641] mr-3" />
                Backend
              </h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center justify-between">
                  <span>Node.js</span>
                  <span className="text-[#3E5641]">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Express.js</span>
                  <span className="text-[#3E5641]">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>MongoDB</span>
                  <span className="text-[#3E5641]">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>JWT Authentication</span>
                  <span className="text-[#3E5641]">✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
