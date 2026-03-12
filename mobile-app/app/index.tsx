import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function GetStartedScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.heroCard}>
          <Text style={styles.kicker}>DROP SAFE</Text>
          <Text style={styles.title}>Income protection for delivery workers.</Text>
          <Text style={styles.copy}>
            Start with a quick mobile flow for sign-in, onboarding, and policy access.
          </Text>

          <View style={styles.featureList}>
            <View style={styles.featurePill}>
              <Text style={styles.featureText}>Weather-aware coverage</Text>
            </View>
            <View style={styles.featurePill}>
              <Text style={styles.featureText}>Fast claim workflows</Text>
            </View>
            <View style={styles.featurePill}>
              <Text style={styles.featureText}>Built for gig workers</Text>
            </View>
          </View>
        </View>

        <View style={styles.footerCard}>
          <Text style={styles.footerTitle}>Get started</Text>
          <Text style={styles.footerCopy}>
            Use the mobile app to review your account and continue into the DropSafe worker journey.
          </Text>

          <Link href="/login" asChild>
            <Pressable style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Continue to login</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F6EF",
  },
  screen: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: "space-between",
  },
  heroCard: {
    marginTop: 12,
    borderRadius: 32,
    padding: 28,
    backgroundColor: "#16281B",
    gap: 18,
  },
  kicker: {
    color: "#8DE0B5",
    letterSpacing: 2.4,
    fontSize: 12,
    fontWeight: "700",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 38,
    lineHeight: 42,
    fontWeight: "800",
  },
  copy: {
    color: "#C8D3CA",
    fontSize: 16,
    lineHeight: 24,
  },
  featureList: {
    gap: 10,
  },
  featurePill: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#223729",
  },
  featureText: {
    color: "#F4F7F3",
    fontSize: 14,
    fontWeight: "600",
  },
  footerCard: {
    borderRadius: 28,
    padding: 24,
    backgroundColor: "#FFFFFF",
    gap: 14,
  },
  footerTitle: {
    color: "#111827",
    fontSize: 28,
    fontWeight: "700",
  },
  footerCopy: {
    color: "#4B5563",
    fontSize: 15,
    lineHeight: 22,
  },
  primaryButton: {
    marginTop: 8,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
