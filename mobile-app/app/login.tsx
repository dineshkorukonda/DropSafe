import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View>
          <Link href="/" style={styles.backLink}>
            Back
          </Link>

          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Sign in to continue into the DropSafe worker app.
          </Text>
        </View>

        <View style={styles.formCard}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="worker@dropsafe.app"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Enter your password"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <View style={styles.row}>
            <View style={styles.rememberRow}>
              <Switch value={rememberMe} onValueChange={setRememberMe} />
              <Text style={styles.rememberText}>Remember me</Text>
            </View>
            <Pressable>
              <Text style={styles.helperLink}>Forgot?</Text>
            </Pressable>
          </View>

          <Pressable style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log in</Text>
          </Pressable>

          <View style={styles.inlineInfo}>
            <Text style={styles.inlineInfoText}>This is a starter screen for the mobile auth flow.</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EEF2FF",
  },
  screen: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: "space-between",
    backgroundColor: "#EEF2FF",
  },
  backLink: {
    alignSelf: "flex-start",
    color: "#374151",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 18,
  },
  title: {
    color: "#0F172A",
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "800",
  },
  subtitle: {
    marginTop: 10,
    color: "#475569",
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 300,
  },
  formCard: {
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    padding: 24,
    gap: 18,
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "700",
  },
  input: {
    height: 54,
    borderRadius: 18,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 16,
    color: "#0F172A",
    fontSize: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rememberText: {
    color: "#475569",
    fontSize: 14,
  },
  helperLink: {
    color: "#1D4ED8",
    fontSize: 14,
    fontWeight: "700",
  },
  loginButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "#1D4ED8",
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  inlineInfo: {
    borderRadius: 18,
    backgroundColor: "#EFF6FF",
    padding: 14,
  },
  inlineInfoText: {
    color: "#1E3A8A",
    fontSize: 13,
    lineHeight: 18,
  },
});
