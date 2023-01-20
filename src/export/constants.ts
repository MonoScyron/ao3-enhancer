/** All keys in storage */
export const STORAGE_KEYS = [
    "kudosHitRatio", "filtering", "language", "query", "tags", "warnings",
    "crossover", "completion", "wordCount", "updateDate", "hideByNumFandom",
    "hideByRatio"
];

/** Default values of settings */
export const DEFAULT_VALUES = {
    kudosHitRatio: true,
    filtering: false,
    language: "",
    query: "",
    tags: [],
    warnings: [],
    crossover: "",
    completion: "",
    wordCount: ["", ""],
    updateDate: ["", ""],
    hideByNumFandom: NaN,
    hideByRatio: NaN
}

// Settings changed message
export const SETTINGS_CHANGED = "settings_changed";
export const INSERT_MARKED_CSS = "insert_marked_css";

/** Redirect these URLs to filter works with excluded stuff */
export const REDIRECT_URLS = [
    `https://archiveofourown.org/tags/*/works`, // Works in a tag
    `https://archiveofourown.org/tags/*/bookmarks`, // Bookmarks in a tag

    `https://archiveofourown.org/users/*/works*`, // User's works
    `https://archiveofourown.org/users/*/bookmarks*`, // User's bookmarks

    `https://archiveofourown.org/collections/*/works`, // Collection's works
    `https://archiveofourown.org/collections/*/bookmarks`// Collection's bookmarks
];

/** Cannot redirect these URLs, need to hide works with excluded stuff */
export const HIDE_URLS = [
    `https:\/\/archiveofourown\.org\/users\/`, // User's dashboard
    `https:\/\/archiveofourown\.org\/users\/.*\/series`, // User's series
    `https:\/\/archiveofourown\.org\/users\/.*\/gifts`, // User's gifts

    `https:\/\/archiveofourown\.org\/collections\/.*\/series`, // Collection's series
]

/** Raw HTML for the navigation filter button */
export const FILTER_BTN_HTML = `
<li class="narrow-shown hidden">
    <a id="go_to_filters">Filters</a>
</li>
`;

/** Raw HTML for the side filter form */
export const FILTER_HTML = `
<form class="narrow-hidden filters" id="work-filters" action="/works" accept-charset="UTF-8" method="get">
    <h3 class="landmark heading">Filters</h3>
    <fieldset>
        <legend>Filter results:</legend>
        <dl>
            <dt class="landmark">Submit</dt>
            <dd class="submit actions"><input type="submit" name="commit" value="Sort and Filter"></dd>
            <dt class="sort">
                <label for="work_search_sort_column">Sort by</label>
            </dt>
            <dd class="sort">
                <select name="work_search[sort_column]" id="work_search_sort_column">
                    <option value="authors_to_sort_on">Author</option>
                    <option value="title_to_sort_on">Title</option>
                    <option value="created_at">Date Posted</option>
                    <option selected="selected" value="revised_at">Date Updated</option>
                    <option value="word_count">Word Count</option>
                    <option value="hits">Hits</option>
                    <option value="kudos_count">Kudos</option>
                    <option value="comments_count">Comments</option>
                    <option value="bookmarks_count">Bookmarks</option>
                </select>
            </dd>

            <dt class="include heading">
                <h4 class="heading">
                    Include
                </h4>
                <a class="help symbol question modal modal-attached" title="Work filters include tags"
                    aria-controls="#modal" href="/help/work-filters-include-tags.html"><span
                        class="symbol question"><span>?</span></span></a>
            </dt>
            <dd class="include tags group">
                <dl>
                    <dt id="toggle_include_rating_tags" class="filter-toggle rating tags collapsed"><button
                            type="button" class="expander" aria-expanded="false" aria-controls="include_rating_tags">
                            <span class="landmark">Include </span>Ratings
                        </button></dt>
                    <dd id="include_rating_tags" class="expandable rating tags hidden">
                        <ul>
                            <li>
                                <label for="include_work_search_rating_ids_11">
                                    <input type="radio" name="include_work_search[rating_ids][]"
                                        id="include_work_search_rating_ids_11" value="11">
                                    <span class="indicator" aria-hidden="true"></span><span>Teen And Up Audiences
                                        (92584)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_rating_ids_10">
                                    <input type="radio" name="include_work_search[rating_ids][]"
                                        id="include_work_search_rating_ids_10" value="10">
                                    <span class="indicator" aria-hidden="true"></span><span>General Audiences
                                        (58171)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_rating_ids_13">
                                    <input type="radio" name="include_work_search[rating_ids][]"
                                        id="include_work_search_rating_ids_13" value="13">
                                    <span class="indicator" aria-hidden="true"></span><span>Explicit (48977)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_rating_ids_12">
                                    <input type="radio" name="include_work_search[rating_ids][]"
                                        id="include_work_search_rating_ids_12" value="12">
                                    <span class="indicator" aria-hidden="true"></span><span>Mature (35690)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_rating_ids_9">
                                    <input type="radio" name="include_work_search[rating_ids][]"
                                        id="include_work_search_rating_ids_9" value="9">
                                    <span class="indicator" aria-hidden="true"></span><span>Not Rated (29332)</span>
                                </label>
                            </li>
                        </ul>
                    </dd>
                    <dt id="toggle_include_archive_warning_tags" class="filter-toggle warning tags collapsed"><button
                            type="button" class="expander" aria-expanded="false"
                            aria-controls="include_archive_warning_tags">
                            <span class="landmark">Include </span>Warnings
                        </button></dt>
                    <dd id="include_archive_warning_tags" class="expandable warning tags hidden">
                        <ul>
                            <li>
                                <label for="include_work_search_archive_warning_ids_16">
                                    <input type="checkbox" name="include_work_search[archive_warning_ids][]"
                                        id="include_work_search_archive_warning_ids_16" value="16">
                                    <span class="indicator" aria-hidden="true"></span><span>No Archive Warnings Apply
                                        (130373)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_archive_warning_ids_14">
                                    <input type="checkbox" name="include_work_search[archive_warning_ids][]"
                                        id="include_work_search_archive_warning_ids_14" value="14">
                                    <span class="indicator" aria-hidden="true"></span><span>Creator Chose Not To Use
                                        Archive Warnings (93467)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_archive_warning_ids_17">
                                    <input type="checkbox" name="include_work_search[archive_warning_ids][]"
                                        id="include_work_search_archive_warning_ids_17" value="17">
                                    <span class="indicator" aria-hidden="true"></span><span>Graphic Depictions Of
                                        Violence (33261)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_archive_warning_ids_18">
                                    <input type="checkbox" name="include_work_search[archive_warning_ids][]"
                                        id="include_work_search_archive_warning_ids_18" value="18">
                                    <span class="indicator" aria-hidden="true"></span><span>Major Character Death
                                        (18147)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_archive_warning_ids_20">
                                    <input type="checkbox" name="include_work_search[archive_warning_ids][]"
                                        id="include_work_search_archive_warning_ids_20" value="20">
                                    <span class="indicator" aria-hidden="true"></span><span>Underage (11636)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_archive_warning_ids_19">
                                    <input type="checkbox" name="include_work_search[archive_warning_ids][]"
                                        id="include_work_search_archive_warning_ids_19" value="19">
                                    <span class="indicator" aria-hidden="true"></span><span>Rape/Non-Con (10269)</span>
                                </label>
                            </li>
                        </ul>
                    </dd>
                    <dt id="toggle_include_category_tags" class="filter-toggle category tags collapsed"><button
                            type="button" class="expander" aria-expanded="false" aria-controls="include_category_tags">
                            <span class="landmark">Include </span>Categories
                        </button></dt>
                    <dd id="include_category_tags" class="expandable category tags hidden">
                        <ul>
                            <li>
                                <label for="include_work_search_category_ids_23">
                                    <input type="checkbox" name="include_work_search[category_ids][]"
                                        id="include_work_search_category_ids_23" value="23">
                                    <span class="indicator" aria-hidden="true"></span><span>M/M (140731)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_category_ids_22">
                                    <input type="checkbox" name="include_work_search[category_ids][]"
                                        id="include_work_search_category_ids_22" value="22">
                                    <span class="indicator" aria-hidden="true"></span><span>F/M (63151)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_category_ids_21">
                                    <input type="checkbox" name="include_work_search[category_ids][]"
                                        id="include_work_search_category_ids_21" value="21">
                                    <span class="indicator" aria-hidden="true"></span><span>Gen (54401)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_category_ids_2246">
                                    <input type="checkbox" name="include_work_search[category_ids][]"
                                        id="include_work_search_category_ids_2246" value="2246">
                                    <span class="indicator" aria-hidden="true"></span><span>Multi (22634)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_category_ids_116">
                                    <input type="checkbox" name="include_work_search[category_ids][]"
                                        id="include_work_search_category_ids_116" value="116">
                                    <span class="indicator" aria-hidden="true"></span><span>F/F (18415)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_category_ids_24">
                                    <input type="checkbox" name="include_work_search[category_ids][]"
                                        id="include_work_search_category_ids_24" value="24">
                                    <span class="indicator" aria-hidden="true"></span><span>Other (12392)</span>
                                </label>
                            </li>
                        </ul>
                    </dd>
                    <dt id="toggle_include_fandom_tags" class="filter-toggle fandom tags collapsed"><button
                            type="button" class="expander" aria-expanded="false" aria-controls="include_fandom_tags">
                            <span class="landmark">Include </span>Fandoms
                        </button></dt>
                    <dd id="include_fandom_tags" class="expandable fandom tags hidden">
                        <ul>
                            <li>
                                <label for="include_work_search_fandom_ids_3828398">
                                    <input type="checkbox" name="include_work_search[fandom_ids][]"
                                        id="include_work_search_fandom_ids_3828398" value="3828398">
                                    <span class="indicator" aria-hidden="true"></span><span>僕のヒーローアカデミア | Boku no Hero
                                        Academia | My Hero Academia (264754)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_fandom_ids_13999">
                                    <input type="checkbox" name="include_work_search[fandom_ids][]"
                                        id="include_work_search_fandom_ids_13999" value="13999">
                                    <span class="indicator" aria-hidden="true"></span><span>Naruto (1119)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_fandom_ids_758208">
                                    <input type="checkbox" name="include_work_search[fandom_ids][]"
                                        id="include_work_search_fandom_ids_758208" value="758208">
                                    <span class="indicator" aria-hidden="true"></span><span>Haikyuu!! (685)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_fandom_ids_136512">
                                    <input type="checkbox" name="include_work_search[fandom_ids][]"
                                        id="include_work_search_fandom_ids_136512" value="136512">
                                    <span class="indicator" aria-hidden="true"></span><span>Harry Potter - J. K. Rowling
                                        (624)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_fandom_ids_721553">
                                    <input type="checkbox" name="include_work_search[fandom_ids][]"
                                        id="include_work_search_fandom_ids_721553" value="721553">
                                    <span class="indicator" aria-hidden="true"></span><span>Shingeki no Kyojin | Attack
                                        on Titan (499)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_fandom_ids_34135873">
                                    <input type="checkbox" name="include_work_search[fandom_ids][]"
                                        id="include_work_search_fandom_ids_34135873" value="34135873">
                                    <span class="indicator" aria-hidden="true"></span><span>鬼滅の刃 | Demon Slayer: Kimetsu
                                        no Yaiba (Anime) (497)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_fandom_ids_2692">
                                    <input type="checkbox" name="include_work_search[fandom_ids][]"
                                        id="include_work_search_fandom_ids_2692" value="2692">
                                    <span class="indicator" aria-hidden="true"></span><span>Original Work (446)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_fandom_ids_448284">
                                    <input type="checkbox" name="include_work_search[fandom_ids][]"
                                        id="include_work_search_fandom_ids_448284" value="448284">
                                    <span class="indicator" aria-hidden="true"></span><span>Pocket Monsters | Pokemon -
                                        All Media Types (438)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_fandom_ids_86392389">
                                    <input type="checkbox" name="include_work_search[fandom_ids][]"
                                        id="include_work_search_fandom_ids_86392389" value="86392389">
                                    <span class="indicator" aria-hidden="true"></span><span>One Piece (Anime &amp;
                                        Manga) (421)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_fandom_ids_414093">
                                    <input type="checkbox" name="include_work_search[fandom_ids][]"
                                        id="include_work_search_fandom_ids_414093" value="414093">
                                    <span class="indicator" aria-hidden="true"></span><span>Marvel Cinematic Universe
                                        (411)</span>
                                </label>
                            </li>
                        </ul>
                    </dd>
                    <dt id="toggle_include_character_tags" class="filter-toggle character tags collapsed"><button
                            type="button" class="expander" aria-expanded="false" aria-controls="include_character_tags">
                            <span class="landmark">Include </span>Characters
                        </button></dt>
                    <dd id="include_character_tags" class="expandable character tags hidden">
                        <ul>
                            <li>
                                <label for="include_work_search_character_ids_3741113">
                                    <input type="checkbox" name="include_work_search[character_ids][]"
                                        id="include_work_search_character_ids_3741113" value="3741113">
                                    <span class="indicator" aria-hidden="true"></span><span>Midoriya Izuku
                                        (136265)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_character_ids_3741110">
                                    <input type="checkbox" name="include_work_search[character_ids][]"
                                        id="include_work_search_character_ids_3741110" value="3741110">
                                    <span class="indicator" aria-hidden="true"></span><span>Bakugou Katsuki
                                        (126282)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_character_ids_4598837">
                                    <input type="checkbox" name="include_work_search[character_ids][]"
                                        id="include_work_search_character_ids_4598837" value="4598837">
                                    <span class="indicator" aria-hidden="true"></span><span>Todoroki Shouto
                                        (74081)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_character_ids_8689774">
                                    <input type="checkbox" name="include_work_search[character_ids][]"
                                        id="include_work_search_character_ids_8689774" value="8689774">
                                    <span class="indicator" aria-hidden="true"></span><span>Aizawa Shouta | Eraserhead
                                        (69200)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_character_ids_3958226">
                                    <input type="checkbox" name="include_work_search[character_ids][]"
                                        id="include_work_search_character_ids_3958226" value="3958226">
                                    <span class="indicator" aria-hidden="true"></span><span>Kirishima Eijirou
                                        (66682)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_character_ids_3958238">
                                    <input type="checkbox" name="include_work_search[character_ids][]"
                                        id="include_work_search_character_ids_3958238" value="3958238">
                                    <span class="indicator" aria-hidden="true"></span><span>Uraraka Ochako
                                        (48826)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_character_ids_3958253">
                                    <input type="checkbox" name="include_work_search[character_ids][]"
                                        id="include_work_search_character_ids_3958253" value="3958253">
                                    <span class="indicator" aria-hidden="true"></span><span>Kaminari Denki
                                        (48400)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_character_ids_9866728">
                                    <input type="checkbox" name="include_work_search[character_ids][]"
                                        id="include_work_search_character_ids_9866728" value="9866728">
                                    <span class="indicator" aria-hidden="true"></span><span>Yagi Toshinori | All Might
                                        (40980)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_character_ids_5747754">
                                    <input type="checkbox" name="include_work_search[character_ids][]"
                                        id="include_work_search_character_ids_5747754" value="5747754">
                                    <span class="indicator" aria-hidden="true"></span><span>Shinsou Hitoshi
                                        (37354)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_character_ids_10740979">
                                    <input type="checkbox" name="include_work_search[character_ids][]"
                                        id="include_work_search_character_ids_10740979" value="10740979">
                                    <span class="indicator" aria-hidden="true"></span><span>Class 1-A (My Hero Academia)
                                        (35916)</span>
                                </label>
                            </li>
                        </ul>
                    </dd>
                    <dt id="toggle_include_relationship_tags" class="filter-toggle relationship tags collapsed"><button
                            type="button" class="expander" aria-expanded="false"
                            aria-controls="include_relationship_tags">
                            <span class="landmark">Include </span>Relationships
                        </button></dt>
                    <dd id="include_relationship_tags" class="expandable relationship tags hidden">
                        <ul>
                            <li>
                                <label for="include_work_search_relationship_ids_3741107">
                                    <input type="checkbox" name="include_work_search[relationship_ids][]"
                                        id="include_work_search_relationship_ids_3741107" value="3741107">
                                    <span class="indicator" aria-hidden="true"></span><span>Bakugou Katsuki/Midoriya
                                        Izuku (36475)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_relationship_ids_4918711">
                                    <input type="checkbox" name="include_work_search[relationship_ids][]"
                                        id="include_work_search_relationship_ids_4918711" value="4918711">
                                    <span class="indicator" aria-hidden="true"></span><span>Bakugou Katsuki/Kirishima
                                        Eijirou (29398)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_relationship_ids_4687704">
                                    <input type="checkbox" name="include_work_search[relationship_ids][]"
                                        id="include_work_search_relationship_ids_4687704" value="4687704">
                                    <span class="indicator" aria-hidden="true"></span><span>Midoriya Izuku/Todoroki
                                        Shouto (22699)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_relationship_ids_11910691">
                                    <input type="checkbox" name="include_work_search[relationship_ids][]"
                                        id="include_work_search_relationship_ids_11910691" value="11910691">
                                    <span class="indicator" aria-hidden="true"></span><span>Aizawa Shouta |
                                        Eraserhead/Yamada Hizashi | Present Mic (19119)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_relationship_ids_7256141">
                                    <input type="checkbox" name="include_work_search[relationship_ids][]"
                                        id="include_work_search_relationship_ids_7256141" value="7256141">
                                    <span class="indicator" aria-hidden="true"></span><span>Bakugou Katsuki &amp;
                                        Midoriya Izuku (14703)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_relationship_ids_6404978">
                                    <input type="checkbox" name="include_work_search[relationship_ids][]"
                                        id="include_work_search_relationship_ids_6404978" value="6404978">
                                    <span class="indicator" aria-hidden="true"></span><span>Bakugou Katsuki/Todoroki
                                        Shouto (10405)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_relationship_ids_14714195">
                                    <input type="checkbox" name="include_work_search[relationship_ids][]"
                                        id="include_work_search_relationship_ids_14714195" value="14714195">
                                    <span class="indicator" aria-hidden="true"></span><span>Aizawa Shouta | Eraserhead
                                        &amp; Midoriya Izuku (10155)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_relationship_ids_49364710">
                                    <input type="checkbox" name="include_work_search[relationship_ids][]"
                                        id="include_work_search_relationship_ids_49364710" value="49364710">
                                    <span class="indicator" aria-hidden="true"></span><span>Dabi | Todoroki Touya/Takami
                                        Keigo | Hawks (9872)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_relationship_ids_17268954">
                                    <input type="checkbox" name="include_work_search[relationship_ids][]"
                                        id="include_work_search_relationship_ids_17268954" value="17268954">
                                    <span class="indicator" aria-hidden="true"></span><span>Kaminari Denki/Shinsou
                                        Hitoshi (8226)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_relationship_ids_5155513">
                                    <input type="checkbox" name="include_work_search[relationship_ids][]"
                                        id="include_work_search_relationship_ids_5155513" value="5155513">
                                    <span class="indicator" aria-hidden="true"></span><span>Midoriya Izuku/Uraraka
                                        Ochako (8097)</span>
                                </label>
                            </li>
                        </ul>
                    </dd>
                    <dt id="toggle_include_freeform_tags" class="filter-toggle freeform tags collapsed"><button
                            type="button" class="expander" aria-expanded="false" aria-controls="include_freeform_tags">
                            <span class="landmark">Include </span>Additional Tags
                        </button></dt>
                    <dd id="include_freeform_tags" class="expandable freeform tags hidden">
                        <ul>
                            <li>
                                <label for="include_work_search_freeform_ids_110">
                                    <input type="checkbox" name="include_work_search[freeform_ids][]"
                                        id="include_work_search_freeform_ids_110" value="110">
                                    <span class="indicator" aria-hidden="true"></span><span>Fluff (46686)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_freeform_ids_176">
                                    <input type="checkbox" name="include_work_search[freeform_ids][]"
                                        id="include_work_search_freeform_ids_176" value="176">
                                    <span class="indicator" aria-hidden="true"></span><span>Angst (33402)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_freeform_ids_10216243">
                                    <input type="checkbox" name="include_work_search[freeform_ids][]"
                                        id="include_work_search_freeform_ids_10216243" value="10216243">
                                    <span class="indicator" aria-hidden="true"></span><span>Bakugou Katsuki Swears A Lot
                                        (22860)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_freeform_ids_2379">
                                    <input type="checkbox" name="include_work_search[freeform_ids][]"
                                        id="include_work_search_freeform_ids_2379" value="2379">
                                    <span class="indicator" aria-hidden="true"></span><span>Hurt/Comfort (20982)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_freeform_ids_214055">
                                    <input type="checkbox" name="include_work_search[freeform_ids][]"
                                        id="include_work_search_freeform_ids_214055" value="214055">
                                    <span class="indicator" aria-hidden="true"></span><span>Not Beta Read (17235)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_freeform_ids_16433199">
                                    <input type="checkbox" name="include_work_search[freeform_ids][]"
                                        id="include_work_search_freeform_ids_16433199" value="16433199">
                                    <span class="indicator" aria-hidden="true"></span><span>Bakugou Katsuki is Bad at
                                        Feelings (16257)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_freeform_ids_604127">
                                    <input type="checkbox" name="include_work_search[freeform_ids][]"
                                        id="include_work_search_freeform_ids_604127" value="604127">
                                    <span class="indicator" aria-hidden="true"></span><span>Other Additional Tags to Be
                                        Added (16031)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_freeform_ids_842172">
                                    <input type="checkbox" name="include_work_search[freeform_ids][]"
                                        id="include_work_search_freeform_ids_842172" value="842172">
                                    <span class="indicator" aria-hidden="true"></span><span>Aged-Up Character(s)
                                        (15479)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_freeform_ids_86724730">
                                    <input type="checkbox" name="include_work_search[freeform_ids][]"
                                        id="include_work_search_freeform_ids_86724730" value="86724730">
                                    <span class="indicator" aria-hidden="true"></span><span>Parental Aizawa Shouta |
                                        Eraserhead | Dadzawa (15470)</span>
                                </label>
                            </li>
                            <li>
                                <label for="include_work_search_freeform_ids_143795">
                                    <input type="checkbox" name="include_work_search[freeform_ids][]"
                                        id="include_work_search_freeform_ids_143795" value="143795">
                                    <span class="indicator" aria-hidden="true"></span><span>Alternate Universe - Canon
                                        Divergence (15176)</span>
                                </label>
                            </li>
                        </ul>
                    </dd>
                    <dt class="autocomplete search">
                        <label for="work_search_other_tag_names_autocomplete">Other tags to include</label>
                    </dt>
                    <dd class="autocomplete search">
                        <ul class="autocomplete">
                            <li class="input"><input type="text" class="text" autocomplete="off" role="combobox"
                                    aria-expanded="true" aria-autocomplete="list"
                                    id="work_search_other_tag_names_autocomplete">
                                <div class="autocomplete dropdown" style="display: none;"></div>
                            </li>
                        </ul><input class="autocomplete" data-autocomplete-method="/autocomplete/tag"
                            data-autocomplete-hint-text="Start typing for suggestions!"
                            data-autocomplete-no-results-text="(No suggestions found)" data-autocomplete-min-chars="1"
                            data-autocomplete-searching-text="Searching..." type="text"
                            name="work_search[other_tag_names]" id="work_search_other_tag_names" style="display: none;">
                    </dd>
                </dl>
            </dd>
            <dt class="exclude heading">
                <h4 class="heading">
                    Exclude
                </h4>
                <a class="help symbol question modal modal-attached" title="Work filters exclude tags"
                    aria-controls="#modal" href="/help/work-filters-exclude-tags.html"><span
                        class="symbol question"><span>?</span></span></a>
            </dt>
            <dd class="exclude tags group">
                <dl>
                    <dt id="toggle_exclude_rating_tags" class="filter-toggle rating tags collapsed"><button
                            type="button" class="expander" aria-expanded="false" aria-controls="exclude_rating_tags">
                            <span class="landmark">Exclude </span>Ratings
                        </button></dt>
                    <dd id="exclude_rating_tags" class="expandable rating tags hidden">
                        <ul>
                            <li>
                                <label for="exclude_work_search_rating_ids_11">
                                    <input type="checkbox" name="exclude_work_search[rating_ids][]"
                                        id="exclude_work_search_rating_ids_11" value="11">
                                    <span class="indicator" aria-hidden="true"></span><span>Teen And Up Audiences
                                        (92584)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_rating_ids_10">
                                    <input type="checkbox" name="exclude_work_search[rating_ids][]"
                                        id="exclude_work_search_rating_ids_10" value="10">
                                    <span class="indicator" aria-hidden="true"></span><span>General Audiences
                                        (58171)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_rating_ids_13">
                                    <input type="checkbox" name="exclude_work_search[rating_ids][]"
                                        id="exclude_work_search_rating_ids_13" value="13">
                                    <span class="indicator" aria-hidden="true"></span><span>Explicit (48977)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_rating_ids_12">
                                    <input type="checkbox" name="exclude_work_search[rating_ids][]"
                                        id="exclude_work_search_rating_ids_12" value="12">
                                    <span class="indicator" aria-hidden="true"></span><span>Mature (35690)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_rating_ids_9">
                                    <input type="checkbox" name="exclude_work_search[rating_ids][]"
                                        id="exclude_work_search_rating_ids_9" value="9">
                                    <span class="indicator" aria-hidden="true"></span><span>Not Rated (29332)</span>
                                </label>
                            </li>
                        </ul>
                    </dd>
                    <dt id="toggle_exclude_archive_warning_tags" class="filter-toggle warning tags collapsed"><button
                            type="button" class="expander" aria-expanded="false"
                            aria-controls="exclude_archive_warning_tags">
                            <span class="landmark">Exclude </span>Warnings
                        </button></dt>
                    <dd id="exclude_archive_warning_tags" class="expandable warning tags hidden">
                        <ul>
                            <li>
                                <label for="exclude_work_search_archive_warning_ids_16">
                                    <input type="checkbox" name="exclude_work_search[archive_warning_ids][]"
                                        id="exclude_work_search_archive_warning_ids_16" value="16">
                                    <span class="indicator" aria-hidden="true"></span><span>No Archive Warnings Apply
                                        (130373)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_archive_warning_ids_14">
                                    <input type="checkbox" name="exclude_work_search[archive_warning_ids][]"
                                        id="exclude_work_search_archive_warning_ids_14" value="14">
                                    <span class="indicator" aria-hidden="true"></span><span>Creator Chose Not To Use
                                        Archive Warnings (93467)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_archive_warning_ids_17">
                                    <input type="checkbox" name="exclude_work_search[archive_warning_ids][]"
                                        id="exclude_work_search_archive_warning_ids_17" value="17">
                                    <span class="indicator" aria-hidden="true"></span><span>Graphic Depictions Of
                                        Violence (33261)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_archive_warning_ids_18">
                                    <input type="checkbox" name="exclude_work_search[archive_warning_ids][]"
                                        id="exclude_work_search_archive_warning_ids_18" value="18">
                                    <span class="indicator" aria-hidden="true"></span><span>Major Character Death
                                        (18147)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_archive_warning_ids_20">
                                    <input type="checkbox" name="exclude_work_search[archive_warning_ids][]"
                                        id="exclude_work_search_archive_warning_ids_20" value="20">
                                    <span class="indicator" aria-hidden="true"></span><span>Underage (11636)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_archive_warning_ids_19">
                                    <input type="checkbox" name="exclude_work_search[archive_warning_ids][]"
                                        id="exclude_work_search_archive_warning_ids_19" value="19">
                                    <span class="indicator" aria-hidden="true"></span><span>Rape/Non-Con (10269)</span>
                                </label>
                            </li>
                        </ul>
                    </dd>
                    <dt id="toggle_exclude_category_tags" class="filter-toggle category tags collapsed"><button
                            type="button" class="expander" aria-expanded="false" aria-controls="exclude_category_tags">
                            <span class="landmark">Exclude </span>Categories
                        </button></dt>
                    <dd id="exclude_category_tags" class="expandable category tags hidden">
                        <ul>
                            <li>
                                <label for="exclude_work_search_category_ids_23">
                                    <input type="checkbox" name="exclude_work_search[category_ids][]"
                                        id="exclude_work_search_category_ids_23" value="23">
                                    <span class="indicator" aria-hidden="true"></span><span>M/M (140731)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_category_ids_22">
                                    <input type="checkbox" name="exclude_work_search[category_ids][]"
                                        id="exclude_work_search_category_ids_22" value="22">
                                    <span class="indicator" aria-hidden="true"></span><span>F/M (63151)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_category_ids_21">
                                    <input type="checkbox" name="exclude_work_search[category_ids][]"
                                        id="exclude_work_search_category_ids_21" value="21">
                                    <span class="indicator" aria-hidden="true"></span><span>Gen (54401)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_category_ids_2246">
                                    <input type="checkbox" name="exclude_work_search[category_ids][]"
                                        id="exclude_work_search_category_ids_2246" value="2246">
                                    <span class="indicator" aria-hidden="true"></span><span>Multi (22634)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_category_ids_116">
                                    <input type="checkbox" name="exclude_work_search[category_ids][]"
                                        id="exclude_work_search_category_ids_116" value="116">
                                    <span class="indicator" aria-hidden="true"></span><span>F/F (18415)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_category_ids_24">
                                    <input type="checkbox" name="exclude_work_search[category_ids][]"
                                        id="exclude_work_search_category_ids_24" value="24">
                                    <span class="indicator" aria-hidden="true"></span><span>Other (12392)</span>
                                </label>
                            </li>
                        </ul>
                    </dd>
                    <dt id="toggle_exclude_fandom_tags" class="filter-toggle fandom tags collapsed"><button
                            type="button" class="expander" aria-expanded="false" aria-controls="exclude_fandom_tags">
                            <span class="landmark">Exclude </span>Fandoms
                        </button></dt>
                    <dd id="exclude_fandom_tags" class="expandable fandom tags hidden">
                        <ul>
                            <li>
                                <label for="exclude_work_search_fandom_ids_3828398">
                                    <input type="checkbox" name="exclude_work_search[fandom_ids][]"
                                        id="exclude_work_search_fandom_ids_3828398" value="3828398">
                                    <span class="indicator" aria-hidden="true"></span><span>僕のヒーローアカデミア | Boku no Hero
                                        Academia | My Hero Academia (264754)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_fandom_ids_13999">
                                    <input type="checkbox" name="exclude_work_search[fandom_ids][]"
                                        id="exclude_work_search_fandom_ids_13999" value="13999">
                                    <span class="indicator" aria-hidden="true"></span><span>Naruto (1119)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_fandom_ids_758208">
                                    <input type="checkbox" name="exclude_work_search[fandom_ids][]"
                                        id="exclude_work_search_fandom_ids_758208" value="758208">
                                    <span class="indicator" aria-hidden="true"></span><span>Haikyuu!! (685)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_fandom_ids_136512">
                                    <input type="checkbox" name="exclude_work_search[fandom_ids][]"
                                        id="exclude_work_search_fandom_ids_136512" value="136512">
                                    <span class="indicator" aria-hidden="true"></span><span>Harry Potter - J. K. Rowling
                                        (624)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_fandom_ids_721553">
                                    <input type="checkbox" name="exclude_work_search[fandom_ids][]"
                                        id="exclude_work_search_fandom_ids_721553" value="721553">
                                    <span class="indicator" aria-hidden="true"></span><span>Shingeki no Kyojin | Attack
                                        on Titan (499)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_fandom_ids_34135873">
                                    <input type="checkbox" name="exclude_work_search[fandom_ids][]"
                                        id="exclude_work_search_fandom_ids_34135873" value="34135873">
                                    <span class="indicator" aria-hidden="true"></span><span>鬼滅の刃 | Demon Slayer: Kimetsu
                                        no Yaiba (Anime) (497)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_fandom_ids_2692">
                                    <input type="checkbox" name="exclude_work_search[fandom_ids][]"
                                        id="exclude_work_search_fandom_ids_2692" value="2692">
                                    <span class="indicator" aria-hidden="true"></span><span>Original Work (446)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_fandom_ids_448284">
                                    <input type="checkbox" name="exclude_work_search[fandom_ids][]"
                                        id="exclude_work_search_fandom_ids_448284" value="448284">
                                    <span class="indicator" aria-hidden="true"></span><span>Pocket Monsters | Pokemon -
                                        All Media Types (438)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_fandom_ids_86392389">
                                    <input type="checkbox" name="exclude_work_search[fandom_ids][]"
                                        id="exclude_work_search_fandom_ids_86392389" value="86392389">
                                    <span class="indicator" aria-hidden="true"></span><span>One Piece (Anime &amp;
                                        Manga) (421)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_fandom_ids_414093">
                                    <input type="checkbox" name="exclude_work_search[fandom_ids][]"
                                        id="exclude_work_search_fandom_ids_414093" value="414093">
                                    <span class="indicator" aria-hidden="true"></span><span>Marvel Cinematic Universe
                                        (411)</span>
                                </label>
                            </li>
                        </ul>
                    </dd>
                    <dt id="toggle_exclude_character_tags" class="filter-toggle character tags collapsed"><button
                            type="button" class="expander" aria-expanded="false" aria-controls="exclude_character_tags">
                            <span class="landmark">Exclude </span>Characters
                        </button></dt>
                    <dd id="exclude_character_tags" class="expandable character tags hidden">
                        <ul>
                            <li>
                                <label for="exclude_work_search_character_ids_3741113">
                                    <input type="checkbox" name="exclude_work_search[character_ids][]"
                                        id="exclude_work_search_character_ids_3741113" value="3741113">
                                    <span class="indicator" aria-hidden="true"></span><span>Midoriya Izuku
                                        (136265)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_character_ids_3741110">
                                    <input type="checkbox" name="exclude_work_search[character_ids][]"
                                        id="exclude_work_search_character_ids_3741110" value="3741110">
                                    <span class="indicator" aria-hidden="true"></span><span>Bakugou Katsuki
                                        (126282)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_character_ids_4598837">
                                    <input type="checkbox" name="exclude_work_search[character_ids][]"
                                        id="exclude_work_search_character_ids_4598837" value="4598837">
                                    <span class="indicator" aria-hidden="true"></span><span>Todoroki Shouto
                                        (74081)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_character_ids_8689774">
                                    <input type="checkbox" name="exclude_work_search[character_ids][]"
                                        id="exclude_work_search_character_ids_8689774" value="8689774">
                                    <span class="indicator" aria-hidden="true"></span><span>Aizawa Shouta | Eraserhead
                                        (69200)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_character_ids_3958226">
                                    <input type="checkbox" name="exclude_work_search[character_ids][]"
                                        id="exclude_work_search_character_ids_3958226" value="3958226">
                                    <span class="indicator" aria-hidden="true"></span><span>Kirishima Eijirou
                                        (66682)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_character_ids_3958238">
                                    <input type="checkbox" name="exclude_work_search[character_ids][]"
                                        id="exclude_work_search_character_ids_3958238" value="3958238">
                                    <span class="indicator" aria-hidden="true"></span><span>Uraraka Ochako
                                        (48826)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_character_ids_3958253">
                                    <input type="checkbox" name="exclude_work_search[character_ids][]"
                                        id="exclude_work_search_character_ids_3958253" value="3958253">
                                    <span class="indicator" aria-hidden="true"></span><span>Kaminari Denki
                                        (48400)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_character_ids_9866728">
                                    <input type="checkbox" name="exclude_work_search[character_ids][]"
                                        id="exclude_work_search_character_ids_9866728" value="9866728">
                                    <span class="indicator" aria-hidden="true"></span><span>Yagi Toshinori | All Might
                                        (40980)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_character_ids_5747754">
                                    <input type="checkbox" name="exclude_work_search[character_ids][]"
                                        id="exclude_work_search_character_ids_5747754" value="5747754">
                                    <span class="indicator" aria-hidden="true"></span><span>Shinsou Hitoshi
                                        (37354)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_character_ids_10740979">
                                    <input type="checkbox" name="exclude_work_search[character_ids][]"
                                        id="exclude_work_search_character_ids_10740979" value="10740979">
                                    <span class="indicator" aria-hidden="true"></span><span>Class 1-A (My Hero Academia)
                                        (35916)</span>
                                </label>
                            </li>
                        </ul>
                    </dd>
                    <dt id="toggle_exclude_relationship_tags" class="filter-toggle relationship tags collapsed"><button
                            type="button" class="expander" aria-expanded="false"
                            aria-controls="exclude_relationship_tags">
                            <span class="landmark">Exclude </span>Relationships
                        </button></dt>
                    <dd id="exclude_relationship_tags" class="expandable relationship tags hidden">
                        <ul>
                            <li>
                                <label for="exclude_work_search_relationship_ids_3741107">
                                    <input type="checkbox" name="exclude_work_search[relationship_ids][]"
                                        id="exclude_work_search_relationship_ids_3741107" value="3741107">
                                    <span class="indicator" aria-hidden="true"></span><span>Bakugou Katsuki/Midoriya
                                        Izuku (36475)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_relationship_ids_4918711">
                                    <input type="checkbox" name="exclude_work_search[relationship_ids][]"
                                        id="exclude_work_search_relationship_ids_4918711" value="4918711">
                                    <span class="indicator" aria-hidden="true"></span><span>Bakugou Katsuki/Kirishima
                                        Eijirou (29398)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_relationship_ids_4687704">
                                    <input type="checkbox" name="exclude_work_search[relationship_ids][]"
                                        id="exclude_work_search_relationship_ids_4687704" value="4687704">
                                    <span class="indicator" aria-hidden="true"></span><span>Midoriya Izuku/Todoroki
                                        Shouto (22699)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_relationship_ids_11910691">
                                    <input type="checkbox" name="exclude_work_search[relationship_ids][]"
                                        id="exclude_work_search_relationship_ids_11910691" value="11910691">
                                    <span class="indicator" aria-hidden="true"></span><span>Aizawa Shouta |
                                        Eraserhead/Yamada Hizashi | Present Mic (19119)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_relationship_ids_7256141">
                                    <input type="checkbox" name="exclude_work_search[relationship_ids][]"
                                        id="exclude_work_search_relationship_ids_7256141" value="7256141">
                                    <span class="indicator" aria-hidden="true"></span><span>Bakugou Katsuki &amp;
                                        Midoriya Izuku (14703)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_relationship_ids_6404978">
                                    <input type="checkbox" name="exclude_work_search[relationship_ids][]"
                                        id="exclude_work_search_relationship_ids_6404978" value="6404978">
                                    <span class="indicator" aria-hidden="true"></span><span>Bakugou Katsuki/Todoroki
                                        Shouto (10405)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_relationship_ids_14714195">
                                    <input type="checkbox" name="exclude_work_search[relationship_ids][]"
                                        id="exclude_work_search_relationship_ids_14714195" value="14714195">
                                    <span class="indicator" aria-hidden="true"></span><span>Aizawa Shouta | Eraserhead
                                        &amp; Midoriya Izuku (10155)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_relationship_ids_49364710">
                                    <input type="checkbox" name="exclude_work_search[relationship_ids][]"
                                        id="exclude_work_search_relationship_ids_49364710" value="49364710">
                                    <span class="indicator" aria-hidden="true"></span><span>Dabi | Todoroki Touya/Takami
                                        Keigo | Hawks (9872)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_relationship_ids_17268954">
                                    <input type="checkbox" name="exclude_work_search[relationship_ids][]"
                                        id="exclude_work_search_relationship_ids_17268954" value="17268954">
                                    <span class="indicator" aria-hidden="true"></span><span>Kaminari Denki/Shinsou
                                        Hitoshi (8226)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_relationship_ids_5155513">
                                    <input type="checkbox" name="exclude_work_search[relationship_ids][]"
                                        id="exclude_work_search_relationship_ids_5155513" value="5155513">
                                    <span class="indicator" aria-hidden="true"></span><span>Midoriya Izuku/Uraraka
                                        Ochako (8097)</span>
                                </label>
                            </li>
                        </ul>
                    </dd>
                    <dt id="toggle_exclude_freeform_tags" class="filter-toggle freeform tags collapsed"><button
                            type="button" class="expander" aria-expanded="false" aria-controls="exclude_freeform_tags">
                            <span class="landmark">Exclude </span>Additional Tags
                        </button></dt>
                    <dd id="exclude_freeform_tags" class="expandable freeform tags hidden">
                        <ul>
                            <li>
                                <label for="exclude_work_search_freeform_ids_110">
                                    <input type="checkbox" name="exclude_work_search[freeform_ids][]"
                                        id="exclude_work_search_freeform_ids_110" value="110">
                                    <span class="indicator" aria-hidden="true"></span><span>Fluff (46686)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_freeform_ids_176">
                                    <input type="checkbox" name="exclude_work_search[freeform_ids][]"
                                        id="exclude_work_search_freeform_ids_176" value="176">
                                    <span class="indicator" aria-hidden="true"></span><span>Angst (33402)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_freeform_ids_10216243">
                                    <input type="checkbox" name="exclude_work_search[freeform_ids][]"
                                        id="exclude_work_search_freeform_ids_10216243" value="10216243">
                                    <span class="indicator" aria-hidden="true"></span><span>Bakugou Katsuki Swears A Lot
                                        (22860)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_freeform_ids_2379">
                                    <input type="checkbox" name="exclude_work_search[freeform_ids][]"
                                        id="exclude_work_search_freeform_ids_2379" value="2379">
                                    <span class="indicator" aria-hidden="true"></span><span>Hurt/Comfort (20982)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_freeform_ids_214055">
                                    <input type="checkbox" name="exclude_work_search[freeform_ids][]"
                                        id="exclude_work_search_freeform_ids_214055" value="214055">
                                    <span class="indicator" aria-hidden="true"></span><span>Not Beta Read (17235)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_freeform_ids_16433199">
                                    <input type="checkbox" name="exclude_work_search[freeform_ids][]"
                                        id="exclude_work_search_freeform_ids_16433199" value="16433199">
                                    <span class="indicator" aria-hidden="true"></span><span>Bakugou Katsuki is Bad at
                                        Feelings (16257)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_freeform_ids_604127">
                                    <input type="checkbox" name="exclude_work_search[freeform_ids][]"
                                        id="exclude_work_search_freeform_ids_604127" value="604127">
                                    <span class="indicator" aria-hidden="true"></span><span>Other Additional Tags to Be
                                        Added (16031)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_freeform_ids_842172">
                                    <input type="checkbox" name="exclude_work_search[freeform_ids][]"
                                        id="exclude_work_search_freeform_ids_842172" value="842172">
                                    <span class="indicator" aria-hidden="true"></span><span>Aged-Up Character(s)
                                        (15479)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_freeform_ids_86724730">
                                    <input type="checkbox" name="exclude_work_search[freeform_ids][]"
                                        id="exclude_work_search_freeform_ids_86724730" value="86724730">
                                    <span class="indicator" aria-hidden="true"></span><span>Parental Aizawa Shouta |
                                        Eraserhead | Dadzawa (15470)</span>
                                </label>
                            </li>
                            <li>
                                <label for="exclude_work_search_freeform_ids_143795">
                                    <input type="checkbox" name="exclude_work_search[freeform_ids][]"
                                        id="exclude_work_search_freeform_ids_143795" value="143795">
                                    <span class="indicator" aria-hidden="true"></span><span>Alternate Universe - Canon
                                        Divergence (15176)</span>
                                </label>
                            </li>
                        </ul>
                    </dd>
                    <dt class="autocomplete search">
                        <label for="work_search_excluded_tag_names_autocomplete">Other tags to exclude</label>
                    </dt>
                    <dd class="autocomplete search">
                        <ul class="autocomplete">
                            <li class="input"><input type="text" class="text" autocomplete="off" role="combobox"
                                    aria-expanded="true" aria-autocomplete="list"
                                    id="work_search_excluded_tag_names_autocomplete">
                                <div class="autocomplete dropdown" style="display: none;"></div>
                            </li>
                        </ul><input class="autocomplete" data-autocomplete-method="/autocomplete/tag"
                            data-autocomplete-hint-text="Start typing for suggestions!"
                            data-autocomplete-no-results-text="(No suggestions found)" data-autocomplete-min-chars="1"
                            data-autocomplete-searching-text="Searching..." type="text"
                            name="work_search[excluded_tag_names]" id="work_search_excluded_tag_names"
                            style="display: none;">
                    </dd>
                </dl>
            </dd>

            <dt class="more heading">
                <h4 class="heading">More Options</h4>
            </dt>

            <dd class="more group">
                <dl>
                    <dt id="toggle_work_crossover" class="filter-toggle crossover collapsed"><button type="button"
                            class="expander" aria-expanded="false" aria-controls="work_crossover">Crossovers</button>
                    </dt>
                    <dd id="work_crossover" class="expandable hidden">
                        <ul>
                            <li>
                                <label for="work_search_crossover_">
                                    <input type="radio" value="" checked="checked" name="work_search[crossover]"
                                        id="work_search_crossover_">
                                    <span class="indicator" aria-hidden="true"></span><span>Include crossovers</span>
                                </label>
                            </li>
                            <li>
                                <label for="work_search_crossover_f">
                                    <input type="radio" value="F" name="work_search[crossover]"
                                        id="work_search_crossover_f">
                                    <span class="indicator" aria-hidden="true"></span><span>Exclude crossovers</span>
                                </label>
                            </li>
                            <li>
                                <label for="work_search_crossover_t">
                                    <input type="radio" value="T" name="work_search[crossover]"
                                        id="work_search_crossover_t">
                                    <span class="indicator" aria-hidden="true"></span><span>Show only crossovers</span>
                                </label>
                            </li>
                        </ul>
                    </dd>
                    <dt id="toggle_work_complete" class="filter-toggle status collapsed"><button type="button"
                            class="expander" aria-expanded="false" aria-controls="work_complete">Completion
                            Status</button></dt>
                    <dd id="work_complete" class="expandable hidden">
                        <ul>
                            <li>
                                <label for="work_search_complete_">
                                    <input type="radio" value="" checked="checked" name="work_search[complete]"
                                        id="work_search_complete_">
                                    <span class="indicator" aria-hidden="true"></span><span>All works</span>
                                </label>
                            </li>
                            <li>
                                <label for="work_search_complete_t">
                                    <input type="radio" value="T" name="work_search[complete]"
                                        id="work_search_complete_t">
                                    <span class="indicator" aria-hidden="true"></span><span>Complete works only</span>
                                </label>
                            </li>
                            <li>
                                <label for="work_search_complete_f">
                                    <input type="radio" value="F" name="work_search[complete]"
                                        id="work_search_complete_f">
                                    <span class="indicator" aria-hidden="true"></span><span>Works in progress
                                        only</span>
                                </label>
                            </li>
                        </ul>
                    </dd>
                    <dt id="toggle_work_words" class="filter-toggle words collapsed"><button type="button"
                            class="expander" aria-expanded="false" aria-controls="work_words">Word Count</button></dt>
                    <dd id="work_words" class="expandable hidden">
                        <dl class="range">
                            <dt><label for="work_search_words_from">From</label></dt>
                            <dd><input type="text" name="work_search[words_from]" id="work_search_words_from"></dd>
                            <dt><label for="work_search_words_to">To</label></dt>
                            <dd><input type="text" name="work_search[words_to]" id="work_search_words_to"></dd>
                        </dl>
                    </dd>
                    <dt id="toggle_work_dates" class="filter-toggle dates collapsed"><button type="button"
                            class="expander" aria-expanded="false" aria-controls="work_dates">Date Updated</button></dt>
                    <dd id="work_dates" class="expandable hidden">
                        <dl class="range">
                            <dt><label for="work_search_date_from">From</label></dt>
                            <dd><input class="datepicker hasDatepicker" type="text" name="work_search[date_from]"
                                    id="work_search_date_from"></dd>
                            <dt><label for="work_search_date_to">To</label></dt>
                            <dd><input class="datepicker hasDatepicker" type="text" name="work_search[date_to]"
                                    id="work_search_date_to"></dd>
                        </dl>
                    </dd>

                    <dt class="search">
                        <label for="work_search_query">Search within results</label>
                        <a class="help symbol question modal modal-attached" title="Work search text help"
                            aria-controls="#modal" href="/help/work-search-text-help.html"><span
                                class="symbol question"><span>?</span></span></a>
                    </dt>
                    <dd class="search">
                        <input type="text" name="work_search[query]" id="work_search_query">
                    </dd>

                    <dt class="language">
                        <label for="work_search_language_id">Language</label>
                    </dt>
                    <dd class="language">
                        <select name="work_search[language_id]" id="work_search_language_id">
                            <option value=""></option>
                            <option value="so">af Soomaali</option>
                            <option value="afr">Afrikaans</option>
                            <option value="ar">العربية</option>
                            <option value="egy">𓂋𓏺𓈖 𓆎𓅓𓏏𓊖</option>
                            <option value="arc">ܐܪܡܝܐ | ארמיא</option>
                            <option value="hy">հայերեն</option>
                            <option value="ast">asturianu</option>
                            <option value="id">Bahasa Indonesia</option>
                            <option value="ms">Bahasa Malaysia</option>
                            <option value="bg">Български</option>
                            <option value="bn">বাংলা</option>
                            <option value="jv">Basa Jawa</option>
                            <option value="ba">Башҡорт теле</option>
                            <option value="be">беларуская</option>
                            <option value="bos">Bosanski</option>
                            <option value="br">Brezhoneg</option>
                            <option value="ca">Català</option>
                            <option value="ceb">Cebuano</option>
                            <option value="cs">Čeština</option>
                            <option value="chn">Chinuk Wawa</option>
                            <option value="cy">Cymraeg</option>
                            <option value="da">Dansk</option>
                            <option value="de">Deutsch</option>
                            <option value="et">eesti keel</option>
                            <option value="el">Ελληνικά</option>
                            <option value="sux">𒅴𒂠</option>
                            <option value="en">English</option>
                            <option value="ang">Eald Englisċ</option>
                            <option value="es">Español</option>
                            <option value="eo">Esperanto</option>
                            <option value="eu">Euskara</option>
                            <option value="fa">فارسی</option>
                            <option value="fil">Filipino</option>
                            <option value="fr">Français</option>
                            <option value="fur">Furlan</option>
                            <option value="ga">Gaeilge</option>
                            <option value="gd">Gàidhlig</option>
                            <option value="gl">Galego</option>
                            <option value="got">𐌲𐌿𐍄𐌹𐍃𐌺𐌰</option>
                            <option value="hak">中文-客家话</option>
                            <option value="ko">한국어</option>
                            <option value="hau">Hausa | هَرْشَن هَوْسَ</option>
                            <option value="hi">हिन्दी</option>
                            <option value="hr">Hrvatski</option>
                            <option value="haw">ʻŌlelo Hawaiʻi</option>
                            <option value="ia">Interlingua</option>
                            <option value="zu">isiZulu</option>
                            <option value="is">Íslenska</option>
                            <option value="it">Italiano</option>
                            <option value="he">עברית</option>
                            <option value="kan">ಕನ್ನಡ</option>
                            <option value="kat">ქართული</option>
                            <option value="khm">ភាសាខ្មែរ</option>
                            <option value="qkz">Khuzdul</option>
                            <option value="sw">Kiswahili</option>
                            <option value="ht">kreyòl ayisyen</option>
                            <option value="ku">Kurdî | کوردی</option>
                            <option value="kir">Кыргызча</option>
                            <option value="fcs">Langue des signes québécoise</option>
                            <option value="lv">Latviešu valoda</option>
                            <option value="lb">Lëtzebuergesch</option>
                            <option value="lt">Lietuvių kalba</option>
                            <option value="la">Lingua latina</option>
                            <option value="hu">Magyar</option>
                            <option value="mk">македонски</option>
                            <option value="ml">മലയാളം</option>
                            <option value="mt">Malti</option>
                            <option value="mnc">ᠮᠠᠨᠵᡠ ᡤᡳᠰᡠᠨ</option>
                            <option value="mr">मराठी</option>
                            <option value="mik">Mikisúkî</option>
                            <option value="mon">ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ᠌ | Монгол Кирилл үсэг</option>
                            <option value="my">မြန်မာဘာသာ</option>
                            <option value="nah">Nāhuatl</option>
                            <option value="nan">中文-闽南话 臺語</option>
                            <option value="nl">Nederlands</option>
                            <option value="ja">日本語</option>
                            <option value="no">Norsk</option>
                            <option value="azj">Азәрбајҹан дили | آذربایجان دیلی</option>
                            <option value="ce">Нохчийн мотт</option>
                            <option value="ota">لسان عثمانى</option>
                            <option value="ps">پښتو</option>
                            <option value="nds">Plattdüütsch</option>
                            <option value="pl">Polski</option>
                            <option value="ptBR">Português brasileiro</option>
                            <option value="ptPT">Português europeu</option>
                            <option value="pa">ਪੰਜਾਬੀ</option>
                            <option value="kaz">qazaqşa | қазақша</option>
                            <option value="qya">Quenya</option>
                            <option value="ro">Română</option>
                            <option value="ru">Русский</option>
                            <option value="sco">Scots</option>
                            <option value="sq">Shqip</option>
                            <option value="sjn">Sindarin</option>
                            <option value="si">සිංහල</option>
                            <option value="sk">Slovenčina</option>
                            <option value="slv">Slovenščina</option>
                            <option value="gem">Sprēkō Þiudiskō</option>
                            <option value="sr">Српски</option>
                            <option value="fi">Suomi</option>
                            <option value="sv">Svenska</option>
                            <option value="ta">தமிழ்</option>
                            <option value="tel">తెలుగు</option>
                            <option value="th">ไทย</option>
                            <option value="tqx">Thermian</option>
                            <option value="bod">བོད་སྐད་</option>
                            <option value="vi">Tiếng Việt</option>
                            <option value="cop">ϯⲙⲉⲧⲣⲉⲙⲛ̀ⲭⲏⲙⲓ</option>
                            <option value="tlh">tlhIngan-Hol</option>
                            <option value="tok">toki pona</option>
                            <option value="tsd">τσακώνικα</option>
                            <option value="tr">Türkçe</option>
                            <option value="uk">Українська</option>
                            <option value="urd">اُردُو</option>
                            <option value="uig">ئۇيغۇر تىلى</option>
                            <option value="vol">Volapük</option>
                            <option value="wuu">中文-吴语</option>
                            <option value="yi">יידיש</option>
                            <option value="yua">maayaʼ tʼàan</option>
                            <option value="yue">中文-广东话 粵語</option>
                            <option value="zh">中文-普通话 國語</option>
                        </select>
                    </dd>
                </dl>
            </dd>
            <dt class="landmark">Submit</dt>
            <dd class="submit actions"><input type="submit" name="commit" value="Sort and Filter"></dd>
        </dl>

        <p class="footnote">
            <a
                href="/tags/%E5%83%95%E3%81%AE%E3%83%92%E3%83%BC%E3%83%AD%E3%83%BC%E3%82%A2%E3%82%AB%E3%83%87%E3%83%9F%E3%82%A2%20%7C%20Boku%20no%20Hero%20Academia%20%7C%20My%20Hero%20Academia/works">Clear
                Filters</a>
        </p>

        <div>

            <input type="hidden" name="tag_id" id="tag_id"
                value="僕のヒーローアカデミア | Boku no Hero Academia | My Hero Academia" class="text">



        </div>

    </fieldset>
    <p class="narrow-shown hidden">
        <a href="#main" id="leave_filters" class="close">
            Top of Work Index
        </a>
    </p>

</form>
`;