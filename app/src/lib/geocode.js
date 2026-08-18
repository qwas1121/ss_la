// 장소 검색어로 좌표를 찾아요 (OpenStreetMap Nominatim, 무료 · API 키 불필요)
export async function geocodePlace(place) {
  if (!place) return null;
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(place)}`;
    const res = await fetch(url, { headers: { "Accept-Language": "ko" } });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.[0]) return null;
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch (err) {
    console.error("geocodePlace failed", err);
    return null;
  }
}
