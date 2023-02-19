import React, { useState } from 'react';
import './App.css';

const Todo = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleDateChange = (e) => {
    setEventDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEvents([...events, { name: eventName, date: eventDate }]);
    setEventName('');
    setEventDate('');
  };

  const handleDelete = (index) => {
    const newEvents = [...events];
    newEvents.splice(index, 1);
    setEvents(newEvents);
  };

  const handleRename = (index, newName) => {
    const newEvents = [...events];
    newEvents[index].name = newName;
    setEvents(newEvents);
  };

  const eventsByDate = {};
  events.forEach((event) => {
    const date = new Date(event.date).toLocaleDateString();
    if (!eventsByDate[date]) {
      eventsByDate[date] = [event];
    } else {
      eventsByDate[date].push(event);
    }
  });

  return (
    <div className="todo">
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <label>Event Name:</label>
        <input type="text" value={eventName} onChange={handleNameChange} placeholder="Enter event name" />
        <label>Date:</label>
        <input type="date" value={eventDate} onChange={handleDateChange} />
        <button type="submit">Add Event</button>
      </form>
      <ul className="event-list">
        {events.map((event, index) => (
          <li key={index} className="event">
            <span className="event-name">{event.name}</span>
            <div>
              <button className="event-button" onClick={() => handleDelete(index)}>
                Delete
              </button>
              <button className="event-button" onClick={() => handleRename(index, prompt('Enter new name'))}>
                Rename
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h2>Calendar</h2>
      <table className="calendar">
        <thead>
          <tr>
            <th>Date</th>
            <th>Events</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(eventsByDate).map((date) => (
            <tr key={date}>
              <td>{date}</td>
              <td>
                <ul className="calendar-event-list">
                  {eventsByDate[date].map((event, index) => (
                    <li key={index} className="calendar-event">
                      <span className="calendar-event-name">{event.name}</span>
                      <div>
                        <button className="calendar-event-button" onClick={() => handleDelete(events.indexOf(event))}>
                          Delete
                        </button>
                        <button
                          className="calendar-event-button"
                          onClick={() => handleRename(events.indexOf(event), prompt('Enter new name'))}
                        >
                          Rename
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Todo;