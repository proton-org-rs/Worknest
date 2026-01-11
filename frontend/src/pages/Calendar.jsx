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
        const title = prompt('Task name:')
        if (!title) return

        const newReservation = {
            title, 
            start: selectInfo.startStr,
            end: selectInfo.endStr
        }

        fetch('/reservations-calendar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newReservation)
        })
        .then(async res => {
            
            // For debugging
            // (creating a new reservation throws an error)

            const text = await res.text()
            alert('Server response: '+text)  
            return JSON.parse(text)                 
        })
        .then(saved => {
            setReservations(prev => [...prev, saved])
            alert(`Saved new event: ${saved.title} ${saved.startStr} - ${saved.endStr}`)
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
