import { Expert } from "@/app/(main)/consult/page";
import { Award, Clock, MapPin, Star } from "lucide-react";
import Image from "next/image";


interface ExpertSelectionProps {
  experts: Expert[];
  handleExpertSelect: (expert: Expert) => void;
}

export const renderExpertSelection = ({
  experts,
  handleExpertSelect,
}: ExpertSelectionProps) => (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Choose Your Expert
        </h1>
        <p className="text-gray-600">
          Connect with certified Nigerian dermatologists
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experts.map((expert) => (
          <div
            key={expert.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <Image
                height={64}
                width={64}
                  src={expert.image}
                  alt={expert.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">
                    {expert.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {expert.specialty}
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium ml-1">
                        {expert.rating}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({expert.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Award className="w-4 h-4 mr-2" />
                  {expert.experience} experience
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {expert.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  Next available: {expert.nextAvailable}
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{expert.bio}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Video Consultation
                  </span>
                  <span className="text-sm font-bold text-green-600">
                    ₦{expert.availability.price.video.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Chat Consultation
                  </span>
                  <span className="text-sm font-bold text-green-600">
                    ₦{expert.availability.price.chat.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleExpertSelect(expert)}
                className="w-full bg-gradient-to-r from-amber-700 to-amber-900 text-white py-3 px-4 rounded-lg hover:shadow-amber-500/25 transition-colors font-medium"
              >
                Book Consultation
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );