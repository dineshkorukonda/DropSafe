import type { PropsWithChildren, ReactNode } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/lib/theme";

export function AppScreen({
  children,
  backgroundColor = colors.page,
  keyboardAware = false,
}: PropsWithChildren<{ backgroundColor?: string; keyboardAware?: boolean }>) {
  const content = keyboardAware ? (
    <KeyboardAvoidingView
      style={styles.keyboardAvoider}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      {children}
    </KeyboardAvoidingView>
  ) : (
    children
  );

  return <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>{content}</SafeAreaView>;
}

export function PhoneCanvas({ children }: PropsWithChildren) {
  return <View style={styles.canvas}>{children}</View>;
}

export function SectionTitle({
  title,
  subtitle,
  rightLabel,
}: {
  title: string;
  subtitle?: string;
  rightLabel?: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
      </View>
      {rightLabel ? <Text style={styles.sectionRight}>{rightLabel}</Text> : null}
    </View>
  );
}

export function SurfaceCard({ children, padded = true }: PropsWithChildren<{ padded?: boolean }>) {
  return <View style={[styles.card, padded && styles.cardPadded]}>{children}</View>;
}

export function Badge({
  label,
  tone = "light",
}: {
  label: string;
  tone?: "light" | "dark";
}) {
  return (
    <View style={[styles.badge, tone === "dark" ? styles.badgeDark : styles.badgeLight]}>
      <Text style={[styles.badgeText, tone === "dark" ? styles.badgeTextDark : styles.badgeTextLight]}>
        {label}
      </Text>
    </View>
  );
}

export function StatLabel({ children }: { children: ReactNode }) {
  return <Text style={styles.statLabel}>{children}</Text>;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardAvoider: {
    flex: 1,
  },
  canvas: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 0,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "700",
  },
  sectionSubtitle: {
    marginTop: 4,
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  sectionRight: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600",
  },
  card: {
    borderRadius: 22,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  cardPadded: {
    padding: 16,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  badgeLight: {
    borderColor: colors.line,
    backgroundColor: colors.card,
  },
  badgeDark: {
    borderColor: colors.dark,
    backgroundColor: colors.dark,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  badgeTextLight: {
    color: colors.ink,
  },
  badgeTextDark: {
    color: "#FFFFFF",
  },
  statLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "600",
  },
});
