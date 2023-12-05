import { createContext, useState } from 'react'

type Cycle = {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

type CreateCycleData = {
  task: string
  minutesAmount: number
}

type CycleContextType = {
  cycles: Cycle[]
  activeCycle?: Cycle
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CycleContext = createContext({} as CycleContextType)

export function CyclesContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [cycles, setCycles] = useState<Cycle[]>([])

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished() {
    setCycles((state) => {
      const finishedCycle = state.find((cycle) => cycle.id === activeCycleId)
      if (finishedCycle) {
        finishedCycle.finishedDate = new Date()
      }
      return state
    })
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    setCycles((state) => {
      const interruptedCycle = state.find((cycle) => cycle.id === activeCycleId)
      if (interruptedCycle) {
        interruptedCycle.interruptedDate = new Date()
      }
      return state
    })

    setActiveCycleId(null)
  }
  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
