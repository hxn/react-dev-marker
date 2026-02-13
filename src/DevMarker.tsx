import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const styles = {
  wrapper: {
    position: "relative",
    display: "inline-block",
  } as const,
  wrapperBlock: {
    position: "relative",
    display: "block",
  } as const,
  tab: {
    position: "absolute",
    top: -14,
    left: 0,
    backgroundColor: "#dc2626",
    color: "white",
    fontFamily: "system-ui, -apple-system, sans-serif",
    fontSize: 11,
    padding: "2px 4px",
    lineHeight: 1,
    zIndex: 1,
    whiteSpace: "nowrap",
  } as const,
  tabPortal: {
    position: "fixed",
    zIndex: 9999,
  } as const,
  devLabel: {
    fontWeight: 600,
  } as const,
  title: {
    fontWeight: 400,
  } as const,
  link: {
    color: "white",
    textDecoration: "none",
    marginLeft: 4,
    opacity: 0.85,
  } as const,
  content: {
    border: "1px dashed rgba(220, 38, 38, 0.65)",
  } as const,
};

export interface DevMarkerProps {
  /** The content to wrap */
  children: ReactNode;
  /** Optional label shown after "DEV:" (e.g., "DEV: MyComponent") */
  title?: string;
  /** If true, renders as block element (default: inline-block) */
  isBlock?: boolean;
  /** If true, renders the tab via React Portal to document.body. Use this when the parent has overflow:hidden that would clip the tab. */
  isPortal?: boolean;
  /** Optional URL (e.g., Slack thread, JIRA ticket) shown as a clickable "↗" next to the tab */
  link?: string;
}

/**
 * DevMarker - A super simple component that visually marks work-in-progress UI elements.
 *
 * Wrap any component to show a red dashed border with a "DEV" label - no more explaining
 * what's not ready yet during demos or code reviews.
 *
 * Perfect for marking non-functional buttons, blocked features, or anything waiting
 * for implementation. Optionally add a title and/or a link to relevant Slack thread,
 * JIRA ticket, or Figma design.
 *
 * @param children - The content to wrap
 * @param title - Optional label shown after "DEV:" (e.g., "DEV: Not implemented")
 * @param isBlock - If true, renders as block element (default: inline-block)
 * @param isPortal - If true, renders tab via Portal (for overflow:hidden parents)
 * @param link - Optional URL shown as clickable "↗" next to the tab
 * @returns Wrapped element with red dashed border and DEV tab
 */
export function DevMarker({
  children,
  title,
  isBlock,
  isPortal,
  link,
}: DevMarkerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [tabPosition, setTabPosition] = useState({ top: 0, left: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    const element = wrapperRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    setTabPosition({
      top: rect.top - 14,
      left: rect.left,
    });
  }, []);

  useEffect(() => {
    if (!isPortal || !isMounted || !wrapperRef.current) return;

    let rafId = 0;
    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updatePosition);
    };

    updatePosition();
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", handleResize, { passive: true, capture: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize, { capture: true });
      cancelAnimationFrame(rafId);
    };
  }, [isPortal, isMounted, updatePosition]);

  const tab = (
    <div
      data-testid="dev-marker-tab"
      style={
        isPortal
          ? {
              ...styles.tab,
              ...styles.tabPortal,
              top: tabPosition.top,
              left: tabPosition.left,
            }
          : styles.tab
      }
    >
      <span style={styles.devLabel}>DEV</span>
      {title && <span style={styles.title}>: {title}</span>}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          title={link}
          style={styles.link}
        >
          ↗
        </a>
      )}
    </div>
  );

  return (
    <div
      ref={wrapperRef}
      data-testid="dev-marker-wrapper"
      style={isBlock ? styles.wrapperBlock : styles.wrapper}
    >
      {isPortal && isMounted ? createPortal(tab, document.body) : tab}
      <div data-testid="dev-marker-content" style={styles.content}>
        {children}
      </div>
    </div>
  );
}

export default DevMarker;
