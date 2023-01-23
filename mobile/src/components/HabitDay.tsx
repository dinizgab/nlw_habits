import clsx from "clsx";
import dayjs from "dayjs";

import {
  TouchableOpacity,
  Dimensions,
  TouchableOpacityProps,
} from "react-native";

import generateProgressPercentage from "../utils/generate-progress-percentage";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get("screen").width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

interface HabitDayProps extends TouchableOpacityProps {
  amountOfHabits?: number;
  amountCompleted?: number;
  date: Date;
}

export function HabitDay({
  amountCompleted = 0,
  amountOfHabits = 0,
  date,
  ...rest
}: HabitDayProps) {
  const percentageCompleted =
    amountOfHabits > 0
      ? generateProgressPercentage(amountOfHabits, amountCompleted)
      : 0;

  const today = dayjs().startOf('day').toDate();
  const isCurrentDate = dayjs(date).isSame(today)

  return (
    <TouchableOpacity
      {...rest}
      className={clsx("rounded-lg border-2 m-1", {
        "bg-zinc-900 border-zinc-800": percentageCompleted === 0,
        "bg-violet-900 border-violed-700":
          percentageCompleted > 0 && percentageCompleted < 20,
        "bg-violet-800 border-violed-600":
          percentageCompleted >= 20 && percentageCompleted < 40,
        "bg-violet-700 border-violed-500":
          percentageCompleted >= 40 && percentageCompleted < 60,
        "bg-violet-600 border-violed-500":
          percentageCompleted >= 60 && percentageCompleted < 80,
        "bg-violet-500 border-violed-400": percentageCompleted >= 80,
        "border-white border-4": isCurrentDate
      })}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={-0.7}
    />
  );
}
