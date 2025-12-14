import { useState } from "preact/hooks";
import { api } from "@/util/api";
import { setToken } from "@/util/auth";
import { useNavigate } from "react-router-dom";

type StartResp = { ok: boolean };
type VerifyResp = { ok: boolean; token: string; userId: string };

export default function PhoneLogin() {
  const nav = useNavigate();
  const [phone, setPhone] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"start" | "verify">("start");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function start() {
    setErr("");
    setBusy(true);
    try {
      await api<StartResp>("/auth/start", { method: "POST", body: { phone } });
      setStep("verify");
    } catch (e: any) {
      setErr(e.message || "Failed to send code");
    } finally {
      setBusy(false);
    }
  }

  async function verify() {
    setErr("");
    setBusy(true);
    try {
      const resp = await api<VerifyResp>("/auth/verify", {
        method: "POST",
        body: { phone, code, displayName: displayName || undefined },
      });
      setToken(resp.token);
      nav("/app");
    } catch (e: any) {
      setErr(e.message || "Failed to verify");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h1>AllGoodFam</h1>

      {step === "start" && (
        <>
          <p>Log in with your phone number (E.164 format).</p>
          <label>
            Phone (+15551234567)
            <input
              value={phone}
              onInput={(e) => setPhone((e.target as HTMLInputElement).value)}
              placeholder="+15551234567"
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </label>

          <label style={{ display: "block", marginTop: 12 }}>
            Display name (shown in missed check-in alerts)
            <input
              value={displayName}
              onInput={(e) => setDisplayName((e.target as HTMLInputElement).value)}
              placeholder="Bruce"
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </label>

          {err && <div style={{ color: "crimson", marginTop: 12 }}>{err}</div>}

          <button disabled={busy} onClick={start} style={{ marginTop: 16, padding: "10px 12px" }}>
            {busy ? "Sending..." : "Send code"}
          </button>
        </>
      )}

      {step === "verify" && (
        <>
          <p>Enter the code we texted to {phone}.</p>

          <label>
            Code
            <input
              value={code}
              onInput={(e) => setCode((e.target as HTMLInputElement).value)}
              placeholder="123456"
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </label>

          {err && <div style={{ color: "crimson", marginTop: 12 }}>{err}</div>}

          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button disabled={busy} onClick={() => setStep("start")} style={{ padding: "10px 12px" }}>
              Back
            </button>
            <button disabled={busy} onClick={verify} style={{ padding: "10px 12px" }}>
              {busy ? "Verifying..." : "Verify & continue"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
