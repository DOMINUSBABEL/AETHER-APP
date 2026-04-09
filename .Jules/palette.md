## 2023-11-20 - [ARIA Attributes and Forms Labels]
**Learning:** Found multiple instances where labels were disconnected from input fields because `htmlFor` and `id` were missing, especially in date inputs. Found icon-only buttons (like settings and close modal) lacking `aria-label`.
**Action:** When adding new input fields, always link labels via `htmlFor` to the input `id`. When creating buttons without text, always add an `aria-label`.

## 2026-04-01 - [Keyboard Navigation Focus States]
**Learning:** Found widespread absence of explicit `focus-visible` states across all interactive elements (buttons, inputs). Navigating via keyboard currently leaves users unaware of which element is focused.
**Action:** Always include keyboard focus indicators using the standard utility combination `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary` for elements (with `focus-visible:ring-offset-2 focus-visible:ring-offset-background` if needed against complex backgrounds).

## 2025-02-28 - [Escape Key Exit in Custom Modals]
**Learning:** Custom modal components often overlook the standard expected behavior of allowing users to dismiss them via the `Escape` key, trapping keyboard users or forcing mouse interaction.
**Action:** Whenever implementing a custom modal or overlay, always add a window-level keydown event listener to handle the `Escape` key and trigger the component's close function.
## 2026-04-09 - [Dynamic ARIA states on custom React components]
**Learning:** For dynamic accessible state, such as custom UI segmented toggles or active navigation links, traditional classes are visually useful but not announced properly. Screen readers require the explicit dynamic `aria-pressed` or `aria-current` attributes to bind the visual active state with screen reader feedback.
**Action:** Consistently utilize dynamically evaluated `aria-current={isActive ? 'page' : undefined}` for navigation links and `aria-pressed={isActive}` for UI button toggles when styling them natively instead of using standard semantic input elements.
