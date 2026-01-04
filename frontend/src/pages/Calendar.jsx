import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect, useState } from 'react'

export default function CalendarPage() {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    fetch('/api/reservations-calendar')
      .then(res => res.json())
      .then(data => setReservations(data))
  }, [])

  const handleDateSelect = (selectInfo) => {
    const title = prompt('Task name:')
    if (!title) return

    const newReservation = {
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr
    }

    fetch('/api/reservations-calendar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReservation)
    })
      .then(res => res.json())
      .then(saved => setReservations([...reservations, saved]))
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      selectable
      editable
      events={reservations}
      select={handleDateSelect}
      height="auto"
    />
  )
}
