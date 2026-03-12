import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { AppScreen, PhoneCanvas, SurfaceCard } from "@/components/ui";
import { useAppState } from "@/context/app-state";
import { colors } from "@/lib/theme";

export default function WelcomeScreen() {
  const { phone, setPhone, otp, setOtpDigit, markVerificationResent, verificationResentAt } =
    useAppState();
  const canContinue = phone.replace(/\D/g, "").length >= 10 && otp.every((digit) => digit.length === 1);

  return (
    <AppScreen keyboardAware>
      <PhoneCanvas>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroPanel}>
            <View style={styles.shieldWrap}>
              <View style={styles.shieldIcon}>
                <Ionicons name="shield-checkmark" size={30} color="#FFFFFF" />
              </View>
            </View>
            <Text style={styles.brand}>DropSafe</Text>
          </View>

          <SurfaceCard padded={false}>
            <View style={styles.sheet}>
              <Text style={styles.title}>Your earnings, protected.</Text>
              <Text style={styles.subtitle}>
                Secure your income with military-grade encryption and instant verification.
              </Text>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <View style={styles.row}>
                  <View style={[styles.inputBox, styles.codeBox]}>
                    <Text style={styles.codeText}>+91</Text>
                  </View>
                  <TextInput
                    style={[styles.inputBox, styles.phoneInput]}
                    placeholder="00000 00000"
                    placeholderTextColor="#98A3B7"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                  />
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.codeLabel}>Enter Verification Code</Text>
                <View style={styles.otpRow}>
                  {[0, 1, 2, 3].map((item) => (
                    <TextInput
                      key={item}
                      style={styles.otpBox}
                      keyboardType="number-pad"
                      maxLength={1}
                      value={otp[item]}
                      onChangeText={(value) => setOtpDigit(item, value)}
                      returnKeyType="done"
                    />
                  ))}
                </View>
              </View>

              <Pressable onPress={markVerificationResent}>
                <Text style={styles.helperText}>
                  Didn&apos;t receive code? <Text style={styles.helperStrong}>Resend OTP</Text>
                </Text>
              </Pressable>
              {verificationResentAt ? (
                <Text style={styles.resendState}>Fresh code sent. Use any 4 digits to continue.</Text>
              ) : null}

              <Pressable
                style={[styles.primaryButton, !canContinue && styles.primaryButtonDisabled]}
                disabled={!canContinue}
                onPress={() => router.push("/login")}
              >
                <Text style={styles.primaryButtonText}>Next</Text>
                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
              </Pressable>

              <Text style={styles.legalText}>
                By continuing, you agree to DropSafe&apos;s Terms of Service and Privacy Policy.
              </Text>
            </View>
          </SurfaceCard>
        </ScrollView>
      </PhoneCanvas>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 28,
  },
  heroPanel: {
    height: 290,
    borderRadius: 28,
    backgroundColor: "#08213E",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  shieldWrap: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
  },
  shieldIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  brand: {
    marginTop: 18,
    fontSize: 24,
    fontWeight: "800",
    color: "#000000",
  },
  sheet: {
    marginTop: -26,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 28,
  },
  title: {
    color: colors.ink,
    fontSize: 27,
    lineHeight: 34,
    textAlign: "center",
    fontWeight: "800",
  },
  subtitle: {
    marginTop: 12,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    paddingHorizontal: 8,
  },
  fieldGroup: {
    marginTop: 24,
    gap: 10,
  },
  label: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  inputBox: {
    height: 58,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.soft,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  codeBox: {
    width: 62,
  },
  codeText: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "700",
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: colors.ink,
  },
  codeLabel: {
    color: "#54657F",
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 8,
  },
  otpBox: {
    width: 50,
    height: 58,
    borderRadius: 12,
    backgroundColor: colors.soft,
    borderWidth: 1,
    borderColor: colors.line,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "800",
    color: colors.ink,
  },
  helperText: {
    marginTop: 22,
    textAlign: "center",
    color: colors.muted,
    fontSize: 14,
  },
  helperStrong: {
    color: colors.ink,
    fontWeight: "800",
  },
  resendState: {
    marginTop: 10,
    textAlign: "center",
    color: "#587395",
    fontSize: 12,
    fontWeight: "600",
  },
  primaryButton: {
    marginTop: 26,
    height: 58,
    borderRadius: 14,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  primaryButtonDisabled: {
    opacity: 0.45,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  legalText: {
    marginTop: 18,
    textAlign: "center",
    color: "#94A0B2",
    fontSize: 12,
    lineHeight: 18,
    paddingHorizontal: 12,
  },
});
