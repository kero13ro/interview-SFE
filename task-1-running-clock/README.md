# Task 1: Running Clock

Countdown timer component with start, pause/resume, and reset functionality.

## Requirements

- Display time in `MM:SS` format (zero-padded)
- START: Begin countdown from input values
- PAUSE/RESUME: Toggle countdown on/off
- RESET: Clear inputs and display to 00:00
- Stop automatically at 00:00

## Constraints

- React 17.0.1 only
- Preserve `data-testid="running-clock"`
- Button texts: "START", "PAUSE / RESUME", "RESET"

## Implementation Approach

### State Machine Pattern
Instead of two booleans (`isRunning` + `isPaused`), use a single `status` state:
```
'idle' → 'running' → 'paused' → 'running' → ...
```

### Single Source of Truth
`remainingSeconds` holds the countdown value. Input fields (`minutes`, `seconds`) are only used to set initial time on START.

### Key Decisions

1. **Why `Math.max(0, prev - 1)`?**
   - With Jest fake timers, multiple interval callbacks can fire before React re-renders
   - This prevents negative values during testing

2. **Why separate useEffect for stop detection?**
   - Cleaner separation of concerns
   - Countdown logic vs. completion detection

## Files

- `src/RunningClock.jsx` - Main component implementation
