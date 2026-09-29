# Component Implementation Rule

When implementing designs from Figma, always check whether an element is an instance of one of the Figma components that has already been implemented in this project.

If a matching reusable component exists, use it. Do not recreate the component with page-specific Tailwind classes.

Treat the coded reusable components as the implementation of their corresponding Figma components. Figma instances should reuse those components with the appropriate content and variant props.

Only create a new component when the Figma design actually introduces a new component.

Component implementations will be added only when the first component is requested.
