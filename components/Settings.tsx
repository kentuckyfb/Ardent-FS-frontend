// components/Settings/index.tsx
import React, { useState , ChangeEvent} from 'react';
import { Settings as SettingsIcon, X } from 'lucide-react';
import { useRootPath } from '../context/RootPathContext';


interface SettingsProps {
  onSave: (settings: ApplicationSettings) => void;
  initialSettings?: ApplicationSettings;
}

export interface ApplicationSettings {
  apiKey: string;
  theme: 'system' | 'dark' | 'light';
  folderPaths: {
    documents: string;
    root: string;
    images: string;
    downloads: string;
    other: string;
  };
  preferences: {
    showCodeWhenUsingDataAnalyst: boolean;
    showFollowUpSuggestions: boolean;
    archiveChats: boolean;
  };
  language: string;
}

const defaultSettings: ApplicationSettings = {
  apiKey: '',
  theme: 'system',
  folderPaths: {
    documents: '',
    root: '',
    images: '',
    downloads: '',
    other: ''
  },
  preferences: {
    showCodeWhenUsingDataAnalyst: true,
    showFollowUpSuggestions: true,
    archiveChats: false
  },
  language: 'auto-detect'
};

const Settings: React.FC<SettingsProps> = ({ onSave, initialSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<ApplicationSettings>(initialSettings || defaultSettings);
  const [activeTab, setActiveTab] = useState<string>('general');

  const { rootPath, setRootPath } = useRootPath();
  const [newRootPath, setNewRootPath] = useState<string>(settings.folderPaths.root);

  // Handle opening and closing the settings modal
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Handle path change in the settings form
  const handlePathChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedPath = e.target.value;
    setNewRootPath(updatedPath);
    setSettings((prevSettings) => ({
      ...prevSettings,
      folderPaths: {
        ...prevSettings.folderPaths,
        root: updatedPath
      }
    }));
  };

  // Handle save of settings
  const handleSave = () => {
    onSave(settings); // Save settings in parent component
    setRootPath(newRootPath); // Update global root path context
    handleClose();
  };

  const updateSetting = (
    category: keyof ApplicationSettings,
    key: string,
    value: any
  ) => {
    setSettings((prev) => {
      if (category === 'folderPaths' || category === 'preferences') {
        return {
          ...prev,
          [category]: {
            ...prev[category],
            [key]: value
          }
        };
      } else {
        return {
          ...prev,
          [key]: value
        };
      }
    });
  };

  // Render the settings button in the main interface
  const renderSettingsButton = () => (
    <button 
      onClick={handleOpen} 
      className="fixed bottom-4 right-4 p-3 bg-gray-800 rounded-full text-green-400 hover:bg-gray-700 transition-colors"
      aria-label="Settings"
    >
      <SettingsIcon size={20} />
    </button>
  );

  // If the modal is not open, just render the button
  if (!isOpen) {
    return renderSettingsButton();
  }

  return (
    <>
      {renderSettingsButton()}
      
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleClose}></div>
      
      {/* Settings Modal */}
      <div className="fixed inset-8 md:inset-auto md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-11/12 md:max-w-2xl md:h-5/6 bg-gray-900 text-green-400 rounded-lg z-50 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-700 p-4">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex h-full">
          {/* Sidebar navigation */}
          <div className="w-1/4 border-r border-gray-700 bg-gray-800 p-2">
            <ul>
              <li 
                className={`p-2 rounded-md cursor-pointer ${activeTab === 'general' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                onClick={() => setActiveTab('general')}
              >
                <div className="flex items-center space-x-2">
                  <span>General</span>
                </div>
              </li>
              <li 
                className={`p-2 rounded-md cursor-pointer ${activeTab === 'folderPaths' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                onClick={() => setActiveTab('folderPaths')}
              >
                <div className="flex items-center space-x-2">
                  <span>Folder Paths</span>
                </div>
              </li>
              <li 
                className={`p-2 rounded-md cursor-pointer ${activeTab === 'api' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                onClick={() => setActiveTab('api')}
              >
                <div className="flex items-center space-x-2">
                  <span>API Settings</span>
                </div>
              </li>
              <li 
                className={`p-2 rounded-md cursor-pointer ${activeTab === 'appearance' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                onClick={() => setActiveTab('appearance')}
              >
                <div className="flex items-center space-x-2">
                  <span>Appearance</span>
                </div>
              </li>
              <li 
                className={`p-2 rounded-md cursor-pointer ${activeTab === 'advanced' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                onClick={() => setActiveTab('advanced')}
              >
                <div className="flex items-center space-x-2">
                  <span>Advanced</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Content area */}
          <div className="w-3/4 p-4 overflow-y-auto">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg mb-2">Theme</h3>
                  <select 
                    className="w-full bg-gray-800 text-green-400 border border-gray-700 rounded-md p-2"
                    value={settings.theme}
                    onChange={(e) => updateSetting('theme', 'theme', e.target.value)}
                  >
                    <option value="system">System</option>
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                  </select>
                </div>

                <div>
                  <h3 className="text-lg mb-2">Language</h3>
                  <select 
                    className="w-full bg-gray-800 text-green-400 border border-gray-700 rounded-md p-2"
                    value={settings.language}
                    onChange={(e) => updateSetting('language', 'language', e.target.value)}
                  >
                    <option value="auto-detect">Auto-detect</option>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg mb-2">Preferences</h3>
                  
                  <div className="flex items-center justify-between">
                    <label>Always show code when using data analyst</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={settings.preferences.showCodeWhenUsingDataAnalyst}
                        onChange={(e) => updateSetting('preferences', 'showCodeWhenUsingDataAnalyst', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label>Show follow up suggestions in chats</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={settings.preferences.showFollowUpSuggestions}
                        onChange={(e) => updateSetting('preferences', 'showFollowUpSuggestions', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <label>Archive chats</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={settings.preferences.archiveChats}
                        onChange={(e) => updateSetting('preferences', 'archiveChats', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'folderPaths' && (
              <div className="space-y-4">
                <h3 className="text-lg mb-2">Folder Paths</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Configure the folder paths that the application will scan for files. 
                  Each path should be a valid directory on your system.
                </p>
                
                <div className="space-y-3">
                  <div>
                    <label className="block mb-1">Documents Folder</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-800 text-green-400 border border-gray-700 rounded-md p-2"
                      value={settings.folderPaths.documents}
                      onChange={(e) => updateSetting('folderPaths', 'documents', e.target.value)}
                      placeholder="/path/to/documents"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1">Root Folder</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-800 text-green-400 border border-gray-700 rounded-md p-2"
                      value={newRootPath}
                      onChange={handlePathChange}
                      placeholder="/path/to/root"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1">Images Folder</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-800 text-green-400 border border-gray-700 rounded-md p-2"
                      value={settings.folderPaths.images}
                      onChange={(e) => updateSetting('folderPaths', 'images', e.target.value)}
                      placeholder="/path/to/images"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1">Downloads Folder</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-800 text-green-400 border border-gray-700 rounded-md p-2"
                      value={settings.folderPaths.downloads}
                      onChange={(e) => updateSetting('folderPaths', 'downloads', e.target.value)}
                      placeholder="/path/to/downloads"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1">Other Folder</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-800 text-green-400 border border-gray-700 rounded-md p-2"
                      value={settings.folderPaths.other}
                      onChange={(e) => updateSetting('folderPaths', 'other', e.target.value)}
                      placeholder="/path/to/other"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-4">
                <h3 className="text-lg mb-2">API Settings</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Configure the API settings for connecting to the file search backend.
                </p>
                
                <div>
                  <label className="block mb-1">API Key</label>
                  <input 
                    type="password" 
                    className="w-full bg-gray-800 text-green-400 border border-gray-700 rounded-md p-2"
                    value={settings.apiKey}
                    onChange={(e) => updateSetting('apiKey', 'apiKey', e.target.value)}
                    placeholder="Enter your API key"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Your API key is stored locally and never shared.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-4">
                <h3 className="text-lg mb-2">Appearance</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Customize the look and feel of the terminal interface.
                </p>

                <div>
                  <label className="block mb-1">Color Theme</label>
                  <select 
                    className="w-full bg-gray-800 text-green-400 border border-gray-700 rounded-md p-2"
                  >
                    <option value="green">Matrix Green</option>
                    <option value="blue">Hacker Blue</option>
                    <option value="amber">Retro Amber</option>
                    <option value="white">Modern White</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Font Size</label>
                  <select 
                    className="w-full bg-gray-800 text-green-400 border border-gray-700 rounded-md p-2"
                  >
                    <option value="sm">Small</option>
                    <option value="md">Medium</option>
                    <option value="lg">Large</option>
                    <option value="xl">Extra Large</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'advanced' && (
              <div className="space-y-4">
                <h3 className="text-lg mb-2">Advanced Settings</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Configure advanced settings for the application.
                </p>

                <div>
                  <label className="block mb-1">Search Depth</label>
                  <select 
                    className="w-full bg-gray-800 text-green-400 border border-gray-700 rounded-md p-2"
                  >
                    <option value="1">Shallow (faster)</option>
                    <option value="2">Medium</option>
                    <option value="3">Deep (slower)</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1">File Types to Index</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-800 text-green-400 border border-gray-700 rounded-md p-2"
                    placeholder=".txt,.pdf,.doc,.md"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Comma-separated list of file extensions to include
                  </p>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="p-3 bg-gray-800 rounded-md">
                    <h4 className="text-red-400 font-medium">Danger Zone</h4>
                    <div className="mt-3 space-y-2">
                      <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded">
                        Reset All Settings
                      </button>
                      <button className="w-full bg-red-900 hover:bg-red-800 text-white py-2 px-4 rounded">
                        Clear All Data
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-700 p-4 flex justify-end space-x-3">
          <button 
            onClick={handleClose}
            className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-green-700 hover:bg-green-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default Settings;