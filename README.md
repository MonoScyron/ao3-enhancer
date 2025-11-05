# AO3 Enhancer

Firefox extension for the fanfiction website [ArchiveOfOurOwn](http://archiveofourown.org/).

## Installing

[Install this add-on for Firefox](https://addons.mozilla.org/en-US/firefox/addon/ao3-enhancer/)

## Installing on Mobile

This guide details how to install any add-on in general on Firefox Nightly browsers on mobile.

Note: This extension should work on mobile, but it has not been extensively tested there. Please report any bugs you
find in the issues tab!

1. Create a collection on the [Firefox Add-ons collections page](https://addons.mozilla.org/en-US/firefox/collections/)
2. Add "AO3 Enhancer" (Or any other add-on) to that collection
3. Open Firefox Nightly's settings
4. Select Custom Add-on Collection in the Advanced section
5. Your User ID can be found by looking at the URL of your Firefox Add-on's profile
6. Your Collection name is whatever you decided to name your collection
7. Firefox Nightly will now allow you to install all the add-ons in your collection

## Features

Most features are disabled by default. Please click on the extension icon to enable features in the options menu.

### Enhancer Additions

- **Kudos to Hit Ratio**: Adds a kudos to hit percentage to the stats list of a work.
- **Hide Fics by Ratio**: Automatically hides works with too low kudos to hit ratio.
- **Hide Fics With Too Many Fandoms**: Automatically hides works with too many fandoms.

### Built-in Filtering Settings

Automatically modifies AO3 urls using the archive's built-in filter.

- **Exclude tags/fandoms**: Exclude works with specific tags/fandoms.
- **Exclude archive warnings**: Exclude selected warnings.
- **Select a default language**: Only works of a selected language will be displayed.
- **More options**: Filter for crossovers, completion, word count, date updated, and search within results.

## Roadmap

These are features I currently plan on adding. Please suggest additional features in the issues tab!

### TODO

- [ ] Filter & sort your marked-for-later fics
- [ ] Filter fics by if already read
- [ ] Filter fics by individual fic ID
- [ ] Add ability to get notified when fics are completed

#### TODO Lower Priority

These features are unlikely to be added.

- [ ] Reading list: Add specific chapters of fics to a list (Bookmarking chapters)
- [ ] Auto-include stuff
    - [ ] Ratings
    - [ ] Warnings
    - [ ] Categories
    - [ ] Tags/Fandoms

## Building the Add-on

This section will walk you through how to build the add-on yourself.

Begin by installing required packages with `npm install`, then build the add-on with provided scripts using webpack.

To build for development, run:

```bash
npm run build:dev
npm run zip
```

To build for production, run:

```bash
npm run build:prod
npm run zip
```

Then simply install the zip file in `./zip` as an add-on. You may need to go to
the Firefox add-on debug page (`about:debugging#/runtime/this-firefox`) to add it.

## Acknowledgements

This addon was inspired by the extensions I use to browse AO3:

- [AO3 Enhancements](https://github.com/jsmnbom/ao3-enhancements) by `jsmnbom`
- [AO3 Tag Blocker](https://github.com/ao3-tag-blocker/tag-blocker)

The icon is a modified version of the icon for [AO3 Enhancements](https://github.com/jsmnbom/ao3-enhancements)
by `jsmnbom`.

The options page background is CC-BY-4.0 by [Hero Patterns](http://www.heropatterns.com/).