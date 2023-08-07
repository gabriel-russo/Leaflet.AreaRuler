import L from "leaflet";
import "leaflet-draw";
import "./leaflet.Polygon.Measure";
import "./leaflet.AreaRuler.css";

L.Control.AreaRuler = L.Control.extend({

  statics: {
    TITLE: 'Measure area',
  },
  options: {
    position: 'topleft',
    showArea: true,
    showLength: true,
    shapeOptions: {
      color: "#d07f03",
      stroke: true,
      weight: 4,
      opacity: 0.7,
      fill: true,
      clickable: true,
    },
    icon: new L.DivIcon({
      iconSize: new L.Point(9, 9),
      className: 'leaflet-div-icon leaflet-editing-icon',
    }),
  },

  toggle() {
    if (this.handler.enabled()) {
      this.handler.disable.call(this.handler);
    } else {
      this.handler.enable.call(this.handler);
    }
  },

  onAdd(map) {
    let link = null;
    let className = 'leaflet-control-draw';

    this._container = L.DomUtil.create('div', 'leaflet-bar');

    this.handler = new L.Polygon.Measure(map, this.options);

    this.handler.on('enabled', function () {
      this.enabled = true;
      L.DomUtil.addClass(this._container, 'enabled');
    }, this);

    this.handler.on('disabled', function () {
      delete this.enabled;
      L.DomUtil.removeClass(this._container, 'enabled');
    }, this);

    link = L.DomUtil.create('a', `${className}-area-ruler`, this._container);
    link.href = '#';
    link.title = L.Control.AreaRuler.TITLE;

    L.DomEvent
      .addListener(link, 'click', L.DomEvent.stopPropagation)
      .addListener(link, 'click', L.DomEvent.preventDefault)
      .addListener(link, 'click', this.toggle, this);

    return this._container;
  },
});

// L.Map.mergeOptions({
//   measureControl: false,
// });

// L.Map.addInitHook(function () {
//   if (this.options.measureControl) {
//     this.measureControl = L.Control.measureControl()
//       .addTo(this);
//   }
// });

L.Control.arearuler = function (options) {
  return new L.Control.AreaRuler(options);
};
