## 2023-11-20 - [ARIA Attributes and Forms Labels]
**Learning:** Found multiple instances where labels were disconnected from input fields because `htmlFor` and `id` were missing, especially in date inputs. Found icon-only buttons (like settings and close modal) lacking `aria-label`.
**Action:** When adding new input fields, always link labels via `htmlFor` to the input `id`. When creating buttons without text, always add an `aria-label`.

## 2026-03-26 - Keyboard Focus Visibility on Custom Buttons
**Learning:** In heavily styled custom interfaces (especially dark mode/glassmorphism), the default browser focus outlines are often removed or invisible against the background, making keyboard navigation completely opaque to screen reader and keyboard-only users.
**Action:** Consistently apply explicit `focus-visible` utility classes (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`) to all custom interactive elements (`button`, `a`, etc.). For buttons on complex backgrounds, use `focus-visible:ring-offset-2 focus-visible:ring-offset-background` to ensure the focus ring stands out.