import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';

          if (route.name === 'home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'video') {
            iconName = focused ? 'play-circle' : 'play-circle-outline';
          } else if (route.name === 'kbbi') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'games') {
            iconName = focused ? 'game-controller' : 'game-controller-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0047AB',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="video"
        options={{
          title: 'Video',
        }}
      />
      <Tabs.Screen
        name="kbbi"
        options={{
          title: 'KBBI',
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: 'Permainan',
        }}
      />
    </Tabs>
  );
}