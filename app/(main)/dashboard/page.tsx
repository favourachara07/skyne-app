'use client'

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Upload, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import { initialData } from "@/app/components/dashboard/array";

// 1. ProgressChart: Line chart for hydration, acne, pigmentation over time using Recharts
// 2. AIScanHistory: List of AI scan results with hydration, acne, and notes
// 3. PhotoLog: Upload and display weekly selfies
// 4. RoutineAdherence: Table for AM/PM routine tracking
// 5. RecommendationImprover: Suggests improvements based on latest metrics
// 6. SkinProgressDashboard: Main component that composes all above

interface ProgressChartProps {
  data: Array<{
    date: string;
    hydration: number;
    acne: number;
    pigmentation: number;
  }>;
};

function ProgressChart({ data }: ProgressChartProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Skin Progress Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="hydration"
            stroke="#2563eb"
            name="Hydration"
          />
          <Line
            type="monotone"
            dataKey="acne"
            stroke="#dc2626"
            name="Acne (lower is better)"
          />
          <Line
            type="monotone"
            dataKey="pigmentation"
            stroke="#a21caf"
            name="Pigmentation"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// AI Scan History Component
interface AIScanHistoryProps {
  scans: Array<{
    date: string;
    hydration: number;
    acne: number;
    notes: string;
  }>;
}

function AIScanHistory({ scans }: AIScanHistoryProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">AI Scan History</h2>
      <ul className="divide-y">
        {scans.map((scan, idx) => (
          <li key={idx} className="py-3 flex justify-between items-center">
            <div>
              <div className="font-medium">{scan.date}</div>
              <div className="text-sm text-gray-500">{scan.notes}</div>
            </div>
            <div className="flex space-x-4">
              <span className="text-blue-600">
                Hydration: {scan.hydration}%
              </span>
              <span className="text-red-600">Acne: {scan.acne}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Photo Log Component
interface PhotoLogProps {
  photoLogs: Array<{ date: string; url: string }>;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PhotoLog({ photoLogs, onUpload }: PhotoLogProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Photo Log</h2>
        <label className="flex items-center cursor-pointer">
          <Upload className="w-5 h-5 mr-1" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onUpload}
          />
          <span className="text-blue-600 text-sm">Upload</span>
        </label>
      </div>
      <div className="flex space-x-4 overflow-x-auto">
        {photoLogs.map((log, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <Image
            width={96}
            height={96}
              src={log.url}
              alt={`Selfie ${log.date}`}
              className="w-24 h-24 rounded-lg object-cover mb-2 border"
            />
            <span className="text-xs text-gray-500">{log.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Routine Adherence Tracker
interface RoutineAdherenceProps {
  adherence: Array<{ date: string; am: boolean; pm: boolean }>;
}
function RoutineAdherence({ adherence }: RoutineAdherenceProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Routine Adherence</h2>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left py-2">Date</th>
            <th className="text-center py-2">AM</th>
            <th className="text-center py-2">PM</th>
          </tr>
        </thead>
        <tbody>
          {adherence.map((entry, idx) => (
            <tr key={idx} className="border-t">
              <td className="py-2">{entry.date}</td>
              <td className="text-center">
                {entry.am ? (
                  <CheckCircle className="w-5 h-5 text-green-600 inline" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-300 inline" />
                )}
              </td>
              <td className="text-center">
                {entry.pm ? (
                  <CheckCircle className="w-5 h-5 text-green-600 inline" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-300 inline" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Recommendation Improver (simple logic demo)
interface RecommendationImproverProps {
  metrics: Array<{
    date: string;
    hydration: number;
    acne: number;
    pigmentation: number;
  }>;
}

function RecommendationImprover({ metrics }: RecommendationImproverProps) {
  // Example: If hydration < 70, suggest more hydration products
  const latest = metrics[metrics.length - 1];
  let advice = "Keep up the good work!";
  if (latest.hydration < 70) advice = "Consider adding a hydrating serum.";
  if (latest.acne > 1)
    advice = "Try an acne treatment or consult your dermatologist.";
  return (
    <div className="bg-green-50 rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-2">Personalized Advice</h2>
      <p className="text-gray-700">{advice}</p>
    </div>
  );
}

export default function SkinProgressDashboard() {
  const [data, setData] = useState(initialData);

  // Handle photo upload (demo only, not persistent)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setData((prev) => ({
        ...prev,
        photoLogs: [
          ...prev.photoLogs,
          { date: new Date().toISOString().slice(0, 10), url },
        ],
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Skin Progress Dashboard
        </h1>
        <ProgressChart data={data.metrics} />
        <AIScanHistory scans={data.aiScans} />
        <PhotoLog photoLogs={data.photoLogs} onUpload={handlePhotoUpload} />
        <RoutineAdherence adherence={data.routineAdherence} />
        <RecommendationImprover metrics={data.metrics} />
      </div>
    </div>
  );
}
