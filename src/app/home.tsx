import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavItem from "../components/BottomNavItem";

const COLORS = {
  primary: "#1B0066",
  yellow: "#DBCD2C",
  background: "#F1F1FB",
  white: "#FFFFFF",
  lavender: "#DBCDFF",
  border: "#454545",
  gray: "#666666",
};

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("Início");

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.profileIcon}>
              <Ionicons name="person" size={24} color={COLORS.primary} />
            </View>

            <Pressable style={styles.notificationButton}>
              <Ionicons name="notifications" size={22} color={COLORS.primary} />
              <View style={styles.notificationDot} />
            </Pressable>
          </View>

          <Text style={styles.greeting}>
            Olá, <Text style={styles.userName}>Renan</Text>
          </Text>
        </View>

        {/* Card Faça sua análise */}
        <View style={styles.analysisCard}>
          <Text style={styles.analysisTitle}>Faça sua análise</Text>

          <Text style={styles.analysisDescription}>
            Corrija sua postura e melhore seu
            {"\n"}desempenho nos exercícios físicos.
          </Text>

          <View style={styles.analysisFooter}>
            <View style={styles.eyeIllustration}>
              <Ionicons name="eye-outline" size={65} color={COLORS.primary} />
              <View style={styles.scanCornerTop} />
              <View style={styles.scanCornerBottom} />
            </View>

            <Pressable style={styles.startButton}>
              <Text style={styles.startButtonText}>Iniciar</Text>
              <Ionicons name="camera" size={21} color={COLORS.white} />
            </Pressable>
          </View>
        </View>

        {/* Estatísticas */}
        <View style={styles.statsRow}>
          <Pressable style={styles.statisticsCard}>
            <Text style={styles.statisticsTitle}>Estatísticas</Text>
            <Text style={styles.statisticsDescription}>
              Verifique as estatísticas
              {"\n"}das suas últimas sessões
            </Text>
          </Pressable>

          <Pressable style={styles.detailsCard}>
            <Text style={styles.detailsText}>
              Ver mais
              {"\n"}detalhes
            </Text>
          </Pressable>
        </View>

        {/* Sugestões */}
        <View style={styles.suggestionsRow}>
          <Pressable style={styles.receiveSuggestionsCard}>
            <Text style={styles.receiveSuggestionsText}>
              Receber
              {"\n"}Sugestões
            </Text>
          </Pressable>

          <Pressable style={styles.suggestionsCard}>
            <Text style={styles.suggestionsTitle}>Sugestões</Text>
            <Text style={styles.suggestionsDescription}>
              Treine com segurança,
              {"\n"}corrija sua postura
            </Text>
          </Pressable>
        </View>

        {/* Streak */}
        <View style={styles.streakCard}>
          <View style={styles.streakIconContainer}>
            <Ionicons name="flame" size={65} color={COLORS.yellow} />
            <Text style={styles.streakNumber}>7</Text>
          </View>

          <View style={styles.streakInfo}>
            <Text style={styles.streakTitle}>Streak</Text>
            <Text style={styles.streakDescription}>
              Realize as análises diariamente para
              {"\n"}aumentar seu streak
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Navegação inferior */}
      <View style={styles.bottomNav}>
        <BottomNavItem
          label="Início"
          icon="home"
          active={selectedTab === "Início"}
          onPress={() => setSelectedTab("Início")}
        />

        <BottomNavItem
          label="Stats"
          icon="stats-chart"
          active={selectedTab === "Stats"}
          onPress={() => setSelectedTab("Stats")}
        />

        <BottomNavItem
          label="Perfil"
          icon="person"
          active={selectedTab === "Perfil"}
          onPress={() => setSelectedTab("Perfil")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 18,
  },

  // Cabeçalho
  header: {
    marginBottom: 15,
  },

  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  greeting: {
    fontSize: 16,
    color: COLORS.gray,
  },

  userName: {
    fontWeight: "700",
    color: "#333333",
  },

  notificationButton: {
    padding: 5,
    position: "relative",
  },

  notificationDot: {
    position: "absolute",
    top: 3,
    right: 4,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.yellow,
  },

  // Card de análise
  analysisCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 19,
    minHeight: 164,
    marginBottom: 11,
  },

  analysisTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333333",
  },

  analysisDescription: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 5,
    lineHeight: 15,
  },

  analysisFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 18,
  },

  eyeIllustration: {
    width: 75,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
  },

  scanCornerTop: {
    position: "absolute",
    top: 2,
    left: 5,
    width: 18,
    height: 14,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: COLORS.primary,
    borderTopLeftRadius: 8,
  },

  scanCornerBottom: {
    position: "absolute",
    bottom: 2,
    right: 5,
    width: 18,
    height: 14,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: COLORS.primary,
    borderBottomRightRadius: 8,
  },

  startButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 22,
    paddingVertical: 8,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  startButtonText: {
    color: COLORS.white,
    fontSize: 11,
  },

  // Estatísticas
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },

  statisticsCard: {
    flex: 1.5,
    minHeight: 70,
    backgroundColor: COLORS.lavender,
    borderRadius: 15,
    padding: 16,
    justifyContent: "center",
  },

  statisticsTitle: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },

  statisticsDescription: {
    color: COLORS.gray,
    fontSize: 14,
    lineHeight: 13,
  },

  detailsCard: {
    flex: 1,
    minHeight: 70,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  detailsText: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: "center",
  },

  // Sugestões
  suggestionsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },

  receiveSuggestionsCard: {
    flex: 1,
    minHeight: 72,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },

  receiveSuggestionsText: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: "center",
  },

  suggestionsCard: {
    flex: 1.5,
    minHeight: 72,
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    padding: 14,
    justifyContent: "center",
  },

  suggestionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
    marginBottom: 4,
  },

  suggestionsDescription: {
    fontSize: 14,
    color: COLORS.white,
    lineHeight: 14,
  },

  // Streak
  streakCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    minHeight: 105,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 4,
  },

  streakIconContainer: {
    width: 76,
    height: 76,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  streakNumber: {
    position: "absolute",
    top: 28,
    fontSize: 19,
    fontWeight: "700",
    color: COLORS.primary,
  },

  streakInfo: {
    flex: 1,
  },

  streakTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111111",
  },

  streakDescription: {
    fontSize: 14,
    color: "#555555",
    lineHeight: 13,
  },

  // Navegação inferior
  bottomNav: {
    width: 132,
    height: 52,
    alignSelf: "center",
    marginBottom: 14,
    backgroundColor: COLORS.white,
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 5,
  },
});
