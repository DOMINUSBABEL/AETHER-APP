## 2023-11-20 - [ARIA Attributes and Forms Labels]
**Learning:** Found multiple instances where labels were disconnected from input fields because `htmlFor` and `id` were missing, especially in date inputs. Found icon-only buttons (like settings and close modal) lacking `aria-label`.
**Action:** When adding new input fields, always link labels via `htmlFor` to the input `id`. When creating buttons without text, always add an `aria-label`.

## 2024-03-23 - Focus States for Accessibility
**Learning:** Many interactive elements lacked `focus-visible` styling, making keyboard navigation difficult for users who depend on tab order. This is a common pattern in custom UI components.
**Action:** Added `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none` across multiple components to provide clear visual feedback during keyboard navigation.
