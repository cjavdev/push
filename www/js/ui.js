// ui things for facebook login
/*global window */
/*global document */

"use strict";

//Swaps the pages out when the user taps on a choice
//bastardized router
// function openPage(pageName, ignoreHistoryPush) {
//   var i,
//     els = document.getElementsByClassName('page'),
//     page = document.getElementById('page-' + pageName);
//
//   window.scrollTo(0, 1);
//
//   for (i = 0; i < els.length; ++i) {
//     els[i].style.display = 'none';
//   }
//
//   page.style.display = "block";
//
//   var title = (pageName === 'root') ? 'pushbit' : pageName.replace(/-/g, ' ');
//   document.getElementById('title').innerHTML = title;
//
//   if (ignoreHistoryPush !== true) {
//     window.history.pushState({
//       page: pageName
//     }, '', document.location.origin + document.location.pathname + "#" + pageName);
//   }
//
//   document.getElementById('back').style.display = (pageName === 'root') ? 'none' : 'block';
// }

// window.onpopstate = function (e) {
//   if (e.state !== null) {
//     console.log(e.state);
//     openPage(e.state.page);
//   } else {
//     openPage('root', true);
//   }
// };

//Shows a modal dialog when fetcing data from Facebook
// function setAction(msg, hideBackground) {
//   document.getElementById('action').style.display = 'block';
//   if (hideBackground) {
//     document.getElementById('action').style.opacity = '100';
//   } else {
//     document.getElementById('action').style.opacity = '.9';
//   }
//   document.getElementById('msg').innerHTML = msg;
//   window.scrollTo(0, 1);
// }

//Clears the modal dialog
// function clearAction() {
//   document.getElementById('msg').innerHTML = '';
//   document.getElementById('action').style.display = 'none';
// }

// function hideURLbar() {
//   window.scrollTo(0, 1);
// }
//
// //Automatically scroll away the address bar
// window.addEventListener("load", function () {
//   setTimeout(hideURLbar, 0);
// }, false);
//
// function hideButton(button) {
//   button.style.display = 'none';
// }
//
// //show a loading screen when launched, until we get the user's session back
// setAction("Loading pushbit", true);
// openPage('root', true);
