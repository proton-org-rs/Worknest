import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect, useState } from 'react'

export default function CalendarPage() {
    const [reservations, setReservations] = useState([])

    useEffect(() => {
        fetch('/reservations-calendar')
        .then(res => res.json())
        .then(data => setReservations(data))
    }, [])

    const handleDateSelect = (selectInfo) => {
        const roomNumber = prompt('Room number:')
        if (!roomNumber) return

        const creatorEmail = prompt('Creator email:')
        if (!creatorEmail) return

        const newReservation = {
            title, 
            start_time: selectInfo.startStr,
            duration: selectInfo.duration,
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
            setReservations(prev => [...prev, saved])
            alert(`Saved new reservation in ${saved.room_number} starting at ${saved.start_time} by ${saved.creator_email}`)
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
