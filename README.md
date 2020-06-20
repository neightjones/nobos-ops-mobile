# Nobos Ops
[![release](https://img.shields.io/github/release/neightjones/nobos-ops-mobile.svg)](https://github.com/neightjones/nobos-ops-mobile/releases/latest)
[![GitHub release date](https://img.shields.io/github/release-date/neightjones/nobos-ops-mobile.svg)](https://github.com/neightjones/nobos-ops-mobile/releases)
[![Actions Panel](https://img.shields.io/badge/native%20apps%20build-trigger%20here-brightgreen)](https://www.actionspanel.app/app/neightjones/nobos-ops-mobile)

A Nobos Ops mobile app built with react-native and [expo](https://expo.io/).

## Build Automation Process

All commits to master are automatically built with [semantic release](https://github.com/semantic-release/semantic-release) in a github action.
When there are valid [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#summary), a new job is triggered to create a new [release](https://github.com/neightjones/nobos-ops-mobile/releases),
and the expo javascript bundles are built and published.

For most app updates, this is all that is required: only a javascript update is needed.  Occasionally new native app builds
need to be created.  For this, there is another github action that is triggered manually via [actions panel](https://www.actionspanel.app/app/neightjones/nobos-ops-mobile).
