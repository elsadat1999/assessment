import JSONFeature from 'ol/format/JSONFeature';
import GeoJSON from 'ol/format/geojson';
import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import Vector from 'ol/layer/vector';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import Feature from 'ol/Feature';
import { fromLonLat } from 'ol/proj';
import { Point, Polygon } from 'ol/geom';
import XYZ from 'ol/source/XYZ';
import { HttpClient } from '@angular/common/http';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import { BrowserDbService } from 'src/app/shared/services/browser-db.service';
import { ActivatedRoute } from '@angular/router';
import { Const } from 'src/app/shared/config/const';
import Buliding from 'src/app/shared/model/buliding';
import Overlay from 'ol/Overlay';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements OnInit {
  map: Map | undefined;
  loading: boolean = false;
  buliding: Buliding | any;
  constructor(
    private http: HttpClient,
    private browserDbService: BrowserDbService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.handelRefreshMap();
    // this.getData();
    // this.addStyle();
  }

  handelRefreshMap() {
    this.activatedRoute.params.subscribe((buildingId) => {
      this.handleSelectBuilding();
      this.handleLoadMap();
    });
  }

  handleLoadMap() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.mapInit();
    }, 500);
  }

  handleSelectBuilding() {
    let listBuliding = this.browserDbService.getItem(Const.listBuliding);
    this.buliding = listBuliding.find(
      (buliding: Buliding) =>
        buliding.id == this.activatedRoute.snapshot.params['id']
    );
  }

  mapInit() {
    setTimeout(() => {
      this.map = new Map({
        view: new View({
          center: this.buliding?.country.position,
          zoom: 3,
        }),
        layers: [
          this.tileLayer(),
          this.vectorLayerCountries(),
          this.createMarkers(),
        ],
        target: 'ol-map',
      });
      this.createTooltip();
    }, 100);
  }

  tileLayer() {
    let token =
      'sWmX5SwjXmDHtQNDFmI7CyUgBqUvRzxpT6CM5sSbBLqxd3bpJxNNAZ2O4Rivf1Eo';
    return new TileLayer({
      source: new XYZ({
        url: `https://tile.jawg.io/jawg-streets/{z}/{x}/{y}.png?access-token=${token}`,
      }),
    });
  }

  createMarkers() {
    const iconFeature = new Feature({
      geometry: new Point(fromLonLat(this.buliding?.country.position)),
      name: 'marker',
      population: 4000,
      rainfall: 500,
    });

    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        scale: 0.4,
        src: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      }),
    });

    iconFeature.setStyle(iconStyle);
    const vectorSource = new VectorSource({
      features: [iconFeature],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    vectorLayer.setZIndex(1000);
    return vectorLayer;
  }

  vectorLayerCountries() {
    const style = new Style({
      fill: new Fill({
        color: [84, 118, 255, 0.4],
      }),
    });
    return new Vector({
      source: new VectorSource({
        url: 'assets/json/countries.geojson',
        format: new GeoJSON(),
      }),
      style: (feature) => {
        console.log();
        if (feature.getId() == this.buliding.country.id) {
          style.getFill().setColor([255, 0, 0, 0.4]);
        } else {
          style.getFill().setColor([84, 118, 255, 0.4]);
        }
        return style;
      },
    });
  }

  createTooltip() {
    let tooltipElement: any = document.getElementById('popup');
    let tooltip = new Overlay({
      element: tooltipElement,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
      positioning: 'bottom-center',
      stopEvent: false,
    });
    this.map?.addOverlay(tooltip);
    this.map?.on('click', (e) => {
      this.map?.forEachFeatureAtPixel(e.pixel, (feature) => {
        console.log(feature);
        if (feature.get('name') == 'marker') {
          tooltipElement.style.display = 'block';
          tooltip.setPosition(e.coordinate);
        } else {
          tooltipElement.style.display = 'none';
        }
      });
    });
  }
}
