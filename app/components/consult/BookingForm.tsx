import { ArrowLeft, CheckCircle, MessageCircle, Video } from "lucide-react";
import Image from "next/image";

interface BookingFormProps {
  setCurrentStep: (
    step: "experts" | "booking" | "extras" | "payment" | "confirmation"
  ) => void;
  selectedExpert: {
    name?: string;
    image?: string;
    specialty?: string;
    availability: {
      price: {
        video: number;
        chat: number;
      };
    };
  } | null;
  consultationType: "video" | "chat";
  setConsultationType: (type: "video" | "chat") => void;
  availableDates: {
    date: string;
    display: string;
    available: boolean;
  }[];
  selectedDate: string | null;
  handleDateSelect: (date: string) => void;
  availableSlots: {
    time: string;
    available: boolean;
  }[];
  selectedTime: string | null;
  handleTimeSelect: (time: string) => void;
  consultationExtras: {
    id: string;
    name: string;
    price: number;
    description?: string;
    popular?: boolean;
  }[];
  selectedExtras: string[];
  toggleExtra: (extraId: string) => void;
  calculateTotal: () => number;
  handleBooking: () => void;
}

export const renderBookingForm = ({
  setCurrentStep,
  selectedExpert,
  consultationType,
  setConsultationType,
  availableDates,
  selectedDate,
  handleDateSelect,
  availableSlots,
  selectedTime,
  handleTimeSelect,
  consultationExtras,
  selectedExtras,
  toggleExtra,
  calculateTotal,
  handleBooking,
}: BookingFormProps) => (
  <div className="max-w-4xl mx-auto">
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => setCurrentStep("experts")}
          className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-4">
          <Image
            height={48}
            width={48}
            src={selectedExpert?.image ?? "/default-avatar.png"}
            alt={selectedExpert?.name ?? "Expert"}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {selectedExpert?.name}
            </h2>
            <p className="text-gray-600">{selectedExpert?.specialty}</p>
          </div>
        </div>
      </div>

      {/* Consultation Type Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Choose Consultation Type
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setConsultationType("video")}
            className={`p-4 rounded-lg border-2 transition-all ${
              consultationType === "video"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Video className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="text-center">
              <p className="font-medium text-gray-800">Video Call</p>
              <p className="text-sm text-gray-600">Face-to-face consultation</p>
              <p className="text-lg font-bold text-green-600 mt-2">
                ₦{selectedExpert?.availability.price.video.toLocaleString()}
              </p>
            </div>
          </button>
          <button
            onClick={() => setConsultationType("chat")}
            className={`p-4 rounded-lg border-2 transition-all ${
              consultationType === "chat"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <MessageCircle className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="text-center">
              <p className="font-medium text-gray-800">Chat Consultation</p>
              <p className="text-sm text-gray-600">Text-based consultation</p>
              <p className="text-lg font-bold text-green-600 mt-2">
                ₦{selectedExpert?.availability.price.chat.toLocaleString()}
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Date Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Select Date
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {availableDates.map((date) => (
            <button
              key={date.date}
              onClick={() => date.available && handleDateSelect(date.date)}
              disabled={!date.available}
              className={`p-3 rounded-lg text-sm font-medium transition-all ${
                selectedDate === date.date
                  ? "bg-blue-500 text-white"
                  : date.available
                  ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  : "bg-gray-50 text-gray-400 cursor-not-allowed"
              }`}
            >
              {date.display}
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Select Time
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {availableSlots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => slot.available && handleTimeSelect(slot.time)}
                disabled={!slot.available}
                className={`p-2 rounded-lg text-sm font-medium transition-all ${
                  selectedTime === slot.time
                    ? "bg-blue-500 text-white"
                    : slot.available
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    : "bg-gray-50 text-gray-400 cursor-not-allowed"
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Consultation Extras */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Add Consultation Extras
        </h3>
        <div className="space-y-3">
          {consultationExtras.map((extra) => (
            <div
              key={extra.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleExtra(extra.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selectedExtras.includes(extra.id)
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedExtras.includes(extra.id) && (
                    <CheckCircle className="w-3 h-3 text-white" />
                  )}
                </button>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-800">{extra.name}</h4>
                    {extra.popular && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{extra.description}</p>
                </div>
              </div>
              <span className="font-bold text-green-600">
                ₦{extra.price.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Total and Book Button */}
      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-800">
            Total Cost:
          </span>
          <span className="text-2xl font-bold text-green-600">
            ₦{calculateTotal().toLocaleString()}
          </span>
        </div>
        <button
          onClick={handleBooking}
          disabled={!selectedDate || !selectedTime}
          className="w-full bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg"
        >
          Book Consultation
        </button>
      </div>
    </div>
  </div>
);
