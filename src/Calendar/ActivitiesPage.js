import React, { useEffect, useState } from "react";

function ActivitiesPage() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Etkinlikleri backend'den çek
  useEffect(() => {
    fetch("http://localhost:8000/events/")
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  // Yeni etkinlik ekle
  const addEvent = async () => {
    const newEvent = { title, date, time };
    const res = await fetch("http://localhost:8000/events/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });
    if (res.ok) {
      const result = await res.json();
      alert("Etkinlik eklendi: " + result.id);
      // Listeyi güncelle
      setEvents([...events, newEvent]);
      // Formu temizle
      setTitle(""); setDate(""); setTime("");
    }
  };

  return (
    <div>
      <h1>Etkinlikler</h1>
      <ul>
        {events.map((e, i) => (
          <li key={i}>{e.title} - {e.date} {e.time}</li>
        ))}
      </ul>

      <h2>Yeni Etkinlik Ekle</h2>
      <input
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button onClick={addEvent}>Ekle</button>
    </div>
  );
}

export default ActivitiesPage;
