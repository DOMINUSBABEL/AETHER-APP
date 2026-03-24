## 2024-03-24 - Accessibility improvements for icon buttons
**Learning:** Found multiple icon-only buttons missing aria-labels (like the settings close button, mobile nav items, etc.), which makes screen readers unable to announce their purpose.
**Action:** Always add descriptive `aria-label`s to `button`s that rely solely on icons for visual meaning.

## 2024-03-24 - Focus States and Keyboard Accessibility
**Learning:** Tailwind projects without default focus styles often leave keyboard users with no idea which element is currently active. The interactive elements lacked focus states natively. Redundant `aria-label`s can be an issue if text is already present.
**Action:** Consistently add `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary` (and offsets if needed) to interactive elements like buttons. Avoid adding `aria-label` when the element already contains visible text that a screen reader can read.
