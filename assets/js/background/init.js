/*
 * Background Script
 *
 * This controls the background portion of the messaging system for Yuki's messaging system. The
 * messaging system is what allows data to pass between the injected script, content script and this
 * background page, which handles the extension processing.
 *
 * The core purpose of having the messaging system in place is communication between the managers on
 * the injected scripts with the devtools page for the purpose of modifying variables at runtime and
 * having them not be overwritten when a save occurs.
 */

(function() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse({message: "Test"});
  });
})();
