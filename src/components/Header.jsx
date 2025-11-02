import React from 'react';
import { BarChart3, Users, Settings, Shield } from 'lucide-react';

export default function Header({ role, onChangeRole, selectedWeek, onChangeWeek }) {
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-indigo-600 text-white grid place-items-center shadow">
            <BarChart3 className="size-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold leading-tight">PulseKPIs</h1>
            <p className="text-xs text-slate-500 -mt-0.5">Weekly KPI and task tracking</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex rounded-md p-1 bg-slate-100">
            <button
              onClick={() => onChangeRole('admin')}
              className={`px-3 py-1.5 text-sm rounded ${role === 'admin' ? 'bg-white shadow text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
              title="Admin can configure KPIs and manage tasks"
            >
              <Shield className="inline mr-1 size-4" /> Admin
            </button>
            <button
              onClick={() => onChangeRole('contributor')}
              className={`px-3 py-1.5 text-sm rounded ${role === 'contributor' ? 'bg-white shadow text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
              title="Contributors update their assigned tasks"
            >
              <Users className="inline mr-1 size-4" /> Contributor
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="week" className="text-sm text-slate-600">Week</label>
            <input
              id="week"
              type="week"
              value={selectedWeek}
              onChange={(e) => onChangeWeek(e.target.value)}
              className="text-sm rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button className="hidden sm:inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border bg-white hover:bg-slate-50">
            <Settings className="size-4" />
            Settings
          </button>
        </div>
      </div>
    </header>
  );
}
