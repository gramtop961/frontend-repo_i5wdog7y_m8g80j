import React, { useMemo } from 'react';
import { Gauge, TrendingUp } from 'lucide-react';

export default function WeeklyDashboard({ kpis, tasks, selectedWeek }) {
  const weekTasks = useMemo(() => tasks.filter(t => t.week === selectedWeek), [tasks, selectedWeek]);

  const completionRate = useMemo(() => {
    if (weekTasks.length === 0) return 0;
    const done = weekTasks.filter(t => t.done).length;
    return Math.round((done / weekTasks.length) * 100);
  }, [weekTasks]);

  const kpiProgress = useMemo(() => {
    // Simple heuristic: if tasks linked to a KPI are complete, show higher progress
    return kpis.map(k => {
      const linked = weekTasks.filter(t => t.kpiId === k.id);
      const rate = linked.length === 0 ? 0 : Math.round((linked.filter(t => t.done).length / linked.length) * 100);
      return { ...k, rate };
    });
  }, [kpis, weekTasks]);

  return (
    <section className="bg-white rounded-xl border p-4 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2"><Gauge className="size-5 text-indigo-600" /> Weekly Dashboard</h2>
        <div className="text-sm text-slate-600">{selectedWeek || 'Select a week'}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4">
          <p className="text-sm text-slate-500">Task completion</p>
          <div className="mt-2 flex items-end justify-between">
            <p className="text-3xl font-semibold">{completionRate}%</p>
            <TrendingUp className="size-5 text-emerald-600" />
          </div>
          <div className="w-full h-2 rounded bg-slate-100 mt-3">
            <div className="h-2 rounded bg-emerald-500" style={{ width: `${completionRate}%` }} />
          </div>
        </div>

        <div className="border rounded-lg p-4 md:col-span-2">
          <p className="text-sm text-slate-500 mb-2">KPI progress (based on linked tasks)</p>
          {kpiProgress.length === 0 && (
            <p className="text-sm text-slate-500">No KPIs yet.</p>
          )}
          <div className="space-y-3">
            {kpiProgress.map(k => (
              <div key={k.id}>
                <div className="flex items-center justify-between">
                  <p className="font-medium">{k.name}</p>
                  <p className="text-sm text-slate-600">{k.rate}%</p>
                </div>
                <div className="w-full h-2 rounded bg-slate-100">
                  <div className="h-2 rounded bg-indigo-600" style={{ width: `${k.rate}%` }} />
                </div>
                <p className="text-xs text-slate-500 mt-1">Owner: {k.owner || '—'} • Target: {k.target}{k.unit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
