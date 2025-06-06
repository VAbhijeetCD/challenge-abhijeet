import { CreateWidgetRequest, UpdateWidgetRequest, WidgetPosition, WidgetType } from "@repo/api-types";
import { useCallback, useEffect, useState } from "react";
import { widgetApi } from "../../../lib/api-client";
import { WidgetFormContent } from "./WidgetFormContent";
import Modal from "..";
import { LoadingSpinner } from "./LoadingSpinner";

interface WidgetFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  widgetId?: string;
  onSave?: () => void;
}

const WidgetFormModal = ({
  isOpen,
  onClose,
  widgetId,
  onSave,
}: WidgetFormModalProps) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<CreateWidgetRequest>({
    name: "",
    property_id: "",
    type: WidgetType.FLOATING,
    active: true,
    settings: {
      position: WidgetPosition.BOTTOM_RIGHT,
      sources: [],
      showReviewUsButton: false,
      showReadReviewsLink: false,
    },
  });

  const isEditing = !!widgetId;
  const modalTitle = isEditing ? "Edit Widget" : "Create New Widget";

  const fetchWidget = useCallback(async () => {
    if (!widgetId) return;

    setLoading(true);
    try {
      const widgetData = await widgetApi.getById(widgetId);
      setFormData({
        name: widgetData.name,
        property_id: widgetData.property_id,
        type: widgetData.type,
        active: widgetData.active,
        settings: widgetData.settings,
      });
    } catch (error) {
      console.error("Error fetching widget:", error);
    } finally {
      setLoading(false);
    }
  }, [widgetId]);

  useEffect(() => {
    if (isOpen) {
      if (isEditing) {
        fetchWidget();
      } else {
        setFormData({
          name: "",
          property_id: "",
          type: WidgetType.FLOATING,
          active: true,
          settings: {
            position: WidgetPosition.BOTTOM_RIGHT,
            sources: [],
            showReviewUsButton: false,
            showReadReviewsLink: false,
          },
        });
      }
    }
  }, [isOpen, isEditing, fetchWidget]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (isEditing && widgetId) {
        const updateData: UpdateWidgetRequest = formData;
        await widgetApi.update(widgetId, updateData);
      } else {
        const createData: CreateWidgetRequest = {
          ...formData,
          property_id: formData.property_id || generatePropertyId(),
        };
        await widgetApi.create(createData);
      }

      onSave?.();
      handleClose();
    } catch (error) {
      console.error(
        `Error ${isEditing ? "updating" : "creating"} widget:`,
        error
      );
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    if (!isEditing) {
      setFormData({
        name: "",
        property_id: "",
        type: WidgetType.FLOATING,
        active: true,
        settings: {
          position: WidgetPosition.BOTTOM_RIGHT,
          sources: [],
          showReviewUsButton: false,
          showReadReviewsLink: false,
        },
      });
    }
    onClose();
  };

  const generatePropertyId = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  if (loading) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title={modalTitle}>
        <LoadingSpinner />
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={modalTitle} size="lg">
      <WidgetFormContent
        formData={formData}
        setFormData={setFormData}
        isEditing={isEditing}
        saving={saving}
        onSubmit={handleSubmit}
        onClose={handleClose}
      />
    </Modal>
  );
};

export default WidgetFormModal; 