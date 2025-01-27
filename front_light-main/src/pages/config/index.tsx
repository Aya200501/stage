import React, { useState } from "react";
import {
  ChevronDown,
  Activity,
  Camera,
  Users,
  Move,
  Box,
  Volume2,
  Shield,
  Zap,
  Share2,
  Crop,
  RefreshCw,
  Layers,
  MoreVertical,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const ConfigPage = () => {
  const [showTypeMenu, setShowTypeMenu] = useState(true);
  const [selectedObjects, setSelectedObjects] = useState<string[]>([
    "Select all",
    "Véhicules",
    "Van",
    "Car",
    "Light truck",
    "Bus",
    "Motorbike",
    "Bicycle",
    "Scooter",
  ]);

  const menuItems = [
    { title: "Reconnaissance de Risque d'Immobilisation", icon: Camera },
    { title: "Reconnaissance Faciale", icon: Users },
    { title: "Comptage de Personnes", icon: Users },
    { title: "Analyse de Mouvement", icon: Move },
    {
      title: "Détection d'Objets Abandonnés ou Manquants",
      icon: Box,
      selected: true,
    },
    { title: "Détection de Fumée et de Feu", icon: Activity },
    { title: "Classification d'Objets", icon: Box, selected: true },
    { title: "Analyse Sonore", icon: Volume2 },
    { title: "Détection des Équipements de Protection Personnelle", icon: Shield },
    { title: "Détection de Loitering Avancée", icon: Zap },
  ];

  const toggleObject = (object: string) => {
    setSelectedObjects((prev) =>
      prev.includes(object)
        ? prev.filter((item) => item !== object)
        : [...prev, object]
    );
  };

  return (
    <div className="flex h-screen bg-[#1A1B1E] text-white">
      {/* Sidebar */}
      <div className="w-64 bg-[#1A1B1E] border-r border-zinc-800">
        <ScrollArea className="h-screen">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Gestion des licences</span>
              <div className="flex gap-2">
                <span className="px-2 py-1 text-xs bg-zinc-800 rounded">90</span>
                <span className="px-2 py-1 text-xs bg-green-900 text-green-400 rounded">
                  30
                </span>
              </div>
            </div>

            {/* Configuration Name */}
            <div>
              <input
                type="text"
                placeholder="Configuration name..."
                className="w-full bg-[#2C2D31] border-0 rounded p-2 text-sm"
              />
            </div>

            {/* GPU Usage */}
            <div className="bg-[#2C2D31] rounded p-2">
              <div className="flex justify-between items-center">
                <div className="text-sm text-zinc-400">Utilisation du GPU</div>
                <div className="text-sm text-[#0EA5E9]">33%</div>
              </div>
              <div className="w-full bg-[#1E293B] h-4 mt-4">
                <div className="bg-[#0EA5E9] w-[33%] h-full"></div>
              </div>
            </div>

            {/* Camera Configurations */}
            <div className="text-sm">Configurations de caméra</div>
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 p-2 text-sm rounded-lg cursor-pointer ${
                  item.selected
                    ? "border-red-600 border-2 hover:bg-zinc-800"
                    : "hover:bg-zinc-800"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative bg-black">
        <img
          src="images/cameraExample.png"
          alt="Video feed"
          className="w-full h-full object-cover"
          width={1000}
          height={600}
        />

        {/* Floating Check Button */}
        <button className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700">
          Check
        </button>

        {/* Floating Menu */}
        <div className="absolute left-4 top-1/4 bg-[#1A1B1E] text-white rounded-lg shadow-lg p-2 flex flex-col gap-4">
          {/* Menu Icons */}
          <button className="flex items-center justify-center w-10 h-10 rounded hover:bg-zinc-700">
            <MoreVertical />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded hover:bg-zinc-700">
            <Share2 />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded hover:bg-zinc-700">
            <Crop />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded hover:bg-zinc-700">
            <RefreshCw />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded hover:bg-zinc-700">
            <Layers />
          </button>
        </div>
    {/* Icônes */}
        <div className="absolute top-1/4 right-4 flex flex-col gap-4 bg-[#1A1B1E] p-2 shadow-sm">
  {/* Icône ZoomIn */}
  <button className="flex items-center justify-center w-10 h-10 rounded hover:bg-zinc-700">
            <MoreVertical className="w-6 h-6 text-white"/>
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded hover:bg-zinc-700">
            <Share2 className="w-6 h-6 text-white" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded hover:bg-zinc-700">
            <Crop className="w-6 h-6 text-white"/>
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded hover:bg-zinc-700">
            <RefreshCw className="w-6 h-6 text-white"/>
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded hover:bg-zinc-700">
            <Layers className="w-6 h-6 text-white"/>
            </button>
  <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2C2D31] hover:bg-zinc-700">
    <ZoomIn className="w-6 h-6 text-white" />
  </button>
  
  {/* Icône ZoomOut */}
  <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2C2D31] hover:bg-zinc-700">
    <ZoomOut className="w-6 h-6 text-white" />
  </button>
  
  {/* Icône Rotate */}
  <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2C2D31] hover:bg-zinc-700">
    <RotateCcw className="w-6 h-6 text-white" />
  </button>
</div>

        {/* Type/Category Selection Menu */}
        {showTypeMenu && (
  <div className="absolute left-4 top-20 w-64 bg-[#1A1B1E] rounded-lg shadow-lg border border-zinc-800">
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Type/Catégorie</span>
      </div>

      <div className="text-xs text-gray-400">Sélection du type d'objet</div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={selectedObjects.includes("Select all")}
            onChange={() => toggleObject("Select all")}
            className="rounded border-none bg-red-600 checked:bg-red-600 text-white focus:ring-0"
          />
          Select all
        </label>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedObjects.includes("Véhicules")}
              onChange={() => toggleObject("Véhicules")}
              className="rounded border-none bg-red-600 checked:bg-red-600 text-white focus:ring-0"
            />
            Véhicules
          </label>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        {[
          "Van",
          "Car",
          "Light truck",
          "Bus",
          "Motorbike",
          "Bicycle",
          "Scooter",
        ].map((item) => (
          <label key={item} className="flex items-center gap-2 text-sm pl-6">
            <input
              type="checkbox"
              checked={selectedObjects.includes(item)}
              onChange={() => toggleObject(item)}
              className="rounded border-none bg-red-600 checked:bg-red-600 text-white focus:ring-0"
            />
            {item}
          </label>
        ))}

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedObjects.includes("Human")}
              onChange={() => toggleObject("Human")}
              className="rounded border-none bg-red-600 checked:bg-red-600 text-white focus:ring-0"
              disabled
            />
            Human
          </label>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
      <Button className="w-full bg-red-600 hover:bg-red-700">Save</Button>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default ConfigPage;
