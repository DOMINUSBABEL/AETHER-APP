## 2023-11-20 - [ARIA Attributes and Forms Labels]
**Learning:** Found multiple instances where labels were disconnected from input fields because `htmlFor` and `id` were missing, especially in date inputs. Found icon-only buttons (like settings and close modal) lacking `aria-label`.
**Action:** When adding new input fields, always link labels via `htmlFor` to the input `id`. When creating buttons without text, always add an `aria-label`.

## 2026-04-01 - [Keyboard Navigation Focus States]
**Learning:** Found widespread absence of explicit `focus-visible` states across all interactive elements (buttons, inputs). Navigating via keyboard currently leaves users unaware of which element is focused.
**Action:** Always include keyboard focus indicators using the standard utility combination `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary` for elements (with `focus-visible:ring-offset-2 focus-visible:ring-offset-background` if needed against complex backgrounds).

## 2025-02-28 - [Escape Key Exit in Custom Modals]
**Learning:** Custom modal components often overlook the standard expected behavior of allowing users to dismiss them via the `Escape` key, trapping keyboard users or forcing mouse interaction.
**Action:** Whenever implementing a custom modal or overlay, always add a window-level keydown event listener to handle the `Escape` key and trigger the component's close function.## 2023-11-20 - [ARIA Pressed states on Toggles]\n**Learning:** Found several instances of custom segmented controls and toggle buttons (language selection, deck selection, spread type) that visually indicated active state via classes but lacked semantic ARIA attributes, leaving screen reader users unaware of the selected option.\n**Action:** Always add `aria-pressed={isActive}` to custom toggle buttons or segmented control options to ensure their active state is properly communicated to assistive technologies.
## 2026-05-16 - Accessible Visual Selectors
**Learning:** Custom horizontally scrollable visual selectors often lack semantic meaning and keyboard focus. Applying list roles, tabIndex={0}, and aria-current ensures screen readers and keyboard users understand the active state without visual cues.
**Action:** Always apply role='list', role='listitem', tabIndex={0} on the container, and aria-current for active items on custom visual selectors.
