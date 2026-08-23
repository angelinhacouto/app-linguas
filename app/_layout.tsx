import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { APP_NAME, COLORS } from '@/constants';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.background },
          headerTintColor: COLORS.primary,
          headerTitleStyle: { fontWeight: '700', fontSize: 18 },
          contentStyle: { backgroundColor: COLORS.background },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="index" options={{ title: APP_NAME, headerShown: false }} />
        <Stack.Screen name="learn" options={{ title: 'Missões', headerBackTitle: 'Voltar' }} />
        <Stack.Screen name="lessons/[ageGroup]" options={{ title: 'Lições' }} />
        <Stack.Screen name="play/[lessonId]" options={{ title: 'Treino' }} />
      </Stack>
    </>
  );
}
