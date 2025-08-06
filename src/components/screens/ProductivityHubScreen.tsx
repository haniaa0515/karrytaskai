import React, { useState } from "react";
import { Plus, Clock, Flag, CheckSquare, FileText, Star, Calendar, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  dueDate?: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const ProductivityHubScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Review project proposal", completed: false, priority: "high", dueDate: "2024-01-15" },
    { id: "2", text: "Send follow-up emails", completed: false, priority: "medium" },
    { id: "3", text: "Update task management system", completed: true, priority: "low" },
  ]);

  const [notes, setNotes] = useState<Note[]>([
    { id: "1", title: "Meeting Notes", content: "Discussed project timeline and deliverables...", createdAt: "2024-01-14" },
    { id: "2", title: "Ideas", content: "New feature ideas for the productivity app...", createdAt: "2024-01-13" },
  ]);

  const [newTask, setNewTask] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<"high" | "medium" | "low">("medium");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask,
        completed: false,
        priority: newTaskPriority,
      };
      setTasks([task, ...tasks]);
      setNewTask("");
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addNote = () => {
    if (newNoteTitle.trim() && newNoteContent.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNoteTitle,
        content: newNoteContent,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setNotes([note, ...notes]);
      setNewNoteTitle("");
      setNewNoteContent("");
      setIsCreatingNote(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-500";
      case "medium": return "text-yellow-500";
      case "low": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return <Flag className="w-4 h-4" />;
      case "medium": return <Clock className="w-4 h-4" />;
      case "low": return <Star className="w-4 h-4" />;
      default: return <Flag className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="pulse-chip mb-4">
            <CheckSquare className="w-4 h-4" />
            <span>Productivity Hub</span>
          </div>
          <h1 className="section-title">Your Productivity Workspace</h1>
          <p className="section-subtitle">
            Manage your tasks and notes in one intelligent workspace that learns from your patterns.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* To-Do List Section */}
          <div className="space-y-6">
            <div className="feature-card bg-white border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                  <CheckSquare className="w-5 h-5 text-pulse-500" />
                  <span>Smart To-Do List</span>
                </h2>
                <span className="text-sm text-gray-500">
                  {tasks.filter(t => !t.completed).length} pending
                </span>
              </div>

              {/* Add Task */}
              <div className="space-y-3 mb-6">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                  />
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as "high" | "medium" | "low")}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pulse-500"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <button
                    onClick={addTask}
                    className="px-4 py-2 bg-pulse-500 text-white rounded-lg hover:bg-pulse-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Task List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                      task.completed 
                        ? "bg-gray-50 border-gray-200" 
                        : "bg-white border-gray-200 hover:border-pulse-300"
                    }`}
                  >
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        task.completed
                          ? "bg-pulse-500 border-pulse-500 text-white"
                          : "border-gray-300 hover:border-pulse-500"
                      }`}
                    >
                      {task.completed && <CheckSquare className="w-3 h-3" />}
                    </button>
                    
                    <div className="flex-1">
                      <span className={`${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
                        {task.text}
                      </span>
                      {task.dueDate && (
                        <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                          <Calendar className="w-3 h-3" />
                          <span>{task.dueDate}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className={`flex items-center space-x-1 ${getPriorityColor(task.priority)}`}>
                      {getPriorityIcon(task.priority)}
                    </div>
                    
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notepad Section */}
          <div className="space-y-6">
            <div className="feature-card bg-white border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-pulse-500" />
                  <span>Smart Notepad</span>
                </h2>
                <button
                  onClick={() => setIsCreatingNote(true)}
                  className="px-3 py-1 bg-pulse-500 text-white rounded-lg text-sm hover:bg-pulse-600 transition-colors flex items-center space-x-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>New Note</span>
                </button>
              </div>

              {/* Create Note Modal */}
              {isCreatingNote && (
                <div className="space-y-4 mb-6 p-4 bg-pulse-50 rounded-lg border border-pulse-200">
                  <input
                    type="text"
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    placeholder="Note title..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pulse-500"
                  />
                  <Textarea
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    placeholder="Write your note..."
                    className="w-full h-24 resize-none"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={addNote}
                      className="px-4 py-2 bg-pulse-500 text-white rounded-lg hover:bg-pulse-600 transition-colors text-sm"
                    >
                      Save Note
                    </button>
                    <button
                      onClick={() => {
                        setIsCreatingNote(false);
                        setNewNoteTitle("");
                        setNewNoteContent("");
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Notes List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => setSelectedNote(note)}
                    className="p-4 border border-gray-200 rounded-lg hover:border-pulse-300 hover:shadow-sm transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{note.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{note.content}</p>
                        <span className="text-xs text-gray-400 mt-2 block">{note.createdAt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Note Detail Modal */}
            {selectedNote && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">{selectedNote.title}</h2>
                    <button
                      onClick={() => setSelectedNote(null)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="p-6 overflow-y-auto">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedNote.content}</p>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <span className="text-sm text-gray-500">Created: {selectedNote.createdAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductivityHubScreen;