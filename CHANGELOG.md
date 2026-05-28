# Mortgage Calculator Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).


## 3.1.1 - 2026-05-28
### Fixed
- Stamp duty calculation is now evaluated per bracket independently, so a typo, gap, or overlap in the rates table (e.g. min greater than max) no longer silently skips later brackets or cascades into incorrect totals.
- Display breakdown is now sorted ascending by bracket minimum regardless of source data ordering.

## 3.0.0 - 2025-03-19
### Release
- Craft 5 Compatibility

## 2.0.0 - 2023-06-13
### Release
- Craft 4 Compatibility

## 1.0.0 - 2020-06-30
### Added
- Initial release
