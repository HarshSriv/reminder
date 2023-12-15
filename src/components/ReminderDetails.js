import React, { useState } from 'react';

const ReminderDetails = ({ reminder }) => {
  const [editedValues, setEditedValues] = useState({
    username: reminder.username,
    subject: reminder.subject,
    text: reminder.text,
    email: reminder.email,
    contact: reminder.contact,
  });

  const handleChange = (field, value) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleUpdate = () => {
    // Perform the update action using editedValues
    // For example, you can make an API call to update the data

    // After the update is successful, you might want to update the UI accordingly
    // For example, you can show a success message or update the state that holds the reminders
  };

  return (
    <div className="card-content">
      <div className="field">
        <strong>Username:</strong> {reminder.username}
      </div>
      <div className="field">
        <strong>Subject:</strong> {reminder.subject}
      </div>
      <div className="field">
        <strong>Text:</strong>
        <input
          type="text"
          value={editedValues.text}
          onChange={(e) => handleChange('text', e.target.value)}
        />
      </div>
      <div className="field">
        <strong>Email:</strong>
        <input
          type="text"
          value={editedValues.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </div>
      <div className="field">
        <strong>Contact:</strong>
        <input
          type="text"
          value={editedValues.contact}
          onChange={(e) => handleChange('contact', e.target.value)}
        />
      </div>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default ReminderDetails;
