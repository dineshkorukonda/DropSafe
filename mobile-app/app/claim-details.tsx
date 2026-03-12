import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen, Badge, PhoneCanvas, SurfaceCard } from "@/components/ui";
import { useAppState } from "@/context/app-state";
import { colors } from "@/lib/theme";

const timeline = [
  ["Detected", "Aug 24, 10:00 AM • Auto-detection system", true],
  ["Verified", "Aug 24, 11:30 AM • Incident confirmed", true],
  ["Processing", "Funds are being allocated to your UPI", true],
  ["Paid", "Expected by Aug 26, 12:00 PM", false],
];

export default function ClaimDetailsScreen() {
  const { payoutMethod, cyclePayoutMethod, highlightedPastClaim, setHighlightedPastClaim } =
    useAppState();

  return (
    <AppScreen>
      <PhoneCanvas>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color={colors.ink} />
          </Pressable>
          <Text style={styles.headerTitle}>Claim Details</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <SurfaceCard>
            <View style={styles.claimTop}>
              <View>
                <Text style={styles.claimLabel}>Active Claim</Text>
                <Text style={styles.claimSub}>#DS-9921 • Damage Protection</Text>
              </View>
              <Badge label="In Progress" tone="light" />
            </View>

            <Text style={styles.amount}>₹4,500.00</Text>
            <Text style={styles.amountCaption}>Estimated Payout Amount</Text>

            <View style={styles.stepTrack}>
              {[0, 1, 2, 3].map((item) => (
                <View key={item} style={[styles.stepDot, item < 3 && styles.stepDotDark]} />
              ))}
              <View style={styles.stepLine} />
            </View>
          </SurfaceCard>

          <View style={styles.block}>
            <Text style={styles.blockTitle}>Live Status</Text>
            {timeline.map(([title, subtitle, active]) => (
              <View key={String(title)} style={styles.timelineRow}>
                <View style={styles.timelineIconCol}>
                  <View style={[styles.timelineIcon, active ? styles.timelineIconActive : styles.timelineIconIdle]}>
                    <Ionicons name={title === "Paid" ? "card-outline" : "checkmark"} size={12} color={active ? "#FFFFFF" : colors.muted} />
                  </View>
                  {title !== "Paid" ? <View style={styles.timelineStem} /> : null}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.timelineTitle}>{title}</Text>
                  <Text style={styles.timelineSub}>{subtitle}</Text>
                </View>
              </View>
            ))}
          </View>

          <SurfaceCard>
            <View style={styles.payoutRow}>
              <View style={styles.bankIcon}>
                <Ionicons name="card" size={18} color="#FFFFFF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.bankLabel}>Payout Destination</Text>
                <Text style={styles.bankValue}>rahul.dev@indfcbank</Text>
              </View>
              <Pressable onPress={cyclePayoutMethod}>
                <Badge label={`Change • ${payoutMethod}`} tone="light" />
              </Pressable>
            </View>
          </SurfaceCard>

          <View style={styles.block}>
            <View style={styles.listHeader}>
              <Text style={styles.blockTitle}>Past Claims</Text>
              <Text style={styles.viewAll}>View All</Text>
            </View>
            {[
              ["Screen Crack Protection", "July 12, 2023 • Claim #DS-8120", "₹2,200.00"],
              ["Theft Protection", "March 05, 2023 • Claim #DS-7041", "₹18,500.00"],
            ].map(([title, sub, amount]) => (
              <Pressable key={title} onPress={() => setHighlightedPastClaim(title)}>
              <SurfaceCard>
                <View style={styles.pastClaimRow}>
                  <View
                    style={[
                      styles.checkWrap,
                      highlightedPastClaim === title && styles.checkWrapSelected,
                    ]}
                  >
                    <Ionicons name="checkmark" size={16} color={colors.ink} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.pastTitle}>{title}</Text>
                    <Text style={styles.pastSub}>{sub}</Text>
                  </View>
                  <Text style={styles.pastAmount}>{amount}</Text>
                </View>
              </SurfaceCard>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </PhoneCanvas>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 6,
    marginBottom: 16,
  },
  backButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
  },
  headerTitle: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "800",
  },
  content: {
    gap: 14,
    paddingBottom: 24,
  },
  claimTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  claimLabel: {
    color: "#7B879B",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  claimSub: {
    marginTop: 4,
    color: "#728099",
    fontSize: 12,
  },
  amount: {
    marginTop: 18,
    fontSize: 38,
    fontWeight: "900",
    color: colors.ink,
  },
  amountCaption: {
    color: colors.muted,
    fontSize: 13,
  },
  stepTrack: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  stepLine: {
    position: "absolute",
    left: 12,
    right: 12,
    top: 5,
    height: 2,
    backgroundColor: "#D9DFE7",
    zIndex: -1,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#000000",
    backgroundColor: "#ECEAE4",
  },
  stepDotDark: {
    backgroundColor: "#000000",
  },
  block: {
    gap: 10,
  },
  blockTitle: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "800",
  },
  timelineRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },
  timelineIconCol: {
    alignItems: "center",
  },
  timelineIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  timelineIconActive: {
    backgroundColor: "#000000",
  },
  timelineIconIdle: {
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: "#F6F7FA",
  },
  timelineStem: {
    width: 2,
    flex: 1,
    backgroundColor: "#DCE2EA",
    marginVertical: 4,
  },
  timelineTitle: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "800",
  },
  timelineSub: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 3,
  },
  payoutRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bankIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  bankLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "600",
  },
  bankValue: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 2,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewAll: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: "700",
  },
  pastClaimRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#EEF2F7",
    alignItems: "center",
    justifyContent: "center",
  },
  checkWrapSelected: {
    backgroundColor: "#DCE6F5",
    borderWidth: 1,
    borderColor: "#A3B5CE",
  },
  pastTitle: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "800",
  },
  pastSub: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 11,
  },
  pastAmount: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "800",
  },
});
