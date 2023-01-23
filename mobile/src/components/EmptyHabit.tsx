import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

export default function EmptyHabit() {
  const { navigate } = useNavigation();
  return (
    <Text className="text-zinc-400 text-base">
      Voce ainda nao criou nenhum habito! {" "}
      <Text
        className="text-violet-400 text-base underline active:text-violet-500"
        onPress={() => navigate("new")}
      >Comece cadastrando um!</Text>
    </Text>
  );
}