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

headroom1.init();
