/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe("RSS Feeds", function() {
      /* This is our first test - it tests to make sure that the
       * allFeeds variable has been defined and that it is not
       * empty. Experiment with this before you get started on
       * the rest of this project. What happens when you change
       * allFeeds in app.js to be an empty array and refresh the
       * page?
       */
      /* This is a simple test where we use Jasmine's toBeDefined
        * matcher to verify the allFeeds array is defined. Also we
        * check that it is not empty by testing that lengthe is
        greater than zero
        */
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /* TODO: Write a test that loops through each feed
       * in the allFeeds object and ensures it has a URL defined
       * and that the URL is not empty.
       */
      /* Here again in the next two blocks we test that an object is
       * defined and its not empty. Also we check that the value is a
       * string.
       */
      for (const feed in allFeeds) {
        it("has url defined", function() {
          expect(allFeeds[feed].url).toBeDefined();
          expect(allFeeds[feed].url.length).not.toBe(0);
          expect(allFeeds[feed].url.constructor == String).toBe(true);
        });
      }

      /* TODO: Write a test that loops through each feed
       * in the allFeeds object and ensures it has a name defined
       * and that the name is not empty.
       */

      for (const feed in allFeeds) {
        it("has named defined", function() {
          expect(allFeeds[feed].name).toBeDefined();
          expect(allFeeds[feed].name.length).not.toBe(0);
          expect(allFeeds[feed].name.constructor == String).toBe(true);
        });
      }
    });

    /* TODO: Write a new test suite named "The menu" */
    describe("The menu", function() {
      /* TODO: Write a test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
      it("menu is hidden", function() {
        expect(document.getElementsByClassName("menu-hidden").length).toBe(1);
      });

      /* TODO: Write a test that ensures the menu changes
       * visibility when the menu icon is clicked. This test
       * should have two expectations: does the menu display when
       * clicked and does it hide when clicked again.
       */
      /* Here we click the menu icon and then check the DOM to verify
       * the menu-hidden class is removed, and then we click again to
       * verify that the menu-hidden class is added back to the DOM.
       */
      it("menu changes visibility", function() {
        $(".menu-icon-link").click();
        expect(
          document.querySelector("body").classList.contains("menu-hidden")
        ).toBe(false);
        $(".menu-icon-link").click();
        expect(
          document.querySelector("body").classList.contains("menu-hidden")
        ).toBe(true);
      });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function() {
      /* TODO: Write a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */
      /*  For async calls we use beforEach to make the calls and done
       * to notify Jasmine when the call has finished. Here we check that
       * the entries are populated
       */
      beforeEach(function(done) {
        loadFeed(0, done);
      });

      it("completes work", function(done) {
        expect($("div.feed > a").length > 0).toBe(true);
        done();
      });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {
      const pageFeeds = [];

      /* TODO: Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
      /* A new feed is loaded and its contentes are saved in an array.
       * A second feed is loaded and added to the array, then we compare
       * both array elements to verify they are different.
       */

      beforeEach(function(done) {
        loadFeed(1, function() {
          pageFeeds.push($("div.feed > a")[0].innerText);
          done();
          //  console.log(pageFeeds);
        });
        loadFeed(2, function() {
          pageFeeds.push($("div.feed > a")[0].innerText);
          done();
        });
        //console.log(pageFeeds);
      });
      it("content changes", function() {
        expect(pageFeeds[0] == pageFeeds[1]).toBe(false);
      });
    });
    //  });
  })()
);
