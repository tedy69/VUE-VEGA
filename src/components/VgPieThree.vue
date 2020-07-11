<template>
    <div id='vgpie3_wrapper'>
        <!-- Vega Chart -->
        <div id="viewThree"></div>
    </div>
</template>

<script>
 /* eslint-disable */
    import * as vega from 'vega'

    export default {
        name: 'VgPieThree',
        props: [ 'dtaArr', 'filterArr' ],
        data() {
            return {
                view: Object,
                isInternalFilter: false,
                internalFilter: null
            }
        },
        watch: {
            dtaArr: function(newValue) {
                this.render(newValue)
            },
            filterArr: function(newValue) {
                // if(this.isInternalFilter && newValue !== this.internalFilter){
                if(!this.isInternalFilter || newValue !== this.internalFilter){
                    this.view.signal('filterCat', newValue).runAsync()
                }
            }
        },
        // mounted () {
        //     fetch('https://vega.github.io/vega/examples/bar-chart.vg.json')
        //     .then(res => res.json())
        //     .then(spec => this.render(spec))
        //     .catch(err => console.error(err));
        // },
        methods: {
            render: function(spec) {
                console.log('mulai render')
                this.view = new vega.View(vega.parse(spec), {
                    renderer:  'canvas',  // renderer (canvas or svg)
                    container: '#viewThree',   // parent DOM container
                    hover:     true       // enable hover processing
                });
                this.view.addSignalListener('select_tuple', this.handleevt);
                return this.view.runAsync();
            },
            handleevt: function(s, v){
                if( v !== undefined){
                    this.isInternalFilter = !this.isInternalFilter
                    // let xx = JSON.parse(JSON.stringify(v))                    
                    if (v === null) { 
                        this.internalFilter = v;
                        this.$emit('emit-one', null);
                    } else {
                        this.internalFilter = v.datum.a;
                        console.log('pertama klik', v, s)
                        this.$emit('emit-one', v.datum.a);
                    }
                }
            }
        },
        
    }
</script>

<style scoped>

</style>