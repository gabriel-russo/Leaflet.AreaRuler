import L from "leaflet";
import "leaflet-draw";

L.GeometryUtil.Custom = L.extend(L.GeometryUtil, {
  readableArea(area, unity, precision) {
    const defaultPrecision = {
      km: 2,
      ha: 2,
      m: 0,
      alq: 2,
    };

    precision = L.Util.extend({}, defaultPrecision, precision);

    const converter = {
      m: this.formattedNumber(area, precision.m, 'm²'),
      ha: this.formattedNumber(area * 0.0001, precision.ha, 'ha'),
      alq: this.formattedNumber(area * 0.000041322, precision.alq, 'alq (SP)'),
      km: this.formattedNumber(area * 0.000001, precision.km, 'km²'),
    };

    return converter[unity] || 0.0;
  },
});
