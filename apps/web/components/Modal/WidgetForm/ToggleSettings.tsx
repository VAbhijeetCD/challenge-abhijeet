import { CreateWidgetRequest } from "@repo/api-types";

interface ToggleSettingsProps {
  formData: CreateWidgetRequest;
  setFormData: (data: CreateWidgetRequest) => void;
}

export const ToggleSettings = ({
  formData,
  setFormData,
}: ToggleSettingsProps) => {
  return (
    <div className="space-y-4">
      {/* Active Toggle */}
      <div className="flex items-center justify-between">
        <label className="text-lg font-medium text-gray-900">Active:</label>
        <button
          type="button"
          onClick={() => setFormData({ ...formData, active: !formData.active })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            formData.active ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              formData.active ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Allow External Links */}
      <div className="flex items-center justify-between">
        <label className="text-lg font-medium text-gray-900">
          Allow external links
        </label>
        <button
          type="button"
          onClick={() =>
            setFormData({
              ...formData,
              settings: {
                ...formData.settings,
                showReadReviewsLink: !formData.settings.showReadReviewsLink,
              },
            })
          }
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            formData.settings.showReadReviewsLink ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              formData.settings.showReadReviewsLink
                ? "translate-x-6"
                : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Gather Review Buttons */}
      <div className="flex items-center justify-between">
        <label className="text-lg font-medium text-gray-900">
          Gather review buttons
        </label>
        <button
          type="button"
          onClick={() =>
            setFormData({
              ...formData,
              settings: {
                ...formData.settings,
                showReviewUsButton: !formData.settings.showReviewUsButton,
              },
            })
          }
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            formData.settings.showReviewUsButton ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              formData.settings.showReviewUsButton
                ? "translate-x-6"
                : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}; 