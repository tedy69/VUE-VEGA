<template>
    <div id='vgpie2_wrapper'>
        <!-- Vega Chart -->
        <div id="viewTwo"></div>
    </div>
</template>

<script>
 /* eslint-disable */
    import * as vega from 'vega'

    export default {
        name: 'VgPieTwo',
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
                console.log('dtsaArr', newValue)
                this.render(newValue)
            },
            // filterArr: function(newValue) {
            //     if(this.isInternalFilter && newValue !== this.internalFilter){
            //         this.view.signal('filterCat', newValue)
            //         .runAsync()
            //     }
            // }
            filterArr(newValue) {
                console.log('watch_filterArr');
                console.log(newValue)
                if(!this.isInternalFilter || newValue !== this.internalFilter){
                    console.log('signal vega');
                    console.log('testx',this.view.signal('filterCat', newValue));
                    this.view.signal('filterCat', newValue).runAsync();
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
                    container: '#viewTwo',   // parent DOM container
                    hover:     true       // enable hover processing
                });
                this.view.addSignalListener('select_tuple', this.handleevt);
                this.view.addEventListener('click', this.handleclick);
                return this.view.runAsync();
            },
            handleclick(event, item) {
                console.log("CLICK", event, item);
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
                        console.log(v.datum.a)
                        this.$emit('emit-one', v.datum.a);
                    }
                }
            }
        },
        
    }
</script>

<style scoped>

</style>