import { DevMarker } from "react-dev-marker";

export default function App() {
  return (
    <div style={{ padding: 32, fontFamily: "sans-serif", display: "flex", flexDirection: "column", gap: 24 }}>
      <h1 style={{ margin: 0 }}>react-dev-marker sandbox</h1>

      <section>
        <h3>1. Basic (no props)</h3>
        <DevMarker>
          <div style={{ padding: 12, background: "#f0f0f0" }}>Wrapped element</div>
        </DevMarker>
      </section>

      <section>
        <h3>2. With title</h3>
        <DevMarker title="Not implemented">
          <button disabled style={{ padding: "8px 16px" }}>Submit</button>
        </DevMarker>
      </section>

      <section>
        <h3>3. With link</h3>
        <DevMarker title="JIRA-123" link="https://example.com/ticket/123">
          <div style={{ padding: 12, background: "#e0f0ff" }}>Feature waiting for backend</div>
        </DevMarker>
      </section>

      <section>
        <h3>4. isBlock</h3>
        <DevMarker title="Full-width section" isBlock>
          <div style={{ padding: 12, background: "#f5f0ff" }}>This section takes full width</div>
        </DevMarker>
      </section>

      <section>
        <h3>5. Inline inside text</h3>
        <p style={{ margin: 0 }}>
          Here is some regular text and{" "}
          <DevMarker title="WIP">
            <span style={{ background: "#fef9c3", padding: "2px 6px" }}>an unfinished inline element</span>
          </DevMarker>{" "}
          and the text continues.
        </p>
      </section>

      <section>
        <h3>6. Nested markers</h3>
        <DevMarker title="Outer" isBlock>
          <div style={{ padding: 16, background: "#fafafa" }}>
            Outer wrapper
            <div style={{ marginTop: 8 }}>
              <DevMarker title="Inner">
                <div style={{ padding: 12, background: "#fff0f0" }}>Inner element</div>
              </DevMarker>
            </div>
          </div>
        </DevMarker>
      </section>

      <section>
        <h3>7. isPortal (parent has overflow:hidden)</h3>
        <div style={{ overflow: "hidden", border: "2px solid #ccc", padding: 16, paddingTop: 28 }}>
          <DevMarker title="Portal tab" isPortal>
            <div style={{ padding: 12, background: "#f0fff0" }}>Tab rendered via portal outside overflow:hidden</div>
          </DevMarker>
        </div>
      </section>

      <section>
        <h3>8. Multiple markers side by side</h3>
        <div style={{ display: "flex", gap: 16 }}>
          <DevMarker title="Alpha">
            <div style={{ padding: 12, background: "#fff7ed" }}>Card A</div>
          </DevMarker>
          <DevMarker title="Beta">
            <div style={{ padding: 12, background: "#f0fdf4" }}>Card B</div>
          </DevMarker>
          <DevMarker>
            <div style={{ padding: 12, background: "#fdf4ff" }}>Card C</div>
          </DevMarker>
        </div>
      </section>
    </div>
  );
}
