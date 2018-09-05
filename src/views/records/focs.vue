<template>
  <div class="transferContent">
    <b-row>
      <b-col sm="12">
        <form ref="focsForm" name="focsForm">
          <b-card>
            <div slot="header">
              <b-form inline>
                <b-form-select id="team" v-model="focsForm.team" size="sm" class="col-1 mr-4" :plain="true" :options="focsTeamOptions" @input="setListGame()">
                  <template slot="first">
                    <option :value="''" disabled>Select Team</option>
                  </template>
                </b-form-select>
                <b-input size="sm" class="col-1  mr-4" type="text" v-model="focsForm.score" @change="judgeNum(focsForm.score, 'score')" placeholder="Focs Score"></b-input>
                <b-input class="col-1  mr-4" size="sm" type="text" v-model="focsForm.step" @change="judgeNum(focsForm.step, 'step')" placeholder="Focs Step"></b-input>
                <b-button type="button" size="sm" variant="primary" class="rounded" @click="getFocsList()"><i class="fa fa-dot-circle-o"></i> Inquire</b-button>
              </b-form>
            </div>
            <table class="table table-hover table-striped text-center table-sm">
              <thead class="thead-light">
              <tr>
                <th scope="col" :colspan="stepSortList.length + 1">
                  HDP
                  <span class="float-right focsRefresh" :class="{'action': isRefresh}" @click="refreshFocs()">
                     <i class="fa fa-refresh" :class="{'fa-spin': isRefresh}"></i>
                  </span>
                </th>
              </tr>
              <tr>
                <th scope="col">Team</th>
                <th scope="col" v-for="(item, index) in stepSortList" :key="index" v-text="item">Team</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(itemObj, index) in focsList.HDP" :key="index" v-if="focsList.HDP.length>0">
                <th scope="row">
                  {{itemObj.teamLeft}}<b class="thColor">VS</b> {{itemObj.teamRight}}
                </th>
                <td v-for="(item, index) in itemObj.score" :key="index" v-text="item"></td>
              </tr>
              <tr v-if="focsList.HDP.length<=0">
                <td colspan="10"><i class="fa fa-spinner fa-spin"></i> 暂无HDP行情记录</td>
              </tr>
              </tbody>
            </table>
            <table class="table table-hover table-striped text-center mb-0 table-sm">
              <thead class="thead-light">
              <tr>
                <th scope="col"  :colspan="stepSortList.length + 1">
                  OU
                  <span class="float-right focsRefresh" :class="{'action': isRefresh}" @click="refreshFocs()">
                     <i class="fa fa-refresh" :class="{'fa-spin': isRefresh}"></i>
                  </span>
                </th>
              </tr>
              <tr>
                <th scope="col">Team</th>
                <th scope="col" v-for="(item, index) in stepSortList" :key="index" v-text="item">Team</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(itemObj, index) in focsList.OU" :key="index" v-if="focsList.HDP.length>0">
                <th scope="row">
                  {{itemObj.teamLeft}}<b class="thColor">VS</b> {{itemObj.teamRight}}
                </th>
                <td v-for="(item, index) in itemObj.score" :key="index" v-text="item"></td>
              </tr>
              <tr v-if="focsList.HDP.length<=0">
                <td colspan="10"><i class="fa fa-spinner fa-spin"></i> 暂无OU行情记录</td>
              </tr>
              </tbody>
            </table>
          </b-card>
        </form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {validatNum2} from '../../model/validate'
export default {
  name: 'focs',
  components: {},
  props: {},
  data () {
    return {
      focsForm: {
        team: '',
        score: '',
        step: ''
      },
      focsTeamOptions: [],
      isNum: [],
      focsList: {},
      stepSortList: [],
      isRefresh: false
    }
  },
  created () {
    this.getFocsTeam()
    this.getFocsList()
  },
  mounted () {

  },
  computed: {},
  methods: {
    ...mapActions(['setGetTeamList', 'setPostScoreReport']),
    getFocsTeam () {
      this.focsTeamOptions = []
      this.setGetTeamList().then((data) => {
        for (let i = 0; i < data.length; i++) {
          let val = data[i]
          let obj = {
            value: val,
            text: val
          }
          this.focsTeamOptions.push(obj)
        }
      }).catch(err => {
        this.$notify({
          content: err,
          btn: 'close'
        })
      })
    },
    judgeNum (el, name) {
      // let elName = el.trim()
      let elName = el
      if (elName.length === 0) {
        this.isNum.push(true)
      } else {
        el = el.trim()
        if (validatNum2(el)) {
          if (elName > 15) {
            this.isNum.push(false)
            this.$notify({
              content: 'Focs中' + name + '请不要大于15',
              btn: 'close'
            })
          } else {
            this.isNum.push(true)
          }
        } else {
          this.isNum.push(false)
          this.$notify({
            content: 'Focs中' + name + '只能为0或正整数',
            btn: 'close'
          })
        }
      }
    },
    getFocsList () {
      this.isNum = []
      this.judgeNum(this.focsForm.score, 'score')
      this.judgeNum(this.focsForm.step, 'step')
      if (this.isNum.indexOf(false) === -1) {
        this.SortList(this.focsForm.score, this.focsForm.step)
        this.setPostScoreReport(this.focsForm).then((data) => {
          this.focsList = data
        }).catch(err => {
          this.$notify({
            content: err,
            btn: 'close'
          })
        })
      } else {
        this.$notify({
          content: 'Focs中请输入正确格式的值',
          btn: 'close'
        })
      }
    },
    refreshFocs () {
      this.isRefresh = true
      this.getFocsTeam()
      this.getFocsList()
      this.$notify({
        content: '正在刷新数据...',
        btn: 'close'
      })
      setTimeout(() => {
        this.isRefresh = false
      }, 2000)
    },
    SortList (index, step) {
      this.stepSortList = []
      if (index === '') {
        index = 0
      } else {
        index = Number(index)
      }
      if (step === '') {
        step = 5
      } else {
        step = Number(step)
      }
      let arrL = step + index
      let arrLow = index - step
      let addList = []
      let lowerList = []
      for (var j = index - 1; j >= arrLow; j--) {
        lowerList.push(j)
      }
      for (var i = index; i <= arrL; i++) {
        addList.push(i)
      }
      let newLowerList = lowerList.reverse()
      this.stepSortList.push(...newLowerList)
      this.stepSortList.push(...addList)
    }
  }
}
</script>

<style lang="scss" scoped>
  .transferContent{
    width: 100%;
    height: auto;
    overflow: hidden;
    font-size: 12px !important;
    .focsRefresh{
      display: inline-block;
      margin-right: 10px;
      &:hover,&.action{
        cursor: pointer;
        color: yellow;
      }
    }
    .thColor{
      display: inline-block;
      margin: 0 5px;
      color: #20A8D8;
    }
  }
</style>
