import { TouchableOpacityProps, TouchableOpacity, Dimensions } from 'react-native'
import generateProgressPercentage from '../utils/generate-progress-percentage'
import clsx from 'clsx'
import dayjs from 'dayjs'

const weekDays = 7
const screenHorizontalPadding = (32 * 2) / 5

export const dayMarginBetween = 8
export const daySize = (Dimensions.get("screen").width / weekDays) - (screenHorizontalPadding + 5)

interface HabitDayProps extends TouchableOpacityProps {
  amountOfHabits?: number
  amountCompleted?: number
  date: Date
}

const HabitDay = ({amountOfHabits = 0, amountCompleted = 0, date, ...rest}: HabitDayProps) => {
  
  const amountAccomlplishedPercentage = amountOfHabits > 0 ? generateProgressPercentage(amountOfHabits, amountCompleted) : 0
  const today = dayjs().startOf("day").toDate()
  const isCurrentDay = dayjs(date).isSame(today)


  return (
    <TouchableOpacity
        className={clsx("rounded-lg border-2 m-1", {
          ["bg-zinc-900 border-zinc-800"] : amountAccomlplishedPercentage == 0,
          ["bg-violet-900 border-violet-700"]: amountAccomlplishedPercentage > 0 && amountAccomlplishedPercentage < 20,
          ["bg-violet-800 border-violet-600"]: amountAccomlplishedPercentage >= 20 && amountAccomlplishedPercentage < 40,
          ["bg-violet-700 border-violet-500"]: amountAccomlplishedPercentage >= 40 && amountAccomlplishedPercentage < 60,
          ["bg-violet-600 border-violet-500"]: amountAccomlplishedPercentage >= 60 && amountAccomlplishedPercentage < 80,
          ["bg-violet-500 border-violet-400"]: amountAccomlplishedPercentage >= 80,
          ["border-white border-4"]: isCurrentDay
        })}
        style={{ width: daySize, height: daySize}}
        activeOpacity={0.7}
        {...rest}
    />
  )
}

export default HabitDay