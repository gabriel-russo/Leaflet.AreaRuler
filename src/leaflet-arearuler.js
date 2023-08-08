import L from "leaflet";
import "leaflet-draw";
import "./leaflet-polygon-measure";
import "./leaflet-arearuler.css";

L.Control.AreaRuler = L.Control.extend({
  options: {
    position: 'topleft',
    unity: 'm',
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
    text: {
      title: 'Measure area',
    },
  },

  initialize(options) {
    options = options || {};
    /*
      This fix this situation: The user change only one text option, then all the
      this.options.text object is replaced by the new one, so the other options are lost,
      showing "undefined" in the segments box.
    */
    options.text = L.Util.extend(this.options.text, options.text);

    L.Util.setOptions(this, options);
  },

  enabled() {
    return this._handler.enabled();
  },

  toggle() {
    if (this._handler.enabled()) {
      this._map.fire("arearuler:measurestop");
      this._handler.disable.call(this._handler);
    } else {
      this._map.fire("arearuler:measurestart");
      this._handler.enable.call(this._handler);
    }
  },

  setOptions(options) {
    this._handler.setOptions(options);
  },

  onAdd(map) {
    let link = null;
    let className = 'leaflet-control-draw';

    this._container = L.DomUtil.create('div', 'leaflet-bar');

    this._handler = new L.Polygon.Measure(map, this.options);

    this._handler.on('enabled', () => {
      L.DomUtil.addClass(this._container, 'enabled');
    }, this);

    this._handler.on('disabled', () => {
      L.DomUtil.removeClass(this._container, 'enabled');
    }, this);

    link = L.DomUtil.create('a', `${className}-area-ruler`, this._container);
    link.href = '#';
    link.title = this.options.text.title;

    L.DomEvent
      .addListener(link, 'click', L.DomEvent.stopPropagation)
      .addListener(link, 'click', L.DomEvent.preventDefault)
      .addListener(link, 'click', this.toggle, this);

    return this._container;
  },
});

L.Map.mergeOptions({
  areaRulerControl: false,
});

L.Map.addInitHook(function () {
  if (this.options.areaRulerControl) {
    this.areaRulerControl = L.Control.arearuler()
      .addTo(this);
  }
});

L.Control.arearuler = (options) => new L.Control.AreaRuler(options);
