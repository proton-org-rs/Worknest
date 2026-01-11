import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect, useState } from 'react'

const addMinutes = (isoString, minutes) => {
    const start = new Date(isoString)
    return new Date(start.getTime() + minutes * 60000).toISOString()
}

const toEvent = (reservation) => {
    const start = reservation.start || reservation.start_time
    const end = reservation.end || (start && reservation.duration ? addMinutes(start, reservation.duration) : null)

    return {
        id: reservation.id,
        title: reservation.title || reservation.room_number || 'Reservation',
        start,
        end,
        ...reservation
    }
}

export default function CalendarPage() {
    const [reservations, setReservations] = useState([])

    useEffect(() => {
        fetch('/reservations-calendar')
        .then(res => res.json())
        .then(data => setReservations(data.map(toEvent)))
    }, [])

    const handleDateSelect = (selectInfo) => {
        const roomNumber = prompt('Room number:')
        if (!roomNumber) return

        const creatorEmail = prompt('Creator email:')
        if (!creatorEmail) return

        const durationMinutes = Math.round((selectInfo.end - selectInfo.start) / 60000) || 60

        const newReservation = {
            title : `Room ${roomNumber} - ${creatorEmail}`, 
            start: selectInfo.startStr,
            end: selectInfo.endStr || addMinutes(selectInfo.startStr, durationMinutes),
            duration: durationMinutes,
            room_number: roomNumber,
            creator_email: creatorEmail
        }

        fetch('/reservations-calendar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newReservation)
        })
        .then(res => res.json())
        .then(saved => {
            setReservations(prev => [...prev, toEvent(saved)])
            alert(`Saved new reservation in ${saved.room_number} starting at ${saved.start} by ${saved.creator_email}`)
        })
        .catch(err => {
            console.error('Error saving event', err)
            alert('Error saving event: ' + err)
        })

    }

    return (
        <div style={{ padding: '20px', height: '90vh' }}>
        <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        allDaySlot={false}
        nowIndicator={true}
        slotDuration="01:00:00"
        slotMinTime="06:00:00"       
        slotMaxTime="22:00:00"
        selectable
        editable={false}
        firstDay="1"
        events={reservations}
        select={handleDateSelect}
        expandRows={true}
        height="100%"
        />
        </div>
    )
}
