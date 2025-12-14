import { useState } from "preact/hooks";
import { VAPID_PUBLIC_KEY } from "@/config";
import { subscribeToPush } from "@/util/push";
import { api } from "@/util/api";

export default function PushSetup({ token }: { token: string }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function enable() {
    setMsg("");
    setBusy(true);
    try {
      const sub = await subscribeToPush(VAPID_PUBLIC_KEY);
      await api("/push/subscribe", { method: "POST", token, body: sub });
      setMsg("Push notifications enabled on this device ✅");
    } catch (e: any) {
      setMsg(`Failed: ${e.message || "unknown error"}`);
    } finally {
      setBusy(false);
    }
  }

  async function testPush() {
    setMsg("");
    setBusy(true);
    try {
      const r = await api<{ ok: boolean; results: Array<{ id: string; status: number }> }>(
        "/push/test",
        { method: "POST", token }
      );
      setMsg(`Sent. Statuses: ${r.results.map((x) => x.status).join(", ")}`);
    } catch (e: any) {
      setMsg(`Failed: ${e.message || "unknown error"}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ marginTop: 16, padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2>Notifications</h2>
      <p>Enable push notifications for missed check-ins.</p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button disabled={busy} onClick={enable} style={{ padding: "10px 12px" }}>
          {busy ? "Working..." : "Enable notifications"}
        </button>

        <button disabled={busy} onClick={testPush} style={{ padding: "10px 12px" }}>
          {busy ? "Working..." : "Send test push"}
        </button>
      </div>

      {msg && <div style={{ marginTop: 12 }}>{msg}</div>}
    </div>
  );
}
