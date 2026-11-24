"use client";

import L from "leaflet";
import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";

import {
  getRoadTransportLocation,
  getTransportLocation,
  type MapCoordinate,
} from "@/lib/transport/locations";
import type { RoadRouteEstimate } from "@/lib/transport/route-service";

import "leaflet/dist/leaflet.css";

interface RouteDistanceMapProps {
  stops: string[];
  route: RoadRouteEstimate | null;
  loading: boolean;
  error: string;
}

function createMarkerIcon(index: number, isFinal: boolean) {
  const isOrigin = index === 0;
  const color = isOrigin || isFinal ? "#FCC000" : "#111111";
  return L.divIcon({
    className: "",
    html: `<span style="display:grid;place-items:center;width:30px;height:30px;border:2px solid #fff;border-radius:9999px;background:${color};color:${isOrigin || isFinal ? "#111" : "#fff"};font:700 12px/1 system-ui;box-shadow:0 2px 8px #0006">${index + 1}</span>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

function createDestinationIcon() {
  return L.divIcon({
    className: "",
    html: '<span style="display:grid;place-items:center;width:26px;height:26px;border:3px solid #fff;border-radius:9999px;background:#FCC000;color:#111;font:700 11px/1 system-ui;box-shadow:0 2px 8px #0006">D</span>',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });
}

function MapBounds({ coordinates }: { coordinates: MapCoordinate[] }) {
  const map = useMap();
  const boundsKey = coordinates.map(([longitude, latitude]) => `${longitude},${latitude}`).join("|");

  useEffect(() => {
    if (coordinates.length === 0) return;
    const points = coordinates.map(([longitude, latitude]) => L.latLng(latitude, longitude));
    if (points.length === 1) {
      map.setView(points[0], 8);
    } else {
      map.fitBounds(L.latLngBounds(points), { padding: [28, 28] });
    }
  }, [boundsKey, coordinates, map]);

  return null;
}

function formatDuration(seconds: number | null): string {
  if (seconds === null || !Number.isFinite(seconds)) return "Duration unavailable";
  const minutes = Math.round(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return hours > 0 ? `${hours} hr ${remainingMinutes} min` : `${remainingMinutes} min`;
}

export default function RouteDistanceMap({
  stops,
  route,
  loading,
  error,
}: RouteDistanceMapProps) {
  const [selectedLeg, setSelectedLeg] = useState<{ itineraryKey: string; index: number } | null>(null);
  const selectedLegIndex = selectedLeg && route?.itineraryKey === selectedLeg.itineraryKey
    ? selectedLeg.index
    : null;
  const mapStops = route?.stops ?? stops;
  const markers = useMemo(
    () => mapStops.flatMap((name, index) => {
      const location = getTransportLocation(name);
      return location ? [{ name, index, coordinate: location.coordinate }] : [];
    }),
    [mapStops],
  );
  const selectedDestinationMarkers = useMemo(
    () => stops.flatMap((name, index) => {
      const location = getTransportLocation(name);
      const roadAccess = getRoadTransportLocation(name);
      if (!location || !roadAccess || location.name === roadAccess.name ||
          !route?.stops.includes(roadAccess.name)) {
        return [];
      }
      return [{
        name,
        index,
        roadAccessName: roadAccess.name,
        coordinate: location.coordinate,
      }];
    }),
    [route?.stops, stops],
  );
  const markerCoordinates = useMemo(
    () => [
      ...markers.map((marker) => marker.coordinate),
      ...selectedDestinationMarkers.map((marker) => marker.coordinate),
    ],
    [markers, selectedDestinationMarkers],
  );
  const fallbackCenter: [number, number] = markerCoordinates.length > 0
    ? [markerCoordinates[0][1], markerCoordinates[0][0]]
    : [33.6844, 73.0479];

  const selectLeg = (index: number) => {
    if (route) setSelectedLeg({ itineraryKey: route.itineraryKey, index });
  };

  return (
    <section className="overflow-hidden rounded-[18px] border border-[#e8d7a3] bg-white shadow-sm" aria-label="Road route map">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-200 px-4 py-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b6b00]">Road route</p>
          <p className="mt-1 text-sm font-semibold text-stone-950">Your stops, in selected order</p>
        </div>
        {loading ? <span role="status" className="text-xs text-stone-600">Calculating road route…</span> : null}
        {route ? (
          <div className="text-right">
            <p className="text-lg font-bold tabular-nums text-stone-950">
              {route.estimatedDistanceKm.toLocaleString("en-PK", { maximumFractionDigits: 1 })} km
            </p>
            <p className="text-[10px] text-stone-600">
              Estimated driving distance · {formatDuration(route.durationSeconds)}
            </p>
            {route.allowanceKm > 0 ? (
              <p className="text-[10px] text-stone-500">
                Includes {route.allowanceKm.toLocaleString("en-PK", { maximumFractionDigits: 1 })} km allowance
              </p>
            ) : null}
            {route.source === "MANUAL" ? (
              <p className="mt-1 text-[10px] font-semibold text-[#8b6b00]">Distance manually adjusted by Hodophile</p>
            ) : null}
          </div>
        ) : null}
      </div>

      <MapContainer
        center={fallbackCenter}
        zoom={6}
        scrollWheelZoom
        className="h-[320px] w-full sm:h-[390px]"
        aria-label="Interactive road map of selected destinations"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapBounds coordinates={markerCoordinates} />
        {route?.legs.map((leg, index) => {
          const positions = leg.geometry.map(([longitude, latitude]) => [latitude, longitude] as [number, number]);
          if (positions.length < 2) return null;
          return (
            <Polyline
              key={`${leg.from}-${leg.to}-${index}`}
              positions={positions}
              pathOptions={{
                color: selectedLegIndex === index ? "#a87900" : "#171717",
                weight: selectedLegIndex === index ? 7 : 5,
                opacity: 0.88,
              }}
              eventHandlers={{ click: () => selectLeg(index) }}
            >
              <Tooltip sticky>
                <span className="font-semibold">{leg.from} → {leg.to}</span>
                <br />
                {leg.distanceKm.toLocaleString("en-PK", { maximumFractionDigits: 1 })} km · {formatDuration(leg.durationSeconds)}
              </Tooltip>
            </Polyline>
          );
        })}
        {markers.map((marker) => (
          <Marker
            key={`${marker.name}-${marker.index}`}
            position={[marker.coordinate[1], marker.coordinate[0]]}
            icon={createMarkerIcon(marker.index, marker.index === markers.length - 1)}
            zIndexOffset={marker.index === 0 || marker.index === markers.length - 1 ? 500 : 0}
          >
            <Tooltip permanent direction="top" offset={[0, -14]}>{marker.name}</Tooltip>
            <Popup>
              <strong>{marker.name}</strong>
              {route?.legs[marker.index] ? (
                <p className="mt-1 text-xs">
                  Next leg: {route.legs[marker.index].distanceKm.toLocaleString("en-PK", { maximumFractionDigits: 1 })} km
                  {" · "}
                  {formatDuration(route.legs[marker.index].durationSeconds)}
                </p>
              ) : null}
            </Popup>
          </Marker>
        ))}
        {selectedDestinationMarkers.map((marker) => (
          <Marker
            key={`destination-${marker.name}-${marker.index}`}
            position={[marker.coordinate[1], marker.coordinate[0]]}
            icon={createDestinationIcon()}
            zIndexOffset={700}
          >
            <Tooltip permanent direction="top" offset={[0, -12]}>{marker.name} · selected destination</Tooltip>
            <Popup>
              <strong>{marker.name}</strong>
              <p className="mt-1 text-xs">Road route reaches {marker.roadAccessName}.</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {route ? (
        <div className="grid gap-1 border-t border-stone-200 px-4 py-3 text-xs text-stone-700 sm:grid-cols-2">
          {route.legs.map((leg, index) => (
            <button
              key={`${leg.from}-${leg.to}-${index}`}
              type="button"
              onClick={() => selectLeg(index)}
              aria-pressed={selectedLegIndex === index}
              className={`flex min-h-10 items-center justify-between gap-3 rounded px-2 text-left transition hover:bg-[#fff9e8] ${selectedLegIndex === index ? "bg-[#fff3ce] font-semibold text-stone-950" : ""}`}
            >
              <span className="min-w-0 truncate">{leg.from} → {leg.to}</span>
              <span className="shrink-0 tabular-nums">
                {leg.distanceKm.toLocaleString("en-PK", { maximumFractionDigits: 1 })} km
                {leg.durationSeconds !== null ? ` · ${formatDuration(leg.durationSeconds)}` : ""}
              </span>
            </button>
          ))}
        </div>
      ) : null}

      {error ? (
        <p role="alert" className="border-t border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900">
          {error} No straight-line distance is shown. Please contact Hodophile for a confirmed road estimate.
        </p>
      ) : null}
      {route && route.legs.some((leg) => leg.geometry.length < 2) ? (
        <p className="border-t border-stone-200 px-4 py-2 text-xs text-stone-600">
          A route segment has a manual distance and is not drawn on the map.
        </p>
      ) : null}
    </section>
  );
}
