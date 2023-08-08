import L from "leaflet";
import "./leaflet-geometry-util";

L.Polygon.Measure = L.Draw.Polygon.extend({
  addHooks() {
    L.Draw.Polygon.prototype.addHooks.call(this);

    const label = {
      m: 'm²',
      ha: 'ha',
      alq: 'alq (SP)',
      km: 'km²',
    }; // TODO: Add (mi, ac, yd)

    L.Util.setOptions(this, { label });

    if (this._map) {
      this._markerGroup = new L.LayerGroup();
      this._lastMeasure = new L.FeatureGroup();
      this._map.addLayer(this._markerGroup)
        .addLayer(this._lastMeasure);
      this._markers = [];
      this._map.on('click', this._onClick, this);
      this._startShape();
    }
  },

  removeHooks() {
    L.Draw.Polygon.prototype.removeHooks.call(this);

    this._map.removeLayer(this._lastMeasure);

    this._clearHideErrorTimeout();

    this._map.off('pointermove', this._onMouseMove, this)
      .off('mousemove', this._onMouseMove, this)
      .off("click", this._onClick, this);

    this._clearGuides();

    this._container.style.cursor = '';

    this._removeShape();
  },

  _startShape() {
    this._drawing = true;

    this._poly = new L.Polyline([], this.options.shapeOptions);

    this._poly._onClick = () => {
    };

    this._updateTooltip();

    this._map.on('pointermove', this._onMouseMove, this)
      .on('mousemove', this._onMouseMove, this);
  },

  _finishShape() {
    let latlngs = this._poly._defaultShape ? this._poly._defaultShape() : this._poly.getLatLngs();

    let intersects = this._poly.newLatLngIntersects(latlngs[latlngs.length - 1]);

    if ((!this.options.allowIntersection && intersects) || !this._shapeIsValid()) {
      this._showErrorTooltip();
      return;
    }

    let polygon = new this.Poly(this._poly.getLatLngs(), this.options.shapeOptions);

    this._lastMeasure.addLayer(polygon);

    polygon.bindPopup(`<p>${L.GeometryUtil.Custom.readableArea(this._area, this.options.unity, {})} ${this.options.label[this.options.unity]}</p>`)
      .openPopup();

    this._drawing = false;
    this._cleanUpShape();
    this._clearGuides();
    this._updateTooltip();
    this._map
      .off('pointermove', this._onMouseMove, this)
      .off('mousemove', this._onMouseMove, this);
    this._container.style.cursor = '';
  },

  _removeShape() {
    if (!this._poly) return;
    this._map.removeLayer(this._poly);
    this._lastMeasure.clearLayers();
    delete this._poly;
    this._markers.splice(0);
    this._markerGroup.clearLayers();
  },

  _onClick(e) {
    if (!this._drawing) {
      this._removeShape();
      this._startShape();
      this._map.fire("arearuler:newmeasure");
    }
  },

  _vertexChanged(latlng, added) {
    this._area = L.GeometryUtil.geodesicArea(this._poly.getLatLngs());

    this._map.fire("arearuler:newarea", {
      original: {
        area: this._area,
        unity: 'm',
      },
      converted: {
        area: L.GeometryUtil.Custom.readableArea(this._area, this.options.unity, {}),
        unity: this.options.label[this.options.unity],
      },
    });

    this._updateFinishHandler();

    this._updateRunningMeasure(latlng, added);

    this._clearGuides();

    this._updateTooltip();
  },

  _getTooltipText() {
    let text;
    let subtext;

    if (this._markers.length > 2) {
      subtext = `<br> ${L.GeometryUtil.Custom.readableArea(this._area, this.options.unity, {})} ${this.options.label[this.options.unity]}`;
    }

    if (this._markers.length === 0) {
      text = L.drawLocal.draw.handlers.polygon.tooltip.start;
    } else if (this._markers.length < 3) {
      text = L.drawLocal.draw.handlers.polygon.tooltip.cont;
    } else {
      text = L.drawLocal.draw.handlers.polygon.tooltip.end;
    }

    if (!this._drawing) {
      text = '';
    }

    return {
      text,
      subtext,
    };
  },

});
