# Security Policy

## Scope and Supported Versions

Security fixes target the latest published release. Use a supported package
manager and commit your dependency lockfile. Older releases are not separately
maintained.

The package contains static raster images, metadata and small web/native
exports. It has no runtime dependencies, installation lifecycle scripts,
network requests, telemetry or credential handling. This reduces its attack
surface; it is not a guarantee that the package or consumer image decoders
are free of defects.

## Reporting a Vulnerability

Use GitHub's private vulnerability reporting for this repository when enabled:
https://github.com/cosmintrica/culinary-assets/security/advisories/new

If that option is unavailable, contact the maintainer using the contact details
at https://cosmintrica.ro/. Do not publish credentials, exploit payloads or
sensitive information in a public issue. Include the affected version, impact
and minimal reproduction. Ordinary visual defects can use public issues.

## Release and Supply-Chain Controls

- Source and generated files are tracked in Git; existing IDs are preserved.
- CI uses read-only repository permissions, full commit SHA action pins and
  checkout without persistent Git credentials.
- Dependency installation in CI disables lifecycle scripts. Dependency audit,
  deterministic build checks, alpha/padding tests and real package installation
  checks must pass before a release.
- Package verification checks the file allowlist and compares every installed
  image with the source export using SHA-256.
- Dependabot proposes dependency/action updates as pull requests for review;
  updates are not automatically merged.
- Manual npm publication retains the maintainer's enforced account 2FA.

OIDC trusted publishing and build provenance are not enabled by these files.
They require a separately authorized npm/GitHub configuration. Future releases
should use a narrowly bound workflow and reviewed release approval without a
long-lived publishing token. Check registry attestations rather than assuming
that a release has provenance.

External scanner scores include reputation and maintenance signals and are
not security certifications. A score of 100 does not establish absence of risk.
