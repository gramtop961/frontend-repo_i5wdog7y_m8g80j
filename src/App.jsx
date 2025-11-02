import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import KPIBuilder from './components/KPIBuilder';
import TaskBoard from './components/TaskBoard';
import WeeklyDashboard from './components/WeeklyDashboard';

function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return [d.getUTCFullYear(), weekNo];
}

function getCurrentWeekValue() {
  const [year, week] = getISOWeek(new Date());
  const ww = String(week).padStart(2, '0');
  return `${year}-W${ww}`;
}

export default function App() {
  const [role, setRole] = useState('admin'); // 'admin' | 'contributor'
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeekValue());
  const [kpis, setKpis] = useState([]);
  const [tasks, setTasks] = useState([]);

  const onAddKpi = (k) => setKpis(prev => [k, ...prev]);
  const onRemoveKpi = (id) => setKpis(prev => prev.filter(k => k.id !== id));

  const onAddTask = (t) => setTasks(prev => [t, ...prev]);
  const onToggleTask = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const onRemoveTask = (id) => setTasks(prev => prev.filter(t => t.id !== id));

  const stats = useMemo(() => {
    const weekTasks = tasks.filter(t => t.week === selectedWeek);
    const total = weekTasks.length;
    const done = weekTasks.filter(t => t.done).length;
    return { total, done };
  }, [tasks, selectedWeek]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 text-slate-900">
      <Header
        role={role}
        onChangeRole={setRole}
        selectedWeek={selectedWeek}
        onChangeWeek={setSelectedWeek}
      />

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {role === 'admin' && (
              <KPIBuilder kpis={kpis} onAddKpi={onAddKpi} onRemoveKpi={onRemoveKpi} />
            )}
            <TaskBoard
              role={role}
              tasks={tasks}
              kpis={kpis}
              selectedWeek={selectedWeek}
              onAddTask={onAddTask}
              onToggleTask={onToggleTask}
              onRemoveTask={onRemoveTask}
            />
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border p-4 md:p-6 shadow-sm">
              <p className="text-sm text-slate-500">This week</p>
              <p className="text-3xl font-semibold mt-1">{stats.done}/{stats.total}</p>
              <p className="text-sm text-slate-500">tasks completed</p>
            </div>
            <WeeklyDashboard kpis={kpis} tasks={tasks} selectedWeek={selectedWeek} />
          </div>
        </section>
      </main>

      <footer className="py-10 text-center text-sm text-slate-500">
        Built for teams to define KPIs, assign weekly tasks, and track progress.
      </footer>
    </div>
  );
}
