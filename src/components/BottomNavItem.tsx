
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type BottomNavItemProps = {
  label: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  active: boolean;
  onPress: () => void;
};

export default function BottomNavItem({
  label,
  icon,
  active,
  onPress,
}: BottomNavItemProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={[styles.iconContainer, active && styles.activeIcon]}>
        <Ionicons name={icon} size={22} color="#1B0066" />
      </View>

      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  iconContainer: {
    width: 34,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  activeIcon: {
    backgroundColor: '#F1EDFF',
  },
  label: {
    fontSize: 9,
    color: '#777777',
  },
});
