# AO3 Enhancer

Firefox extension for the fanfiction website [ArchiveOfOurOwn](http://archiveofourown.org/).

## Installing

[Install this add-on for Firefox](https://addons.mozilla.org/en-US/firefox/addon/ao3-enhancer/)

## Features

Most features are disabled by default. Please click on the extension icon to enable features in the options menu.

### Enhancer Additions

- **Kudos to Hit Ratio**: Adds a kudos to hit percentage to the stats list of a work.
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
- [ ] Filter fics by author

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

#### Development build

This will cause webpack to optimize for development. To build for development, run:

`npm run build:dev`

#### Production build

This will cause webpack to optimize for production. To build for production, run:

`npm run build:prod`

#### Add-on Complilaton
Latest version of the add-on was built using these software versions:

```
Windows 10
Version: 21H2
Npm: 8.19.2
Node: v18.12.1
```

## Acknowledgements

This addon was inspired by the extensions I use to browse AO3:

-   [AO3 Enhancements](https://github.com/jsmnbom/ao3-enhancements) by `jsmnbom`
-   [AO3 Tag Blocker](https://github.com/ao3-tag-blocker/tag-blocker)

The icon is a modified version of the icon for [AO3 Enhancements](https://github.com/jsmnbom/ao3-enhancements) by `jsmnbom`.

The options page background is CC-BY-4.0 by [Hero Patterns](http://www.heropatterns.com/).

The eye and arrow icons used are MIT license by [Heroicons](https://heroicons.com/).