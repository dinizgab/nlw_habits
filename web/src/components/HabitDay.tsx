import * as Checkbox from "@radix-ui/react-checkbox";
import * as PopOver from "@radix-ui/react-popover";
import clsx from "clsx";
import ProgressBar from "./ProgressBar";
import { Check } from "phosphor-react";
import dayjs from "dayjs";
import axios from "axios";
import { useEffect, useState } from "react";

interface HabitDayProps {
  date: Date;
  amount?: number;
  amountCompleted?: number;
}

export default function HabitDay({
  amountCompleted = 0,
  amount = 0,
  date,
}: HabitDayProps) {
  const [thisDayHabits, setThisDayHabits] = useState<string[]>([]);

  const percentageCompleted =
    amount > 0 ? Math.ceil((amountCompleted / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format("dddd");

  /* useEffect(() => {
    const availableHabits: string[] = [];
    const formatedQueryDate = dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")



    axios.get(`/day?date=${formatedQueryDate}`).then((res) => {
      res.data.map((habit: { title: string }) =>
        availableHabits.push(habit.title)
      );
    });

    setThisDayHabits(availableHabits);
  }, []); */

  return (
    <PopOver.Root>
      <PopOver.Trigger
        className={clsx(
          "w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg",
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

          <div className="mt-6 flex flex-col gap-3">
            <Checkbox.Root className="flex items-center gap-3 group">
              <div className="h-8 w-8 flex items-center justify-center bg-zinc-900 border-2 rounded-lg border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              {thisDayHabits.map((habit) => (
                <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-300">
                  {habit}
                </span>
              ))}
            </Checkbox.Root>
          </div>

          <PopOver.Arrow height={8} width={16} className="fill-zinc-900" />
        </PopOver.Content>
      </PopOver.Portal>
    </PopOver.Root>
  );
}
