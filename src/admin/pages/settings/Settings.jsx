import { useEffect, useState } from "react";

import settingService from "../../../services/settingService";
import SettingsModal from "./SettingsModal";

function Settings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);

      const response = await settingService.getSettings();

      setSettings(response.data);
    } catch (error) {
      console.log("Settings Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container-fluid pt-4 px-4">
        <div className="settings-loading">
          <div className="spinner-border text-primary" role="status"></div>

          <h5 className="mt-3 mb-1">Loading Settings...</h5>

          <p className="text-muted mb-0">
            Please wait while we load your portfolio settings.
          </p>
        </div>
      </div>
    );
  }

  return <SettingsModal settings={settings} onSuccess={fetchSettings} />;
}

export default Settings;
