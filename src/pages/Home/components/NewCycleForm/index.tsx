import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { CycleContext } from '../../../../contexts/CyclesContext'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext)
  const { register } = useFormContext()
  return (
    <FormContainer>
      <label htmlFor="taks">I will be working on</label>
      <TaskInput
        type="text"
        id="task"
        list="task-suggestions"
        placeholder="name to your project"
        disabled={!!activeCycle}
        {...register('task')}
      />
      <datalist id="task-suggestions">
        <option value="Project 1 " />
        <option value="Project 2 " />
        <option value="Xucrute" />
      </datalist>
      <label htmlFor="minutesAmount">during</label>
      <MinutesAmountInput
        disabled={!!activeCycle}
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        max={60}
        min={5}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minuts</span>
    </FormContainer>
  )
}
