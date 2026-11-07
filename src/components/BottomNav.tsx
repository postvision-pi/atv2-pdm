
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/appTheme';

export type TabRoute = 'Home' | 'Stats' | 'Profile';

type Props = {
  active: TabRoute;
};

const TABS: {
  route: TabRoute;
  label: string;
}[] = [
  { route: 'Home', label: 'Início' },
  { route: 'Stats', label: 'Stats' },
  { route: 'Profile', label: 'Perfil' },
];

function TabIcon({ route }: { route: TabRoute }) {
  if (route === 'Home') {
    return <Ionicons name="home" size={28} color={colors.primary} />;
  }

  if (route === 'Stats') {
    return (
      <View style={styles.statsIcon}>
        <Ionicons name="stats-chart" size={16} color={colors.white} />
      </View>
    );
  }

  return <Ionicons name="person" size={28} color={colors.primary} />;
}

export default function BottomNav({ active }: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  function handleNavigation(route: TabRoute) {
    if (route === 'Home' && active !== 'Home') {
      router.replace('/home');
    }
  }

  return (
    <View
      pointerEvents="box-none"
      style={[styles.wrapper, { bottom: Math.max(insets.bottom, 12) }]}
    >
      <View style={styles.pill}>
        {TABS.map(({ route, label }) => {
          const isActive = route === active;

          return (
            <Pressable
              key={route}
              style={[styles.item, isActive && styles.itemActive]}
              onPress={() => handleNavigation(route)}
            >
              <TabIcon route={route} />
              <Text style={styles.label}>{label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  pill: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 8,
    gap: 6,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  item: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  itemActive: {
    backgroundColor: colors.background,
  },
  label: {
    fontSize: 10,
    color: colors.text,
  },
  statsIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
