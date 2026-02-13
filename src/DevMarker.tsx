import { useRef, useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

const styles = {
  wrapper: {
    position: 'relative',
    display: 'inline-block',
  } as const,
  wrapperBlock: {
    display: 'block',
  } as const,
  tab: {
    position: 'absolute',
    top: -14,
    left: 0,
    backgroundColor: '#dc2626',
    color: 'white',
    fontSize: 11,
    padding: '2px 4px',
    lineHeight: 1,
    zIndex: 1,
    whiteSpace: 'nowrap',
  } as const,
  tabPortal: {
    zIndex: 9999,
  } as const,
  devLabel: {
    fontWeight: 600,
  } as const,
  title: {
    fontWeight: 400,
  } as const,
  link: {
    color: 'white',
    textDecoration: 'none',
    marginLeft: 4,
    opacity: 0.7,
  } as const,
  linkHover: {
    opacity: 1,
  } as const,
  content: {
    border: '1px dashed rgba(220, 38, 38, 0.75)',
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
export function DevMarker({ children, title, isBlock, isPortal, link }: DevMarkerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [tabPosition, setTabPosition] = useState({ top: 0, left: 0 });
  const [linkHovered, setLinkHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isPortal || !isMounted || !wrapperRef.current) return;

    const updatePosition = () => {
      const rect = wrapperRef.current!.getBoundingClientRect();
      setTabPosition({
        top: rect.top + window.scrollY - 14,
        left: rect.left + window.scrollX,
      });
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isPortal, isMounted]);

  const tab = (
    <div
      style={{
        ...styles.tab,
        ...(isPortal && { ...styles.tabPortal, top: tabPosition.top, left: tabPosition.left }),
      }}
    >
      <span style={styles.devLabel}>DEV</span>
      {title && <span style={styles.title}>: {title}</span>}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          title={link}
          style={{ ...styles.link, ...(linkHovered && styles.linkHover) }}
          onMouseEnter={() => setLinkHovered(true)}
          onMouseLeave={() => setLinkHovered(false)}
        >
          ↗
        </a>
      )}
    </div>
  );

  return (
    <div ref={wrapperRef} style={{ ...styles.wrapper, ...(isBlock && styles.wrapperBlock) }}>
      {isPortal && isMounted ? createPortal(tab, document.body) : tab}
      <div style={styles.content}>{children}</div>
    </div>
  );
}

export default DevMarker;
