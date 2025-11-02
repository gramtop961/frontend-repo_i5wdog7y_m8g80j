import React, { useMemo, useState } from 'react';
import { CalendarCheck2, Plus, Trash2, CheckCircle2, User } from 'lucide-react';

export default function TaskBoard({ role, tasks, kpis, selectedWeek, onAddTask, onToggleTask, onRemoveTask }) {
  const [form, setForm] = useState({ title: '', assignee: '', kpiId: '' });

  const add = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onAddTask({ id: crypto.randomUUID(), week: selectedWeek, done: false, ...form });
    setForm({ title: '', assignee: '', kpiId: '' });
  };

  const weekTasks = useMemo(() => tasks.filter(t => t.week === selectedWeek), [tasks, selectedWeek]);

  return (
    <section className="bg-white rounded-xl border p-4 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2"><CalendarCheck2 className="size-5 text-indigo-600" /> Weekly Tasks</h2>
      </div>

      {role === 'admin' && (
        <form onSubmit={add} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Task title"
            className="rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            value={form.assignee}
            onChange={(e) => setForm({ ...form, assignee: e.target.value })}
            placeholder="Assignee"
            className="rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <select
            value={form.kpiId}
            onChange={(e) => setForm({ ...form, kpiId: e.target.value })}
            className="rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Link to KPI (optional)</option>
            {kpis.map(k => (
              <option key={k.id} value={k.id}>{k.name}</option>
            ))}
          </select>
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700">
            <Plus className="size-4" /> Add Task
          </button>
        </form>
      )}

      <div className="space-y-2">
        {weekTasks.length === 0 && (
          <p className="text-sm text-slate-500">No tasks for this week yet.</p>
        )}
        {weekTasks.map(t => (
          <div key={t.id} className="flex items-center justify-between border rounded-lg p-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggleTask(t.id)}
                className={`rounded-full border size-5 grid place-items-center ${t.done ? 'bg-green-100 border-green-400 text-green-600' : 'border-slate-300 text-slate-400'}`}
                title={t.done ? 'Mark incomplete' : 'Mark complete'}
              >
                {t.done && <CheckCircle2 className="size-4" />}
              </button>
              <div>
                <p className={`font-medium ${t.done ? 'line-through text-slate-500' : ''}`}>{t.title}</p>
                <p className="text-xs text-slate-500 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1"><User className="size-3" /> {t.assignee || 'Unassigned'}</span>
                  {t.kpiId && (
                    <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[11px]">{kpis.find(k => k.id === t.kpiId)?.name}</span>
                  )}
                </p>
              </div>
            </div>
            {role === 'admin' && (
              <button onClick={() => onRemoveTask(t.id)} className="text-slate-500 hover:text-red-600">
                <Trash2 className="size-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
