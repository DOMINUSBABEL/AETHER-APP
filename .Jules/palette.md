## 2023-11-20 - [ARIA Attributes and Forms Labels]
**Learning:** Found multiple instances where labels were disconnected from input fields because `htmlFor` and `id` were missing, especially in date inputs. Found icon-only buttons (like settings and close modal) lacking `aria-label`.
**Action:** When adding new input fields, always link labels via `htmlFor` to the input `id`. When creating buttons without text, always add an `aria-label`.

## 2026-04-01 - [Keyboard Navigation Focus States]
**Learning:** Found widespread absence of explicit `focus-visible` states across all interactive elements (buttons, inputs). Navigating via keyboard currently leaves users unaware of which element is focused.
**Action:** Always include keyboard focus indicators using the standard utility combination `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary` for elements (with `focus-visible:ring-offset-2 focus-visible:ring-offset-background` if needed against complex backgrounds).

## 2025-02-28 - [Escape Key Exit in Custom Modals]
**Learning:** Custom modal components often overlook the standard expected behavior of allowing users to dismiss them via the `Escape` key, trapping keyboard users or forcing mouse interaction.
**Action:** Whenever implementing a custom modal or overlay, always add a window-level keydown event listener to handle the `Escape` key and trigger the component's close function.## 2023-11-20 - [ARIA Pressed states on Toggles]\n**Learning:** Found several instances of custom segmented controls and toggle buttons (language selection, deck selection, spread type) that visually indicated active state via classes but lacked semantic ARIA attributes, leaving screen reader users unaware of the selected option.\n**Action:** Always add `aria-pressed={isActive}` to custom toggle buttons or segmented control options to ensure their active state is properly communicated to assistive technologies.

## 2024-05-18 - [Accessibility] Zodiac Selector
**Learning:** Custom horizontally scrollable visual selectors (like the Zodiac signs list) are completely opaque to keyboard and screen-reader users unless specifically instrumented.
**Action:** When implementing custom horizontal scrolling lists, apply `tabIndex={0}` to the container along with `focus-visible` outline styles, assign `role="list"` to the container and `role="listitem"` to children, and dynamically use `aria-current="true"` to denote the active selection.

## 2024-06-08 - Keyboard Accessibility and Semantic Roles for Horizontal Visual Lists
**Learning:** For custom visual lists that scroll horizontally (like the Zodiac Tracker in DailyScreen), users rely on explicit keyboard focus (`tabIndex={0}`) and screen readers require semantic groupings (`role="list"`, `role="listitem"`, and `aria-current="true"` on the active item). Without these, the list is effectively invisible to keyboard and screen reader users since it's just `div` elements.
**Action:** When implementing custom visual selectors or horizontally scrollable lists, always apply `tabIndex={0}` and Tailwind focus classes to the container, and use explicit `list`/`listitem` roles coupled with `aria-current` to convey state.
