import React, { useState } from "react";
import { Dialog,DialogTitle,DialogContent,TextField,DialogActions,Button,MenuItem, Select, FormControl, InputLabel,} from "@mui/material";

// Modal component for adding a new task
const AddTaskModal = ({ onClose, onAddTask }) => {
  // Local state to store the task's title, description, and priority
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = React.useState('Medium');
// Function to handle the form submission and add a new task
  const handleSubmit = () => {
    const newTask = {
      id: Date.now().toString(),// Generate a unique task ID
      title,
      description,
      stage: "To Do",// Default stage is "To Do"
      priority,
    };
    // Pass the new task to the parent component's callback function
    onAddTask(newTask);
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Update title state
          margin="normal"
        />
        <TextField
          fullWidth
          label="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}// Update description state
          margin="normal"
        />
        <InputLabel id="priority-label">Priority</InputLabel>
        <Select
          labelId="priority-label"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}// Update priority stategit
          label="Priority"
        >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </Select>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskModal;
