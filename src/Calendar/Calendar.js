import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import tr from 'date-fns/locale/tr';
import { Modal, Box, TextField, Button, Stack, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Grid, colors } from '@mui/material';
const locales = {
  'tr-TR': tr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [file, setFile] = useState(null);
  const [fileEvents, setFileEvents] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/endpoint/eventslist')
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          ...item,
          id: item._id || item.id,
          start: new Date(item.start),
          end: new Date(item.end),
        }));
        setEvents(formatted);
      });
  }, []);


  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/endpoint/events-with-file')
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          ...item,
          id: item._id || item.id,
          start: new Date(item.start),
          end: new Date(item.end),
          file_path: item.file_path,
        }));
        setFileEvents(formatted);
      })
      .catch((err) => {
        console.error('Dosya ekli etkinlikler alınamadı:', err);
      });
  }, []);

  const handleSelect = ({ start }) => {
    setStart(new Date(start).toISOString().slice(0, 16)); // default
    setEnd(new Date(start).toISOString().slice(0, 16));
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('start', start);
    formData.append('end', end);
    formData.append('fileEvents', fileEvents);
    if (file) formData.append('attachment', file);
    const response = await fetch('http://127.0.0.1:8000/api/endpoint/save-event-file', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      const newEvent = {
        id: data._id,
        title,
        start: new Date(start),
        end: new Date(end),
      };
      setEvents([...events, newEvent]);
      setShowModal(false);
      setTitle('');
      setStart('');
      setEnd('');
      setFile(null);
    } else {
      alert('Etkinlik eklenemedi!');
    }
  };

  const handleEventDelete = (event) => {
    const confirmDelete = window.confirm(`"${event.title}" etkinliğini silmek istiyor musun?`);
    if (!confirmDelete) return;

    fetch(`http://127.0.0.1:8000/api/endpoint/delete/${event.id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Silme işlemi başarısız');
        }
        setEvents(events.filter((e) => e.id !== event.id));
      })
      .catch((err) => {
        console.error('Etkinlik silinemedi:', err);
        alert('Etkinlik silinemedi');
      });
  };

  const handleClose = () => setShowModal(false);

  return (
    <div style={{ padding: 20 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelect}
        onSelectEvent={handleEventDelete}
        views={['month', 'week', 'day', 'agenda']}
        defaultView="month"
        style={{ height: '85vh' }}
      />

      {showModal && (
        <Dialog open={showModal} onClose={handleClose}>
          <DialogTitle variant="h6" component="h2" mb={2}>
            📅 Etkinlik Ekle
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 12 }}>
                <TextField
                  label="Başlık"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}>
                <TextField
                  label="Başlangıç"
                  type="datetime-local"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  InputLabel={{ shrink: true }}
                  required
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}>
                <TextField
                  label="Bitiş"
                  type="datetime-local"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  InputLabel={{ shrink: true }}
                  required
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}>
                <Button
                  variant="outlined"
                  component="label"
                >
                  Dosya Yükle
                  <input
                    type="file"
                    hidden
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error" variant="outlined">
              İptal
            </Button>
            <Button type="submit" color="primary" variant="contained" onClick={handleSubmit}>
              Kaydet
            </Button>
          </DialogActions>
        </Dialog>

      )}
    </div>
  );
};

export default MyCalendar;
