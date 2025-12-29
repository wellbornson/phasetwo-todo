import { useState } from "react";
import { TaskCreate } from "@/lib/types";

interface TaskFormProps {
    onSubmit: (task: TaskCreate) => Promise<void>;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        setLoading(true);
        try {
            await onSubmit({ title, description });
            setTitle("");
            setDescription("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 space-y-4">
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="✨ What needs to be done?"
                        className="input-soft !bg-slate-900/40 focus:!bg-slate-900/60"
                        required
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="📝 Add details (optional)..."
                        className="input-soft !bg-slate-900/30 focus:!bg-slate-900/50 text-sm"
                    />
                </div>
                <div className="flex items-start pt-1">
                    <button
                        type="submit"
                        disabled={loading || !title.trim()}
                        className="btn-yummy btn-fresh w-full md:w-auto whitespace-nowrap !py-4 !from-emerald-400 !to-emerald-600 !text-slate-900"
                    >
                        {loading ? "Adding..." : "Add Task 🚀"}
                    </button>
                </div>
            </div>
        </form>
    );
}
