import React, { useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";

export default function NotesTab() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      user: "Admin John",
      timestamp: "2025-06-01 10:15 AM",
      note: "Confirmed PO with client and scheduled technician for 06/03.",
    },
    {
      id: 2,
      user: "Admin Lisa",
      timestamp: "2025-05-30 04:45 PM",
      note: "Sent invoice #4561. Waiting for payment confirmation.",
    },
    {
      id: 3,
      user: "Admin Mike",
      timestamp: "2025-05-29 11:10 AM",
      note: "Followed up with electrician for status update.",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [noteName, setNoteName] = useState("");

  const handleAddNote = () => {
    if (!newNote.trim() || !noteName.trim()) return;

    const now = new Date();
    const timestamp = now.toLocaleString("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    });

    const newEntry = {
      id: Date.now(),
      user: noteName.trim(),
      timestamp,
      note: newNote.trim(),
    };

    setNotes([newEntry, ...notes]);
    setNewNote("");
    setNoteName("");
    setShowModal(false);
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className="my-4 px-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Internal Notes Timeline</h5>
        <Button variant="success" onClick={() => setShowModal(true)}>
          + Add Note
        </Button>
      </div>

      {notes.length > 0 ? (
        notes.map(({ id, user, timestamp, note }) => (
          <div key={id} className="mb-3 p-3 border rounded bg-light shadow-sm">
            {/* User Name */}
            <div className="mb-1">
              <strong>{user}</strong>
            </div>

            {/* Note content */}
            <div className="mb-2">{note}</div>

            {/* Timestamp */}
            <div className="text-muted text-end mb-2" style={{ fontSize: "0.875rem" }}>
              {timestamp}
            </div>

            {/* Delete Button */}
            <div className="text-end">
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDeleteNote(id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))
      ) : (
        <Alert variant="info">No notes available.</Alert>
      )}

      {/* Add Note Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="noteName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name..."
              value={noteName}
              onChange={(e) => setNoteName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="noteText">
            <Form.Label>Note</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter your internal note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddNote}>
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
