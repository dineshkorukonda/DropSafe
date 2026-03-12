import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { AppScreen, PhoneCanvas, SurfaceCard } from "@/components/ui";
import { useAppState } from "@/context/app-state";
import { colors } from "@/lib/theme";

const platforms = ["Swiggy", "Zomato", "Blinkit", "Zepto"] as const;

export default function LoginScreen() {
  const {
    fullName,
    setFullName,
    city,
    setCity,
    platform,
    setPlatform,
    hoursWorked,
    setHoursWorked,
    weeklyEarnings,
    setWeeklyEarnings,
  } = useAppState();
  const canContinue =
    fullName.trim().length > 2 && city.trim().length > 1 && weeklyEarnings.length > 0;

  return (
    <AppScreen keyboardAware>
      <PhoneCanvas>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Link href="/" asChild>
              <Pressable style={styles.backButton}>
                <Ionicons name="arrow-back" size={22} color={colors.ink} />
              </Pressable>
            </Link>
            <Text style={styles.headerTitle}>Profile Setup</Text>
            <Text style={styles.headerMeta}>Details</Text>
          </View>

          <View style={styles.progressBlock}>
            <Text style={styles.progressText}>Step 2 of 4</Text>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </View>

          <SurfaceCard>
            <Text style={styles.title}>Tell us about your work</Text>
            <Text style={styles.subtitle}>
              We use this to build a plan that covers your specific risks.
            </Text>

            <Field
              label="Full Name"
              icon="person-outline"
              placeholder="e.g. Rahul Kumar"
              value={fullName}
              onChangeText={setFullName}
            />
            <Field
              label="City"
              icon="location-outline"
              placeholder="e.g. Bangalore"
              value={city}
              onChangeText={setCity}
            />

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Primary Delivery Platform</Text>
              <View style={styles.platformRow}>
                {platforms.map((option) => (
                  <Pressable
                    key={option}
                    onPress={() => setPlatform(option)}
                    style={[
                      styles.platformChip,
                      platform === option && styles.platformChipSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.platformChipText,
                        platform === option && styles.platformChipTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <View style={styles.sliderHeader}>
                <Text style={styles.label}>Daily Hours Worked</Text>
                <View style={styles.hourBadge}>
                  <Text style={styles.hourBadgeText}>{hoursWorked} Hours</Text>
                </View>
              </View>
              <View style={styles.hoursControl}>
                <Pressable style={styles.adjustButton} onPress={() => setHoursWorked(hoursWorked - 1)}>
                  <Ionicons name="remove" size={16} color={colors.ink} />
                </Pressable>
                <View style={styles.sliderTrack}>
                  <View style={[styles.sliderFill, { width: `${(hoursWorked / 16) * 100}%` }]} />
                  <View style={[styles.sliderThumb, { left: `${(hoursWorked / 16) * 100}%` }]} />
                </View>
                <Pressable style={styles.adjustButton} onPress={() => setHoursWorked(hoursWorked + 1)}>
                  <Ionicons name="add" size={16} color={colors.ink} />
                </Pressable>
              </View>
              <View style={styles.sliderScale}>
                <Text style={styles.scaleText}>1 Hr</Text>
                <Text style={styles.scaleText}>8 Hrs</Text>
                <Text style={styles.scaleText}>16+ Hrs</Text>
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Average Weekly Earnings</Text>
              <View style={styles.inputRow}>
                <Text style={styles.currency}>₹</Text>
                <TextInput
                  style={styles.earningsInput}
                  placeholder="Enter amount"
                  placeholderTextColor="#7A869B"
                  keyboardType="number-pad"
                  value={weeklyEarnings}
                  onChangeText={setWeeklyEarnings}
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                />
                <Text style={styles.unit}>INR</Text>
              </View>
            </View>

            <Pressable
              style={[styles.primaryButton, !canContinue && styles.primaryButtonDisabled]}
              disabled={!canContinue}
              onPress={() => router.push("/profile-setup")}
            >
              <Text style={styles.primaryButtonText}>Build My Plan</Text>
              <Ionicons name="flash" size={16} color="#FFFFFF" />
            </Pressable>

            <Text style={styles.legal}>
              By clicking &quot;Build My Plan&quot; you agree to our Terms of Service.
            </Text>
          </SurfaceCard>
        </ScrollView>
      </PhoneCanvas>
    </AppScreen>
  );
}

function Field({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <Ionicons name={icon} size={18} color="#8A97AB" />
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="#7A869B"
          value={value}
          onChangeText={onChangeText}
          returnKeyType="next"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 6,
    marginBottom: 18,
  },
  backButton: {
    width: 34,
    height: 34,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.ink,
  },
  headerMeta: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "600",
  },
  progressBlock: {
    marginBottom: 18,
    gap: 10,
  },
  progressText: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "600",
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "#DEE4ED",
    overflow: "hidden",
    width: 180,
  },
  scrollContent: {
    paddingBottom: 34,
  },
  progressFill: {
    width: "58%",
    height: "100%",
    backgroundColor: "#000000",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.ink,
  },
  subtitle: {
    marginTop: 10,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 8,
  },
  fieldGroup: {
    marginTop: 18,
    gap: 8,
  },
  label: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "700",
  },
  inputRow: {
    minHeight: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.soft,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  platformRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  platformChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.soft,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  platformChipSelected: {
    backgroundColor: "#000000",
    borderColor: "#000000",
  },
  platformChipText: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "700",
  },
  platformChipTextSelected: {
    color: "#FFFFFF",
  },
  placeholder: {
    flex: 1,
    color: "#6C7891",
    fontSize: 15,
  },
  textInput: {
    flex: 1,
    color: colors.ink,
    fontSize: 15,
  },
  sliderHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hourBadge: {
    backgroundColor: "#EDEDED",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  hourBadgeText: {
    color: "#B0B0B0",
    fontSize: 12,
    fontWeight: "800",
  },
  hoursControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  adjustButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  sliderTrack: {
    flex: 1,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#D8E0EB",
    marginTop: 8,
    justifyContent: "center",
  },
  sliderFill: {
    width: "48%",
    height: "100%",
    backgroundColor: "#BCC9D9",
    borderRadius: 999,
  },
  sliderThumb: {
    position: "absolute",
    marginLeft: -9,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#000000",
  },
  sliderScale: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  scaleText: {
    color: "#9AA6B8",
    fontSize: 11,
    fontWeight: "600",
  },
  currency: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: "800",
  },
  unit: {
    color: "#9AA6B8",
    fontSize: 13,
    fontWeight: "700",
  },
  earningsInput: {
    flex: 1,
    color: colors.ink,
    fontSize: 15,
    minHeight: 28,
  },
  primaryButton: {
    marginTop: 24,
    height: 54,
    borderRadius: 14,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  legal: {
    marginTop: 14,
    textAlign: "center",
    color: "#93A0B2",
    fontSize: 12,
    lineHeight: 18,
  },
  primaryButtonDisabled: {
    opacity: 0.45,
  },
});
