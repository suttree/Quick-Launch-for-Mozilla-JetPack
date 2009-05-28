/* Quick launch - clickable favicons in the status bar for your most visited websites */
/* Duncan Gough - http://suttree.com */
var topSites = new Array();
var statusBar = null;

jetpack.tabs.onReady(function(doc){
  trackWebsite(doc.baseURI);
});

function trackWebsite(url){
  var host = getHost(url);
  if (host && host != 'browser') {
    if (topSites[host]) {
      topSites[host] = topSites[host] + 1;
    } else {
      topSites[host] = 1;
    }

    var sortable = []
    for (var site in topSites) {
      sortable.push([site, topSites[site]])
    }
    sortable.sort(function(a, b) {return a[1] - b[1]}).reverse();
    sortable = sortable.splice(0,5);

    var tmp = [];
    for (var i in sortable) {
      tmp.push('<a href="http://' + sortable[i][0] + '" target="_blank"><img src="http://' + sortable[i][0] + '/favicon.ico" height="16" width="16" border="0"></a>')
    }
    statusBar.html( tmp.join(' ') );
  }
}

function getHost(url) {
  return url.split('/')[2];
}

jetpack.statusBar.append({ 
  html: '<span id="quickLaunch"></span>', 
  onReady: function(doc){ 
    statusBar = $(doc).find("#quickLaunch");
  }, 
  width: 100 
});