import { useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView, Alert } from "react-native";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import Header from "../components/Header";
import generateDatesFromYearBeginning from "../utils/generate-dates-from-year-beginning";
import { api } from "../lib/axios";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import dayjs from "dayjs";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const datesFromsYearStart = generateDatesFromYearBeginning();

const minimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill =
  minimumSummaryDatesSizes - datesFromsYearStart.length;

type Summary = {
  id: string,
  date: string;
  amount: number;
  completed: number;
}[]

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<Summary | null>(null);

  const { navigate } = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  async function fetchData() {
    try {
      const res = await api.get("/summary");
      setSummary(res.data);
      console.log(res)
    } catch (error) {
      Alert.alert("Ops!", "Nao foi possivel carregar o sumario de habitos");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row mt-6 mb-2">
          {weekDays.map((day, index) => (
            <Text
              key={`${day}-${index}`}
              className="text-zinc-400 text-xl font-bold text-center mx-1"
              style={{ width: DAY_SIZE }}
            >
              {day}
            </Text>
          ))}
        </View>

        {summary && (
          <View className="flex-row flex-wrap">
            {datesFromsYearStart.map((date) => {
              const dayWithHabits = summary.find((day) => {
                return dayjs(date).isSame(day.date);
              });

              return (
                <HabitDay
                  key={date.toISOString()}
                  onPress={() =>
                    navigate("habit", { date: date.toISOString() })
                  }
                  date={date}
                  amountOfHabits={dayWithHabits?.amount}
                  amountCompleted={dayWithHabits?.completed}
                />
              );
            })}

            {amountOfDaysToFill > 0 &&
              Array.from({ length: amountOfDaysToFill }).map((_, index) => (
                <View
                  key={index}
                  className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                />
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
