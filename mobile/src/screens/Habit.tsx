import { ScrollView, View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import dayjs from "dayjs";
import ProgressBar from "../components/ProgressBar";
import CheckBox from "../components/CheckBox";

interface HabitProps {
  date: string;
}

export default function Habit() {
  const route = useRoute();
  const { date } = route.params as HabitProps;

  const formatedDate = dayjs(date);
  const dayOfWeek = formatedDate.format("dddd");
  const dayAndMonth = formatedDate.format("DD/MM");

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
        <ProgressBar progress={20}/>

        <View className="mt-6"> 
          <CheckBox title="Beber 2l de agua"/>
          <CheckBox title="Estudar" checked={true}/>
          <CheckBox title="Caminhar 2km"/>
        </View>
      </ScrollView>
    </View>
  );
}
