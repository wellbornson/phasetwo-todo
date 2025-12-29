import { Task, TaskUpdate } from "@/lib/types";
import { TaskCard } from "./TaskCard";

interface TaskListProps {
    tasks: Task[];
    onToggle: (id: number, completed: boolean) => void;
    onDelete: (id: number) => void;
    onUpdate: (id: number, data: TaskUpdate) => Promise<void>;
}

export function TaskList({ tasks, onToggle, onDelete, onUpdate }: TaskListProps) {
    if (tasks.length === 0) {
        return (
            <div className="text-center text-slate-400 py-12 bg-slate-800/30 rounded-2xl border border-white/10">
                <p className="text-4xl mb-2">🎉</p>
                <p className="text-lg font-medium text-slate-200">All caught up!</p>
                <p className="text-sm opacity-60">Add a task to get started.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {tasks.map((task) => (
                <TaskCard 
                    key={task.id} 
                    task={task} 
                    onToggle={onToggle} 
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    );
}
