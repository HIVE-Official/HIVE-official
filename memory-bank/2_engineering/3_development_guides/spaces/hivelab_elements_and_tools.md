# HiveLAB: Elements & Tools Architecture

*Read-me first: This document defines the technical architecture for the relationship between Elements (the building blocks) and Tools (the experiences). It serves as the single source of truth for the HiveLAB composer and rendering engine.*

## 1. Thesis & Core Analogy
The HiveLAB system is built on a simple analogy: If a Space is a room, and a Tool is a piece of Ikea furniture, then **Elements are the individual screws, panels, and dowels in the box.** The HIVE team manufactures the parts (Elements), but the Builder assembles them in HiveLAB to create the final piece of furniture (the Tool).

## 2. Architectural Principles

### Principle 1: Elements are Atomic & HIVE-Controlled
-   **Definition:** Elements are the lowest-level, indivisible components in the HIVE ecosystem. They are built, maintained, tested, and versioned *exclusively* by the HIVE core team.
-   **Function:** They are secure, performant, and accessible "Lego bricks" that we provide to Builders. We do not allow Builders to write or inject their own code.
-   **Examples:** `StaticText`, `ShortTextInput`, `ImagePicker`, `MultipleChoiceOption`, `SubmitButton`.

### Principle 2: A Tool is a Declarative JSON Definition
-   **Definition:** A Tool is not executable code. It is a declarative JSON object that describes a layout of configured Element instances.
-   **Function:** This JSON acts as a universal blueprint that can be rendered natively on any platform (Web, iOS, Android) by a platform-specific rendering engine that knows how to interpret the blueprint.
-   **Example `Pulse` Tool JSON:**
    ```json
    {
      "toolId": "tool_abc123",
      "name": "Class Pulse Check",
      "version": "1.0.0",
      "elements": [
        { 
          "id": "el_1", 
          "type": "StaticText", 
          "props": { "content": "How's the pace of the class so far?" } 
        },
        { 
          "id": "el_2", 
          "type": "MultipleChoice", 
          "props": { 
            "options": ["Too fast", "Just right", "Too slow"],
            "allowMultiple": false
          } 
        },
        { 
          "id": "el_3", 
          "type": "SubmitButton", 
          "props": { "label": "Vote", "triggers": ["submitPoll"] } 
        }
      ]
    }
    ```

### Principle 3: HiveLAB is the Visual Composer (IDE)
-   **Definition:** The HiveLAB composer is a web-based, visual, drag-and-drop interface for composing Tools.
-   **Function:** On the left, a Builder sees a library of available Elements. They drag them onto a canvas. On the right, a property inspector allows them to configure the `props` for the selected Element (e.g., changing the button label). When they hit "Save," the frontend generates the Tool's JSON definition. This makes tool creation accessible to non-technical Builders.

### Principle 4: Data Storage is Keyed to the Placed Tool Instance
-   **Definition:** When a user interacts with a Tool (e.g., they vote in a poll), the data is not stored on the base Tool definition. It is stored in a sub-collection on the *placed tool* document itself.
-   **Function:** This keeps all interaction data neatly organized under the specific instance of the tool it belongs to, making it easy to query, manage, and secure.
-   **Example Firestore Path for a Poll Response:** `/spaces/{spaceId}/placed_tools/{placedToolId}/responses/{userId}`.
-   The `responses` document would contain the user's selections, keyed by the element ID that generated them (e.g., `{ "el_2": "Just right" }`).

## 3. The vBETA Element Kit

This is the minimum set of Elements required to build the default Tool Palette for the semester-start launch.

### 3.1 Presentation Elements (Static)
-   **`StaticText`**: Displays a block of text.
    -   `props`: `content` (string), `align` ('left' | 'center' | 'right'), `size` ('small' | 'medium' | 'large').
-   **`StaticImage`**: Displays an image.
    -   `props`: `imageUrl` (string), `altText` (string).
-   **`Divider`**: A simple horizontal rule.
    -   `props`: `thickness` ('thin' | 'thick').

### 3.2 Input Elements (Interactive)
-   **`ShortTextInput`**: A single-line text input field.
    -   `props`: `label` (string), `placeholder` (string), `maxLength` (number).
-   **`LongTextInput`**: A multi-line text area.
    -   `props`: `label` (string), `placeholder` (string), `maxLength` (number).
-   **`MultipleChoice`**: A list of options (radio buttons or checkboxes).
    -   `props`: `label` (string), `options` (array of strings), `allowMultiple` (boolean).
-   **`ImagePicker`**: Allows a user to upload an image.
    -   `props`: `label` (string).

### 3.3 Action Elements (Triggers)
-   **`SubmitButton`**: The primary action trigger.
    -   `props`: `label` (string), `actionName` (string, e.g., "submitPoll").
-   **`LinkButton`**: Navigates to an external URL.
    -   `props`: `label` (string), `url` (string).

## 4. The Interaction Model: The "Action Bus" System

This model defines how interactive elements within a Tool communicate their data for submission.

1.  **State Aggregation:** The top-level Tool rendering component maintains an internal state object that holds the current value of all input elements within it, keyed by their unique element IDs. When a user types in a `ShortTextInput`, this state object is updated.
    -   *Example State:* `{ "el_input_1": "My answer", "el_mcq_2": "Option A" }`

2.  **Action Trigger:** The `SubmitButton` element does not have direct access to other elements. It only has one job: when clicked, it emits an event on a local "action bus" within the Tool renderer, passing its configured `actionName` and the renderer's current state object.
    -   *Example Emission:* `bus.emit('submitPoll', { "el_input_1": "My answer", ... })`

3.  **Backend Submission:** The Tool renderer has a single handler that listens for events on the action bus. This handler is responsible for taking the `actionName` and the data payload and making a single, validated call to a corresponding Cloud Function.
    -   *Example Handler Logic:* `case 'submitPoll': functions.call('handleToolSubmission', { placedToolId: '...', actionName: 'submitPoll', responseData: {...} })`

This model is secure, scalable, and simple. It avoids complex inter-element communication, centralizes submission logic, and ensures a clean, auditable path from user input to backend storage. 