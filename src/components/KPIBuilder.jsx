import React, { useState } from 'react';
import { Plus, Target, Trash2 } from 'lucide-react';

export default function KPIBuilder({ kpis, onAddKpi, onRemoveKpi }) {
  const [form, setForm] = useState({ name: '', owner: '', target: '', unit: '%' });

  const add = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onAddKpi({ ...form, id: crypto.randomUUID(), target: Number(form.target) || 0 });
    setForm({ name: '', owner: '', target: '', unit: '%' });
  };

  return (
    <section className="bg-white rounded-xl border p-4 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2"><Target className="size-5 text-indigo-600" /> Define KPIs</h2>
      </div>

      <form onSubmit={add} className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="KPI name (e.g., MRR Growth)"
          className="rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          value={form.owner}
          onChange={(e) => setForm({ ...form, owner: e.target.value })}
          placeholder="Owner (e.g., Finance)"
          className="rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <div className="flex gap-2">
          <input
            type="number"
            value={form.target}
            onChange={(e) => setForm({ ...form, target: e.target.value })}
            placeholder="Target"
            className="w-full rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <select
            value={form.unit}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
            className="rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="%">%</option>
            <option value="$">$</option>
            <option value="#">#</option>
          </select>
        </div>
        <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700">
          <Plus className="size-4" /> Add KPI
        </button>
      </form>

      <div className="mt-6 space-y-2">
        {kpis.length === 0 && (
          <p className="text-sm text-slate-500">No KPIs yet. Add your first KPI above.</p>
        )}
        {kpis.map((k) => (
          <div key={k.id} className="flex items-center justify-between border rounded-lg p-3">
            <div>
              <p className="font-medium">{k.name}</p>
              <p className="text-xs text-slate-500">Owner: {k.owner || '—'} • Target: {k.target}{k.unit}</p>
            </div>
            <button onClick={() => onRemoveKpi(k.id)} className="text-slate-500 hover:text-red-600">
              <Trash2 className="size-5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
