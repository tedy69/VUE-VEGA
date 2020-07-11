<template>
  <div style="padding: 15px;">
    <el-row type="flex" :gutter="32">
      <el-col :span="8">
        <smart-widget simple>
          <h3>Simple Widget Without Header</h3>
          <p>
            {{placeholder}}
          </p>
        </smart-widget>
      </el-col>
      <el-col :span="8">
        <smart-widget
          title="Default Widget"
          shadow="hover"
          :translate-y="10"
        >
          <p>
            {{placeholder}}
          </p>
        </smart-widget>
      </el-col>
      <el-col :span="8">
        <smart-widget title="With additional fullscreen button" fullscreen shadow="never">
          <p>
            {{placeholder}}
          </p>
        </smart-widget>
      </el-col>
    </el-row>
    <br>
    <el-row type="flex" :gutter="32">
      <el-col :span="8">
        <smart-widget title="VEGA 1" sub-title="Use ve-charts components."
          fullscreen
          collapse
          refresh
          is-actived
          actived-color="#f4a"
          :loading="loading"
          @on-refresh="handleRefresh"
          @on-fullscreen="handleFullscreen">
          <div id="vega">
          <!-- <ve-bar-chart :data="barData" :height="contentH" slot-scope="{contentH}" /> -->
          <vg-pie-one :dtaArr='dta1' @emit-one="startfilter" :filterArr="valData" :height="contentH" />
          </div>
        </smart-widget>
      </el-col>
      <el-col :span="8">
        <smart-widget title="VEGA 2" fullscreen collapse>
          <div id="vega">
          <!-- <ve-donut-chart :data="donutData" :settings="donutSetting" :height="contentH" slot-scope="{contentH}" /> -->
          <vg-pie-two :dtaArr='dta2' @emit-one="startfilter" :filterArr="valData" :height="contentH"/>
          </div>
        </smart-widget>
      </el-col>
    <el-col :span="8">
        <smart-widget title="VEGA 3" fullscreen collapse>
          <div id="vega">
        <!-- <ve-donut-chart :data="donutData" :settings="donutSetting" :height="contentH" /> -->
        <vg-pie-three :dtaArr='dta3' @emit-one="startfilter" :filterArr="valData" :height="contentH"/>
          </div>
    </smart-widget>
    </el-col>
        </el-row>
    <br>
    <el-row type="flex" :gutter="32">
      <el-col :span="8">
        <smart-widget title="Widget with Editbox">
          <template slot="editbox">
            <el-alert
              title="I am Editbox slot"
              type="success">
            </el-alert>
          </template>
          <p>
            {{placeholder}}
          </p>
        </smart-widget>
      </el-col>
      <el-col :span="8">
        <smart-widget title="Widget with Footer">
          <p>
            {{placeholder}}
          </p>
          <template slot="footer">
            <el-alert
              title="I am Footer slot"
              type="success">
            </el-alert>
          </template>
        </smart-widget>
      </el-col>
      <el-col :span="8">
        <smart-widget title="Widget with custom toolbar" :header-height="36">
          <template slot="toolbar">
            <div style="margin: 0 12px;">
              <el-button type="primary" size="mini" @click="$router.push('/widget-with-grid')">Grid</el-button>
            </div>
          </template>
          <p>
            {{placeholder}}
          </p>
        </smart-widget>
      </el-col>
    </el-row>
    <br>
    <el-row type="flex" :gutter="32">
      <el-col>
        <smart-widget title="Wiget with Table" collapse>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed prop="date" label="日期">
            </el-table-column>
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="province" label="省份">
            </el-table-column>
            <el-table-column prop="city" label="市区">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
            <el-table-column prop="zip" label="邮编">
            </el-table-column>
          </el-table>
        </smart-widget>
      </el-col>
    </el-row>
  </div>
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
      placeholder: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti fugit incidunt, iste, itaque minima neque pariatur perferendis sed suscipit velit vitae voluptatem. A consequuntur, deserunt eaque error nulla temporibus!',
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
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
    handleFullscreen (val) {
      if (val) {
        console.log(val)
      }
    }
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
    this.donutSetting = {
      offsetY: '60%'
    }
  }
}
</script>

<style lang="less">
#vega {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
