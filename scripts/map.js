// Set the dimensions of the SVG container
const width = 960;
const height = 600;

// Create an SVG element
const svg = d3.select("svg")
  .attr("width", width)
  .attr("height", height);

// Set up a projection for the UK map
const projection = d3.geoNaturalEarth1()
  .center([-3.5, 55.4]) // Center the map on the UK
  .scale(3000)          // Adjust the scale for the UK
  .translate([width / 2, height / 2]);

// Create a path generator using the projection
const path = d3.geoPath().projection(projection);

// Load the TopoJSON data from the URL
d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json').then(worldData => {
  // Extract the GeoJSON feature for the United Kingdom (country code: 826)
  const countries = topojson.feature(worldData, worldData.objects.countries).features;
  const uk = countries.filter(d => d.id === "826"); // United Kingdom's country code is 826

  // Bind the UK data and create one path per feature
  svg.selectAll('path')
    .data(uk)
    .enter().append('path')
    .attr('d', path)
    .attr('fill', '#69b3a2')
    .attr('stroke', '#000')
    .attr('stroke-width', 0.5);
}).catch(error => {
  console.error('Error loading or parsing the TopoJSON file:', error);
});