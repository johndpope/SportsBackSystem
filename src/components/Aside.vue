<template>
  <aside class="aside-menu">
    <b-tabs>
      <b-tab>
        <template slot="title">
          <i class='icon-settings'></i>
        </template>
        <div class="p-3">
          <h6>Settings</h6>
          <div class="aside-options">
            <div class="clearfix mt-4">
              <small><b>Language</b></small>
              <c-switch type="text" variant="success" on="Zh" off="En" @change="handleChangeStatus()" v-model="languageStatus" :pill="true" size="sm" class="float-right"
                        :checked="false"/>
            </div>
            <div>
              <small class="text-muted">Internationalization: English to Chinese.</small>
            </div>
          </div>
          <hr>
        </div>
      </b-tab>
      <b-tab>
        <template slot="title">
          <i class='icon-game-controller'></i>
        </template>
        <div class="p-3">
          <h6 style="margin-bottom: 1rem;">Leisure Momen</h6>
          <div class="message">
            <div id="myTime">
              <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
                      codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0"
                      width="180" height="80" id="honehoneclock" align="middle">
                <param name="allowScriptAccess" value="always">
                <param name="movie" value="http://chabudai.sakura.ne.jp/blogparts/honehoneclock/honehone_clock_wh.swf">
                <param name="quality" value="high">
                <param name="bgcolor" value="#ffffff">
                <param name="wmode" value="transparent">
                <embed wmode="transparent"
                       src="http://chabudai.sakura.ne.jp/blogparts/honehoneclock/honehone_clock_wh.swf" quality="high"
                       bgcolor="#ffffff" width="210" height="90" name="honehoneclock" align="middle"
                       allowscriptaccess="always" type="application/x-shockwave-flash"
                       pluginspage="http://www.macromedia.com/go/getflashplayer">
              </object>
            </div>
          </div>
          <hr>
          <div class="message">
            <div>
              <object type="application/x-shockwave-flash" style="outline:none;width: 100%;"
                      data="http://cdn.abowman.com/widgets/hamster/hamster.swf?up_bodyColor=f0e9cc&up_feetColor=D4C898&up_eyeColor=000567&up_wheelSpokeColor=DEDEDE&up_wheelColor=FFFFFF&up_waterColor=E0EFFF&up_earColor=b0c4de&up_wheelOuterColor=FF4D4D&up_snoutColor=F7F4E9&up_bgColor=F0E4E4&up_foodColor=cba920&up_wheelCenterColor=E4EB2F&up_tailColor=E6DEBE&">
                <param name='movie'
                       value='http://cdn.abowman.com/widgets/hamster/hamster.swf?up_bodyColor=f0e9cc&up_feetColor=D4C898&up_eyeColor=000567&up_wheelSpokeColor=DEDEDE&up_wheelColor=FFFFFF&up_waterColor=E0EFFF&up_earColor=b0c4de&up_wheelOuterColor=FF4D4D&up_snoutColor=F7F4E9&up_bgColor=F0E4E4&up_foodColor=cba920&up_wheelCenterColor=E4EB2E&up_tailColor=E6DEBE&'>
                <param name='AllowScriptAccess' value='always'>
                <param name='wmode' value='opaque'>
              </object>
            </div>
          </div>
          <hr>
          <div class="message">
             <div class="jigsaw">
               <router-link to="/other/jigsaw" class="title">Beauty Puzzle：GO、GO、GO</router-link>
               <ul class="girlUl">
                 <li><img class="img-avatar" src="/static/img/jigsaw/girl0/girl.jpg" alt=""></li>
                 <li><img class="img-avatar" src="/static/img/jigsaw/girl1/girl.jpg" alt=""></li>
                 <li><img class="img-avatar" src="/static/img/jigsaw/girl2/girl.jpg" alt=""></li>
               </ul>
             </div>
          </div>
          <hr>
        </div>
      </b-tab>
    </b-tabs>
  </aside>
</template>

<script>
import Callout from './Callout'
import cSwitch from './Switch'
import {mapActions} from 'vuex'

export default {
  name: 'c-aside',
  components: {
    Callout,
    cSwitch
  },
  data: () => {
    return {
      languageStatus: true
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {

    })
  },
  computed: {

  },
  methods: {
    ...mapActions([ 'postChangeLanguageS' ]),
    handleChangeStatus () {
      let data = {
        language: this.languageStatus ? 'zh' : 'en'
      }
      this.postChangeLanguageS(data).then(res => {
        if (res && res === 'success') {
          this.$notify({
            content: '修改成功！',
            btn: 'close'
          })
        } else {
          this.$notify({
            content: '修改失败！',
            btn: 'close'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .jigsaw{
    .title{
      font-size: 14px;
      color: #333;
      text-align: center;
      display: inline-block;
      width: 100%;
      cursor: pointer;
      margin-bottom: 10px;
      line-height: 1.2;
      &:hover{
        color: red;
      }
    }
    .girlUl{
      margin:0;
      padding:0;
      list-style: none;
      width: 100%;
      height: auto;
      overflow: hidden;
      li{
        float: left;
        width: 33.333%;
        height: auto;
        overflow: hidden;
        box-sizing: border-box;
        padding: 0 5px;
        img{
          width: 100%;
          height: auto;
        }
      }
    }
  }
</style>
