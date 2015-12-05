var headroom1  = new Headroom(document.querySelector("#totalHeader"), {
  "offset": 250,
  "tolerance": 20,
  "classes" : {
        // when element is initialised
        "initial" : "headroom",
        // when scrolling up
        "pinned" : "headroom--pinned",
        // when scrolling down
        "unpinned" : "headroom--unpinned",
        // when above offset
        "top" : "headroom--top",
        // when below offset
        "notTop" : "headroom--not-top"
  },
  onPin : function() {
  },
  onUnpin : function() {
  }
});
setTimeout(function(){
var headroom2  = new Headroom(document.querySelector(".post"), {
  "offset": 250,
  "tolerance": 20,
  "classes" : {
        // when element is initialised
        // when scrolling up
        "initial": "animated",
        "pinned": "slideDown",
        "unpinned": "slideUp"
  },
  onPin : function() {
  },
  onUnpin : function() {
  }
});
headroom2.init();
}, 500)


headroom1.init();
