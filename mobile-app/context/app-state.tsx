import {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

export type PlanName = "Basic" | "Standard" | "Premium";
export type PlatformName = "Swiggy" | "Zomato" | "Blinkit" | "Zepto";
export type PayoutMethod = "UPI" | "Bank" | "Wallet";

type AppStateValue = {
  phone: string;
  setPhone: (value: string) => void;
  otp: string[];
  setOtpDigit: (index: number, value: string) => void;
  resetOtp: () => void;
  fullName: string;
  setFullName: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  platform: PlatformName;
  setPlatform: (value: PlatformName) => void;
  hoursWorked: number;
  setHoursWorked: (value: number) => void;
  weeklyEarnings: string;
  setWeeklyEarnings: (value: string) => void;
  selectedPlan: PlanName;
  setSelectedPlan: (value: PlanName) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (value: boolean) => void;
  payoutMethod: PayoutMethod;
  cyclePayoutMethod: () => void;
  verificationResentAt: number | null;
  markVerificationResent: () => void;
  highlightedPastClaim: string | null;
  setHighlightedPastClaim: (value: string | null) => void;
  claimExpanded: boolean;
  toggleClaimExpanded: () => void;
  resetApp: () => void;
};

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: PropsWithChildren) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [fullName, setFullName] = useState("Rahul Kumar");
  const [city, setCity] = useState("Bangalore");
  const [platform, setPlatform] = useState<PlatformName>("Swiggy");
  const [hoursWorked, setHoursWorked] = useState(8);
  const [weeklyEarnings, setWeeklyEarnings] = useState("18000");
  const [selectedPlan, setSelectedPlan] = useState<PlanName>("Standard");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [payoutMethod, setPayoutMethod] = useState<PayoutMethod>("UPI");
  const [verificationResentAt, setVerificationResentAt] = useState<number | null>(null);
  const [highlightedPastClaim, setHighlightedPastClaim] = useState<string | null>(null);
  const [claimExpanded, setClaimExpanded] = useState(false);

  const value = useMemo<AppStateValue>(
    () => ({
      phone,
      setPhone,
      otp,
      setOtpDigit: (index, value) => {
        setOtp((current) =>
          current.map((digit, digitIndex) =>
            digitIndex === index ? value.replace(/[^0-9]/g, "").slice(0, 1) : digit
          )
        );
      },
      resetOtp: () => setOtp(["", "", "", ""]),
      fullName,
      setFullName,
      city,
      setCity,
      platform,
      setPlatform,
      hoursWorked,
      setHoursWorked: (value) => setHoursWorked(Math.min(16, Math.max(1, value))),
      weeklyEarnings,
      setWeeklyEarnings: (value) => setWeeklyEarnings(value.replace(/[^0-9]/g, "")),
      selectedPlan,
      setSelectedPlan,
      notificationsEnabled,
      setNotificationsEnabled,
      payoutMethod,
      cyclePayoutMethod: () =>
        setPayoutMethod((current) =>
          current === "UPI" ? "Bank" : current === "Bank" ? "Wallet" : "UPI"
        ),
      verificationResentAt,
      markVerificationResent: () => setVerificationResentAt(Date.now()),
      highlightedPastClaim,
      setHighlightedPastClaim,
      claimExpanded,
      toggleClaimExpanded: () => setClaimExpanded((current) => !current),
      resetApp: () => {
        setPhone("");
        setOtp(["", "", "", ""]);
        setFullName("Rahul Kumar");
        setCity("Bangalore");
        setPlatform("Swiggy");
        setHoursWorked(8);
        setWeeklyEarnings("18000");
        setSelectedPlan("Standard");
        setNotificationsEnabled(true);
        setPayoutMethod("UPI");
        setVerificationResentAt(null);
        setHighlightedPastClaim(null);
        setClaimExpanded(false);
      },
    }),
    [
      phone,
      otp,
      fullName,
      city,
      platform,
      hoursWorked,
      weeklyEarnings,
      selectedPlan,
      notificationsEnabled,
      payoutMethod,
      verificationResentAt,
      highlightedPastClaim,
      claimExpanded,
    ]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error("useAppState must be used inside AppStateProvider.");
  }

  return context;
}
