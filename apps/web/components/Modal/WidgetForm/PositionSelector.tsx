import { WidgetPosition } from "@repo/api-types";

interface PositionSelectorProps {
  selectedPosition: WidgetPosition;
  onChange: (position: WidgetPosition) => void;
}

export const PositionSelector = ({
  selectedPosition,
  onChange,
}: PositionSelectorProps) => {
  const positions = [
    { value: WidgetPosition.TOP_LEFT, label: "Top Left" },
    { value: WidgetPosition.TOP_RIGHT, label: "Top Right" },
    { value: WidgetPosition.BOTTOM_LEFT, label: "Bottom Left" },
    { value: WidgetPosition.BOTTOM_RIGHT, label: "Bottom Right" },
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Position *
      </label>
      <div className="grid grid-cols-2 gap-3">
        {positions.map((position) => (
          <button
            key={position.value}
            type="button"
            className={`p-2 text-sm border rounded-md transition-colors ${
              selectedPosition === position.value
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-300 text-gray-700 hover:border-gray-400"
            }`}
            onClick={() => onChange(position.value)}
          >
            {position.label}
          </button>
        ))}
      </div>
    </div>
  );
}; 