## 2023-11-20 - [ARIA Attributes and Forms Labels]
**Learning:** Found multiple instances where labels were disconnected from input fields because `htmlFor` and `id` were missing, especially in date inputs. Found icon-only buttons (like settings and close modal) lacking `aria-label`.
**Action:** When adding new input fields, always link labels via `htmlFor` to the input `id`. When creating buttons without text, always add an `aria-label`.

## 2024-03-30 - [Missing Keyboard Focus States]
**Learning:** By default, interactive elements like inputs and buttons lacked visible focus indicators when navigating using the keyboard, leading to poor keyboard accessibility across the application.
**Action:** Ensure all interactive elements consistently use `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background` to provide clear focus states for keyboard users.