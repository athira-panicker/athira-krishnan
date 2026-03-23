# Running 100+ A/B Tests: Lessons from a Dialogue Game

When most people think about A/B testing, they picture button color experiments on e-commerce sites. At Point Taken, we ran experiments on something much harder to measure: whether our dialogue game was actually changing how people communicated.

## The Challenge

Our core product hypothesis was that structured dialogue practice could measurably improve interpersonal communication skills. The problem? "Improved communication" isn't a metric you can drop into a dashboard.

We had to get creative.

## Building the Experimentation Stack

Before running a single test, we spent two weeks defining what we actually cared about. We landed on a proxy metric framework:

**Behavioral proxies:**
- Session depth (how far users progressed through dialogue scenarios)
- Return rate at 3, 7, and 14 days
- Voluntary replay rate (did users redo scenarios without being prompted?)

**Self-reported proxies:**
- Post-session reflection scores
- Weekly check-in surveys on real-world application

Only once we had a stable measurement layer did we start experimenting.

## What We Tested (And What Surprised Us)

**Onboarding framing** — We tested 4 variants of how we described the product's purpose. The version that performed worst in click-through performed best in 14-day retention. Users who understood the harder truth about the work stayed longer.

**Difficulty curve** — We assumed players wanted easy early wins. Wrong. Our steeper-difficulty variant had 20% lower completion on day 1 but 35% higher engagement at day 7. Struggle created investment.

**Feedback timing** — Immediate feedback vs. delayed reflection. Delayed won, consistently, across every cohort segment we tested. People needed time to sit with what happened before they could learn from it.

## The Meta-Lesson

Running 100+ experiments taught me that the infrastructure matters as much as the ideas. If it takes two weeks to analyze a test, you'll only run 26 experiments a year. If it takes two hours, you'll run hundreds.

We built a lightweight internal dashboard that surfaced results in near real-time. That single investment multiplied our learning velocity more than any individual insight.

---

*If you're building your own experimentation practice and want to talk shop, I'm always open — reach out.*
