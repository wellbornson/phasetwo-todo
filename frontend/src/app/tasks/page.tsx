"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { api } from "@/lib/api";
import { Task, TaskCreate, TaskUpdate } from "@/lib/types";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";

export default function TasksPage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/login");
        } else if (session?.user?.id) {
            fetchTasks(session.user.id);
        }
    }, [session, isPending, router]);

    const fetchTasks = async (userId: string) => {
        try {
            const res = await api.get(`/api/${userId}/tasks`);
            setTasks(res.data);
        } catch (err) {
            console.error("Failed to fetch tasks", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (taskData: TaskCreate) => {
        if (!session?.user?.id) return;
        try {
            const res = await api.post(`/api/${session.user.id}/tasks`, taskData);
            setTasks([res.data, ...tasks]);
        } catch (err) {
            console.error("Failed to create task", err);
        }
    };

    const handleToggle = async (id: number, completed: boolean) => {
        if (!session?.user?.id) return;
        setTasks(tasks.map(t => t.id === id ? { ...t, completed } : t));
        try {
            await api.patch(`/api/${session.user.id}/tasks/${id}/complete`, { completed });
        } catch (err) {
            console.error("Failed to update task", err);
            setTasks(tasks.map(t => t.id === id ? { ...t, completed: !completed } : t));
        }
    };

    const handleUpdate = async (id: number, data: TaskUpdate) => {
        if (!session?.user?.id) return;
        const oldTasks = tasks;
        setTasks(tasks.map(t => t.id === id ? { ...t, ...data } : t));
        try {
            await api.put(`/api/${session.user.id}/tasks/${id}`, data);
        } catch (err) {
            console.error("Failed to update task", err);
            setTasks(oldTasks);
        }
    };

    const handleDelete = async (id: number) => {
        if (!session?.user?.id) return;
        const oldTasks = tasks;
        setTasks(tasks.filter(t => t.id !== id));
        try {
            await api.delete(`/api/${session.user.id}/tasks/${id}`);
        } catch (err) {
            console.error("Failed to delete task", err);
            setTasks(oldTasks);
        }
    };

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesFilter =
                filter === 'all' ? true :
                filter === 'active' ? !task.completed :
                task.completed;
            return matchesSearch && matchesFilter;
        });
    }, [tasks, searchQuery, filter]);

    const stats = useMemo(() => {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const active = total - completed;
        return { total, completed, active };
    }, [tasks]);

    if (isPending) return <div className="p-8 text-center text-white animate-pulse">Loading session...</div>;
    if (!session) return null;

    return (
        <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-[radial-gradient(circle_at_top_right,#1e293b,#0f172a)]">
            
            {/* LEFT SIDEBAR: Task List, Search, Filters */}
            <div className="w-full md:w-5/12 lg:w-1/3 flex flex-col h-full border-r border-white/5 bg-slate-900/50 backdrop-blur-xl relative z-10 shadow-2xl">
                {/* Fixed Header in Sidebar */}
                <div className="p-6 space-y-4 shadow-xl z-20 bg-slate-900/80 border-b border-white/5">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                        My Tasks
                    </h2>
                    
                    <input
                        type="text"
                        placeholder="🔍 Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input-soft !bg-slate-950/50 !border-slate-800"
                    />

                    <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                        {(['all', 'active', 'completed'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all capitalize whitespace-nowrap ${
                                    filter === f 
                                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50' 
                                        : 'bg-slate-800/50 text-slate-400 border border-transparent hover:border-slate-600'
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Scrollable List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar scroll-smooth">
                    {loading ? (
                        <div className="text-center py-12 text-slate-500 animate-pulse">
                            Loading...
                        </div>
                    ) : (
                        <TaskList 
                            tasks={filteredTasks} 
                            onToggle={handleToggle} 
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                        />
                    )}
                </div>
            </div>

            {/* RIGHT MAIN CONTENT: Stats & Add New */}
            <div className="flex-1 h-full overflow-y-auto relative custom-scrollbar">
                <div className="p-6 md:p-12 max-w-4xl mx-auto space-y-8">
                    
                    {/* Top Header */}
                    <div className="flex justify-between items-center pb-6 border-b border-white/5">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-100">Dashboard</h1>
                            <p className="text-slate-400">Welcome back, {session.user.name}!</p>
                        </div>
                        <button
                            onClick={() => signOut()}
                            className="px-4 py-2 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors border border-transparent hover:border-red-400/20"
                        >
                            Sign Out
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 md:gap-8">
                        <div className="bg-slate-800/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm text-center">
                            <div className="text-3xl font-bold text-slate-200">{stats.total}</div>
                            <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Total</div>
                        </div>
                        <div className="bg-emerald-900/10 p-6 rounded-2xl border border-emerald-500/10 backdrop-blur-sm text-center">
                            <div className="text-3xl font-bold text-emerald-400">{stats.completed}</div>
                            <div className="text-xs text-emerald-600/70 uppercase tracking-widest mt-1">Done</div>
                        </div>
                        <div className="bg-amber-900/10 p-6 rounded-2xl border border-amber-500/10 backdrop-blur-sm text-center">
                            <div className="text-3xl font-bold text-amber-400">{stats.active}</div>
                            <div className="text-xs text-amber-600/70 uppercase tracking-widest mt-1">Pending</div>
                        </div>
                    </div>

                    {/* Add New Section */}
                    <div className="bg-slate-800/20 p-8 rounded-3xl border border-white/5 space-y-4">
                        <h2 className="text-xl font-semibold text-slate-300">Create New Task</h2>
                        <TaskForm onSubmit={handleCreate} />
                    </div>

                </div>
            </div>
        </div>
    );
}