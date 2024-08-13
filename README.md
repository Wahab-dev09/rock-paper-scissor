# Rock-Paper-Scissors Game

## Overview

This Rock-Paper-Scissors game is built using React and features several pages that guide the user through the game. Users can select the number of rounds, enter their username, and play the game. The application includes lazy-loaded components to optimize performance and uses session storage to persist user data across different pages.

## Pages

### Menu Page

The starting point of the game, where users can navigate to the username page.

**File**: `Menu.jsx`

**Features**:
- Displays the game title and an image.
- Includes a "Play" button to navigate to the username page.

**CSS**: `Menu.css`

### UserName Page

A page where users can enter their username, with validation included.

**File**: `UserName.jsx`

**Features**:
- Input field for the username with validation.
- Displays error messages if the username does not meet the criteria.
- Submits the username and navigates to the rounds page.
- **Session Storage**: Saves the entered username to session storage to maintain user information across page reloads or navigation within the same session.

**CSS**: `UserName.css`

### Rounds Page

Allows users to select the number of rounds for the game.

**File**: `Rounds.jsx`

**Features**:
- Options to choose between 3, 5, or 7 rounds.
- Navigates to the game page with the selected number of rounds.
- **Session Storage**: Saves the number of rounds in session storage to persist across page reloads or navigation within the same session.

**CSS**: `Rounds.css`

### RPS Page

The main gameplay page where users engage in Rock-Paper-Scissors.

**File**: `Rps.jsx`

**Features**:
- Users can choose between rock, paper, or scissors.
- Displays the results of each round and the overall winner.
- Shows confetti for the winner and provides game rules.
- Includes options to return to the menu or restart the game.
- **Session Storage**: Utilizes session storage to manage game state, including the username and number of rounds, ensuring consistency throughout the game session.

**CSS**: `Rps.css`

### Fallback Page

Handles unmatched routes and redirects users to the home page.

**File**: `App.jsx`

**Features**:
- Displays when users navigate to routes that do not match any defined paths.
- Redirects to the Menu page (`/`) for unmatched routes.

**CSS**: `App.css`

## Dependencies

- `react`: Core library for building the user interface.
- `react-router-dom`: For routing between pages.
- `react-use`: For custom hooks, like `useWindowSize`.
- `react-confetti`: For displaying confetti on win.
