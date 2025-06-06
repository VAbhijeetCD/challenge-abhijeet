import Image from "next/image";
import { WidgetSource } from "@repo/api-types";

interface SourceSelectorProps {
  selectedSources: WidgetSource[];
  onChange: (sources: WidgetSource[]) => void;
}

export const SourceSelector = ({
  selectedSources,
  onChange,
}: SourceSelectorProps) => {
  const sourceOptions = [
    {
      id: WidgetSource.GOOGLE_MAPS,
      label: "Google Maps",
      logo: "/img/logos/logo_google_maps_small.png",
    },
    {
      id: WidgetSource.BOOKING_COM,
      label: "Booking.com",
      logo: "/img/logos/logo_booking_com_small.png",
    },
    {
      id: WidgetSource.TRIPADVISOR_COM,
      label: "TripAdvisor",
      logo: "/img/logos/logo_tripadvisor_com_small.png",
    },
  ];

  const handleSourceToggle = (sourceId: WidgetSource) => {
    onChange(
      selectedSources.includes(sourceId)
        ? selectedSources.filter((s) => s !== sourceId)
        : [...selectedSources, sourceId]
    );
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Review Sources * (Select at least one)
      </label>
      <div className="space-y-2">
        {sourceOptions.map((source) => (
          <div
            key={source.id}
            className={`flex items-center p-3 gap-2 border rounded-lg cursor-pointer transition-colors ${
              selectedSources.includes(source.id)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onClick={() => handleSourceToggle(source.id)}
          >
            <Image
              src={source.logo}
              alt={source.label}
              height={24}
              width={24}
            />
            <span className="font-medium text-gray-900">{source.label}</span>
            <div className="ml-auto">
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  selectedSources.includes(source.id)
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-300"
                }`}
              >
                {selectedSources.includes(source.id) && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedSources.length === 0 && (
        <p className="text-sm text-red-600 mt-1">
          Please select at least one review source
        </p>
      )}
    </div>
  );
}; 