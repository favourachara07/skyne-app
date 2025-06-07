import { Expert } from "@/app/(main)/consult/page";
import { CheckCircle, MessageCircle, Video } from "lucide-react";

interface RenderConfirmationProps {
  selectedExpert: Expert | null;
  consultationType: "video" | "chat";
  selectedDate: string | null;
  selectedTime: string | null;
  calculateTotal: () => number;
  startVideoCall: () => void;
  setActiveChat: (expert: Expert | null) => void;
  setCurrentStep: (
    step: "experts" | "booking" | "extras" | "payment" | "confirmation"
  ) => void;
  setSelectedExpert: (expert: Expert | null) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedExtras: (extras: string[]) => void;
  setSelectedTime: (time: string | null) => void;
}

export const renderConfirmation = ({
  selectedExpert,
  consultationType,
  selectedDate,
  selectedTime,
  calculateTotal,
  startVideoCall,
  setActiveChat,
  setCurrentStep,
  setSelectedExpert,
  setSelectedDate,
  setSelectedExtras,
  setSelectedTime,
}: RenderConfirmationProps) => (
  <div className="max-w-2xl mx-auto">
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Consultation Booked Successfully!
      </h2>
      <p className="text-gray-600 mb-8">
        Your consultation has been confirmed. You&apos;ll receive a confirmation
        email with all the details.
      </p>

      <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
        <h3 className="font-semibold text-gray-800 mb-4">
          Consultation Details
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Expert:</span>
            <span className="font-medium">{selectedExpert?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Type:</span>
            <span className="font-medium capitalize">{consultationType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{selectedDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium">{selectedTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Cost:</span>
            <span className="font-medium text-green-600">
              ₦{calculateTotal().toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {consultationType === "video" ? (
          <button
            onClick={startVideoCall}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center"
          >
            <Video className="w-5 h-5 mr-2" />
            Join Video Call (when time comes)
          </button>
        ) : (
          <button
            onClick={() => setActiveChat(selectedExpert)}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 font-medium flex items-center justify-center"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Start Chat Consultation
          </button>
        )}

        <button
          onClick={() => {
            setCurrentStep("experts");
            setSelectedExpert(null);
            setSelectedDate(null);
            setSelectedTime(null);
            setSelectedExtras([]);
          }}
          className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 font-medium"
        >
          Book Another Consultation
        </button>
      </div>
    </div>
  </div>
);
