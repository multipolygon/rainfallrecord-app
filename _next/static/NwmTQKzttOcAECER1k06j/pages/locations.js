(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"/wli":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/locations",function(){return n("oIH8")}])},oIH8:function(e,t,n){"use strict";n.r(t);var o=n("q1tI"),a=n.n(o),c=n("hlFM"),i=n("KQm4"),r=n("kKAo"),s=a.a.createElement;function u(e){var t=e.locations,n=Object(o.useRef)(),a=Object(o.useRef)(),c=Object(o.useCallback)((function(e){if(null!==e&&"object"===typeof window.L){var t=window.L.tileLayer("".concat("https://a.tile.openstreetmap.org","/{z}/{x}/{y}.png"),{attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}),o={Streetmap:t,Landscape:window.L.tileLayer("https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=".concat("4f26a147fa96437e85a7d77a8dffcfc7"),{attribution:'<a href="https://www.thunderforest.com/maps/landscape/">thunderforest.com</a>'})},c={};a.current=window.L.markerClusterGroup({showCoverageOnHover:!1,removeOutsideVisibleBounds:!0,animate:!1,animateAddingMarkers:!1,chunkedLoading:!0,zoomToBoundsOnClick:!1}),a.current.on("clusterclick",(function(e){e.layer.zoomToBounds({padding:[20,20],animate:!0})})),window.L.layerGroup(),c.Locations=a.current,n.current=window.L.map(e,{center:[0,0],zoom:1,scrollWheelZoom:!1,fullscreenControl:{pseudoFullscreen:!0},layers:[t].concat(Object(i.a)(Object.values(c)))}),window.L.control.layers(o,c,{autoZIndex:!1,hideSingleBase:!0}).addTo(n.current)}}),[]);return Object(o.useEffect)((function(){if(t.type&&"FeatureCollection"===t.type&&t.features.length>0&&"object"===typeof window.L){var e=window.L.divIcon({html:"&#9679;",className:"mapicon",iconSize:[20,20]}),o=window.L.geoJSON(t,{pointToLayer:function(t,n){return window.L.marker(n,{icon:e})},style:{fillOpacity:.6},onEachFeature:function(e,t){var n=e.properties;t.bindPopup((function(){return'<a href="/location?id='.concat(n.id,'">').concat(n.title,", ").concat(n.location,"</a>")}),{autoPan:!0,autoPanPadding:[40,10],closeButton:!1,closeOnEscapeKey:!0,closeOnClick:!0,minWidth:220,maxWidth:220})}});o.addTo(a.current),n.current.fitBounds(o.getBounds(),{animate:!0,padding:[10,10]})}}),[t]),s(r.a,{ref:c,elevation:1,style:{height:"40vh",minHeight:"240px"}})}var l=n("e5ou"),d=n("h7RS"),p=n("SMIj"),f=a.a.createElement;t.default=function(){var e="".concat("https://data.rainfallrecord.app","/locations.json"),t=Object(o.useState)({type:"FeatureCollection",features:[]}),n=t[0],a=t[1];return Object(o.useEffect)((function(){"object"===typeof window.L&&window.fetch(e,{cache:"default",credentials:"omit",mode:"cors"}).then((function(e){e.ok&&e.json().then((function(e){a(e)}))}))}),[]),f(d.a,{title:"Locations"},f(l.a,null,f(l.b,null,"Locations"),f(u,{locations:n}),f(c.a,{mt:3},f(p.a,{locations:n.features.map((function(e){return e.properties}))}))))}}},[["/wli",0,2,1,3,4,7]]]);