import { CreateWidgetRequest } from "@repo/api-types";
import PropertyDropdown from "./PropertyDropdown";
import { WidgetTypeSelector } from "./WidgetTypeSelector";
import { PositionSelector } from "./PositionSelector";
import { SourceSelector } from "./SourceSelector";
import { ToggleSettings } from "./ToggleSettings";

interface WidgetFormContentProps {
  formData: CreateWidgetRequest;
  setFormData: (data: CreateWidgetRequest) => void;
  isEditing: boolean;
  saving: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

const properties = [
  {
    id: "910684c3-2614-417b-a84c-70a0b25937a7",
    name: "Grand Hotel",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3",
  },
  {
    id: "cf3e2e18-5d5f-43a3-93f6-c9a601f7b896",
    name: "Seaside Resort",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3",
  },
  {
    id: "da015ec7-ac5b-4629-872f-c50ff47ff25d",
    name: "Centaurus Mall",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3",
  },
  {
    id: "0f831285-9727-44df-8258-4766fdf3dc68",
    name: "The Plasa",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3"
  }
];

export const WidgetFormContent = ({
  formData,
  setFormData,
  isEditing,
  saving,
  onSubmit,
  onClose,
}: WidgetFormContentProps) => {
  return (
    <>
      {/* Scrollable Form Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <form id="widget-form" onSubmit={onSubmit} className="space-y-6">
          {/* Widget Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Widget Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter widget name"
              required
            />
          </div>

          {/* Property Selection */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Property
            </label>
            <PropertyDropdown
              value={formData.property_id}
              onChange={(propertyId) =>
                setFormData({ ...formData, property_id: propertyId })
              }
              properties={properties}
              disabled={isEditing}
              placeholder="Select a property"
            />
          </div>

          {/* Widget Type */}
          <WidgetTypeSelector
            selectedType={formData.type}
            onChange={(type) => setFormData({ ...formData, type })}
          />

          {/* Position */}
          <PositionSelector
            selectedPosition={formData.settings.position}
            onChange={(position) =>
              setFormData({
                ...formData,
                settings: { ...formData.settings, position },
              })
            }
          />

          {/* Sources */}
          <SourceSelector
            selectedSources={formData.settings.sources}
            onChange={(sources) =>
              setFormData({
                ...formData,
                settings: { ...formData.settings, sources },
              })
            }
          />

          {/* Additional Settings */}
          <ToggleSettings formData={formData} setFormData={setFormData} />
        </form>
      </div>

      {/* Fixed Footer */}
      <div className="flex justify-end space-x-3 px-6 py-4 border-t bg-white flex-shrink-0">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          form="widget-form"
          disabled={saving || formData.settings.sources.length === 0}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving
            ? isEditing
              ? "Saving..."
              : "Creating..."
            : isEditing
            ? "Save Changes"
            : "Create Widget"}
        </button>
      </div>
    </>
  );
};
