import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Tooltip, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fetchDayDoneCount } from "../lib/itemStateApi";

const ROUTE_COLOR = "oklch(58% 0.17 350)"; // primary-dark
const START_COLOR = "oklch(64% 0.11 150)"; // good
const END_COLOR = "oklch(70% 0.16 350)"; // primary
const MID_COLOR = "oklch(45% 0.12 300)"; // secondary

function numberIcon(n, variant) {
  const bg = variant === "start" ? START_COLOR : variant === "end" ? END_COLOR : MID_COLOR;
  return L.divIcon({
    className: "",
    html: `<div class="notch-sm" style="width:28px;height:28px;display:flex;align-items:center;justify-content:center;background:${bg};border:2px solid var(--color-ink);color:#fff;font-family:'Galmuri9',monospace;font-weight:700;font-size:12px;box-shadow:0 1px 3px rgba(0,0,0,0.35);">${n}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], 13);
      return;
    }
    map.fitBounds(points, { padding: [28, 28] });
  }, [map, points]);
  return null;
}

export default function OverviewMap({ day }) {
  const stops = useMemo(
    () => day.items.map((it, idx) => ({ ...it, idx })).filter((it) => it.lat != null && it.lng != null),
    [day]
  );
  const points = useMemo(() => stops.map((s) => [s.lat, s.lng]), [stops]);
  const [routeLine, setRouteLine] = useState(null);
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetchDayDoneCount(day.key)
      .then((count) => {
        if (!cancelled) setDoneCount(count);
      })
      .catch((err) => console.error("fetchDayDoneCount failed", err));
    return () => {
      cancelled = true;
    };
  }, [day.key]);

  useEffect(() => {
    setRouteLine(null);
    if (stops.length < 2) return;
    const coordStr = stops.map((s) => `${s.lng},${s.lat}`).join(";");
    const url = `https://router.project-osrm.org/route/v1/driving/${coordStr}?overview=full&geometries=geojson`;
    let cancelled = false;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const coords = data?.routes?.[0]?.geometry?.coordinates;
        if (coords?.length) setRouteLine(coords.map(([lng, lat]) => [lat, lng]));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [stops]);

  if (stops.length === 0) {
    return (
      <div className="notch-lg border-2 border-dashed border-ink/30 bg-surface px-4 py-10 text-center text-[13px] text-muted">
        오늘 일정엔 지도로 보여줄 장소가 아직 없어요
      </div>
    );
  }

  return (
    <div>
      <div className="mb-2.5 flex items-center gap-2">
        <div className="h-2 flex-1 border border-ink bg-surface-soft">
          <div
            className="pixel-stripe-fill h-full bg-primary"
            style={{ width: `${Math.max(4, (doneCount / day.items.length) * 100)}%` }}
          />
        </div>
        <span className="font-display shrink-0 text-[11px] font-bold text-ink">
          오늘의 여정 {doneCount}/{day.items.length} · 실제 이동 경로
        </span>
      </div>
      <div className="notch-lg overflow-hidden border-2 border-ink" style={{ height: 380 }}>
        <MapContainer center={points[0]} zoom={12} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; OpenStreetMap &copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <FitBounds points={points} />
          <Polyline
            positions={routeLine ?? points}
            pathOptions={{ color: ROUTE_COLOR, weight: 4, opacity: 0.85, dashArray: routeLine ? undefined : "2 8" }}
          />
          {stops.map((s, i) => {
            const variant = i === 0 ? "start" : i === stops.length - 1 ? "end" : "mid";
            return (
              <Marker key={s.idx} position={[s.lat, s.lng]} icon={numberIcon(i + 1, variant)}>
                <Popup>
                  {s.t} · {s.icon} {s.title}
                </Popup>
                {(i === 0 || i === stops.length - 1) && (
                  <Tooltip permanent direction="top" offset={[0, -16]}>
                    {s.t} {s.title}
                  </Tooltip>
                )}
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
