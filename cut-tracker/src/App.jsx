import { useEffect, useMemo, useState } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
} from 'recharts'

const STORAGE_KEY = 'cut-tracker-state-v1'
const currentDate = new Date().toISOString().slice(0, 10)

const defaultState = {
  profile: {
    age: 26,
    sex: 'Male',
    startWeight: 200,
    startBodyFat: 20,
    goalWeightMin: 184,
    goalWeightMax: 186,
    goalBodyFatMin: 12,
    goalBodyFatMax: 14,
    durationWeeks: 16,
    calories: 2350,
    protein: 190,
    carbs: 180,
    fat: 75,
    workStart: '07:00',
    workEnd: '18:00',
    breakOne: '11:00',
    breakTwo: '15:00',
    trainingTime: '20:00',
  },
  mealSchedule: [
    { name: 'Breakfast', time: '06:15 AM', foods: ['4 eggs', '40g oats', '1 banana', '1 tbsp peanut butter'] },
    { name: 'Lunch', time: '11:00 AM', foods: ['280g raw chicken bag (~210–225g cooked)', 'Rice', 'Vegetables'] },
    { name: 'Snack', time: '03:00 PM', foods: ['Greek yogurt', '1 tbsp peanut butter'] },
    { name: 'Dinner', time: '06:30 PM', foods: ['280g raw beef bag (~210–225g cooked)', 'Potatoes', 'Vegetables optional'] },
    { name: 'Post-workout', time: '09:30 PM', foods: ['Optional protein + carbs'], optional: true },
  ],
  dailyMacros: { calories: 2350, protein: 190, carbs: 180, fat: 75 },
  dailyIntake: { calories: 2100, protein: 178, carbs: 165, fat: 70 },
  inventory: { chickenBags: 8, beefBags: 8, riceServings: 10, potatoServings: 8, yogurtCups: 7 },
  weights: [
    { date: '2026-03-01', weight: 200 },
    { date: '2026-03-04', weight: 199.4 },
    { date: '2026-03-08', weight: 198.9 },
    { date: '2026-03-11', weight: 198.3 },
    { date: '2026-03-15', weight: 197.8 },
    { date: '2026-03-18', weight: 197.1 },
    { date: '2026-03-22', weight: 196.8 },
  ],
  waists: [
    { date: '2026-03-01', waist: 35.5 },
    { date: '2026-03-15', waist: 35.1 },
    { date: '2026-03-22', waist: 34.9 },
  ],
  logs: [
    { date: currentDate, energy: 4, hunger: 3, training: 'Upper body', steps: 9200, notes: 'Solid day, hit meals on time.' },
  ],
  compliance: [
    { date: '2026-03-17', macrosMet: true, trained: true, waterLiters: 3.8 },
    { date: '2026-03-18', macrosMet: true, trained: true, waterLiters: 4.1 },
    { date: '2026-03-19', macrosMet: false, trained: false, waterLiters: 2.9 },
    { date: '2026-03-20', macrosMet: true, trained: true, waterLiters: 3.5 },
    { date: '2026-03-21', macrosMet: true, trained: false, waterLiters: 3.2 },
    { date: '2026-03-22', macrosMet: true, trained: true, waterLiters: 3.7 },
    { date: '2026-03-23', macrosMet: true, trained: true, waterLiters: 4.0 },
  ],
  theme: 'dark',
}

const loadState = () => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return defaultState
  try {
    return { ...defaultState, ...JSON.parse(raw) }
  } catch {
    return defaultState
  }
}

const cardClass = 'rounded-2xl border border-slate-200/10 bg-white/80 p-4 shadow-lg shadow-slate-900/5 backdrop-blur dark:bg-slate-900/80 dark:border-slate-800'
const inputClass = 'w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100'

const formatDelta = (value) => `${value > 0 ? '+' : ''}${value.toFixed(1)}`
const average = (values) => (values.length ? values.reduce((sum, item) => sum + item, 0) / values.length : 0)

function App() {
  const [state, setState] = useState(defaultState)

  useEffect(() => {
    setState(loadState())
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark')
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const targetWeight = useMemo(() => (state.profile.goalWeightMin + state.profile.goalWeightMax) / 2, [state.profile.goalWeightMin, state.profile.goalWeightMax])

  const weeklyTargets = useMemo(() => {
    const lossPerWeek = (state.profile.startWeight - targetWeight) / state.profile.durationWeeks
    return Array.from({ length: state.profile.durationWeeks }, (_, index) => ({
      week: index + 1,
      targetWeight: Number((state.profile.startWeight - lossPerWeek * (index + 1)).toFixed(1)),
    }))
  }, [state.profile.durationWeeks, state.profile.startWeight, targetWeight])

  const weeklyAverageData = useMemo(() => {
    const grouped = state.weights.reduce((acc, entry) => {
      const days = Math.floor((new Date(entry.date) - new Date(state.weights[0]?.date || entry.date)) / 86400000)
      const week = Math.floor(days / 7) + 1
      acc[week] ||= []
      acc[week].push(entry.weight)
      return acc
    }, {})

    return Object.entries(grouped).map(([week, values]) => ({
      week: Number(week),
      avgWeight: Number(average(values).toFixed(1)),
      targetWeight: weeklyTargets[Number(week) - 1]?.targetWeight,
    }))
  }, [state.weights, weeklyTargets])

  const latestWeight = state.weights.at(-1)?.weight ?? state.profile.startWeight
  const latestWaist = state.waists.at(-1)?.waist ?? 0
  const totalLost = state.profile.startWeight - latestWeight
  const weeklyRate = weeklyAverageData.length > 1 ? weeklyAverageData.at(-2).avgWeight - weeklyAverageData.at(-1).avgWeight : 0
  const complianceRate = Math.round((state.compliance.filter((d) => d.macrosMet && d.trained).length / Math.max(state.compliance.length, 1)) * 100)

  const recommendation = useMemo(() => {
    if (weeklyAverageData.length < 3) return 'Keep collecting data. Recommendations improve after 3 weekly averages.'
    const last = weeklyAverageData.at(-1).avgWeight
    const prev = weeklyAverageData.at(-2).avgWeight
    const prev2 = weeklyAverageData.at(-3).avgWeight
    const latestLoss = prev - last
    const priorLoss = prev2 - prev
    if (latestLoss <= 0 && priorLoss <= 0) return 'No average weight loss for 2 consecutive weeks. Reduce calories by 150–200 and review activity.'
    if (latestLoss > 1.5 || priorLoss > 1.5) return 'Weight is dropping quickly. Consider increasing calories by 100–150 to protect training and recovery.'
    return 'Progress rate looks appropriate. Hold current calories and keep execution high.'
  }, [weeklyAverageData])

  const projectionData = weeklyTargets.map((target) => ({
    ...target,
    actual: weeklyAverageData.find((entry) => entry.week === target.week)?.avgWeight ?? null,
  }))

  const updateProfile = (key, value) => setState((prev) => ({ ...prev, profile: { ...prev.profile, [key]: value } }))
  const updateDailyMacros = (key, value) => setState((prev) => ({ ...prev, dailyMacros: { ...prev.dailyMacros, [key]: value } }))
  const updateDailyIntake = (key, value) => setState((prev) => ({ ...prev, dailyIntake: { ...prev.dailyIntake, [key]: value } }))
  const updateInventory = (key, value) => setState((prev) => ({ ...prev, inventory: { ...prev.inventory, [key]: value } }))

  const addEntry = (collection, entry) => setState((prev) => ({ ...prev, [collection]: [...prev[collection], entry].sort((a, b) => a.date.localeCompare(b.date)) }))

  const macroProgress = [
    { label: 'Calories', target: state.dailyMacros.calories, actual: state.dailyIntake.calories, unit: 'kcal' },
    { label: 'Protein', target: state.dailyMacros.protein, actual: state.dailyIntake.protein, unit: 'g' },
    { label: 'Carbs', target: state.dailyMacros.carbs, actual: state.dailyIntake.carbs, unit: 'g' },
    { label: 'Fat', target: state.dailyMacros.fat, actual: state.dailyIntake.fat, unit: 'g' },
  ]

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-4 rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-6 text-white shadow-2xl shadow-emerald-950/30">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/70">Cut Tracker</p>
              <h1 className="text-3xl font-semibold">16-week cut & recomp dashboard</h1>
              <p className="mt-2 max-w-2xl text-sm text-white/80">Track macros, meals, compliance, body metrics, and projected progress from 200 lb / 20% body fat to 184–186 lb / 12–14%.</p>
            </div>
            <button
              onClick={() => setState((prev) => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }))}
              className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/25"
            >
              {state.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Current weight" value={`${latestWeight.toFixed(1)} lb`} hint={`${totalLost.toFixed(1)} lb down`} />
            <StatCard label="Weekly loss rate" value={`${weeklyRate.toFixed(1)} lb`} hint="Based on weekly average" />
            <StatCard label="Current waist" value={`${latestWaist.toFixed(1)} in`} hint="Waist trend" />
            <StatCard label="Compliance" value={`${complianceRate}%`} hint="Macros + training" />
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-3">
          <Card title="Dashboard">
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p><strong>Schedule:</strong> Work {state.profile.workStart}–{state.profile.workEnd}, breaks at {state.profile.breakOne} and {state.profile.breakTwo}, train at {state.profile.trainingTime}.</p>
              <p><strong>Meal prep note:</strong> 280g raw meat yields roughly <strong>210–225g cooked</strong>. Chicken and beef entries show both values.</p>
              <p><strong>Recommendation:</strong> {recommendation}</p>
            </div>
          </Card>
          <Card title="Goal projection">
            <div className="space-y-2 text-sm">
              <ProjectionRow label="Start" value={`${state.profile.startWeight} lb @ ${state.profile.startBodyFat}%`} />
              <ProjectionRow label="Goal" value={`${state.profile.goalWeightMin}-${state.profile.goalWeightMax} lb @ ${state.profile.goalBodyFatMin}-${state.profile.goalBodyFatMax}%`} />
              <ProjectionRow label="Projected finish" value={`Week ${state.profile.durationWeeks}`} />
              <ProjectionRow label="Required avg weekly loss" value={`${((state.profile.startWeight - targetWeight) / state.profile.durationWeeks).toFixed(2)} lb`} />
            </div>
          </Card>
          <Card title="Progress timeline">
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {weeklyTargets.slice(0, 4).map((week) => (
                <div key={week.week} className="flex items-center justify-between rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800/70">
                  <span>Week {week.week}</span>
                  <span>{week.targetWeight} lb target</span>
                </div>
              ))}
              <p className="text-xs text-slate-500 dark:text-slate-400">The full 16-week target line is shown in the charts below.</p>
            </div>
          </Card>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-2">
          <Card title="Weight tracker with charts">
            <ChartWrap>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.15} />
                  <XAxis dataKey="week" />
                  <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="targetWeight" stroke="#10b981" strokeWidth={3} name="Target" />
                  <Line type="monotone" dataKey="actual" stroke="#38bdf8" strokeWidth={3} name="Actual avg" />
                </LineChart>
              </ResponsiveContainer>
            </ChartWrap>
          </Card>
          <Card title="Weekly average weight">
            <ChartWrap>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={weeklyAverageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.15} />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avgWeight" fill="#14b8a6" name="Average weight" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrap>
          </Card>
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-2">
          <Card title="Macro tracker">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                {macroProgress.map((macro) => {
                  const percent = Math.min((macro.actual / Math.max(macro.target, 1)) * 100, 130)
                  return (
                    <div key={macro.label} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{macro.label}</span>
                        <span>{macro.actual}/{macro.target} {macro.unit}</span>
                      </div>
                      <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-800">
                        <div className="h-3 rounded-full bg-emerald-500" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="grid gap-3">
                {Object.entries(state.dailyMacros).map(([key, value]) => (
                  <label key={key} className="text-sm">
                    <span className="mb-1 block capitalize">Target {key}</span>
                    <input className={inputClass} type="number" value={value} onChange={(e) => updateDailyMacros(key, Number(e.target.value))} />
                  </label>
                ))}
                {Object.entries(state.dailyIntake).map(([key, value]) => (
                  <label key={key} className="text-sm">
                    <span className="mb-1 block capitalize">Actual {key}</span>
                    <input className={inputClass} type="number" value={value} onChange={(e) => updateDailyIntake(key, Number(e.target.value))} />
                  </label>
                ))}
              </div>
            </div>
          </Card>

          <Card title="Meal planner">
            <div className="space-y-3">
              {state.mealSchedule.map((meal, index) => (
                <div key={meal.name} className="rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{meal.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{meal.time}{meal.optional ? ' · Optional' : ''}</p>
                    </div>
                    <button className="text-xs text-emerald-500" onClick={() => {
                      const updated = [...state.mealSchedule]
                      updated[index] = { ...meal, time: prompt('Meal time', meal.time) || meal.time }
                      setState((prev) => ({ ...prev, mealSchedule: updated }))
                    }}>Edit time</button>
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
                    {meal.foods.map((food) => <li key={food}>{food}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-2">
          <Card title="Daily logs">
            <LogForm onAdd={(entry) => addEntry('logs', entry)} />
            <div className="mt-4 space-y-3">
              {state.logs.slice().reverse().map((log) => (
                <div key={log.date + log.training} className="rounded-2xl bg-slate-100 p-3 text-sm dark:bg-slate-800/70">
                  <div className="flex justify-between"><strong>{log.date}</strong><span>{log.training}</span></div>
                  <p>Energy {log.energy}/5 · Hunger {log.hunger}/5 · Steps {log.steps}</p>
                  <p className="text-slate-500 dark:text-slate-400">{log.notes}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Compliance tracker">
            <div className="grid gap-3 md:grid-cols-2">
              {state.compliance.slice().reverse().map((entry) => (
                <div key={entry.date} className="rounded-2xl bg-slate-100 p-3 text-sm dark:bg-slate-800/70">
                  <div className="flex items-center justify-between">
                    <strong>{entry.date}</strong>
                    <span className={entry.macrosMet && entry.trained ? 'text-emerald-500' : 'text-amber-500'}>
                      {entry.macrosMet && entry.trained ? 'On plan' : 'Needs work'}
                    </span>
                  </div>
                  <p>Macros: {entry.macrosMet ? 'Hit' : 'Missed'} · Training: {entry.trained ? 'Done' : 'Rest'}</p>
                  <p>Water: {entry.waterLiters} L</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-3">
          <Card title="Waist tracker">
            <MetricForm label="Waist (in)" onAdd={(entry) => addEntry('waists', entry)} field="waist" />
            <div className="mt-3 space-y-2 text-sm">
              {state.waists.slice().reverse().map((entry) => <MetricRow key={entry.date} date={entry.date} value={`${entry.waist} in`} />)}
            </div>
          </Card>
          <Card title="Inventory tracker for meal prep bags">
            <div className="space-y-3">
              {Object.entries(state.inventory).map(([key, value]) => (
                <label key={key} className="text-sm">
                  <span className="mb-1 block capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <input className={inputClass} type="number" value={value} onChange={(e) => updateInventory(key, Number(e.target.value))} />
                </label>
              ))}
            </div>
          </Card>
          <Card title="Add weight entry">
            <MetricForm label="Weight (lb)" onAdd={(entry) => addEntry('weights', entry)} field="weight" />
            <div className="mt-3 space-y-2 text-sm">
              {state.weights.slice().reverse().slice(0, 6).map((entry) => <MetricRow key={entry.date + entry.weight} date={entry.date} value={`${entry.weight} lb`} />)}
            </div>
          </Card>
        </section>

        <section className="mt-4">
          <Card title="Settings page">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {Object.entries(state.profile).map(([key, value]) => (
                <label key={key} className="text-sm">
                  <span className="mb-1 block capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <input className={inputClass} type={typeof value === 'number' ? 'number' : 'text'} value={value} onChange={(e) => updateProfile(key, typeof value === 'number' ? Number(e.target.value) : e.target.value)} />
                </label>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}

function Card({ title, children }) {
  return <div className={cardClass}><h2 className="mb-3 text-lg font-semibold">{title}</h2>{children}</div>
}

function StatCard({ label, value, hint }) {
  return (
    <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
      <p className="text-sm text-white/70">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      <p className="text-sm text-white/80">{hint}</p>
    </div>
  )
}

function ProjectionRow({ label, value }) {
  return <div className="flex items-center justify-between rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800/70"><span>{label}</span><strong>{value}</strong></div>
}

function ChartWrap({ children }) {
  return <div className="h-[280px] w-full text-xs text-slate-600 dark:text-slate-300">{children}</div>
}

function MetricForm({ label, onAdd, field }) {
  const [date, setDate] = useState(currentDate)
  const [value, setValue] = useState('')
  return (
    <form className="grid gap-3" onSubmit={(e) => {
      e.preventDefault()
      if (!value) return
      onAdd({ date, [field]: Number(value) })
      setValue('')
    }}>
      <label className="text-sm"><span className="mb-1 block">Date</span><input className={inputClass} type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
      <label className="text-sm"><span className="mb-1 block">{label}</span><input className={inputClass} type="number" step="0.1" value={value} onChange={(e) => setValue(e.target.value)} /></label>
      <button className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white">Add entry</button>
    </form>
  )
}

function MetricRow({ date, value }) {
  return <div className="flex items-center justify-between rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800/70"><span>{date}</span><strong>{value}</strong></div>
}

function LogForm({ onAdd }) {
  const [form, setForm] = useState({ date: currentDate, energy: 3, hunger: 3, training: '', steps: 8000, notes: '' })
  return (
    <form className="grid gap-3 md:grid-cols-2" onSubmit={(e) => {
      e.preventDefault()
      onAdd({ ...form, energy: Number(form.energy), hunger: Number(form.hunger), steps: Number(form.steps) })
      setForm({ date: currentDate, energy: 3, hunger: 3, training: '', steps: 8000, notes: '' })
    }}>
      {Object.entries(form).map(([key, value]) => (
        <label key={key} className={`text-sm ${key === 'notes' ? 'md:col-span-2' : ''}`}>
          <span className="mb-1 block capitalize">{key}</span>
          {key === 'notes' ? (
            <textarea className={inputClass} value={value} onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))} />
          ) : (
            <input className={inputClass} type={key === 'date' ? 'date' : typeof value === 'number' ? 'number' : 'text'} value={value} onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))} />
          )}
        </label>
      ))}
      <button className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-white md:col-span-2">Save daily log</button>
    </form>
  )
}

export default App
