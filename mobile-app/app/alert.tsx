import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen, PhoneCanvas, SurfaceCard } from "@/components/ui";
import { useAppState } from "@/context/app-state";
import { colors } from "@/lib/theme";

export default function AlertScreen() {
  const { selectedPlan } = useAppState();
  const payout = selectedPlan === "Premium" ? "₹620" : selectedPlan === "Standard" ? "₹350" : "₹180";

  return (
    <AppScreen>
      <PhoneCanvas>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="close" size={22} color={colors.ink} />
          </Pressable>
          <Text style={styles.headerTitle}>Alert</Text>
          <Ionicons name="help-circle" size={18} color={colors.ink} />
        </View>

        <SurfaceCard padded={false}>
          <View style={styles.hero}>
            <View style={styles.heroCircle}>
              <Ionicons name="rainy" size={34} color="#FFFFFF" />
            </View>
          </View>
          <View style={styles.body}>
            <Text style={styles.urgency}>High Urgency</Text>
            <Text style={styles.title}>Disruption Detected in Your Zone</Text>
            <Text style={styles.subtitle}>Claim automatically initiated</Text>
            <Text style={styles.copy}>
              Our high-precision systems have identified significant weather disruption affecting your current coverage area.
            </Text>
          </View>
        </SurfaceCard>

        <SurfaceCard>
          <Text style={styles.blockLabel}>Estimated Payout</Text>
          <Text style={styles.payout}>{payout}</Text>
          <Text style={styles.payoutSub}>Based on current disruption intensity</Text>
        </SurfaceCard>

        <SurfaceCard>
          <View style={styles.verifyHeader}>
            <Text style={styles.blockLabel}>Claim Verification Status</Text>
            <Text style={styles.percent}>65%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>Processing automatic verification...</Text>
        </SurfaceCard>

        <Pressable style={styles.button} onPress={() => router.replace("/claim-details")}>
          <Text style={styles.buttonText}>Track My Payout</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </Pressable>

        <Text style={styles.footer}>DropSafe Guarantee: Instant Processing</Text>
      </PhoneCanvas>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingTop: 6,
  },
  headerTitle: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "800",
  },
  hero: {
    height: 150,
    backgroundColor: "#1F2B3D",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  heroCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  body: {
    padding: 18,
  },
  urgency: {
    color: colors.warning,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: {
    marginTop: 10,
    color: colors.ink,
    fontSize: 20,
    fontWeight: "800",
  },
  subtitle: {
    marginTop: 10,
    color: "#4C5564",
    fontSize: 15,
    fontWeight: "600",
  },
  copy: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
  },
  blockLabel: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "700",
  },
  payout: {
    marginTop: 10,
    color: "#000000",
    fontSize: 44,
    fontWeight: "900",
  },
  payoutSub: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 2,
  },
  verifyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  percent: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: "800",
    backgroundColor: "#EEF2F7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  progressTrack: {
    marginTop: 12,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#DEE5EE",
    overflow: "hidden",
  },
  progressFill: {
    width: "65%",
    height: "100%",
    backgroundColor: "#AAB7C8",
  },
  progressText: {
    marginTop: 10,
    color: colors.muted,
    fontSize: 12,
  },
  button: {
    marginTop: 18,
    height: 56,
    borderRadius: 14,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  footer: {
    textAlign: "center",
    marginTop: 12,
    color: "#9BA6B6",
    fontSize: 11,
  },
});
