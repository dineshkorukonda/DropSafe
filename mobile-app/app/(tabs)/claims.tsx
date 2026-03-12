import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { AppScreen, Badge, PhoneCanvas, SurfaceCard } from "@/components/ui";
import { useAppState } from "@/context/app-state";
import { colors } from "@/lib/theme";

export default function ClaimsTabScreen() {
  const {
    payoutMethod,
    cyclePayoutMethod,
    highlightedPastClaim,
    setHighlightedPastClaim,
    claimExpanded,
    toggleClaimExpanded,
  } = useAppState();
  const pastClaims = claimExpanded
    ? [
        ["Screen Crack Protection", "July 12, 2023 • Claim #DS-8120", "₹2,200.00"],
        ["Theft Protection", "March 05, 2023 • Claim #DS-7041", "₹18,500.00"],
        ["Flood Disruption", "Jan 19, 2023 • Claim #DS-6802", "₹3,100.00"],
      ]
    : [
        ["Screen Crack Protection", "July 12, 2023 • Claim #DS-8120", "₹2,200.00"],
        ["Theft Protection", "March 05, 2023 • Claim #DS-7041", "₹18,500.00"],
      ];

  return (
    <AppScreen>
      <PhoneCanvas>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <Text style={styles.header}>Claim Details</Text>

          <SurfaceCard>
            <View style={styles.topRow}>
              <View>
                <Text style={styles.kicker}>Active Claim</Text>
                <Text style={styles.claimId}>#DS-9921 • Damage Protection</Text>
              </View>
              <Badge label="In Progress" />
            </View>
            <Text style={styles.amount}>₹4,500.00</Text>
            <Text style={styles.amountCaption}>Estimated Payout Amount</Text>

            <View style={styles.stepRow}>
              <View style={[styles.step, styles.stepActive]} />
              <View style={[styles.step, styles.stepActive]} />
              <View style={styles.step} />
              <View style={[styles.step, styles.stepMuted]} />
            </View>
          </SurfaceCard>

          <View>
            <Text style={styles.section}>Live Status</Text>
            {[
              ["Detected", "Aug 24, 10:00 AM • Auto-detection system"],
              ["Verified", "Aug 24, 11:30 AM • Incident confirmed"],
              ["Processing", "Funds are being allocated to your UPI"],
            ].map(([title, sub]) => (
              <View key={title} style={styles.timelineRow}>
                <View style={styles.timelineDot}>
                  <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.timelineTitle}>{title}</Text>
                  <Text style={styles.timelineSub}>{sub}</Text>
                </View>
              </View>
            ))}
          </View>

          <SurfaceCard>
            <View style={styles.destinationRow}>
              <View style={styles.destinationIcon}>
                <Ionicons name="card" size={16} color="#FFFFFF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.destinationLabel}>Payout Destination</Text>
                <Text style={styles.destinationValue}>rahul.dev@indfcbank</Text>
              </View>
              <Pressable onPress={cyclePayoutMethod}>
                <Badge label={`Change • ${payoutMethod}`} />
              </Pressable>
            </View>
          </SurfaceCard>

          <View style={styles.pastHeader}>
            <Text style={styles.section}>Past Claims</Text>
            <Pressable onPress={toggleClaimExpanded}>
              <Text style={styles.viewAll}>{claimExpanded ? "Collapse" : "View All"}</Text>
            </Pressable>
          </View>

          {pastClaims.map(([title, sub, amount]) => (
            <Pressable key={title} onPress={() => setHighlightedPastClaim(title)}>
            <SurfaceCard>
              <View style={styles.pastRow}>
                <View
                  style={[
                    styles.checkBubble,
                    highlightedPastClaim === title && styles.checkBubbleSelected,
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

          <Pressable style={styles.footerButton} onPress={() => router.push("/claim-details")}>
            <Text style={styles.footerButtonText}>Open detailed claim view</Text>
          </Pressable>
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
    color: colors.ink,
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 2,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  kicker: {
    color: "#7E889A",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  claimId: {
    marginTop: 4,
    color: colors.muted,
    fontSize: 12,
  },
  amount: {
    marginTop: 14,
    color: colors.ink,
    fontSize: 34,
    fontWeight: "900",
  },
  amountCaption: {
    color: colors.muted,
    fontSize: 12,
  },
  stepRow: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  step: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#000000",
  },
  stepActive: {
    backgroundColor: "#000000",
  },
  stepMuted: {
    borderColor: "#D5DCE7",
    backgroundColor: "#D5DCE7",
  },
  section: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "800",
  },
  timelineRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  timelineDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  timelineTitle: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "800",
  },
  timelineSub: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 2,
  },
  destinationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  destinationIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  destinationLabel: {
    color: colors.muted,
    fontSize: 11,
  },
  destinationValue: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "700",
  },
  pastHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewAll: {
    color: colors.ink,
    fontSize: 11,
    fontWeight: "700",
  },
  pastRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkBubble: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#EEF2F7",
    alignItems: "center",
    justifyContent: "center",
  },
  checkBubbleSelected: {
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
    color: colors.muted,
    fontSize: 11,
    marginTop: 2,
  },
  pastAmount: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: "800",
  },
  footerButton: {
    marginTop: 6,
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  footerButtonText: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "700",
  },
});
