let map, tileLayer;
map = L.map("could-be-map");
tileLayer = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
              attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> &copy; <a href='http://carto.com/attribution'>CARTO</a>",
              subdomains: "abcd",
              maxZoom: 18
            }).addTo(map);
map.setView([40.730833, -73.9975], 16);

let couldBeFeatures;
$.getJSON("FunHomeLocations.json", function(data){

let couldBeLayer;
  
  couldBeFeatures = data.features.map(function(feature){

    return {
      name: feature.properties.name,
      html: feature.properties.html,
      tab: feature.properties.tab,
      mentions: feature.properties.mentions,
      lines: feature.properties.lines,
      wikipedia: feature.properties.wikipedia,
     
      latLng: L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0])
    };
  });
  

  couldBeLayer = L.featureGroup(couldBeFeatures.map(function(feature){
    let content = "<h4>" + feature.name + "</h4>";
    return L.circleMarker(feature.latLng).bindPopup(content);
    })
  )

  couldBeLayer.addTo(map);

  map.fitBounds(couldBeLayer.getBounds());

  map.zoomOut(1);
});

L.circle([41.077460, -77.568879], {radius:2000, color: '#D1DDF3', opacity: .7}).addTo(map)

let md;
md = window.markdownit({html: true}).use(window.markdownitFootnote);
// Load the Markdown file with jQuery.
["Dads-Grave", "Route-one-fifty", "House-Raised", "introduction", "Farm-Born"].forEach(function(tab){
  // Create a variable tab that has the name as a string.
let urlString = "https://raw.githubusercontent.com/cordonc/markdownFile/main/"

$.ajax({
  url: urlString + tab + ".md",
  success: function(markdown){
    // Convert the Markdown to HTML.
    let html;
    html = md.render(markdown);
    // Print the HTML to #content using jQuery.
    // "#rampart", for example.
    $("#" + tab).html(html);
    }
  });
});


/*
$.ajax({
  url: "https://the-javascripting-english-major.org/v1/examples/markdown/poem.md",
  success: function(poem){
  let html;
  html = md.render(poem);
  $("#poem").html(html);
  // The above is the same as the $.ajax() call in the prev. ch.
  $("#poem").html(function(_, oldHtml){
    let newHtml;
    newHtml = oldHtml.replace(/Hastings Street/g, "<a href='#' data-place='hastings-street'>Hastings Street</a>");
    return newHtml;
  });
  }
}); */ 
