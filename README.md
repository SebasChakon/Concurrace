# ConcurRace – Sistemas Distribuidos

> A fast-paced, browser-based educational game where players master the classic problems of **concurrency** in distributed systems — race conditions, deadlocks, starvation, and more. Built for university-level students who want to learn while actually having fun.

**Status:** Completed · Playable in any modern browser

---

## About

ConcurRace turns one of the most conceptually dense topics in distributed systems — concurrent access conflicts — into an engaging, arcade-style quiz experience. Players race through three levels of increasing challenge, earning points for correctly identifying and understanding concurrency problems.

No frameworks. No dependencies. Just HTML, CSS, and vanilla JS — open the file and play.

---

## Gameplay

Three levels, one goal: prove you understand what happens when processes fight over shared resources.

- **Level 1 – Concept Matching:** Pair concurrency problems (Race Condition, Deadlock, Starvation…) with their correct category
- **Level 2 – Term Definitions:** Match technical terms (Mutex, Semaphore, Monitor…) to their precise definitions
- **Level 3 – Situational Questions:** Answer real-world concurrency scenarios with multiple-choice questions — one shot per question, with explanations on every answer

At the end, a results screen breaks down your score by level and gives a qualitative rating of your performance.

---

## Topics Covered

| Concept | Description |
|---|---|
| Race Condition | Non-deterministic outcome due to unsynchronized access |
| Deadlock | Circular wait between processes holding shared resources |
| Starvation | Process indefinitely denied CPU time by higher-priority ones |
| Livelock | Processes active but making no progress — canceling each other out |
| Critical Section | Code region requiring exclusive access |
| Mutual Exclusion | Safety property preventing simultaneous resource access |
| Mutex | Binary lock for exclusive resource access |
| Semaphore | Integer-based signaling mechanism between processes |
| Monitor | High-level synchronization structure with automatic locking |
| Busy Waiting | CPU-consuming polling loop while waiting for a condition |
| Coffman Conditions | The four necessary conditions for deadlock to occur |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom properties, grid, animations) |
| Logic | Vanilla JavaScript (ES6+ modules pattern) |
| Fonts | Google Fonts — Space Mono + DM Sans |
| Dependencies | None |

---

## Project Structure

```
concurrace/
│
├── index.html              ← Entry point
│
├── css/
│   ├── styles.css          ← Global styles, variables, layout
│   ├── start.css           ← Start screen
│   ├── level1.css          ← Level 1 styles
│   ├── level2.css          ← Level 2 styles
│   ├── level3.css          ← Level 3 styles
│   └── end.css             ← Results screen
│
├── js/
│   ├── data.js             ← All educational content & scoring constants
│   ├── state.js            ← Global game state + UI helpers
│   ├── level1.js           ← Level 1 logic (concept matching)
│   ├── level2.js           ← Level 2 logic (word–definition pairing)
│   ├── level3.js           ← Level 3 logic (multiple choice Q&A)
│   ├── end.js              ← Results screen logic
│   └── main.js             ← Game controller & screen navigation
│
└── screens/
    ├── screen-start.html   ← Start screen partial
    ├── screen-level1.html  ← Level 1 partial
    ├── screen-level2.html  ← Level 2 partial
    ├── screen-level3.html  ← Level 3 partial
    └── screen-end.html     ← Results screen partial
```

---

## Installation & Setup

### Prerequisites

- Any modern web browser (Chrome, Firefox, Edge, Safari)
- No server, build tool, or package manager required

### Steps

**Option A — Open directly:**
```
Open index.html in your browser. That's it.
```

**Option B — Clone and run:**
```bash
git clone https://github.com/SebasChakon/concurrace.git
cd concurrace
open index.html        # macOS
start index.html       # Windows
xdg-open index.html   # Linux
```

---

## Scoring

| Level | Max Points | Mechanism |
|---|---|---|
| Level 1 | 30 pts | 6 pairs × 5 pts each |
| Level 2 | 30 pts | 6 pairs × 5 pts each |
| Level 3 | 40 pts | 6 questions × ~6 pts each |
| **Total** | **100 pts** | |

### Rating Scale

| Score | Rating |
|---|---|
| 90 – 100 | Concurrency Master |
| 70 – 89 | Great Performance |
| 50 – 69 | Good Attempt |
| 0 – 49 | Keep Practicing |

---

## License

MIT — free to use, modify, and distribute.

