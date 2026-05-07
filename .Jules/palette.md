## 2023-11-20 - [ARIA Attributes and Forms Labels]
**Learning:** Found multiple instances where labels were disconnected from input fields because `htmlFor` and `id` were missing, especially in date inputs. Found icon-only buttons (like settings and close modal) lacking `aria-label`.
**Action:** When adding new input fields, always link labels via `htmlFor` to the input `id`. When creating buttons without text, always add an `aria-label`.

## 2026-04-01 - [Keyboard Navigation Focus States]
**Learning:** Found widespread absence of explicit `focus-visible` states across all interactive elements (buttons, inputs). Navigating via keyboard currently leaves users unaware of which element is focused.
**Action:** Always include keyboard focus indicators using the standard utility combination `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary` for elements (with `focus-visible:ring-offset-2 focus-visible:ring-offset-background` if needed against complex backgrounds).

## 2025-02-28 - [Escape Key Exit in Custom Modals]
**Learning:** Custom modal components often overlook the standard expected behavior of allowing users to dismiss them via the `Escape` key, trapping keyboard users or forcing mouse interaction.
**Action:** Whenever implementing a custom modal or overlay, always add a window-level keydown event listener to handle the `Escape` key and trigger the component's close function.## 2023-11-20 - [ARIA Pressed states on Toggles]\n**Learning:** Found several instances of custom segmented controls and toggle buttons (language selection, deck selection, spread type) that visually indicated active state via classes but lacked semantic ARIA attributes, leaving screen reader users unaware of the selected option.\n**Action:** Always add `aria-pressed={isActive}` to custom toggle buttons or segmented control options to ensure their active state is properly communicated to assistive technologies.

## 2025-05-18 - [Accessibility of Horizontally Scrollable Containers]
**Learning:** Found horizontally scrollable lists (like the DailyScreen Zodiac selector) that lacked keyboard accessibility. Keyboard users could not tab into the container to scroll it using arrow keys, and screen readers lacked semantic context for the list items.
**Action:** When creating custom horizontally scrollable selection areas, always apply `tabIndex={0}` to the container along with `focus-visible` utility classes. Additionally, use semantic list roles (`role="list"` and `role="listitem"`) and explicitly mark the active item using `aria-current="true"`.

## 2025-05-18 - [Hiding Decorative SVG/Graphic Elements]
**Learning:** Found complex, purely visual CSS/SVG graphics (like the SoulMapScreen abstract chart) that were needlessly parsed by screen readers, causing noise without providing context.
**Action:** Always apply `aria-hidden="true"` to purely decorative, abstract graphic wrappers that convey no functional or unique textual information.
