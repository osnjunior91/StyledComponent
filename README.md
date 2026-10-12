# React — Creating Customizable CSS with Styled Components

> A practical introduction to dynamic styling in React using **styled-components**.
>
> Originally published on [LinkedIn on July 10, 2019](https://www.linkedin.com/pulse/reactjs-criando-css-customiz%C3%A1vel-para-sua-aplica%C3%A7%C3%A3o-nicacio-junior/) by **Oswaldo da Silva Nicacio Junior**.

## Overview

Modern web applications often need flexible interfaces: colors, widths, fonts, and other visual properties may change according to user preferences or application state. One approach is to maintain several CSS classes; another is to define **reusable components whose styles depend on props**.

This tutorial demonstrates the second approach with React and the [`styled-components`](https://styled-components.com/) library. We will build a simple form that accepts a background color and width, then renders a box using those values.

## Why styled-components?

`styled-components` lets you write CSS in JavaScript and attach it to React components. Benefits include:

- **Dynamic styling:** compute CSS values from component props.
- **Maintainability:** keep styles close to the components that use them.
- **Scoped class names:** generated class names help prevent accidental CSS collisions.
- **Reusability:** use the same styled component with different configurations.

## Getting started

In an existing React application, install the dependency:

```bash
npm install styled-components
```

> **Historical note:** The original article (2019) uses React class components and `this.setState`. The examples below preserve that teaching approach with small corrections. Modern React projects commonly use function components and hooks instead.

## 1. Create the base CSS

Create `src/App.css`:

```css
.App {
  text-align: center;
  margin-top: 150px;
}

.Color,
.Width {
  padding: 5px;
}

form {
  margin: 0 auto;
  width: 400px;
  max-width: 90%;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 1em;
}

label {
  display: inline-block;
  width: 90px;
  text-align: right;
}

input {
  padding: 2px;
  font: 1em sans-serif;
  width: 300px;
  max-width: 100%;
  box-sizing: border-box;
  border: 1px solid #999;
}

.Action {
  padding-left: 90px;
}
```

The form uses ordinary CSS; the customizable box will use `styled-components`.

## 2. Define a styled component

Create `src/style.js`:

```jsx
import styled from 'styled-components';

export const Container = styled.div`
  margin: 100px auto;
  border: 1px solid #ccc;
  border-radius: 1em;
  background-color: ${({ color }) => color};
  width: ${({ width }) => width}px;
  height: 200px;
`;
```

The `${...}` expressions read the `color` and `width` props. For example, `<Container color="#00aaff" width={400} />` renders a 400-pixel-wide box with a blue background.

## 3. Build the interactive form

Create or update `src/App.js`:

```jsx
import React, { Component } from 'react';
import { Container } from './style';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#00aaff',
      width: '400',
      appliedColor: null,
      appliedWidth: null,
    };
    this.alterDiv = this.alterDiv.bind(this);
  }

  alterDiv(event) {
    event.preventDefault();

    const { color, width } = this.state;
    const parsedWidth = Number(width);

    if (!/^#[0-9a-fA-F]{6}$/.test(color)) {
      alert('Enter a six-digit hex color, e.g. #00aaff');
      return;
    }

    if (!Number.isFinite(parsedWidth) || parsedWidth <= 0) {
      alert('Enter a positive width in pixels');
      return;
    }

    this.setState({
      appliedColor: color,
      appliedWidth: parsedWidth,
    });
  }

  render() {
    const { color, width, appliedColor, appliedWidth } = this.state;

    return (
      <div className="App">
        <form onSubmit={this.alterDiv}>
          <div className="Color">
            <label htmlFor="color">Box color:</label>
            <input
              id="color"
              type="text"
              value={color}
              onChange={(event) => this.setState({ color: event.target.value })}
              placeholder="#00aaff"
            />
          </div>
          <div className="Width">
            <label htmlFor="width">Width (px):</label>
            <input
              id="width"
              type="number"
              min="1"
              value={width}
              onChange={(event) => this.setState({ width: event.target.value })}
            />
          </div>
          <div className="Action">
            <button type="submit">Change style</button>
          </div>
        </form>

        {appliedColor !== null && (
          <Container color={appliedColor} width={appliedWidth} />
        )}
      </div>
    );
  }
}
```

### How it works

1. The form updates React state as the user types.
2. Submitting the form prevents the browser's default page reload.
3. The handler validates the inputs and saves the applied values in state.
4. React re-renders the component, passing the new values to `Container`.
5. `styled-components` generates the corresponding CSS.

The original example stored a React element directly in state (`div: <Container ... />`). This version instead stores **data** in state and renders the element declaratively, which is easier to maintain.

## 4. Try it

Enter the following values and click **Change style**:

| Setting | Example |
| --- | --- |
| Box color | `#00aaff` |
| Width | `400` pixels |

Try a different hex color or width and submit again. The same component will render with the new styles.

## Key React concepts

**State and rendering:** `setState` schedules a state update, which causes React to render the component again. It is better to store the values needed for rendering than to store the rendered JSX itself.

**Controlled inputs:** an input's `value` is read from state, while its `onChange` handler updates that state.

**Method binding:** class component methods used as event handlers may need binding in the constructor (`this.alterDiv = this.alterDiv.bind(this)`). Function components with hooks generally avoid this pattern.

## Project structure

```text
src/
├── App.css
├── App.js
├── style.js
└── index.js
```

## Conclusion

With `styled-components`, we can customize a React component by passing values through props instead of creating a separate CSS class for every variation. This example changes the background color and width, but the same idea applies to spacing, typography, borders, and other style properties.

This README is an English adaptation of my 2019 tutorial, with minor code corrections and explanatory updates.

## Original article and author

- **Author:** [Oswaldo da Silva Nicacio Junior](https://www.linkedin.com/in/oswaldodasilvanicaciojunior/)
- **Original article (Portuguese):** [React — Criando CSS customizável para sua aplicação](https://www.linkedin.com/pulse/reactjs-criando-css-customiz%C3%A1vel-para-sua-aplica%C3%A7%C3%A3o-nicacio-junior/)
- **Published:** July 10, 2019
