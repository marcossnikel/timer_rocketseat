import { useContext } from 'react'
import * as S from './style'
import { CycleContext } from '../../contexts/CyclesContext'
import { formatDistanceToNow } from 'date-fns'

export function History() {
  const { cycles } = useContext(CycleContext)
  return (
    <S.HistoryContainer>
      <h1>My history</h1>
      <S.HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Begins</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutes</td>
                  <td>
                    {formatDistanceToNow(cycle.startDate, {
                      addSuffix: true,
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <S.Status statusColor="green">Concluded</S.Status>
                    )}
                    {cycle.interruptedDate && (
                      <S.Status statusColor="red">Interrupted</S.Status>
                    )}
                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <S.Status statusColor="yellow">In progress</S.Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </S.HistoryList>
    </S.HistoryContainer>
  )
}
