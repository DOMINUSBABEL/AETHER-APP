## 2023-11-20 - [ARIA Attributes and Forms Labels]
**Learning:** Found multiple instances where labels were disconnected from input fields because `htmlFor` and `id` were missing, especially in date inputs. Found icon-only buttons (like settings and close modal) lacking `aria-label`.
**Action:** When adding new input fields, always link labels via `htmlFor` to the input `id`. When creating buttons without text, always add an `aria-label`.

## 2023-11-22 - [Keyboard Accessibility and Focus States]
**Learning:** Most interactive elements (buttons, nav items) lacked visible focus states when navigating via keyboard, making the app difficult to use without a mouse.
**Action:** Consistently apply `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary` to all interactive elements. Use `focus-visible:ring-offset-2 focus-visible:ring-offset-background` when the element is on a complex background to ensure the ring is visible. Add padding or `rounded-xl` to tight elements like `MobileNavItem` so the ring is spaced well.