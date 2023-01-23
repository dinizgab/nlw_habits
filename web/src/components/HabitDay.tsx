import * as PopOver from "@radix-ui/react-popover";
import clsx from "clsx";
import ProgressBar from "./ProgressBar";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import HabitsList from "./HabitsList";

interface HabitDayProps {
  date: Date;
  amount?: number;
  defaultAmountCompleted?: number;
}

export default function HabitDay({
  defaultAmountCompleted = 0,
  amount = 0,
  date,
}: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultAmountCompleted);

  const percentageCompleted =
    amount > 0 ? Math.ceil((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format("dddd");

  function handleCompletedChange(completed: number) {
    setCompleted(completed);
  }

  return (
    <PopOver.Root>
      <PopOver.Trigger
        className={clsx(
          "w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-violet-400",
          {
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
          }
        )}
      />

      <PopOver.Portal>
        <PopOver.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col text-white">
          <span className="font-semibold text-zinc-400 ">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold text-3xl leading-tight">
            {dayAndMonth}
          </span>

          <ProgressBar progress={percentageCompleted} />

          <HabitsList date={date} onCompletedChange={handleCompletedChange} />

          <PopOver.Arrow height={8} width={16} className="fill-zinc-900" />
        </PopOver.Content>
      </PopOver.Portal>
    </PopOver.Root>
  );
}
