<template>
  <smart-widget-grid
    :layout="layout"
    :row-height="48"
    :margin="[15, 15]"
    :is-static="isStatic"
    @layout-updated="onLayoutUpdated">
    <smart-widget slot="0" simple>
      <div class="layout-center">
        <h3>Simple Widget Without Header</h3>
      </div>
    </smart-widget>
    <smart-widget slot="1" title="Default Widget">
      <div class="layout-center">
        <h3>Widget with Header</h3>
      </div>
    </smart-widget>
    <smart-widget slot="2" title="Full Screen" fullscreen>
      <div class="layout-center">
        <h3>Make any widget full screen</h3>
      </div>
    </smart-widget>
    <smart-widget slot="3" title="Widget with Loader" :loading="true">
      <div class="layout-center">
        <h3>Widget with loading mask</h3>
      </div>
    </smart-widget>
    <smart-widget slot="4" title="Editbox">
      <template slot="editbox">
        <el-alert
          title="I am Editbox slot"
          type="success">
        </el-alert>
      </template>
      <p>Widget with Editbox</p>
    </smart-widget>
    <smart-widget slot="5" title="Footer">
      <template slot="footer">
        <el-alert
          title="I am Footer slot"
          type="success">
        </el-alert>
      </template>
      <p>Widget with Footer</p>
    </smart-widget>
    <smart-widget slot="6" title="VEGA 1"
      fullscreen
      refresh
      is-actived
      :loading="loading"
      @before-fullscreen="val => isStatic = val"
      @on-refresh="handleRefresh">
      <template v-slot="{contentH}">
        <div id="vega">
        <!-- <ve-bar-chart :data="barData" :height="contentH" /> -->
        <vg-pie-one :dtaArr='dta1' @emit-one="startfilter" :filterArr="valData" :height="contentH" />
        </div>
      </template>
    </smart-widget>
    <smart-widget slot="7" title="VEGA 2" fullscreen collapse>
      <template v-slot="{contentH}">
        <div id="vega">
        <!-- <ve-donut-chart :data="donutData" :settings="donutSetting" :height="contentH" /> -->
        <vg-pie-two :dtaArr='dta2' @emit-one="startfilter" :filterArr="valData" :height="contentH"/>
        </div>
      </template>
    </smart-widget>
    <smart-widget slot="8" title="VEGA 3" fullscreen collapse>
      <template v-slot="{contentH}">
        <div id="vega">
        <!-- <ve-donut-chart :data="donutData" :settings="donutSetting" :height="contentH" /> -->
        <vg-pie-three :dtaArr='dta3' @emit-one="startfilter" :filterArr="valData" :height="contentH"/>
        </div>
      </template>
    </smart-widget>
    <smart-widget slot="9" title="Widget body content's height is fixed" fixed-height>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </smart-widget>
    <smart-widget slot="10" title="Widget with custom toolbar">
      <template slot="toolbar">
        <div style="margin: 0 12px;">
          <el-button type="success" size="mini" @click="$router.push('/widget-only')">Index</el-button>
        </div>
      </template>
      <el-table style="width: 100%" :data="tableData">
        <el-table-column
          prop="date"
          label="日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </smart-widget>
  </smart-widget-grid>
</template>

<script>
import VgPieOne from './../components/VgPieOne.vue'
import VgPieTwo from './../components/VgPieTwo.vue'
import VgPieThree from './../components/VgPieThree.vue'

const dummyDta1 = 
{
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "description": "A bar chart with highlighting on hover and selecting on click. (Inspired by Tableau's interaction style.)",
  "autosize": "pad",
  "padding": 5,
  "height": 200,
  "style": "cell",
  "data": [
    {"name": "highlight_store"},
    {"name": "select_store"},
    {
      "name": "source_0",
      "values": [
        {"a": "A", "b": 28},
        {"a": "B", "b": 55},
        {"a": "C", "b": 43},
        {"a": "D", "b": 91},
        {"a": "E", "b": 81},
        {"a": "F", "b": 53},
        {"a": "G", "b": 19},
        {"a": "H", "b": 87},
        {"a": "I", "b": 52}
      ]
    },
    {
      "name": "data_0",
      "source": "source_0",
      "transform": [
        {"type": "identifier", "as": "_vgsid_"},
        {
          "type": "filter", 
          "expr": "!isNaN(filterAmn) || inrange(datum.b, filterAmn)"
        },
        {
          "type": "filter", 
          "expr": "filterCat == null ? true : !isNaN(filterCat) && !indexof(datum.a, filterCat)"
        }
      ]
    }
  ],
  "signals": [
    {"name": "filterAmn", "value": []},
    {"name": "filterCat", "value": ""},
    {"name": "x_step", "value": 20},
    {
      "name": "width",
      "update": "bandspace(domain('x').length, 0.2, 0.1) * x_step"
    },
    {
      "name": "unit",
      "value": {},
      "on": [
        {"events": "mousemove", "update": "isTuple(group()) ? group() : unit"}
      ]
    },
    {"name": "highlight", "update": "vlSelectionResolve(\"highlight_store\")"},
    {"name": "select", "update": "vlSelectionResolve(\"select_store\")"},
    {
      "name": "highlight_tuple",
      "on": [
        {
          "events": [{"source": "scope", "type": "mouseover"}],
          "update": "datum && item().mark.marktype !== 'group' ? {unit: \"\", fields: highlight_tuple_fields, values: [(item().isVoronoi ? datum.datum : datum)[\"_vgsid_\"]]} : null",
          "force": true
        },
        {"events": [{"source": "scope", "type": "dblclick"}], "update": "null"}
      ]
    },
    {
      "name": "highlight_tuple_fields",
      "value": [{"type": "E", "field": "_vgsid_"}]
    },
    {
      "name": "highlight_modify",
      "update": "modify(\"highlight_store\", highlight_tuple, true)"
    },
    {
      "name": "select_tuple",
      "on": [
        {
          "events": [{"source": "scope", "type": "click"}],
          "update": "datum && item().mark.marktype !== 'group' ? {datum: datum, unit: \"\", fields: select_tuple_fields, values: [(item().isVoronoi ? datum.datum : datum)[\"_vgsid_\"]]} : null",
          "force": true
        },
        {"events": [{"source": "scope", "type": "dblclick"}], "update": "null"}
      ]
    },
    {
      "name": "select_tuple_fields",
      "value": [{"type": "E", "field": "_vgsid_"}]
    },
    {
      "name": "select_toggle",
      "value": false,
      "on": [
        {
          "events": [{"source": "scope", "type": "click"}],
          "update": "event.shiftKey"
        },
        {"events": [{"source": "scope", "type": "dblclick"}], "update": "false"}
      ]
    },
    {
      "name": "select_modify",
      "update": "modify(\"select_store\", select_toggle ? null : select_tuple, select_toggle ? null : true, select_toggle ? select_tuple : null)"
    }
  ],
  "marks": [
    {
      "name": "marks",
      "type": "rect",
      "style": ["bar"],
      "from": {"data": "data_0"},
      "encode": {
        "update": {
          "fill": {"value": "#4C78A8"},
          "stroke": {"value": "black"},
          "cursor": {"value": "pointer"},
          "fillOpacity": [
            {
              "test": "!(length(data(\"select_store\"))) || (vlSelectionTest(\"select_store\", datum))",
              "value": 1
            },
            {"value": 0.3}
          ],
          "strokeWidth": [
            {
              "test": "(!(length(data(\"select_store\"))) || (vlSelectionTest(\"select_store\", datum))) && (length(data(\"select_store\")))",
              "value": 2
            },
            {
              "test": "(vlSelectionTest(\"highlight_store\", datum))",
              "value": 1
            },
            {"value": 0}
          ],
          "tooltip": {
            "signal": "{\"a\": ''+datum[\"a\"], \"b\": format(datum[\"b\"], \"\")}"
          },
          "x": {"scale": "x", "field": "a"},
          "width": {"scale": "x", "band": true},
          "y": {"scale": "y", "field": "b"},
          "y2": {"scale": "y", "value": 0}
        },
        "hover": {
          "fill": {"value": "red"}
        }
      }
    }
  ],
  "scales": [
    {
      "name": "x",
      "type": "band",
      "domain": {"data": "source_0", "field": "a", "sort": true},
      "range": {"step": {"signal": "x_step"}},
      "paddingInner": 0.2,
      "paddingOuter": 0.1
    },
    {
      "name": "y",
      "type": "linear",
      "domain": {"data": "source_0", "field": "b"},
      "range": [{"signal": "height"}, 0],
      "nice": true,
      "zero": true
    }
  ],
  "axes": [
    {
      "scale": "x",
      "orient": "bottom",
      "grid": false,
      "labelAlign": "right",
      "labelAngle": 270,
      "labelBaseline": "middle",
      "labelOverlap": true,
      "zindex": 1
    },
    {
      "scale": "y",
      "orient": "left",
      "grid": false,
      "labelOverlap": true,
      "tickCount": {"signal": "ceil(height/40)"},
      "zindex": 1
    },
    {
      "scale": "y",
      "orient": "left",
      "gridScale": "x",
      "grid": true,
      "tickCount": {"signal": "ceil(height/40)"},
      "domain": false,
      "labels": false,
      "maxExtent": 0,
      "minExtent": 0,
      "ticks": false,
      "zindex": 0
    }
  ]
}

const dummyDta2 = 
{
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "description": "A bar chart with highlighting on hover and selecting on click. (Inspired by Tableau's interaction style.)",
  "autosize": "pad",
  "padding": 5,
  "height": 200,
  "style": "cell",
  "data": [
    {"name": "highlight_store"},
    {"name": "select_store"},
    {
      "name": "source_0",
      "values": [
        {"a": "A", "b": 28, "c": 12},
        {"a": "A", "b": 28, "c": 13},
        {"a": "B", "b": 55, "c": 22},
        {"a": "B", "b": 55, "c": 23},
        {"a": "C", "b": 43, "c": 32},
        {"a": "C", "b": 43, "c": 33},
        {"a": "D", "b": 91, "c": 42},
        {"a": "D", "b": 91, "c": 43},
        {"a": "E", "b": 81, "c": 52},
        {"a": "E", "b": 81, "c": 53},
        {"a": "F", "b": 53, "c": 62},
        {"a": "F", "b": 53, "c": 63},
        {"a": "G", "b": 19, "c": 72},
        {"a": "G", "b": 19, "c": 73},
        {"a": "H", "b": 87, "c": 82},
        {"a": "H", "b": 87, "c": 83},
        {"a": "I", "b": 52, "c": 92},
        {"a": "I", "b": 52, "c": 93}
      ]
    },
    {
      "name": "data_0",
      "source": "source_0",
      "transform": [
        {"type": "identifier", "as": "_vgsid_"},
        {
          "type": "filter", 
          "expr": "!isNaN(filterAmn) || inrange(datum.b, filterAmn)"
        },
        {
          "type": "filter", 
          "expr": "!isNaN(filterVal) || inrange(datum.c, filterVal)"
        },
        {
          "type": "filter", 
          "expr": "filterCat == null ? true : !isNaN(filterCat) && !indexof(datum.a, filterCat)"
        },
      ]
    }
  ],
  "signals": [
    {"name": "filterVal", "value": []},
    {"name": "filterAmn", "value": []},
    {"name": "filterCat", "value": ""},
    {"name": "x_step", "value": 20},
    {
      "name": "width",
      "update": "bandspace(domain('x').length, 0.2, 0.1) * x_step"
    },
    {
      "name": "unit",
      "value": {},
      "on": [
        {"events": "mousemove", "update": "isTuple(group()) ? group() : unit"}
      ]
    },
    {"name": "highlight", "update": "vlSelectionResolve(\"highlight_store\")"},
    {"name": "select", "update": "vlSelectionResolve(\"select_store\")"},
    {
      "name": "highlight_tuple",
      "on": [
        {
          "events": [{"source": "scope", "type": "mouseover"}],
          "update": "datum && item().mark.marktype !== 'group' ? {unit: \"\", fields: highlight_tuple_fields, values: [(item().isVoronoi ? datum.datum : datum)[\"_vgsid_\"]]} : null",
          "force": true
        },
        {"events": [{"source": "scope", "type": "dblclick"}], "update": "null"}
      ]
    },
    {
      "name": "highlight_tuple_fields",
      "value": [{"type": "E", "field": "_vgsid_"}]
    },
    {
      "name": "highlight_modify",
      "update": "modify(\"highlight_store\", highlight_tuple, true)"
    },
    {
      "name": "select_tuple",
      "on": [
        {
          "events": [{"source": "scope", "type": "click"}],
          "update": "datum && item().mark.marktype !== 'group' ? {datum: datum, unit: \"\", fields: select_tuple_fields, values: [(item().isVoronoi ? datum.datum : datum)[\"_vgsid_\"]]} : null",
          "force": true
        },
        {"events": [{"source": "scope", "type": "dblclick"}], "update": "null"}
      ]
    },
    {
      "name": "select_tuple_fields",
      "value": [{"type": "E", "field": "_vgsid_"}]
    },
    {
      "name": "select_toggle",
      "value": false,
      "on": [
        {
          "events": [{"source": "scope", "type": "click"}],
          "update": "event.shiftKey"
        },
        {"events": [{"source": "scope", "type": "dblclick"}], "update": "false"}
      ]
    },
    {
      "name": "select_modify",
      "update": "modify(\"select_store\", select_toggle ? null : select_tuple, select_toggle ? null : true, select_toggle ? select_tuple : null)"
    }
  ],
  "marks": [
    {
      "name": "marks",
      "type": "rect",
      "style": ["bar"],
      "from": {"data": "data_0"},
      "encode": {
        "update": {
          "fill": {"value": "#4C78A8"},
          "stroke": {"value": "black"},
          "cursor": {"value": "pointer"},
          "fillOpacity": [
            {
              "test": "!(length(data(\"select_store\"))) || (vlSelectionTest(\"select_store\", datum))",
              "value": 1
            },
            {"value": 0.3}
          ],
          "strokeWidth": [
            {
              "test": "(!(length(data(\"select_store\"))) || (vlSelectionTest(\"select_store\", datum))) && (length(data(\"select_store\")))",
              "value": 2
            },
            {
              "test": "(vlSelectionTest(\"highlight_store\", datum))",
              "value": 1
            },
            {"value": 0}
          ],
          "tooltip": {
            "signal": "{\"a\": ''+datum[\"a\"], \"b\": format(datum[\"b\"], \"\")}"
          },
          "x": {"scale": "x", "field": "a"},
          "width": {"scale": "x", "band": true},
          "y": {"scale": "y", "field": "c"},
          "y2": {"scale": "y", "value": 0}
        },
        "hover": {
          "fill": {"value": "red"}
        }
      }
    }
  ],
  "scales": [
    {
      "name": "x",
      "type": "band",
      "domain": {"data": "source_0", "field": "a", "sort": false},
      "range": {"step": {"signal": "x_step"}},
      "paddingInner": 0.2,
      "paddingOuter": 0.1
    },
    {
      "name": "y",
      "type": "linear",
      "domain": {"data": "source_0", "field": "c"},
      "range": [{"signal": "height"}, 0],
      "nice": true,
      "zero": true
    }
  ],
  "axes": [
    {
      "scale": "x",
      "orient": "bottom",
      "grid": false,
      "labelAlign": "right",
      "labelAngle": 270,
      "labelBaseline": "middle",
      "labelOverlap": true,
      "zindex": 1
    },
    {
      "scale": "y",
      "orient": "left",
      "grid": false,
      "labelOverlap": true,
      "tickCount": {"signal": "ceil(height/40)"},
      "zindex": 1
    },
    {
      "scale": "y",
      "orient": "left",
      "gridScale": "x",
      "grid": true,
      "tickCount": {"signal": "ceil(height/40)"},
      "domain": false,
      "labels": false,
      "maxExtent": 0,
      "minExtent": 0,
      "ticks": false,
      "zindex": 0
    }
  ]
}

const dummyDta3 = 
{
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "description": "A bar chart with highlighting on hover and selecting on click. (Inspired by Tableau's interaction style.)",
  "autosize": "pad",
  "padding": 5,
  "height": 200,
  "style": "cell",
  "data": [
    {"name": "highlight_store"},
    {"name": "select_store"},
    {
      "name": "source_0",
      "values": [
        {"a": "A", "b": 28, "c": 92},
        {"a": "A", "b": 28, "c": 93},
        {"a": "B", "b": 55, "c": 82},
        {"a": "B", "b": 55, "c": 83},
        {"a": "C", "b": 43, "c": 72},
        {"a": "C", "b": 43, "c": 73},
        {"a": "D", "b": 91, "c": 62},
        {"a": "D", "b": 91, "c": 63},
        {"a": "E", "b": 81, "c": 52},
        {"a": "E", "b": 81, "c": 53},
        {"a": "F", "b": 53, "c": 42},
        {"a": "F", "b": 53, "c": 43},
        {"a": "G", "b": 19, "c": 32},
        {"a": "G", "b": 19, "c": 33},
        {"a": "H", "b": 87, "c": 22},
        {"a": "H", "b": 87, "c": 23},
        {"a": "I", "b": 52, "c": 12},
        {"a": "I", "b": 52, "c": 13}
      ]
    },
    {
      "name": "data_0",
      "source": "source_0",
      "transform": [
        {"type": "identifier", "as": "_vgsid_"},
        {
          "type": "filter", 
          "expr": "!isNaN(filterAmn) || inrange(datum.b, filterAmn)"
        },
        {
          "type": "filter", 
          "expr": "!isNaN(filterVal) || inrange(datum.c, filterVal)"
        },
        {
          "type": "filter", 
          "expr": "filterCat == null ? true : !isNaN(filterCat) && !indexof(datum.a, filterCat)"
        }
      ]
    }
  ],
  "signals": [
    {"name": "filterVal", "value": []},
    {"name": "filterAmn", "value": []},
    {"name": "filterCat", "value": ""},
    {"name": "x_step", "value": 20},
    {
      "name": "width",
      "update": "bandspace(domain('x').length, 0.2, 0.1) * x_step"
    },
    {
      "name": "unit",
      "value": {},
      "on": [
        {"events": "mousemove", "update": "isTuple(group()) ? group() : unit"}
      ]
    },
    {"name": "highlight", "update": "vlSelectionResolve(\"highlight_store\")"},
    {"name": "select", "update": "vlSelectionResolve(\"select_store\")"},
    {
      "name": "highlight_tuple",
      "on": [
        {
          "events": [{"source": "scope", "type": "mouseover"}],
          "update": "datum && item().mark.marktype !== 'group' ? {unit: \"\", fields: highlight_tuple_fields, values: [(item().isVoronoi ? datum.datum : datum)[\"_vgsid_\"]]} : null",
          "force": true
        },
        {"events": [{"source": "scope", "type": "dblclick"}], "update": "null"}
      ]
    },
    {
      "name": "highlight_tuple_fields",
      "value": [{"type": "E", "field": "_vgsid_"}]
    },
    {
      "name": "highlight_modify",
      "update": "modify(\"highlight_store\", highlight_tuple, true)"
    },
    {
      "name": "select_tuple",
      "on": [
        {
          "events": [{"source": "scope", "type": "click"}],
          "update": "datum && item().mark.marktype !== 'group' ? {datum: datum, unit: \"\", fields: select_tuple_fields, values: [(item().isVoronoi ? datum.datum : datum)[\"_vgsid_\"]]} : null",
          "force": true
        },
        {"events": [{"source": "scope", "type": "dblclick"}], "update": "null"}
      ]
    },
    {
      "name": "select_tuple_fields",
      "value": [{"type": "E", "field": "_vgsid_"}]
    },
    {
      "name": "select_toggle",
      "value": false,
      "on": [
        {
          "events": [{"source": "scope", "type": "click"}],
          "update": "event.shiftKey"
        },
        {"events": [{"source": "scope", "type": "dblclick"}], "update": "false"}
      ]
    },
    {
      "name": "select_modify",
      "update": "modify(\"select_store\", select_toggle ? null : select_tuple, select_toggle ? null : true, select_toggle ? select_tuple : null)"
    }
  ],
  "marks": [
    {
      "name": "marks",
      "type": "rect",
      "style": ["bar"],
      "from": {"data": "data_0"},
      "encode": {
        "update": {
          "fill": {"value": "#4C78A8"},
          "stroke": {"value": "black"},
          "cursor": {"value": "pointer"},
          "fillOpacity": [
            {
              "test": "!(length(data(\"select_store\"))) || (vlSelectionTest(\"select_store\", datum))",
              "value": 1
            },
            {"value": 0.3}
          ],
          "strokeWidth": [
            {
              "test": "(!(length(data(\"select_store\"))) || (vlSelectionTest(\"select_store\", datum))) && (length(data(\"select_store\")))",
              "value": 2
            },
            {
              "test": "(vlSelectionTest(\"highlight_store\", datum))",
              "value": 1
            },
            {"value": 0}
          ],
          "tooltip": {
            "signal": "{\"a\": ''+datum[\"a\"], \"b\": format(datum[\"b\"], \"\")}"
          },
          "x": {"scale": "x", "field": "a"},
          "width": {"scale": "x", "band": true},
          "y": {"scale": "y", "field": "c"},
          "y2": {"scale": "y", "value": 0}
        },
        "hover": {
          "fill": {"value": "red"}
        }
      }
    }
  ],
  "scales": [
    {
      "name": "x",
      "type": "band",
      "domain": {"data": "source_0", "field": "a", "sort": false},
      "range": {"step": {"signal": "x_step"}},
      "paddingInner": 0.2,
      "paddingOuter": 0.1
    },
    {
      "name": "y",
      "type": "linear",
      "domain": {"data": "source_0", "field": "c"},
      "range": [{"signal": "height"}, 0],
      "nice": true,
      "zero": true
    }
  ],
  "axes": [
    {
      "scale": "x",
      "orient": "bottom",
      "grid": false,
      "labelAlign": "right",
      "labelAngle": 270,
      "labelBaseline": "middle",
      "labelOverlap": true,
      "zindex": 1
    },
    {
      "scale": "y",
      "orient": "left",
      "grid": false,
      "labelOverlap": true,
      "tickCount": {"signal": "ceil(height/40)"},
      "zindex": 1
    },
    {
      "scale": "y",
      "orient": "left",
      "gridScale": "x",
      "grid": true,
      "tickCount": {"signal": "ceil(height/40)"},
      "domain": false,
      "labels": false,
      "maxExtent": 0,
      "minExtent": 0,
      "ticks": false,
      "zindex": 0
    }
  ]
}


export default {
  components: {
    VgPieOne,
    VgPieTwo,
    VgPieThree
  },
  data () {
    return {
      dta1: [],
      dta2: [],
      dta3: [],
      valData: null,
      loading: false,
      isStatic: false,
      layout: [
        { x: 0, y: 0, w: 4, h: 3, i: '0' },
        { x: 4, y: 0, w: 4, h: 3, i: '1' },
        { x: 8, y: 0, w: 4, h: 3, i: '2' },
        { x: 0, y: 3, w: 4, h: 3, i: '3' },
        { x: 4, y: 3, w: 4, h: 3, i: '4' },
        { x: 8, y: 3, w: 4, h: 3, i: '5' },
        { x: 0, y: 6, w: 4, h: 6, i: '6' },
        { x: 4, y: 6, w: 4, h: 6, i: '7' },
        { x: 8, y: 6, w: 4, h: 6, i: '8' },
        { x: 6, y: 12, w: 6, h: 5, i: '9' },
        { x: 0, y: 15, w: 6, h: 5, i: '10' }
        // { x: 4, y: 6, w: 4, h: 5, i: '0' },
        // { x: 0, y: 6, w: 4, h: 5, i: '1' },
        // { x: 8, y: 6, w: 4, h: 5, i: '2' },
        // { x: 12, y: 6, w: 4, h: 3, i: '3' },
        // { x: 0, y: 11, w: 16, h: 16, i: '4' },
        // { x: 0, y: 27, w: 20, h: 15, i: '5' },
        // { x: 20, y: 27, w: 28, h: 15, i: '6' },
        // { x: 39, y: 0, w: 9, h: 27, i: '7' },
        // { x: 16, y: 0, w: 23, h: 27, i: '8' },
        // { x: 0, y: 0, w: 16, h: 26, i: '9' }
      ]
    }
  },
  mounted () {
      // fetch('https://vega.github.io/vega/examples/bar-chart.vg.json')
      // .then(res => res.json())
      // .then(spec => this.sendDta(spec))
      // .catch(err => console.error(err));
      this.dta1 = dummyDta1
      this.dta2 = dummyDta2
      this.dta3 = dummyDta3
  },
  created () {
    this.barData = {
      dimensions: {
        name: 'Year',
        data: [
          'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.',
          'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'
        ]
      },
      measures: [{
        name: 'Vue',
        data: [3000, 3500, 3900, 3100, 3200, 3100, 3600, 3300, 3600, 3400, 3100, 3000]
      }, {
        name: 'React',
        data: [2000, 2000, 2600, 2300, 2300, 2000, 2600, 2200, 2500, 2800, 2500, 2200]
      }, {
        name: 'Angular',
        data: [827, 949, 1400, 1000, 884, 911, 983, 989, 925, 1100, 1200, 930]
      }]
    }
    this.donutData = {
      dimensions: {
        name: '渠道',
        data: ['APP', 'PC', 'M端', '微信', '小程序']
      },
      measures: [{
        name: 'PV',
        data: [40000, 27800, 22000, 20200, 13600]
      }]
    }
    this.tableData = [
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }
    ]
    this.donutSetting = {
      offsetY: '60%'
    }
  },
  methods: {
    startfilter: function(v){
      console.log('ok', v)
      this.valData = v
    },
    sendDta: function(target, spec) {
      target = spec
    },
    emitfromOne: function(v){
      this.valData = v
      console.log('emit', v)
  },
    handleRefresh () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },
    onLayoutUpdated (newLayout) {
      console.log(JSON.stringify(newLayout))
    },
    onMove (params) {
      console.log(params)
    },
    onResize (params) {
      console.log(params)
    },
    onContainerResized (params) {
      console.log(params)
    }
  }
}
</script>

<style lang="less">
.footer {
  display: flex;
  padding: 5px;
  border-top: 1px solid #ebeef1;
}
.layout-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
#vega {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>