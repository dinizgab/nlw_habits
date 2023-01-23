import * as Checkbox from "@radix-ui/react-checkbox";
import { api } from "../lib/axios";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

interface HabitsListProps {
  date: Date;
  onCompletedChange: Function
}

type HabitsInfo = {
  possibleHabits: {
    id: string;
    title: string;
    created_at: string;
  }[];

  completedHabits: string[];
};

export default function HabitsList({ date, onCompletedChange }: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();
  const isPastDate = dayjs(date).endOf("day").isBefore(new Date());

  async function handleToggleHabit(habitId: string) {
    const isHabitCompleted = habitsInfo?.completedHabits.includes(habitId);
    let completedHabits: string[] = [];

    await api.patch(`/habits/${habitId}/toggle`);

    if (isHabitCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(
        (id) => id !== habitId
      );
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    });

    onCompletedChange(completedHabits.length)
  }

  useEffect(() => {
    api
      .get(`/day`, {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => {
        setHabitsInfo(response.data);
      });
  }, []);

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map((habit) => (
        <Checkbox.Root
          key={habit.id}
          disabled={isPastDate}
          className="flex items-center gap-3 group focus:outline-none"
          checked={habitsInfo.completedHabits.includes(habit.id)}
          onCheckedChange={() => handleToggleHabit(habit.id)}
        >
          <div className="h-8 w-8 flex items-center justify-center bg-zinc-900 border-2 rounded-lg border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors focus:outline-none group-focus:ring-2 group-focus:ring-violet-500 group-focus:ring-offset-2 group-focus:ring-offset-violet-400">
            <Checkbox.Indicator>
              <Check size={20} className="text-white" />
            </Checkbox.Indicator>
          </div>

          <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-300">
            {habit.title}
          </span>
        </Checkbox.Root>
      ))}
    </div>
  );
}
