# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `SECURITY.md`, `CONTRIBUTING.md`, and an explicit MIT `LICENSE` file.
- Pull request and issue templates under `.github/`.
- `CODEOWNERS` covering the repository.
- CodeQL workflow for continuous static analysis.
- Social preview image at `.github/social-preview.png`.

### Changed
- README reworked with a service overview, capability badges, and contact details.
- Public site copy now describes a site for translation, interpretation, and localisation. Invented service, testimonial, and admin operations text was removed.
- Admin pages under `/admin` use paths relative to that route, so the demo screens render.

### Security
- Branch protection on `main` requiring one approving review and dismissing stale approvals on push.
