import { useState, useRef } from "react";

export default function JavaRunner() {
  const [code, setCode] = useState(
`import java.util.*;
public class Main {
  public static void main(String[] args){
    Scanner sc = new Scanner(System.in);
    System.out.println("Hello " + (sc.hasNext()? sc.next(): "World"));
  }
}`
  );
  const [stdin, setStdin] = useState("Zain");
  const [stdout, setStdout] = useState("");
  const [stderr, setStderr] = useState("");
  const [running, setRunning] = useState(false);
  const abortRef = useRef(null);

  const run = async () => {
    if (running && abortRef.current) abortRef.current.abort();
    setRunning(true); setStdout(""); setStderr("");

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("http://localhost:8080/api/run-java", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, stdin }),
        signal: controller.signal
      });
      const data = await res.json();
      if (!res.ok) setStderr(data.error || "Request failed");
      else { setStdout(data.stdout || ""); setStderr(data.stderr || ""); }
    } catch (e) {
      setStderr(e.name === "AbortError" ? "Cancelled." : String(e));
    } finally {
      setRunning(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "24px auto", padding: 16, display: "grid", gap: 12 }}>
      <h2>Java Runner</h2>
      <textarea rows={16} value={code} onChange={(e)=>setCode(e.target.value)}
        style={{ width:"100%", fontFamily:"ui-monospace, Menlo, monospace" }} />
      <input value={stdin} onChange={(e)=>setStdin(e.target.value)} placeholder="stdin"
        style={{ width:"100%", padding:8 }} />
      <button onClick={run} disabled={running}>{running ? "Running..." : "Run"}</button>
      <div><strong>STDOUT</strong><pre style={{whiteSpace:"pre-wrap"}}>{stdout}</pre></div>
      <div><strong>STDERR</strong><pre style={{whiteSpace:"pre-wrap"}}>{stderr}</pre></div>
    </div>
  );
}
