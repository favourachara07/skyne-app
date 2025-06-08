"use client";

import React, { useState, useEffect, useRef } from "react";
import { renderVideoCall } from "@/app/components/consult/VideoCall";
import { renderChat } from "@/app/components/consult/Chat";
import { renderConfirmation } from "@/app/components/consult/Confirm";
import { renderExpertSelection } from "@/app/components/consult/ExpertSelection";
import { renderBookingForm } from "@/app/components/consult/BookingForm";
import { mockExperts as experts } from "@/app/components/consult/array";

export interface ChatMessage {
  id: number;
  text: string;
  sender: "user" | "expert";
  timestamp: string;
}
// Types
export interface Expert {
  id: number; // or string, but your mock data uses number
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: string;
  location: string;
  image: string;
  bio: string;
  languages: string[];
  availability: {
    video: boolean;
    chat: boolean;
    price: {
      video: number;
      chat: number;
    };
  };
  nextAvailable: string;
}

interface ConsultationExtra {
  id: string;
  name: string;
  price: number;
}

export interface ActiveChat {
  id: number;
  expert: Expert;
  image: string;
  name: string;
  // Add more fields as needed
}

const consultationExtras: ConsultationExtra[] = [
  { id: "extra1", name: "Priority Support", price: 20 },
  { id: "extra2", name: "Detailed Report", price: 35 },
  // Add more extras as needed
];

// Dummy experts array for demonstration
// const experts: Expert[] = [
//   {
//     id: "expert1",
//     name: "Dr. Jane Doe",
//     availability: {
//       price: {
//         video: 100,
//         chat: 60,
//       },
//     },
//   },
//   // Add more experts as needed
// ];

const ConsultationBookingSystem = () => {
  const [currentStep, setCurrentStep] = useState<
    "experts" | "booking" | "extras" | "payment" | "confirmation"
  >("experts");
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [consultationType, setConsultationType] = useState<"video" | "chat">(
    "video"
  ); // video or chat
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const [activeChat, setActiveChat] = useState<ActiveChat | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [showSendDataPrompt, setShowSendDataPrompt] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Generate available time slots
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9;
    const endHour = 17;

    for (let hour = startHour; hour < endHour; hour++) {
      for (const minute of [0, 30]) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        const isAvailable = Math.random() > 0.3; // 70% chance of being available
        slots.push({
          time,
          available: isAvailable,
          price:
            consultationType === "video"
              ? selectedExpert?.availability.price.video
              : selectedExpert?.availability.price.chat,
        });
      }
    }
    return slots;
  };

  // Generate calendar dates
  const generateCalendarDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        date: date.toISOString().split("T")[0],
        display: date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        available: i === 0 ? true : Math.random() > 0.2,
      });
    }
    return dates;
  };

  const [availableDates] = useState(generateCalendarDates());
  interface TimeSlot {
    time: string;
    available: boolean;
    price: number | undefined;
  }

  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    if (selectedDate && selectedExpert) {
      setAvailableSlots(generateTimeSlots());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, selectedExpert, consultationType]);

  const handleExpertSelect = (expert: Expert) => {
    setSelectedExpert(expert);
    setCurrentStep("booking");
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const toggleExtra = (extraId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId]
    );
  };

  const calculateTotal = () => {
    const basePrice =
      consultationType === "video"
        ? selectedExpert?.availability.price.video || 0
        : selectedExpert?.availability.price.chat || 0;

    const extrasPrice = selectedExtras.reduce((total, extraId) => {
      const extra = consultationExtras.find((e) => e.id === extraId);
      return total + (extra?.price || 0);
    }, 0);

    return basePrice + extrasPrice;
  };

  const handleBooking = () => {
    // Simulate booking process
    setCurrentStep("confirmation");
    setShowSendDataPrompt(true); // Show prompt after booking
  };

  // Simulate sending regimen/results to expert
  const sendRegimenToExpert = () => {
    // Replace with actual API call if needed
    // Example: await api.sendRegimenToExpert(selectedExpert.id, userRegimen)
    setShowSendDataPrompt(false);
    alert("Your regimen/results have been sent to the doctor.");
  };

  // Chat functionality
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now(),
        text: newMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setChatMessages((prev) => [...prev, message]);
      setNewMessage("");

      // Simulate expert response
      setTimeout(() => {
        const response: ChatMessage = {
          id: Date.now() + 1,
          text: "Thank you for your message. I'll review your concern and get back to you shortly.",
          sender: "expert",
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setChatMessages((prev) => [...prev, response]);
      }, 2000);
    }
  };

  const startVideoCall = () => {
    setIsVideoCall(true);
    // In a real implementation, you would initialize Jitsi Meet here
  };

  const endVideoCall = () => {
    setIsVideoCall(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Wrapper for setActiveChat to match the expected prop type in renderConfirmation
  const handleSetActiveChat = (expert: Expert | null) => {
    if (expert) {
      setActiveChat({
        id: expert.id,
        expert,
        image: expert.image,
        name: expert.name,
      });
    } else {
      setActiveChat(null);
    }
  };

  // Main render logic
  if (isVideoCall) {
    return renderVideoCall({ selectedExpert, endVideoCall });
  }

  if (activeChat) {
    return renderChat({
      newMessage,
      setNewMessage,
      chatMessages,
      handleSendMessage,
      activeChat,
      setActiveChat,
      chatEndRef,
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      {currentStep === "experts" &&
        renderExpertSelection({ experts, handleExpertSelect })}
      {currentStep === "booking" &&
        renderBookingForm({
          setCurrentStep, // type now matches BookingFormProps
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
        })}
      {currentStep === "confirmation" &&
        renderConfirmation({
          selectedExpert,
          consultationType,
          selectedDate,
          selectedTime,
          calculateTotal,
          startVideoCall,
          setActiveChat: handleSetActiveChat, // use the wrapper here
          setCurrentStep,
          setSelectedExpert,
          setSelectedDate,
          setSelectedExtras,
          setSelectedTime,
        })}
      {/* Prompt to send regimen/results to doctor */}
      {showSendDataPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Send Your Results?</h2>
            <p className="mb-4">
              Would you like to send your personalized skincare regimen/results
              to the doctor for a more tailored consultation?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200"
                onClick={() => setShowSendDataPrompt(false)}
              >
                No
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white"
                onClick={sendRegimenToExpert}
              >
                Yes, Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultationBookingSystem;
