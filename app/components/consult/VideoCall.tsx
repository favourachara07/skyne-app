import { MessageCircle, Phone, Video } from "lucide-react";

interface VideoCallProps {
  selectedExpert: {
    name?: string;
    // Add other fields if needed
  } | null;
  endVideoCall: () => void;
}

export const renderVideoCall = ({
  selectedExpert,
  endVideoCall,
}: VideoCallProps) => (
  <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
    <div className="relative w-full h-full">
      {/* Simulated Video Call Interface */}
      <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <Video className="w-24 h-24 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">
            Video Call with {selectedExpert?.name}
          </h2>
          <p className="text-gray-300 mb-8">
            In a real implementation, Jitsi Meet would be embedded here
          </p>

          {/* Video Call Controls */}
          <div className="flex items-center justify-center space-x-4">
            <button className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full">
              <Phone className="w-6 h-6" />
            </button>
            <button className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded-full">
              <Video className="w-6 h-6" />
            </button>
            <button className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded-full">
              <MessageCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* End Call Button */}
      <button
        onClick={endVideoCall}
        className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg"
      >
        End Call
      </button>
    </div>
  </div>
);
