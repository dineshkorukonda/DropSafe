import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { AppScreen, Badge, PhoneCanvas, SectionTitle, SurfaceCard } from "@/components/ui";
import { type PlanName, useAppState } from "@/context/app-state";
import { colors } from "@/lib/theme";

const planCards: {
  name: PlanName;
  price: string;
  badge: string;
  features: string[];
  disabled: string[];
}[] = [
  {
    name: "Basic",
    price: "₹29",
    badge: "Essential",
    features: ["Heavy Rain", "Curfew"],
    disabled: ["Floods", "Heatwave"],
  },
  {
    name: "Standard",
    price: "₹49",
    badge: "Most Popular",
    features: ["Heavy Rain", "Floods", "Curfew"],
    disabled: ["Heatwave"],
  },
  {
    name: "Premium",
    price: "₹79",
    badge: "Best Value",
    features: ["Heavy Rain", "Floods", "Curfew", "Extreme Heat"],
    disabled: [],
  },
];

export default function PlanSelectionScreen() {
  const { selectedPlan, setSelectedPlan, platform, hoursWorked, weeklyEarnings } = useAppState();
  const riskLabel = hoursWorked >= 10 ? "High" : hoursWorked >= 7 ? "Medium" : "Low";

  return (
    <AppScreen>
      <PhoneCanvas>
        <View style={styles.header}>
          <Link href="/login" asChild>
            <Pressable style={styles.backButton}>
              <Ionicons name="arrow-back" size={20} color={colors.ink} />
            </Pressable>
          </Link>
          <Text style={styles.headerTitle}>Select Weekly Plan</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <SurfaceCard>
            <Text style={styles.scoreLabel}>Local Risk Score</Text>
            <View style={styles.scoreRow}>
              <Text style={styles.scoreValue}>{riskLabel}</Text>
              <Badge label={`${platform} • ${weeklyEarnings || "0"} INR`} tone="dark" />
            </View>
          </SurfaceCard>

          <View style={{ marginTop: 14 }}>
            <SectionTitle
              title="Choose your coverage"
              subtitle="Pick a plan to protect your earnings this week"
            />
          </View>

          <View style={styles.planList}>
            {planCards.map((plan) => {
              const isSelected = selectedPlan === plan.name;
              return (
              <Pressable
                key={plan.name}
                onPress={() => setSelectedPlan(plan.name)}
                style={[styles.planCard, isSelected && styles.planCardSelected]}
              >
                <View style={styles.planHeader}>
                  <View>
                    <Text style={styles.planName}>{plan.name}</Text>
                    <Text style={styles.planPrice}>{plan.price} <Text style={styles.planWeek}>/ week</Text></Text>
                  </View>
                  <View style={styles.planHeaderRight}>
                    <Badge label={plan.badge} tone={isSelected ? "dark" : "light"} />
                    <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                      {isSelected ? <View style={styles.radioInner} /> : null}
                    </View>
                  </View>
                </View>

                <View style={styles.planFeatures}>
                  {plan.features.map((feature) => (
                    <View key={feature} style={styles.featureItem}>
                      <Ionicons name="checkmark-circle" size={14} color="#000000" />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                  {plan.disabled.map((feature) => (
                    <View key={feature} style={styles.featureItem}>
                      <Ionicons name="close-circle" size={14} color="#B5BDC9" />
                      <Text style={styles.featureDisabled}>{feature}</Text>
                    </View>
                  ))}
                </View>
              </Pressable>
            );
          })}
          </View>
        </ScrollView>

        <Pressable style={styles.activateButton} onPress={() => router.replace("/(tabs)")}>
          <Ionicons name="flash" size={14} color="#FFFFFF" />
          <Text style={styles.activateText}>Activate Plan</Text>
        </Pressable>
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
    width: 28,
    height: 28,
    justifyContent: "center",
  },
  headerTitle: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "800",
  },
  scrollContent: {
    paddingBottom: 110,
  },
  scoreLabel: {
    color: "#7E8693",
    fontSize: 11,
    fontWeight: "700",
  },
  scoreRow: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scoreValue: {
    color: colors.ink,
    fontSize: 30,
    fontWeight: "800",
  },
  planList: {
    gap: 12,
    marginTop: 6,
  },
  planCard: {
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: colors.line,
    padding: 14,
  },
  planCardSelected: {
    borderColor: "#000000",
    borderWidth: 2,
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  planHeaderRight: {
    alignItems: "center",
    gap: 10,
    flexDirection: "row",
  },
  planName: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "800",
  },
  planPrice: {
    marginTop: 6,
    color: "#000000",
    fontSize: 36,
    fontWeight: "900",
  },
  planWeek: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.muted,
  },
  planFeatures: {
    marginTop: 14,
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  featureItem: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  featureText: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: "600",
  },
  featureDisabled: {
    color: "#AAB3C0",
    fontSize: 12,
    fontWeight: "600",
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#C6CED9",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    borderColor: "#000000",
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#000000",
  },
  activateButton: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 18,
    height: 56,
    borderRadius: 14,
    backgroundColor: "#000000",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  activateText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    textTransform: "uppercase",
  },
});
