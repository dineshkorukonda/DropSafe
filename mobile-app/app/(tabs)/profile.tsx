import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";

import { AppScreen, Badge, PhoneCanvas, SurfaceCard } from "@/components/ui";
import { useAppState } from "@/context/app-state";
import { colors } from "@/lib/theme";

export default function ProfileScreen() {
  const {
    fullName,
    platform,
    selectedPlan,
    notificationsEnabled,
    setNotificationsEnabled,
    payoutMethod,
    cyclePayoutMethod,
    resetApp,
  } = useAppState();

  return (
    <AppScreen>
      <PhoneCanvas>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Ionicons name="arrow-back" size={20} color={colors.ink} />
            <Text style={styles.headerTitle}>Profile</Text>
            <Ionicons name="settings" size={18} color={colors.ink} />
          </View>

          <SurfaceCard>
            <View style={styles.profileTop}>
              <View style={styles.avatarWrap}>
                <View style={styles.avatar} />
                <View style={styles.onlineDot} />
              </View>
              <Text style={styles.name}>{fullName}</Text>
              <Text style={styles.role}>{platform} Delivery Professional</Text>
              <View style={styles.badges}>
                <Badge label={`${platform} Verified`} tone="dark" />
                <Badge label={`${selectedPlan} Plan`} tone="dark" />
              </View>
            </View>
          </SurfaceCard>

          <SurfaceCard>
            <View style={styles.planHeader}>
              <Text style={styles.planTitle}>Weekly Protection Plan</Text>
              <Ionicons name="shield-outline" size={16} color="#7F8CA1" />
            </View>
            <Text style={styles.planMeta}>Active • {selectedPlan} plan • Expires in 2 days</Text>
            <View style={styles.planTrack}>
              <View style={styles.planFill} />
            </View>
            <Pressable style={styles.renewButton} onPress={() => router.push("/profile-setup")}>
              <Text style={styles.renewText}>Renew Plan</Text>
            </Pressable>
          </SurfaceCard>

          <View>
            <Text style={styles.sectionTitle}>Account Settings</Text>
            <SurfaceCard padded={false}>
              <View style={styles.settingRow}>
                <View style={styles.settingLeft}>
                  <Ionicons name="notifications" size={16} color={colors.ink} />
                  <Text style={styles.settingText}>Push Notifications</Text>
                </View>
                <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
              </View>
              <View style={styles.settingDivider} />
              <Pressable style={styles.settingRow} onPress={cyclePayoutMethod}>
                <View style={styles.settingLeft}>
                  <Ionicons name="card" size={16} color={colors.ink} />
                  <Text style={styles.settingText}>Payout Methods • {payoutMethod}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#9EABBB" />
              </Pressable>
              <View style={styles.settingDivider} />
              <Pressable style={styles.settingRow} onPress={() => router.push("/claim-details")}>
                <View style={styles.settingLeft}>
                  <Ionicons name="shield-checkmark" size={16} color={colors.ink} />
                  <Text style={styles.settingText}>Security & Privacy</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#9EABBB" />
              </Pressable>
              <View style={styles.settingDivider} />
              <Pressable
                style={styles.settingRow}
                onPress={() => {
                  resetApp();
                  router.replace("/");
                }}
              >
                <View style={styles.settingLeft}>
                  <Ionicons name="log-out-outline" size={16} color="#EA4335" />
                  <Text style={styles.logoutText}>Log Out</Text>
                </View>
              </Pressable>
            </SurfaceCard>
          </View>

          <Text style={styles.version}>DropSafe Version 7.4.1 (Build 890)</Text>
        </ScrollView>
      </PhoneCanvas>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 14,
    paddingTop: 8,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800",
  },
  profileTop: {
    alignItems: "center",
  },
  avatarWrap: {
    position: "relative",
    marginTop: 4,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#D7DDD7",
  },
  onlineDot: {
    position: "absolute",
    right: 2,
    bottom: 4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  name: {
    marginTop: 14,
    color: colors.ink,
    fontSize: 28,
    fontWeight: "800",
  },
  role: {
    marginTop: 4,
    color: colors.muted,
    fontSize: 14,
  },
  badges: {
    marginTop: 14,
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  planTitle: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "800",
  },
  planMeta: {
    marginTop: 10,
    color: "#4F9C65",
    fontSize: 12,
    fontWeight: "600",
  },
  planTrack: {
    marginTop: 12,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#E1E6EE",
    overflow: "hidden",
  },
  planFill: {
    width: "72%",
    height: "100%",
    backgroundColor: "#000000",
  },
  renewButton: {
    marginTop: 14,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  renewText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  settingRow: {
    minHeight: 54,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  settingText: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "600",
  },
  logoutText: {
    color: "#EA4335",
    fontSize: 14,
    fontWeight: "700",
  },
  settingDivider: {
    height: 1,
    backgroundColor: "#E6EAF1",
    marginHorizontal: 16,
  },
  version: {
    textAlign: "center",
    color: "#A3ADBB",
    fontSize: 11,
    marginTop: 4,
  },
});
