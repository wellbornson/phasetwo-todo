import { useState } from "react";
import { Task, TaskUpdate } from "@/lib/types";

interface TaskCardProps {
    task: Task;
    onToggle: (id: number, completed: boolean) => void;
    onDelete: (id: number) => void;
    onUpdate: (id: number, data: TaskUpdate) => Promise<void>;
}

export function TaskCard({ task, onToggle, onDelete, onUpdate }: TaskCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description || "");

    const handleSave = async () => {
        if (!editTitle.trim()) return;
        await onUpdate(task.id, {
            title: editTitle,
            description: editDescription
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditTitle(task.title);
        setEditDescription(task.description || "");
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="bg-slate-900/90 p-4 rounded-2xl shadow-lg space-y-3 border-2 border-emerald-500/50">
                <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="input-soft !py-2 !px-3 !bg-slate-950"
                    placeholder="Task title"
                    autoFocus
                />
                <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="input-soft !py-2 !px-3 text-sm !bg-slate-950"
                    placeholder="Description (optional)"
                />
                <div className="flex justify-end gap-2 pt-2">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-1.5 rounded-full text-slate-400 font-bold hover:bg-slate-800 transition-colors text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="btn-yummy !py-1.5 !px-5 !text-sm !shadow-[0_4px_0_#065f46] !text-emerald-950"
                    >
                        Save
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="group bg-slate-800/40 hover:bg-slate-800/70 p-4 rounded-2xl transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex justify-between items-center border border-white/5">
            <div className="flex items-center gap-4 flex-1">
                <div className="relative">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={(e) => onToggle(task.id, e.target.checked)}
                        className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-slate-600 transition-all checked:border-emerald-400 checked:bg-emerald-400 hover:border-emerald-500"
                    />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-slate-900 opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                
                <div className="flex-1">
                    <h3 className={`font-bold text-lg transition-all ${
                        task.completed ? "line-through text-slate-500" : "text-slate-200"
                    }`}>
                        {task.title}
                    </h3>
                    {task.description && (
                        <p className={`text-sm transition-all ${
                            task.completed ? "text-slate-600" : "text-slate-400"
                        }`}>
                            {task.description}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
                <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10 rounded-full transition-colors"
                    title="Edit"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="p-2 text-red-400 hover:text-red-500 hover:bg-red-400/10 rounded-full transition-colors"
                    title="Delete"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
