# react-dev-marker

A **super simple** React component that visually marks work-in-progress UI elements. Wrap any component to show a red dashed border with a "DEV" label - no more explaining what's not ready yet during demos or code reviews.

Perfect for marking non-functional buttons, blocked features, or anything waiting for implementation. **Optionally** add a title to explain the status and/or a link to the relevant Slack thread, JIRA ticket, or Figma design.

**Zero dependencies** - only React as a peer dependency.

## Installation

```bash
yarn add react-dev-marker
```
or
```bash
npm install react-dev-marker
```
or
```bash
pnpm install react-dev-marker
```

## Usage

```tsx
import DevMarker from 'react-dev-marker';

// Basic usage
<DevMarker>
  <MyComponent />
</DevMarker>

// With title
<DevMarker title="Header">
  <Header />
</DevMarker>

// Block display
<DevMarker title="Sidebar" isBlock>
  <Sidebar />
</DevMarker>

// With link to JIRA/Slack
<DevMarker title="Fix layout" link="https://jira.example.com/browse/PROJ-123">
  <BuggyComponent />
</DevMarker>

// Portal mode (for overflow:hidden parents)
<DevMarker usePortal>
  <ClippedContent />
</DevMarker>
```

## Why use DevMarker?

When demoing or testing an app with clients or teammates, you often need to explain what's work-in-progress. Instead of verbal explanations, just wrap components with DevMarker:

**Non-functional buttons:**
```tsx
<DevMarker title="Not implemented yet">
  <Button>Export PDF</Button>
</DevMarker>
```

**Blocked features:**
```tsx
<DevMarker title="Blocked by backend" link="https://yourteam.slack.com/archives/...">
  <UserSettingsForm />
</DevMarker>
```

**Waiting for design:**
```tsx
<DevMarker title="Waiting for design" link="https://figma.com/file/...">
  <PlaceholderCard />
</DevMarker>
```

This way, everyone instantly sees what's in development and can click through to relevant discussions or tickets.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | The content to wrap |
| `title` | `string` | - | Optional label shown after "DEV:" |
| `isBlock` | `boolean` | `false` | If true, renders as block element |
| `usePortal` | `boolean` | `false` | Renders tab via Portal (for overflow:hidden parents) |
| `link` | `string` | - | Optional URL shown as clickable "↗" |

## License

MIT
