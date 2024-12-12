import React from "react";
import { Box, Typography, Paper,Chip } from "@mui/material";
import { Droppable, Draggable } from "react-beautiful-dnd";

// Column component represents a single stage (e.g., "To Do", "In Progress")
const Column = ({ title, tasks }) => {
  // Define color mapping for each stage
  const titleColors = {
    "To Do": "warning.main", 
    "In Progress": "secondary.main", 
    "Peer Review": "info.main", 
    "Done": "success.main", 
  };
  return (
    <Box
      sx={{
        flex: "1 1 200px",// Flexbox properties to control layout
        minWidth: "250px",
        maxWidth: "300px",
      }}
    >
      {/* Display the stage title with color depending on the stage */}
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          marginTop:"2px",
          marginBottom: "10px",
          color: "#fff",
          backgroundColor: titleColors[title],
          padding: "2px",
          borderRadius: "8px",
        }}
      >
        {title}
      </Typography>

      {/* Droppable area where tasks can be dropped */}
      <Droppable droppableId={title}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              borderRadius: "8px",
              padding: "10px",
              minHeight: "300px", // Set minimum height to make the area sizable
            }}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided,snapshot) => (
                  <Paper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    elevation={3}
                    sx={{
                      padding: "20px",
                      marginBottom: "10px",
                      backgroundColor: snapshot.isDragging ? 'lightgreen' : 'white',// Change color when dragging
                      border: snapshot.isDragging ? '2px solid #1976d2' : '',
                      cursor: "grab",
                      borderRadius: "8px"
                    }}
                  >
                    <Typography variant="subtitle1">{task.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {task.description}
                    </Typography>

                    {/* Display task priority as a chip */}
                    <Chip
                      label={task.priority}
                      color={task.priority === 'High' ? 'error' : task.priority === 'Medium' ? 'warning' : 'success'}
                      variant="outlined"
                      sx={{ fontWeight: 'bold', mt: 1 }}
                    />
                  </Paper>
                )}
              </Draggable>
            ))}
            {/* Placeholder required by React Beautiful DnD */}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Box>
  );
};

export default Column;
