<template>
   <div v-show="isOpentModal" class="modalContent">
     <div class="modalCover fade"  :class="{'show': isOpentModal}" @click="cancelFn()"></div>
     <div class="modalInfo" :class="{'openModal': isOpentModal}">
       <div class="modelHeader">
         <slot name="header">
           <h5 class="modal-title title" v-text="titleName"></h5>
           <button type="button" class="close" aria-label="Close" @click="cancelFn()">
             <span aria-hidden="true">&times;</span>
           </button>
         </slot>
       </div>
       <div class="modalBody">
         <slot name="body">This is Body</slot>
       </div>
       <div class="modalFooter">
         <slot name="footer">
           <div class="footerInfo">
             <button type="button" class="btn btn-secondary mr-2" @click="cancelFn()">Cancel</button>
             <button type="button" class="btn btn-success" @click="okFn()">OK</button>
           </div>
         </slot>
       </div>
     </div>
   </div>
</template>

<script>
export default {
  name: 'modal',
  components: {},
  props: {
    isOpentModal: {
      type: Boolean,
      default: false
    },
    titleName: {
      type: String,
      default: 'Title'
    }
  },
  data () {
    return {}
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
    cancelFn () {
      this.$emit('cancel')
    },
    okFn () {
      this.$emit('ok')
    }
  }
}
</script>

<style lang="scss" scoped>
   .modalContent{
     width: 100%;
     height: 100%;
     padding: 0;
     margin:0;
     .modalCover{
       width: 100%;
       height: 100%;
       background-color: rgba(0,0,0,0.4);
       position: fixed;
       top: 0;
       left: 0;
       z-index: 9990;
     }
     .modalInfo {
       position: fixed;
       top:-50%;
       left: 50%;
       z-index: 9998;
       transform: translate(-50%,-50%);
       -ms-transform: translate(-50%,-50%);
       -moz-transform: translate(-50%,-50%);
       -webkit-transform: translate(-50%,-50%);
       -o-transform: translate(-50%,-50%);
       width: auto;
       min-width: 20%;
       max-width: 60%;
       height: auto;
       max-height: 80%;
       overflow: hidden;
       background-color: #ffffff;
       pointer-events: auto;
       background-clip: padding-box;
       border: 1px solid rgba(0, 0, 0, 0.2);
       outline: 0;
       -webkit-transition: all 0.5s linear;
       transition: all 0.5s linear;
       &.openModal {
         top:50%;
       }
       .modelHeader {
         width: 100%;
         height: auto;
         overflow: hidden;
         padding: 1rem;
         border-bottom: 1px solid #c2cfd6;
         -webkit-box-sizing: border-box;
         -moz-box-sizing: border-box;
         box-sizing: border-box;
         .title{
           display: inline-block;
           font-size: 16px;

         }
       }
       .modalBody{
         width: 100%;
         height: auto;
         overflow: hidden;
         padding: 1rem;
         box-sizing: border-box;
       }
       .modalFooter{
         display: -webkit-box;
         display: -ms-flexbox;
         display: flex;
         -webkit-box-align: center;
         -ms-flex-align: center;
         align-items: center;
         -webkit-box-pack: end;
         -ms-flex-pack: end;
         justify-content: flex-end;
         & > .footerInfo {
           width: 100%;
           height: auto;
           overflow: hidden;
           text-align: right;
           padding: 1rem;
           border-top: 1px solid #c2cfd6;
         }
       }
     }
   }
</style>
