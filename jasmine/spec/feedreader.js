/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* test loops through each item in the allFeeds array and checks if the url is defined
        and if it's length isn't 0 */
        it('has defined URL\'s', function () {
            allFeeds.forEach(function (item) {
                expect(item.url).toBeDefined();
                expect(item.url.length).not.toBe(0);
            });
        });

        /* test loops through each item in the allFeeds array and checks if the name is defined
        and if it's length isn't 0 */
        it('has defined names', function () {
            allFeeds.forEach(function (item) {
                expect(item.name).toBeDefined();
                expect(item.name.length).not.toBe(0);
            });
        });
    });

    //  new test suite named "The menu"
    describe('The menu', function () {
        var $body = document.querySelector('body');
        var $menuBtn = document.querySelector('a.menu-icon-link');

        // test checks if the body element contains class menu-hidden which hides the menu from the start
        it('is hidden by default', function () {
            expect($body.classList.contains('menu-hidden')).toBe(true);
        });

        /* test checks if the menu changes visibility after clicking on hamburger menu
        by expecting that body elements toggles onclick class menu-hidden which controls visibility of menu */
        it('changes visibility on click', function () {
            $menuBtn.click();
            expect($body.classList.contains('menu-hidden')).toBe(false);
            // click again and expect menu to be hidden now
            $menuBtn.click();
            expect($body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    // new test suite named "Initial Entries"
    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        /* test checks succes of the loadFeed() function by checking the number of the entries inside .feed element ;
         it expects to be greater than 0 which means that at least one article was fetched and displayed  */
        it('have at least one entry', function (done) {
            let entryNum = document.querySelectorAll('.feed .entry').length;
            expect(entryNum).toBeGreaterThan(0);
            done();
        });
    });

    //  new test suite named "New Feed Selection"
    describe('New Feed Selection', function () {
        // variable to store innerText of the first feed content
        let firstFeedContent;

        /* calls first loadFeed func and puts it's results inside firstFeedContent variable, and then
        calls second loadFeed function with done() as a callback to change content again and signal the end of async func */
        beforeEach(function (done) {
            loadFeed(0, function () {
                firstFeedContent = document.querySelector('.feed').innerText;
            });
            loadFeed(1, done);
        });

        // test checks if the content (innerText) of the first two feeds results is different
        it('the content changes', function (done) {
            /* secondFeedContent var contains results of the second loadFeed func from beforeEach
            which is then compared to firstFeedContent variable content */
            let secondFeedContent = document.querySelector('.feed').innerText;
            expect(firstFeedContent).not.toEqual(secondFeedContent);
            done();
        });
    });
}());