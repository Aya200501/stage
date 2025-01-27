"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function MapControls({
  bounds,
  padding,
  zoom = 12,
}: {
  bounds?: [number, number][];
  padding?: number;
  zoom?: number;
}) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      if (bounds.length == 1) map.setView(bounds[0], zoom);
      else if (bounds.length > 1) {
        map.fitBounds(bounds);
      }
    }
  }, [bounds, map, padding]);
  return null;
}
