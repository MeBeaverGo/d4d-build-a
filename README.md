# Sixth Ward Tool Library

`Stephen DeLeon`

A three-screen static site for a neighborhood tool lending library. Members browse the catalog, open a tool, and place a hold for pickup.

Built for Designing for Development, Build A. The design and the specification were provided. The build is mine.

---

## What is here

```
SPEC.md             The build specification. Build against this.
index.html          Screen 1: Catalog
tool.html           Screen 2: Tool detail
confirmation.html   Screen 3: Hold confirmation
src/input.css       Provided theme. Design tokens live here.
dist/styles.css     Compiled Tailwind. Generated, and committed so a host can serve it.
figma-variables.json Figma variable library export; the source of truth for the theme tokens.
data/tools.json     Provided catalog data. Ten records, one of them retired.
images/             Category icons, one per category
```

The JavaScript does not exist yet. Filtering, rendering, and the hold flow are yours to direct.

## Running it locally

You need Node.js 20 or newer. Check with `node --version`.

Install once:

```
npm install
```

Then start working:

```
npm run dev
```

That runs two things together: Tailwind, which rebuilds `dist/styles.css` every time a file changes, and a local server. Open http://localhost:3000 in your browser. Leave the terminal running while you work. Press Ctrl+C in the terminal to stop it.

Open the site through that address rather than double-clicking `index.html`. The pages load `data/tools.json` with `fetch`, and browsers block that for files opened directly.

## AI-Assisted Development Process

This project was built primarily with **GitHub Copilot in Visual Studio Code**, with a Figma file serving as the source of truth for the design. I used additional tools and files to give Copilot more direct access to the original Figma structure, components, and design variables rather than relying entirely on screenshots or written descriptions.

### Connecting Figma to Copilot

I began by setting up the Figma MCP configuration through an `mcp.json` file. This allowed me to select frames or components in Figma and provide them directly to Copilot in Visual Studio Code.

I found this much more reliable than using screenshots alone. Instead of asking the AI to visually interpret an image of the design, the Figma MCP gave it access to more detailed information about the selected design elements.

### Exporting Figma Variables

I also wanted Copilot to have access to the exact variables used in the Figma file, including:

- Colors
- Spacing
- Border radii
- Type sizes

With the help of ChatGPT, I created a small Figma plugin that collected the variables from the Figma file and exported them into a file named:

`figma-variables.json`

I then added this file to the project so Copilot could reference the actual design values while implementing the site.

This was added after Copilot had already created an initial version of the **Catalog / Desktop 1440** screen. After seeing the first implementation, I decided it would be better to establish the design variables and reusable components before continuing with the remaining screens.

### Building Reusable Components

Using the Figma MCP, I worked with Copilot to identify and implement the component sets from the Figma design as reusable components in the codebase.

During this process, I created a project documentation file named:

`COMPONENTS.md`

This file gives the AI additional instructions for working with the project's components. One of the main rules is:

> When implementing designs from Figma, always check whether an element is an instance of one of the Figma components that has already been implemented in this project.

The goal was to prevent Copilot from rebuilding the same UI elements independently on different pages and to make future component additions easier.

This appeared to work well throughout the remainder of the build. As more screens were implemented, Copilot was generally able to reuse the components that had already been created.

### Building and Refining the Screens

After the variables and component structure were established, the remaining development consisted largely of having Copilot implement each Figma screen and then iterating on the results.

Most screens required at least some adjustments before they accurately reflected the Figma design. These changes included layout, spacing, typography, component usage, and other smaller visual details.

I also used the Figma MCP to compare the coded version of each completed screen against the original Figma design. I completed this comparison at least once for each finished screen and used the results to find and correct smaller inconsistencies.

### Background and Surface Color Issue

One issue that required several iterations involved the site's background and surface colors.

The design uses two important surface colors:

- Shared surface color: `#FBFAF7`, stored in `--color-surface`
- White surfaces: `#FFFFFF`, used for certain page backgrounds, raised cards, and content areas

Initially, Copilot changed the shared `--color-surface` variable when I was trying to make specific areas of the site white. That was not the intended behavior because `--color-surface` needed to remain `#FBFAF7`.

After several prompts and checks, the issue was narrowed down to where the background color was being applied. Instead of changing the shared variable, the white background was moved to the appropriate page-level `body` and `main` elements.

The confirmation page required an additional correction after I found that its `main` element was still using `bg-surface`.

After the corrections:

- `--color-surface` remained `#FBFAF7`
- The required page backgrounds used `#FFFFFF`
- The catalog and confirmation pages displayed correctly
- The Tailwind CSS was rebuilt successfully

A reusable Tailwind utility named `page-base` was also added so the correct page-level styling could be applied consistently.

This issue took a few iterations with Copilot before the intended relationship between the shared surface variable and the white page backgrounds was understood correctly.

### Separating Copilot Conversations

I also tried to keep different types of development work inside separate Copilot chat sessions.

For example, implementing the reusable component sets and building the confirmation page were handled in separate conversations.

This helped keep each conversation focused on the relevant context and reduced the chance of unrelated instructions affecting other parts of the project. It also reduced the amount of project context that needed to be repeatedly explained.

### Specification Decisions

The original specification left two behaviors open to interpretation: the waitlist behavior and the catalog's sorting order.

For the **waitlist**, I decided to follow the behavior already established by the confirmation page while adjusting the content and button behavior for the waitlist context.

For the **catalog sort order**, I decided to preserve the ordering of the tool cards shown in the original Figma design.

Both decisions were initially suggested by Copilot based on the surrounding project context, and I chose to use those approaches for the final implementation.

### Local vs. Deployed Build

After the project was deployed, I checked the deployed version against the version I had been running locally.

I did not encounter any issues that worked locally but failed after deployment. Everything that was functioning in the local build continued to function in the deployed version.

