## 2023-11-20 - [ARIA Attributes and Forms Labels]
**Learning:** Found multiple instances where labels were disconnected from input fields because `htmlFor` and `id` were missing, especially in date inputs. Found icon-only buttons (like settings and close modal) lacking `aria-label`.
**Action:** When adding new input fields, always link labels via `htmlFor` to the input `id`. When creating buttons without text, always add an `aria-label`.
## 2026-03-28 - [Keyboard Accessibility on Navigation Shell]
**Learning:** Main navigation elements (`MobileNavItem`, `DesktopNavItem`, and the Header Settings button) completely lacked keyboard focus indicators, making the primary method of app navigation inaccessible to keyboard users. Since these elements sit on complex backgrounds, relying on default browser outlines is insufficient.
**Action:** Always add explicit Tailwind focus-visible classes (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background`) to interactive navigational elements to ensure clear, high-contrast focus states across different background contexts.
