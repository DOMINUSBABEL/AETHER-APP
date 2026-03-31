## 2023-11-20 - [ARIA Attributes and Forms Labels]
**Learning:** Found multiple instances where labels were disconnected from input fields because `htmlFor` and `id` were missing, especially in date inputs. Found icon-only buttons (like settings and close modal) lacking `aria-label`.
**Action:** When adding new input fields, always link labels via `htmlFor` to the input `id`. When creating buttons without text, always add an `aria-label`.
## 2024-05-20 - [Keyboard Focus Indicators for Navigation]
**Learning:** Custom navigation components (like mobile and desktop nav items, as well as standalone buttons like Settings) often lack explicit focus styles in Tailwind apps, making them invisible to keyboard users when navigating via Tab. Relying solely on hover states limits accessibility.
**Action:** When creating custom interactive elements, consistently apply `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary` to ensure they are visible during keyboard navigation. For elements on complex backgrounds, include offset utilities like `focus-visible:ring-offset-2 focus-visible:ring-offset-background`.
