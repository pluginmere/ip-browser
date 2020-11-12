'use strict';


sinon.config = {
  useFakeTimers: false,
};


// Expose methods of Chai:
const assert = chai.assert; // Using Assert style
const expect = chai.expect; // Using Expect style
const should = chai.should(); // Using Should style



const try_interval_ms = 25;
const delayed_test = (test_cb, cleanup_cb, athis, done) => {
  let max_try_N = 100;
  return (function () {
    this.timeout(max_try_N * try_interval_ms + 1000);
    let itl = setInterval(() => {

      try {
        test_cb();
        cleanup_cb();
        clearInterval(itl);
        done();

      } catch (e) {

        if (--max_try_N < 0) {
          clearInterval(itl);
          cleanup_cb();
          done(e);
        }
      }
    }, try_interval_ms);
  }).call(athis);
};



describe("In-Page Browser", () => {

  beforeEach(() => {

  });

  afterEach(() => {
    sinon.restore();
  });

  context("Prerequisite: Chai", function () {

    it("should expose the Chai `assert` method", function () {
      assert.ok(true, "Assert is defined");
    });

    it("Should expose the Chai `expect` method", function () {
      expect("foo").to.not.equal("bar");
    });

    it("Should expose the Chai `should` property", function () {
      should.exist(123);
      (1).should.not.equal(2);
    });

    it("Should work with ES6 fat arrow function", () => {
      (1).should.not.equal(2);
    });
  });

  context("Prerequisite: GLOBALS", () => {

    it('`window` should be defined', function () {
      expect(window, "`window` should be defined").to.exist;
    });

    it('`$/jQuery` should be defined', function (done) {
      const test_cb = () => {
        expect(window.$, "`$` should be defined").to.exist;
        assert.typeOf(window.$, "function", "$ should be a function");
      };
      const cleanup_cb = () => { /* ignore */ };
      delayed_test(test_cb, cleanup_cb, this, done);

    });
  });

  context("Initialisation", function () {

    it('`window.in_page_browser` should be defined', function () {
      expect(window.in_page_browser, "`window.in_page_browser` should be defined").to.exist;
      assert.typeOf(window.in_page_browser, "object", "window.in_page_browser should be an object");
    });

    it('should call `_activate()` once', function (done) {

      expect($, "`$` should be defined").to.exist;
      let _activate = sinon.spy(window.in_page_browser, '_activate');

      in_page_browser.activate();
      in_page_browser.activate();
      in_page_browser.activate();

      delayed_test(
        () => {
          sinon.assert.calledOnce(_activate);
        },
        () => {
          _activate.restore();
        }, this, done);
    });

    it('should call `_deactivate()` once', function (done) {

      expect($, "`$` should be defined").to.exist;
      let _deactivate = sinon.spy(window.in_page_browser, '_deactivate');

      in_page_browser.deactivate();
      in_page_browser.deactivate();
      in_page_browser.deactivate();

      delayed_test(
        () => {
          sinon.assert.calledOnce(_deactivate);
        },
        () => {
          _deactivate.restore();
        }, this, done);
    });
  });

});
