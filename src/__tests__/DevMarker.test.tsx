import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { DevMarker } from '../DevMarker';
import DefaultExport from '../DevMarker';
import * as IndexExports from '../index';

describe('DevMarker', () => {
  describe('Rendering', () => {
    it('renders children', () => {
      render(<DevMarker>Hello World</DevMarker>);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('displays DEV label', () => {
      render(<DevMarker>content</DevMarker>);
      expect(screen.getByText('DEV')).toBeInTheDocument();
    });

    it('has dashed border on content', () => {
      render(<DevMarker>content</DevMarker>);
      const content = screen.getByTestId('dev-marker-content');
      expect(content.style.border).toBe('1px dashed rgba(220, 38, 38, 0.65)');
    });
  });

  describe('title prop', () => {
    it('does not show title when not provided', () => {
      render(<DevMarker>content</DevMarker>);
      const tab = screen.getByTestId('dev-marker-tab');
      expect(tab.textContent).toBe('DEV');
    });

    it('shows ": {title}" after DEV', () => {
      render(<DevMarker title="MyComponent">content</DevMarker>);
      const tab = screen.getByTestId('dev-marker-tab');
      expect(tab).toHaveTextContent('DEV: MyComponent');
    });
  });

  describe('link prop', () => {
    it('does not show link when not provided', () => {
      render(<DevMarker>content</DevMarker>);
      const tab = screen.getByTestId('dev-marker-tab');
      expect(within(tab).queryByRole('link')).not.toBeInTheDocument();
    });

    it('renders link with correct href, target, and rel', () => {
      render(<DevMarker link="https://example.com">content</DevMarker>);
      const link = within(screen.getByTestId('dev-marker-tab')).getByRole('link');
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('displays ↗ symbol', () => {
      render(<DevMarker link="https://example.com">content</DevMarker>);
      const link = within(screen.getByTestId('dev-marker-tab')).getByRole('link');
      expect(link).toHaveTextContent('↗');
    });
  });

  describe('isBlock prop', () => {
    it('defaults to inline-block', () => {
      render(<DevMarker>content</DevMarker>);
      const wrapper = screen.getByTestId('dev-marker-wrapper');
      expect(wrapper.style.display).toBe('inline-block');
    });

    it('renders as block when isBlock=true', () => {
      render(<DevMarker isBlock>content</DevMarker>);
      const wrapper = screen.getByTestId('dev-marker-wrapper');
      expect(wrapper.style.display).toBe('block');
    });
  });

  describe('isPortal prop', () => {
    it('renders tab inside wrapper by default', () => {
      render(<DevMarker>content</DevMarker>);
      const wrapper = screen.getByTestId('dev-marker-wrapper');
      const tab = within(wrapper).getByTestId('dev-marker-tab');
      expect(tab).toBeInTheDocument();
    });

    it('renders tab in document.body with isPortal', () => {
      render(<DevMarker isPortal>content</DevMarker>);
      const wrapper = screen.getByTestId('dev-marker-wrapper');
      expect(within(wrapper).queryByTestId('dev-marker-tab')).not.toBeInTheDocument();
      expect(screen.getByTestId('dev-marker-tab')).toBeInTheDocument();
    });

    it('uses fixed positioning for portal tab', () => {
      render(<DevMarker isPortal>content</DevMarker>);
      const tab = screen.getByTestId('dev-marker-tab');
      expect(tab.style.position).toBe('fixed');
    });
  });

  describe('Combinations', () => {
    it('renders with all props', () => {
      render(
        <DevMarker title="Test" isBlock isPortal link="https://example.com">
          Full featured
        </DevMarker>,
      );
      expect(screen.getByText('Full featured')).toBeInTheDocument();
      expect(screen.getByTestId('dev-marker-tab')).toHaveTextContent('DEV: Test');
      expect(screen.getByTestId('dev-marker-wrapper').style.display).toBe('block');
      expect(within(screen.getByTestId('dev-marker-tab')).getByRole('link')).toHaveAttribute(
        'href',
        'https://example.com',
      );
    });

    it('renders multiple independent DevMarkers', () => {
      render(
        <>
          <DevMarker title="First">One</DevMarker>
          <DevMarker title="Second">Two</DevMarker>
        </>,
      );
      expect(screen.getByText('One')).toBeInTheDocument();
      expect(screen.getByText('Two')).toBeInTheDocument();
      expect(screen.getAllByTestId('dev-marker-wrapper')).toHaveLength(2);
    });
  });

  describe('Exports', () => {
    it('has named export', () => {
      expect(DevMarker).toBeDefined();
      expect(typeof DevMarker).toBe('function');
    });

    it('has default export', () => {
      expect(DefaultExport).toBeDefined();
      expect(typeof DefaultExport).toBe('function');
    });

    it('named and default exports are the same', () => {
      expect(DevMarker).toBe(DefaultExport);
    });

    it('re-exports from index', () => {
      expect(IndexExports.DevMarker).toBe(DevMarker);
      expect(IndexExports.default).toBe(DevMarker);
    });
  });
});
