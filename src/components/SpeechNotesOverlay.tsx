import { useState, useRef, useEffect } from "react";
import { Plus, X, StickyNote, Target, Users, Lightbulb, Zap, GripVertical, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { getDebateCoachResponse } from "@/lib/ai";

interface Note {
  id: string;
  type: "impact" | "stakeholders" | "examples" | "rebuttals" | "custom";
  title: string;
  content: string;
  x: number;
  y: number;
}

const SpeechNotesOverlay = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [draggedNote, setDraggedNote] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [aiLoadingNote, setAiLoadingNote] = useState<string | null>(null);
  const [aiErrorNote, setAiErrorNote] = useState<string | null>(null);
  const [noteStartTime, setNoteStartTime] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const noteTypes = [
    { type: "impact" as const, icon: Target, label: "Impact", color: "text-destructive bg-destructive/20" },
    { type: "stakeholders" as const, icon: Users, label: "Stakeholders", color: "text-primary bg-primary/20" },
    { type: "examples" as const, icon: Lightbulb, label: "Examples", color: "text-warning bg-warning/20" },
    { type: "rebuttals" as const, icon: Zap, label: "Rebuttals", color: "text-accent bg-accent/20" }
  ];

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('speech-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('speech-notes', JSON.stringify(notes));
  }, [notes]);

  // Start timer when overlay is opened
  useEffect(() => {
    if (isVisible && noteStartTime === null) {
      setNoteStartTime(Date.now());
    }
    if (!isVisible && noteStartTime !== null) {
      setNoteStartTime(null);
    }
  }, [isVisible, noteStartTime]);

  // Analytics: count notes by type
  const noteTypeCounts = noteTypes.reduce((acc, nt) => {
    acc[nt.type] = notes.filter(n => n.type === nt.type).length;
    return acc;
  }, {} as Record<string, number>);

  // AI Suggestion for a note
  const suggestForNote = async (note: Note) => {
    setAiLoadingNote(note.id);
    setAiErrorNote(null);
    try {
      // Use getDebateCoachResponse for context-aware suggestions
      const suggestion = await getDebateCoachResponse({
        prompt: `Suggest a ${note.title} for this debate. Current content: ${note.content}`,
        context: {
          noteType: note.type,
          noteContent: note.content,
          // TODO: Add debate context (motion, speeches, etc.)
        }
      });
      updateNote(note.id, { content: suggestion });
    } catch (err: any) {
      setAiErrorNote(err.message || "Failed to get AI suggestion.");
    } finally {
      setAiLoadingNote(null);
    }
  };

  const createNote = (type: Note["type"]) => {
    const noteType = noteTypes.find(nt => nt.type === type);
    const newNote: Note = {
      id: `note-${Date.now()}`,
      type,
      title: noteType?.label || "Custom Note",
      content: "",
      x: Math.random() * 300 + 50,
      y: Math.random() * 200 + 100
    };
    setNotes(prev => [...prev, newNote]);
    setEditingNote(newNote.id);
  };

  const deleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const updateNote = (noteId: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId ? { ...note, ...updates } : note
    ));
  };

  const handleMouseDown = (e: React.MouseEvent, noteId: string) => {
    if ((e.target as HTMLElement).tagName === 'TEXTAREA') return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    setDraggedNote(noteId);
    setDragOffset({
      x: e.clientX - rect.left - notes.find(n => n.id === noteId)!.x,
      y: e.clientY - rect.top - notes.find(n => n.id === noteId)!.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedNote || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left - dragOffset.x, rect.width - 250));
    const y = Math.max(0, Math.min(e.clientY - rect.top - dragOffset.y, rect.height - 100));

    updateNote(draggedNote, { x, y });
  };

  const handleMouseUp = () => {
    setDraggedNote(null);
  };

  const getTypeIcon = (type: Note["type"]) => {
    const noteType = noteTypes.find(nt => nt.type === type);
    return noteType?.icon || StickyNote;
  };

  const getTypeColor = (type: Note["type"]) => {
    const noteType = noteTypes.find(nt => nt.type === type);
    return noteType?.color || "text-foreground bg-muted";
  };

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-6 right-6 z-40 btn-primary rounded-full w-14 h-14 shadow-lg hover:shadow-xl"
        title="Open Speech Notes"
        aria-label="Open Speech Notes"
      >
        <StickyNote className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-4 z-40 pointer-events-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Control Panel */}
      <div className="absolute top-4 right-4 pointer-events-auto">
        <div className="neu-card p-4 w-72 animate-slide-in-right">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold text-gradient flex items-center">
              <StickyNote className="w-5 h-5 mr-2" />
              Speech Notes
            </h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsVisible(false)}
              className="border-card-border hover:border-destructive"
              title="Close Speech Notes"
              aria-label="Close Speech Notes"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Add Buttons */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {noteTypes.map((noteType) => (
              <Button
                key={noteType.type}
                size="sm"
                variant="outline"
                onClick={() => createNote(noteType.type)}
                className="border-card-border hover:scale-105 transition-transform"
              >
                <noteType.icon className="w-4 h-4 mr-1" />
                {noteType.label}
              </Button>
            ))}
          </div>

          {/* Analytics Summary */}
          <div className="mb-2 text-xs text-foreground-secondary">
            <div className="flex flex-wrap gap-2 mb-1">
              {noteTypes.map(nt => (
                <span key={nt.type} className="inline-flex items-center px-2 py-1 rounded bg-card/30 border border-card-border">
                  <nt.icon className="w-3 h-3 mr-1" />
                  {nt.label}: {noteTypeCounts[nt.type] || 0}
                </span>
              ))}
            </div>
            <div>
              Time spent note-taking: {noteStartTime ? `${Math.round((Date.now() - noteStartTime) / 1000)}s` : '0s'}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-foreground-secondary">
            <span>{notes.length} notes active</span>
            {notes.length > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setNotes([])}
                className="border-card-border text-xs px-2 py-1 h-auto"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Floating Notes */}
      {notes.map((note) => {
        const TypeIcon = getTypeIcon(note.type);
        const isEditing = editingNote === note.id;
        return (
          <div
            key={note.id}
            className="absolute pointer-events-auto animate-scale-in"
            style={{ left: note.x, top: note.y }}
          >
            <div 
              className={`w-64 neu-card p-3 cursor-move transition-all duration-200 ${
                draggedNote === note.id ? 'scale-105 shadow-xl' : 'hover:shadow-lg'
              }`}
              onMouseDown={(e) => handleMouseDown(e, note.id)}
            >
              {/* Note Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Badge className={getTypeColor(note.type)}>
                    <TypeIcon className="w-3 h-3 mr-1" />
                    {note.title}
                  </Badge>
                  <GripVertical className="w-4 h-4 text-foreground-secondary cursor-move" />
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => suggestForNote(note)}
                    disabled={aiLoadingNote === note.id}
                    className="hover:bg-primary/10"
                    title="AI Suggestion"
                    aria-label="AI Suggestion"
                  >
                    {aiLoadingNote === note.id ? <EyeOff className="w-4 h-4 animate-pulse" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteNote(note.id)}
                    className="hover:bg-destructive/10"
                    title="Delete Note"
                    aria-label="Delete Note"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              {/* Note Content */}
              <Textarea
                value={note.content}
                onChange={e => updateNote(note.id, { content: e.target.value })}
                className="w-full min-h-[60px] max-h-40 resize-none bg-card/30 border-card-border"
                disabled={isEditing ? false : aiLoadingNote === note.id}
                onFocus={() => setEditingNote(note.id)}
                onBlur={() => setEditingNote(null)}
                placeholder={`Type your ${note.title.toLowerCase()}...`}
              />
              {aiErrorNote && aiLoadingNote === note.id && (
                <div className="text-xs text-red-600 mt-1">{aiErrorNote}</div>
              )}
            </div>
          </div>
        );
      })}

      {/* Visibility Toggle */}
      <Button
        onClick={() => setIsVisible(false)}
        className="fixed bottom-6 right-6 pointer-events-auto btn-secondary rounded-full w-12 h-12 shadow-lg"
        title="Hide Speech Notes"
        aria-label="Hide Speech Notes"
      >
        <EyeOff className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default SpeechNotesOverlay;