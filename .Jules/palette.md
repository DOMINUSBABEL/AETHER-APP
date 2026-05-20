## 2023-11-20 - [ARIA Attributes and Forms Labels]
**Learning:** Found multiple instances where labels were disconnected from input fields because `htmlFor` and `id` were missing, especially in date inputs. Found icon-only buttons (like settings and close modal) lacking `aria-label`.
**Action:** When adding new input fields, always link labels via `htmlFor` to the input `id`. When creating buttons without text, always add an `aria-label`.

## 2026-04-01 - [Keyboard Navigation Focus States]
**Learning:** Found widespread absence of explicit `focus-visible` states across all interactive elements (buttons, inputs). Navigating via keyboard currently leaves users unaware of which element is focused.
**Action:** Always include keyboard focus indicators using the standard utility combination `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary` for elements (with `focus-visible:ring-offset-2 focus-visible:ring-offset-background` if needed against complex backgrounds).

## 2025-02-28 - [Escape Key Exit in Custom Modals]
**Learning:** Custom modal components often overlook the standard expected behavior of allowing users to dismiss them via the `Escape` key, trapping keyboard users or forcing mouse interaction.
**Action:** Whenever implementing a custom modal or overlay, always add a window-level keydown event listener to handle the `Escape` key and trigger the component's close function.## 2023-11-20 - [ARIA Pressed states on Toggles]\n**Learning:** Found several instances of custom segmented controls and toggle buttons (language selection, deck selection, spread type) that visually indicated active state via classes but lacked semantic ARIA attributes, leaving screen reader users unaware of the selected option.\n**Action:** Always add `aria-pressed={isActive}` to custom toggle buttons or segmented control options to ensure their active state is properly communicated to assistive technologies.

## 2024-05-20 - Accessible Custom Horizontally Scrollable Selectors
**Learning:** For custom visual "selectors" or horizontal lists (like the Zodiac signs ribbon) that communicate state visually but are not native interactive inputs, applying `aria-hidden` or marking them as "Visual Only" breaks accessibility. Furthermore, purely visual indicators of current state are invisible to screen readers.
**Action:** Always provide a `tabIndex={0}` to horizontally scrollable areas to make the *scroll* action accessible to keyboard users (along with `focus-visible` styles). Furthermore, explicitly mark up the items with `role="list"` and `role="listitem"`, and indicate the currently selected item using `aria-current="true"` so screen readers convey the state that sighted users glean from visual styling.
