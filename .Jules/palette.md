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
## 2024-07-08 - Explicit Form Labels & Button Groups
**Learning:** React elements formatted as visual form labels (`<label>`) over non-input semantic groups (like button groups for language selection) are flagged by standard a11y tools as missing `htmlFor` attributes and they confuse screen readers. For proper a11y, horizontal toggle controls functioning as radio buttons should be wrapped in `role="group"` and labelled by `aria-labelledby` referencing a custom text element id, not an orphaned `<label>`. Also explicitly linking inputs to labels via `id`/`htmlFor` instead of just wrapping is safer for focus and screen reader detection.
**Action:** Replace parent-less `<label>` tags above generic groups (like div flex rows with multiple buttons) with standard `<div>` elements having an id, and wrap the internal container with `role="group" aria-labelledby="that-id"`. Always use explicit `id` and `htmlFor` for `<input>` elements.

## 2024-07-06 - Improve Form Controls and Scrollable Area Accessibility
**Learning:** For custom horizontal selectors or toggles designed to look like standard controls, using `role="group"` with an explicit `aria-labelledby` creates a clearer structure for screen readers than disconnected labels. Horizontally scrollable areas also must have `tabIndex={0}` to ensure keyboard-only users can navigate through the overflow content without relying on a mouse.
**Action:** Always wrap custom interactive groups in `role="group"` with proper labeling, and systematically apply `tabIndex={0}` with `focus-visible` styles to any container with `overflow-x-auto`.
## 2024-05-18 - Form Submission via Enter Key
**Learning:** Users often instinctively press 'Enter' to submit forms. If input fields are not wrapped in a `<form>` element, this expected behavior fails.
**Action:** Always wrap input fields in a `<form>` element with an `onSubmit` handler, use `type="submit"` on the primary action button, and explicitly set `type="button"` on secondary interactive elements (like toggle buttons) to prevent unintended form submissions.
