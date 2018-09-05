<script>
import TabContainer from './tab-container.vue'

export default {
  name: 'Tabs',
  components: {
    TabContainer
  },
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      panes: []
    }
  },
  render () {
    return (
      <div class='tabs'>
        <ul class='tabs-header'>
          {this.$slots.default}
        </ul>
        <tab-container panes={this.panes}></tab-container>
      </div>
    )
  },
  methods: {
    onChange (index) {
      this.$emit('change', index)
    }
  }
}
</script>

<style lang="scss" scoped>
  .tabs{
    width: 100%;
    display: block;
    justify-content: space-around;
    .tabs-header {
      width: 100%;
      display: block;
      padding: 0px;
      cursor: pointer;
      border-bottom: 2px solid #ededed;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      list-style-type: none;
      display: flex;
      flex-flow: row nowrap;
      /*&:after{*/
        /*content: '';*/
        /*display: block;*/
        /*clear: both;*/
      /*}*/
      li{
        /*float: left;*/
        /*width: 33.333%;*/
        display: block;
        flex: auto;
        text-align: center;
        padding: 10px;
        &.active {
          color: red;
          border-bottom: 3px solid red;
        }
      }

    }
  }
</style>
