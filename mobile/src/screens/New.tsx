import { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import BackButton from "../components/BackButton";
import CheckBox from "../components/CheckBox";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terca-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sabado",
];

export default function New() {
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [title, setTitle] = useState<string>("");

  async function handleNewHabit() {
    try {
      if (!title.trim()) {
        Alert.alert("Novo habito", "Informe o nome do habito");
      } else if (weekDays.length === 0) {
        Alert.alert("Novo habito", "Esolha a periodicidade do habito");
      }

      await api.post("/habits", { title, weekDays });
      setTitle("");
      setWeekDays([]);

      Alert.alert("Novo habito", "Habito criado com sucesso")
    } catch (error) {
      console.log(error);
      Alert.alert("Ops!", "Nao foi possivel criar o novo habito");
    }
  }

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      );
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <BackButton />
        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar habito
        </Text>
        <Text className="mt-6 text-white font-extrabold text-base">
          Qual seu comprometimento?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-green-600"
          placeholder="ex.: Exercicios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />

        <Text className="mt-4 mb-3 text-white font-extrabold text-base">
          Qual a recorrencia?
        </Text>

        {availableWeekDays.map((day, index) => (
          <CheckBox
            key={day}
            checked={weekDays.includes(index)}
            title={day}
            onPress={() => handleToggleWeekDay(index)}
          />
        ))}

        <TouchableOpacity
          className="w-full py-4 bg-green-600 rounded-lg justify-center flex-row items-center mt-4"
          activeOpacity={0.7}
          onPress={handleNewHabit}
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="text-white pl-3">Confirmar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
