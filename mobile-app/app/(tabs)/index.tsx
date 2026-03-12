import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { AppScreen, Badge, PhoneCanvas, SurfaceCard } from "@/components/ui";
import { useAppState } from "@/context/app-state";
import { colors } from "@/lib/theme";

export default function HomeScreen() {
  const { fullName, selectedPlan, weeklyEarnings, notificationsEnabled } = useAppState();
  const firstName = fullName.split(" ")[0] || "Ravi";
  const weeklyProtection =
    selectedPlan === "Premium" ? "₹7,900" : selectedPlan === "Standard" ? "₹4,250" : "₹2,600";

  return (
    <AppScreen>
      <PhoneCanvas>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.topBar}>
            <View style={styles.profileRow}>
              <View style={styles.avatar} />
              <View>
                <Text style={styles.greeting}>Hi {firstName} 👋</Text>
                <Text style={styles.subGreeting}>Ready for the day?</Text>
              </View>
            </View>
            <Pressable style={styles.notifyButton} onPress={() => router.push("/alert")}>
              <Ionicons name="notifications-outline" size={16} color={colors.ink} />
            </Pressable>
          </View>

          <Badge label={`${selectedPlan} Coverage`} tone="light" />

          <SurfaceCard>
            <View style={styles.calendarHeader}>
              <Text style={styles.cardTitle}>This Week</Text>
              <Text style={styles.calendarMonth}>October 2023</Text>
            </View>
            <View style={styles.calendarGrid}>
              {["M", "T", "W", "T", "F", "S", "S", "2", "3", "4", "5", "6", "7", "8"].map((item, index) => (
                <Text key={`${item}-${index}`} style={styles.calendarCell}>
                  {item}
                </Text>
              ))}
            </View>
          </SurfaceCard>

          <SurfaceCard>
            <View style={styles.alertHeader}>
              <View style={styles.alertIcon}>
                <Ionicons name="rainy-outline" size={18} color="#000000" />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.alertMeta}>
                  <Text style={styles.alertEyebrow}>Weather Alert</Text>
                  <Text style={styles.alertTime}>Just now</Text>
                </View>
                <Text style={styles.alertTitle}>
                  {notificationsEnabled ? "Heavy rain alert in Hyderabad" : "Alerts paused"}
                </Text>
                <Text style={styles.alertCopy}>
                  {notificationsEnabled
                    ? "Precipitation level: 12mm/hr. Automatic payout trigger active."
                    : "Turn notifications back on in Profile to receive automatic disruption alerts."}
                </Text>
              </View>
            </View>
            <Pressable
              style={styles.mapButton}
              onPress={() => router.push(notificationsEnabled ? "/alert" : "/(tabs)/profile")}
            >
              <Text style={styles.mapButtonText}>
                {notificationsEnabled ? "View Map" : "Open Settings"}
              </Text>
            </Pressable>
          </SurfaceCard>

          <View style={styles.metricsGrid}>
            <SurfaceCard>
              <View style={styles.metricIcon}>
                <Ionicons name="wallet-outline" size={18} color="#FFFFFF" />
              </View>
              <Text style={styles.metricLabel}>Protected This Week</Text>
              <Text style={styles.metricAmount}>{weeklyProtection}</Text>
            </SurfaceCard>
            <SurfaceCard>
              <View style={styles.metricIcon}>
                <Ionicons name="card-outline" size={18} color="#FFFFFF" />
              </View>
              <Text style={styles.metricLabel}>Total Payouts Received</Text>
              <Text style={styles.metricAmount}>₹12,800</Text>
            </SurfaceCard>
            <SurfaceCard>
              <View style={styles.metricIconDark}>
                <Ionicons name="trending-up-outline" size={18} color="#FFFFFF" />
              </View>
              <Text style={styles.metricAmount}>{weeklyEarnings ? `${Math.max(4, Math.round(Number(weeklyEarnings) / 1500))}%` : "12%"}</Text>
              <Text style={styles.metricLabel}>from last week</Text>
            </SurfaceCard>
          </View>

          <View style={styles.listHeader}>
            <Text style={styles.cardTitle}>Recent Claims</Text>
            <Text style={styles.viewAll}>View All</Text>
          </View>

          <Pressable onPress={() => router.push("/claim-details")}>
          <SurfaceCard>
            <View style={styles.claimRow}>
              <View style={styles.claimIcon} />
              <View style={{ flex: 1 }}>
                <Text style={styles.claimTitle}>Claim Payout - Heavy Rain</Text>
                <Text style={styles.claimSub}>Oct 10, 2023 • Paid</Text>
              </View>
              <Text style={styles.claimAmount}>+₹850</Text>
            </View>
          </SurfaceCard>
          </Pressable>
        </ScrollView>
      </PhoneCanvas>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 14,
    paddingBottom: 20,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#D9D9D9",
  },
  greeting: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.ink,
  },
  subGreeting: {
    marginTop: 2,
    fontSize: 11,
    color: colors.muted,
  },
  notifyButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "800",
  },
  calendarMonth: {
    color: colors.muted,
    fontSize: 11,
  },
  calendarGrid: {
    marginTop: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 12,
  },
  calendarCell: {
    width: "14.2%",
    textAlign: "center",
    color: colors.ink,
    fontSize: 11,
  },
  alertHeader: {
    flexDirection: "row",
    gap: 12,
  },
  alertIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  alertMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  alertEyebrow: {
    color: colors.ink,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  alertTime: {
    color: colors.muted,
    fontSize: 10,
  },
  alertTitle: {
    marginTop: 4,
    color: colors.ink,
    fontSize: 18,
    fontWeight: "800",
  },
  alertCopy: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  mapButton: {
    marginTop: 12,
    alignSelf: "flex-start",
    backgroundColor: "#000000",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  mapButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  metricIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  metricIconDark: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#1C1C1C",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  metricLabel: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 15,
  },
  metricAmount: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: "900",
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewAll: {
    color: colors.ink,
    fontSize: 11,
    fontWeight: "700",
  },
  claimRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  claimIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#000000",
  },
  claimTitle: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "800",
  },
  claimSub: {
    marginTop: 4,
    color: colors.muted,
    fontSize: 11,
  },
  claimAmount: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: "800",
  },
});
