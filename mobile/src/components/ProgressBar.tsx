import { View } from "react-native";

interface ProgressBarProps {
  progress?: number;
}

export default function ProgressBar(props: ProgressBarProps) {
  return (
    <View className="w-full h-3 rounded-xl bg-zinc-700 mt-4">
      <View className="w-full h-3 rounded-xl bg-violet-600" style={{width: `${props.progress}%`}}></View>
    </View>
  );
}
