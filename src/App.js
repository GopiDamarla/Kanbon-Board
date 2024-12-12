import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Header from "./components/Header";
import Column from "./components/Column";
import AddTaskModal from "./components/AddTaskModal";
import './App.css' ;

// Initial set of tasks with mock data
const initialTasks = [
  { id: "1", title: "Requirements Gathering", description: "Collaborate with stakeholders to gather detailed requirements for the upcoming features or user stories.", stage: "Done" ,priority: "High" },
  { id: "2", title: "Design Architecture", description: "Plan and design the system architecture, database schema, and the overall structure of the software", stage: "Done", priority: 'Medium'  },
  { id: "3", title: "Write User Stories", description: "Break down the requirements into clear and concise user stories.", stage: "Peer Review",priority: 'Low' },
  { id: "4", title: "Develop Frontend Components", description: "Ensure that UI components are responsive, accessible, and meet the design specifications.", stage: "Done",priority: 'High' },
  { id: "5", title: "Develop Backend API", description: "Focus on the business logic, database interactions, and security for handling user requests", stage: "Peer Review" ,priority: "High" },
  { id: "6", title: "Integrate Frontend with Backend", description: "Connect frontend components to the backend APIs.", stage: "In Progress", priority: 'Medium'  },
  { id: "7", title: "Code Review", description: "Review the code written by a peer to ensure it follows coding standards, is efficient, and is free of bugs.", stage: "Peer Review",priority: 'Low' },
  { id: "8", title: "Integration Testing", description: "Conduct tests to verify that the frontend and backend work together seamlessly.", stage: "Done",priority: 'High' },
  { id: "9", title: "Unit Testing", description: "Write unit tests for the code to validate that individual components function as expected.", stage: "To Do" ,priority: "High" },
  { id: "10", title: " QA Testing", description: "Integration Testing", stage: "In Progress", priority: 'Medium'  },
  { id: "11", title: "Bug Fixes", description: "Fix any issues or bugs found during testing or reported by users.", stage: "To Do",priority: 'Low' },
  { id: "12", title: "Documentation", description: "Write user documentation, technical documentation, and in-code comments.", stage: "To Do",priority: 'High' },
];

// Stages of the Kanban board
const stages = ["To Do", "In Progress", "Peer Review", "Done"];

function App() {
  const [tasks, setTasks] = useState(initialTasks);// State to manage tasks
  const [searchTerm, setSearchTerm] = useState("");// State to store the search query
  const [isModalOpen, setIsModalOpen] = useState(false);// State to manage modal visibility


  // Handle task dragging and dropping
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const updatedTasks = tasks.map((task) =>
        task.id === result.draggableId
          ? { ...task, stage: destination.droppableId }// Update task stage on drop
          : task
      );
      setTasks(updatedTasks); // Update tasks state
    }
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);// Add the new task to the existing task list
  };

  // Filter tasks based on the search term
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
       {/* Header component */}
      <Header onSearch={setSearchTerm}  />

      {/* Drag and Drop Context */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Create columns dynamically based on stages */}
          {stages.map((stage) => (
            <Column
              key={stage}
              title={stage}
              tasks={filteredTasks.filter((task) => task.stage === stage)}
            />
          ))}
        </Box>
      </DragDropContext>
      {/* Floating action button to open the modal */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <AddIcon />
      </Fab>
       {/* Modal for adding new tasks */}
      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onAddTask={handleAddTask}
        />
      )}
    </Box>
  );
}

export default App;
