import * as PopOver from "@radix-ui/react-popover";
import clsx from "clsx";
import ProgressBar from "./ProgressBar";

interface HabitDayProps {
  amount: number;
  amountCompleted: number;
}

export default function HabitDay(props: HabitDayProps) {
  const percentageCompleted = Math.ceil(
    (props.amountCompleted / props.amount) * 100
  );

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
          <span className="font-semibold text-zinc-400 ">Sabado</span>
          <span className="mt-1 font-extrabold text-3xl leading-tight">
            21/01
          </span>

          <ProgressBar progress={percentageCompleted} />
          <PopOver.Arrow height={8} width={16} className="fill-zinc-900" />
        </PopOver.Content>
      </PopOver.Portal>
    </PopOver.Root>
  );
}
