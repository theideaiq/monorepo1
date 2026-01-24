# Curator's Journal

## 2025-02-18 - Co-location of Shared Package Tests
Structure: We group by Feature/Component, ensuring tests live next to the code they test, even in shared packages.
Rule: Shared packages (e.g., @repo/utils) must possess their own test configuration and contain their own unit tests co-located with source files. Consuming apps should not hold tests for shared libraries.
