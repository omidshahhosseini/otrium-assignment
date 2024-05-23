# Otrium App

## How to run the App?

To get the app running locally follow the below instructions:

- Clone the repository to your local machine.
- Install all the dependencies and run the app with the below command:

1. Ensure you have Node.js version 22.1.0 and npm version 10.7.0 installed.
2. Run `npm install` to install dependencies.
3. Execute `npm run start` to start the application.

### Folder Structure

```bash
src/
|-- components/                 # Global shared/reusable components
|   |-- base/                   #design system components
|   |-- [component directories] # Additional component directories
|-- constants/                  # Constants and configuration files
```

- **Components:** Reusable UI components.
- **Constants:** Stores constant values used throughout the application.

### Feature Overview

### 1. Hierarchical Category Tree Generation

- **Dynamic Tree Structure**: The app dynamically generates a tree structure from a flat list of categories using the `generateCategoryTree` function. This allows the app to handle various category hierarchies efficiently.

### 2. Category Selection Management

- **Individual Selection**: Users can select individual categories using checkboxes. The selection state is maintained in the `selectedCategories` state.
- **Select/Deselect All**: A button is provided to select or deselect all categories at once. This feature is managed by the `toggleSelectAll` function, which updates the selection state for all categories in the tree.

### 3. Category Expansion and Collapsing

- **Expandable/Collapsible Nodes**: Categories can be expanded or collapsed to show or hide their child categories. The expansion state is tracked in the `expandedCategories` state.
- **Recursive Expansion**: The app supports recursive expansion, meaning that expanding a category node will also allow access to expand its child nodes.

### 4. Visual Representation of Categories

- **Tree View**: Categories are displayed in a tree view format, making it easy to visualize parent-child relationships.
- **Checkboxes**: Each category is associated with a checkbox, allowing for easy selection and deselection.
- **Label Click Expansion**: Clicking on a category label toggles the expansion state, showing or hiding child categories.

### 5. Selected Categories Display

- **List of Selected Categories**: The app provides a list of currently selected categories, displayed at the bottom of the interface. This list updates in real-time as categories are selected or deselected.

### 6. User Interface Components

- **Button Component**: The `Button` component is used for actions like selecting or deselecting all categories.
- **Checkbox Component**: The `Checkbox` component is used for individual category selection.
- **CategoryItem Component**: The `CategoryItem` component is a reusable component for rendering each category in the tree, handling its selection and expansion states.

### Technical Implementation Details

- **State Management**: The app uses React's `useState` and `useEffect` hooks for managing state and side effects.
- **Recursive Rendering**: The `CategoryItem` component uses recursion to render child categories, making the component tree reflective of the category hierarchy.
- **Efficient Updates**: The app efficiently updates the state for category selection and expansion, ensuring smooth and responsive interactions.

### Example Data Handling

- **Data Source**: The category data is sourced from a JSON file (`filters.json`), which contains the categories in a flat structure.
- **Initial Tree Generation**: On component mount, the app generates the category tree from the flat data and sets it in the state for rendering.

### Styling

- **CSS Styling**: The app uses a CSS file (`style.css`) for basic styling of the components, ensuring a clean and user-friendly interface.

### Planned Enhancements (Out of the time)

Although time limitations prevented the full implementation of these architectural decisions, the following plans were documented for future improvements:

- Writing unit tests to ensure the application displays the right elements and functions as expected, validating the correctness of data processing.
- Refactoring the import paths to improve organization and readability.
- Planning to integrate Husky to enforce code quality standards and run tests before pushing changes, ensuring that all files adhere to the correct format and pass tests before being committed.

Given more time, these enhancements would contribute to the overall quality and reliability of the application.
