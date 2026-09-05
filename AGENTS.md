# AGENTS.md

Repository-level instructions for coding agents working in this project.

## Project Context

This is a lightweight Playwright QA automation project demonstrating maintainable UI and API testing practices.

- **Language**: JavaScript
- **Test framework**: Playwright
- **Public UI target**: https://www.ncontracts.com/
- **Tests**: organized under `tests/ui` and `tests/api`
- **Page Objects**: belong in `pages/`
- **Reusable fixtures**: belong in `fixtures/`
- Keep the framework intentionally small, readable, and maintainable.

## 1. Architecture

- Follow the existing project structure and conventions.
- Reuse existing Page Objects and fixtures before creating new ones.
- Add abstractions only when they solve a real maintainability problem.
- Do not create BasePage classes unless explicitly requested.
- Do not add unnecessary helpers, utilities, service layers, wrapper classes, or configuration layers.
- Do not add new dependencies unless explicitly requested.

## 2. UI Testing

- Prefer resilient Playwright locators such as `getByRole`, `getByLabel`, `getByText`, or test IDs when available.
- Avoid brittle CSS selectors and XPath unless there is no reliable user-facing locator.
- Do not use hard waits such as `waitForTimeout` for synchronization.
- Rely on Playwright auto-waiting and explicit assertions.
- Keep tests independent and deterministic where possible.
- Do not submit synthetic data to real production forms or trigger real business actions unless explicitly requested.

## 3. Page Object Model

- Use Page Objects for reusable page behavior and locators.
- Keep assertions in tests when practical rather than hiding test intent inside Page Objects.
- Do not create a Page Object for a page unless it provides meaningful reuse or improves readability.
- Keep Page Object methods focused on user actions and reusable page behavior.

## 4. Fixtures

- Use fixtures only for genuinely reusable setup, shared test objects, or common test context.
- Do not create fixtures merely to demonstrate the fixture pattern.
- Prefer the simplest fixture implementation that solves the problem.

## 5. API Testing

- Use Playwright request capabilities for API tests when appropriate.
- Keep API tests under `tests/api`.
- Do not invent or imply access to private APIs, credentials, databases, message brokers, internal services, or infrastructure.
- Any mock or demo API must be clearly identified as such and must not be represented as part of Ncontracts infrastructure.

## 6. Scope and Changes

- Inspect the repository and relevant existing files before making changes.
- Keep changes minimal and scoped to the requested task.
- Do not modify unrelated files.
- Do not rewrite working code without a clear reason.
- Preserve existing project conventions unless a requested change requires otherwise.

## 7. Validation and Debugging

- Run the smallest relevant validation command after making changes.
- Report what was changed and what validation was performed.
- If a test fails, diagnose the failure and identify the likely root cause before changing code or architecture.
- Use Playwright debugging capabilities such as traces, screenshots, and error output when appropriate.
- Do not hide failures by weakening meaningful assertions.

## 8. Git

- Do not create branches or worktrees unless explicitly requested.
- Do not switch branches unless explicitly requested.
- Do not commit or push changes unless explicitly requested.
- Never discard existing user changes.
- Show or summarize the diff after meaningful changes so the changes can be reviewed.

## 9. Code Quality

- Favor simple, readable, maintainable JavaScript.
- Avoid clever or unnecessarily abstract solutions.
- Keep tests easy to understand from their names, steps, and assertions.
- Every major addition should have a clear QA or engineering purpose.
- Prefer consistency with the existing codebase over introducing new patterns without a clear benefit.
