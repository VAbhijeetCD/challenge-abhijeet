import { WidgetType } from "@repo/api-types";

interface WidgetTypeSelectorProps {
  selectedType: WidgetType;
  onChange: (type: WidgetType) => void;
}

export const WidgetTypeSelector = ({
  selectedType,
  onChange,
}: WidgetTypeSelectorProps) => {
  const types = [
    {
      value: WidgetType.FLOATING,
      label: "Floating",
      description: "Appears as an overlay",
    },
    {
      value: WidgetType.STATIC,
      label: "Static",
      description: "Embedded in page content",
    },
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Widget Type *
      </label>
      <div className="grid grid-cols-2 gap-3">
        {types.map((type) => (
          <div
            key={type.value}
            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
              selectedType === type.value
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onClick={() => onChange(type.value)}
          >
            <div className="font-medium text-gray-900">{type.label}</div>
            <div className="text-sm text-gray-500">{type.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}; 