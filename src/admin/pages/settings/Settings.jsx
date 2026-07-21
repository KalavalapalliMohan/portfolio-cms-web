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
        <h4 className="text-white">Loading Settings...</h4>
      </div>
    );
  }

  return <SettingsModal settings={settings} onSuccess={fetchSettings} />;
}

export default Settings;
