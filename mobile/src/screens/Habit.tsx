import clsx from "clsx";
import { api } from "../lib/axios";
import dayjs from "dayjs";

import { ScrollView, View, Text, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";

import generateProgressPercentage from "../utils/generate-progress-percentage";

import BackButton from "../components/BackButton";
import ProgressBar from "../components/ProgressBar";
import CheckBox from "../components/CheckBox";
import Loading from "../components/Loading";
import EmptyHabit from "../components/EmptyHabit";

interface HabitProps {
  date: string;
}

type dayInfo = {
  possibleHabits: {
    id: string;
    title: string;
    created_at: string;
  }[];
  completedHabits: string[];
};

export default function Habit() {
  const route = useRoute();
  const { date } = route.params as HabitProps;

  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<dayInfo | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const formatedDate = dayjs(date);
  const dayOfWeek = formatedDate.format("dddd");
  const dayAndMonth = formatedDate.format("DD/MM");
  const isPastDate = formatedDate.endOf("day").isBefore(new Date());

  const habitsProgress = dayInfo?.possibleHabits.length
    ? generateProgressPercentage(
        dayInfo!.possibleHabits.length,
        completedHabits.length
      )
    : 0;

  useEffect(() => {
    fetchHabits();
  }, []);

  async function fetchHabits() {
    try {
      setLoading(true);

      const response = await api.get("/day", { params: { date } });
      setDayInfo(response.data);
      setCompletedHabits(response.data.completedHabits);
    } catch (error) {
      console.log(error);
      Alert.alert("Ops!", "Nao foi possivel carregar o habito");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleHabit(habitId: string) {
    let newCompletedHabits: string[] = [];
    try {
      await api.patch(`/habits/${habitId}/toggle`);

      if (completedHabits.includes(habitId)) {
        newCompletedHabits = completedHabits.filter((id) => id !== habitId);
      } else {
        newCompletedHabits = [...completedHabits, habitId];
      }

      setCompletedHabits(newCompletedHabits);
      
    } catch (error) {
      console.log(error);
      Alert.alert("Ops!", "Nao foi possivel attualizar o habito");
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="bg-background flex-1 px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="text-zinc-400 font-semibold pt-4 lowercase">
          {dayOfWeek}
        </Text>
        <Text className="text-white font-extrabold pt-2 text-3xl">
          {dayAndMonth}
        </Text>
        <ProgressBar progress={habitsProgress} />

        <View
          className={clsx("mt-6", {
            ["opacity-50"]: isPastDate,
          })}
        >
          {dayInfo!.possibleHabits.length > 0 ? (
            dayInfo?.possibleHabits.map((habit) => (
              <CheckBox
                key={habit.id}
                title={habit.title}
                checked={completedHabits.includes(habit.id)}
                disabled={isPastDate}
                onPress={() => handleToggleHabit(habit.id)}
              />
            ))
          ) : (
            <EmptyHabit />
          )}

          {isPastDate && (
            <Text className="text-white mt-10 text-center">
              Voce nao pode editar habitos de uma data passada.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
