<template>
  <div class="ResultContent">
    <b-row>
      <b-col sm="12">
        <form ref="openingMatchesForm" name="openingMatchesForm">
          <b-card>
            <div slot="header">
              <b-form inline class="d-flex justify-content-start">
                <input class="form-control form-control-sm col-1 mr-4" @focus="openLeagueIdsModal()" type="text" v-model="openingMatchesForm.leagueIds" placeholder="Select LeagueIds">
                <b-form-select id="rtypes" v-model="openingMatchesForm.rtype" size="sm" class="col-1 mr-4" @input="getMatchListFn()" :plain="true" :options="rtypeOptions">
                  <template slot="first">
                    <option :value="''" disabled>Select EventType</option>
                  </template>
                </b-form-select>
                <b-form-input v-if="openingMatchesForm.rtype === 2" id="date" class="col-1 mr-4" type="date" size="sm" v-model="openingMatchesForm.date" :plain="true" placeholder="" title="Event Date"></b-form-input>
                <b-button type="button" size="sm" variant="primary" class="rounded" @click="getMatchListFn()"><i class="fa fa-dot-circle-o"></i> Inquire</b-button>
              </b-form>
            </div>
            <b-row class="text-center mx-0 px-0 text-light bg-dark border border-warning">
              <b-col sm="4" md="4" class="px-0">
                <b-row class="mx-0 h-100">
                  <b-col sm="3" class="p-1 align-self-center">赛事时间</b-col>
                  <b-col sm="2" class="p-1 d-flex align-items-center justify-content-center border-right border-left">赛事ID</b-col>
                  <b-col sm="7" class="p-0">
                    <b-row class="mx-0">
                      <b-col sm="12" class="p-1 border-bottom">比赛战队</b-col>
                    </b-row>
                    <b-row class="mx-0">
                      <b-col sm="9" class="p-1 align-self-center">队名</b-col>
                      <b-col sm="3" class="p-1 d-flex align-items-center justify-content-center border-left">比分</b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-col>
              <b-col sm="7" md="7"  class="px-0">
                <b-row class="mx-0">
                  <b-col sm="2" class="px-0 border-left">
                    <b-row class="mx-0">
                      <b-col sm="12" class="px-0">
                        <b-row class="mx-0">
                          <b-col sm="12" class="p-1 border-right border-bottom">独赢盘</b-col>
                        </b-row>
                        <b-row class="mx-0">
                          <b-col sm="6" class="p-1">赔率</b-col>
                          <b-col sm="6" class="p-1 border-right border-left">状态</b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col sm="5" class="px-0">
                    <b-row class="mx-0">
                      <b-col sm="12" class="px-0">
                        <b-row class="mx-0">
                          <b-col sm="12" class="p-1 border-bottom border-right">让分盘</b-col>
                        </b-row>
                        <b-row class="mx-0">
                          <b-col sm="4" class="p-1">赔率 / 状态</b-col>
                          <b-col sm="4" class="p-1 border-left">赔率 / 状态</b-col>
                          <b-col sm="4" class="p-1 border-right border-left">赔率 / 状态</b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col sm="5" class="px-0">
                    <b-row class="mx-0">
                      <b-col sm="12" class="px-0">
                        <b-row class="mx-0">
                          <b-col sm="12" class="p-1 border-bottom border-right">大小盘</b-col>
                        </b-row>
                        <b-row class="mx-0">
                          <b-col sm="4" class="p-1">赔率 / 状态</b-col>
                          <b-col sm="4" class="p-1 border-left">赔率 / 状态</b-col>
                          <b-col sm="4" class="p-1 border-right border-left">赔率 / 状态</b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-col>
              <b-col sm="1" md="1" class="p-1 d-flex align-items-center justify-content-center">
                赛事操作
              </b-col>
            </b-row>
            <b-row class="mx-0" v-if="openingMatchesList.length === 0">
              <b-col sm="12" md="12" class="text-center border border-top-0 py-3 bg-primary">
                <i class="fa fa-spinner fa-spin"></i> 暂无赛果数据！
              </b-col>
            </b-row>
            <b-card else class="bg-light card-accent-warning text-center mb-3 operateCard" v-for="(itemArr, index) in openingMatchesList" :key="index" style="border-top-color: #ffc107 !important;border-left-color: #ffc107 !important;">
              <div slot="header">
                <strong><i class="fa fa-star"></i><span class="text-primary" v-text="itemArr.category"></span> - <span v-text="itemArr.league"></span></strong>
                <!--<span class="float-right matchRefresh" @click="matchRefreshFn()" title="Refresh"><i class="fa fa-refresh" :class="{'fa-spin': isRefresh,'action':isRefresh}"></i></span>-->
              </div>
              <blockquote class="card-blockquote mb-0 px-0">
                <b-row class="text-center mx-0 border-bottom" v-for="(item, index) in itemArr.gameMatches" :key="index" :id="item.id" style="border-bottom-color: #ffc107 !important;">
                  <b-col sm="4" md="4" class="px-0 border-right">
                    <b-row class="mx-0 h-100">
                      <b-col sm="3" class="py-1 px-2 align-self-center">
                        <p class="mb-0" v-text="item.matchTime"></p>
                        <p class="mb-0 text-warning" v-text="(item.liveType === 1) ? 'Live' : ''"></p>
                      </b-col>
                      <b-col sm="2" class="p-1 py-2 border-right border-left d-flex align-items-center justify-content-center" v-text="item.matchId"></b-col>
                      <b-col sm="7" class="p-0">
                         <b-row class="mx-0">
                           <b-col sm="9" class="p-1 align-self-center">
                             <p class="mb-0 teamTitle" :title="item.teamLeft" v-text="item.teamLeft"></p>
                             <b class="my-0 d-block text-warning">vs</b>
                             <p class="mb-0 teamTitle" :title="item.teamRight" v-text="item.teamRight"></p>
                           </b-col>
                           <b-col sm="3" class="p-1 border-left d-flex align-items-center justify-content-center">
                             <p class="mb-0 block">
                               <b class="d-block" v-text="item.scoreLeft"></b>
                               <b class="text-warning d-block">vs</b>
                               <b class="d-block" v-text="item.scoreRight"></b>
                             </p>
                           </b-col>
                         </b-row>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col sm="7" md="7"  class="px-0 border-right">
                    <b-row class="mx-0 h-100">
                      <b-col sm="2" class="px-0">
                        <b-row class="mx-0 h-100">
                          <b-col sm="12" class="px-0">
                            <b-row class="mx-0 py-2 border-bottom" v-for="(oddsItem, index) in item.gameOdds" :key="index" v-if="oddsItem.betType === '2'">
                              <b-col sm="6" class="p-1 align-self-center border-right">
                                <p class="mb-1">
                                  <span v-text="oddsItem.ratioH" :class="{'text-success':oddsItem.ratioH < oddsItem.ratioV, 'text-info': oddsItem.ratioH === oddsItem.ratioV}"></span>
                                </p>
                                <p class="mb-0">
                                  <span v-text="oddsItem.ratioV" :class="{'text-success':oddsItem.ratioH > oddsItem.ratioV, 'text-info': oddsItem.ratioH === oddsItem.ratioV}"></span>
                                </p>
                              </b-col>
                              <b-col sm="6" class="p-1 align-self-center">
                                <b class="text-primary" v-text="oddsItem.strStatus"></b>
                              </b-col>
                            </b-row>
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col sm="5" class="px-0 border-left border-right">
                        <b-row class="mx-0">
                          <b-col sm="4" class="py-1 px-0 border-right border-bottom"  v-for="(oddsItem, index) in item.gameOdds" :key="index" v-if="oddsItem.betType === '0'">
                            <b-row class="mx-0 py-2">
                               <b-col sm="9" class="px-1">
                                 <p class="mb-1">
                                   <span v-text="oddsItem.betH" class="mr-1 text-warning"></span>
                                   <span v-text="oddsItem.ratioH" :class="{'text-success':oddsItem.ratioH < oddsItem.ratioV, 'text-info': oddsItem.ratioH === oddsItem.ratioV}"></span>
                                 </p>
                                 <p class="my-0">
                                   <span v-text="oddsItem.betV" class="mr-1 text-warning"></span>
                                   <span v-text="oddsItem.ratioV" :class="{'text-success':oddsItem.ratioH > oddsItem.ratioV, 'text-info': oddsItem.ratioH === oddsItem.ratioV}"></span>
                                 </p>
                               </b-col>
                               <b-col sm="3" class="px-1  border-left" style="line-height: 1">
                                 <span class="mb-0 text-primary d-block" v-text="oddsItem.strStatus"></span>
                               </b-col>
                            </b-row>
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col sm="5" class="px-0">
                        <b-row class="mx-0">
                          <b-col sm="4" class="py-1 px-0 border-right border-bottom"  v-for="(oddsItem, index) in item.gameOdds" :key="index" v-if="oddsItem.betType === '1'">
                            <b-row class="mx-0 py-2">
                              <b-col sm="9" class="px-1">
                                <p class="mb-1">
                                  <span v-text="oddsItem.betH" class="mr-1 text-warning"></span>
                                  <span v-text="oddsItem.ratioH" :class="{'text-success':oddsItem.ratioH < oddsItem.ratioV, 'text-info': oddsItem.ratioH === oddsItem.ratioV}"></span>
                                </p>
                                <p class="my-0">
                                  <span v-text="oddsItem.betV" class="mr-1 text-warning"></span>
                                  <span v-text="oddsItem.ratioV" :class="{'text-success':oddsItem.ratioH > oddsItem.ratioV, 'text-info': oddsItem.ratioH === oddsItem.ratioV}"></span>
                                </p>
                              </b-col>
                              <b-col sm="3" class="px-1  border-left" style="line-height: 1">
                                <span class="mb-0 text-primary d-block"  v-text="oddsItem.strStatus"></span>
                              </b-col>
                            </b-row>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col sm="1" md="1" class="p-0 align-self-center">
                    <b-row class="mx-0">
                      <b-col sm="12" class="p-0">
                        <b-row class="mx-0">
                          <b-col sm="12" class="p-1">
                            <b-button type="button" size="sm" variant="primary"  class="rounded" v-b-modal.modal-center title="Edit Match" @click="openMatchEditFn(item)"><i class="fa fa-edit"></i></b-button>
                            <b-button type="button" size="sm" variant="primary" :disabled="btnDisable" class="rounded bg-secondary" v-b-modal.modal-center @click="settingMatchFn(item.matchId)" title="Manual Settlement"><i class="fa fa-wrench"></i></b-button>
                            <b-button type="button" size="sm" variant="primary" :disabled="btnDisable" class="rounded bg-warning" title="End Match"  @click="openMatchFn(item.matchId, 4)"><i class="fa fa-stop"></i></b-button>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </blockquote>
            </b-card>
          </b-card>
        </form>
      </b-col>
    </b-row>
    <!--<b-modal title="Select LeagueIds" size="lg" centered v-model="openLeagueModal" @ok="openLeagueModalFn()" ok-variant="success">-->
      <!--<b-card class="mb-0">-->
        <!--<form ref="" method="post"  autoComplete="on">-->
          <!--<b-row>-->
            <!--<b-col sm="12">-->
              <!--<b-form-group label="">-->
                <!--<b-form-checkbox-group v-model="openingMatchesForm.leagueIds" name="leagueIds" :options="leagueIdsOptions">-->
                <!--</b-form-checkbox-group>-->
              <!--</b-form-group>-->
            <!--</b-col>-->
          <!--</b-row>-->
        <!--</form>-->
      <!--</b-card>-->
    <!--</b-modal>-->
    <b-modal title="Select LeagueIds" hide-header hide-footer size="lg" centered v-model="openLeagueModal"  ok-variant="success">
      <b-card class="mb-0">
        <form ref="" method="post"  autoComplete="on">
          <b-row>
            <b-col sm="12">
              <b-row class="p-1">
                <b-col sm="6" class="p-1" :key="key" v-for="(item, key) in leagueIdsOptions">
                  <input  type="checkbox" :value="item.value" :checked="checkedD"  v-model="openingMatchesForm.leagueIds" :id="'check' + key">
                  <label class="px-1 labels" :for="'check' + key">{{ item.text }}</label>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </form>
      </b-card>
      <div class="select-LeagueId-btn">
        <b-button type="button" size="sm" variant="success" class="rounded" @click="handleSelectLeagueId('OK')">Ok</b-button>
        <b-button type="button" size="sm" variant="secondary" class="rounded" @click="handleSelectLeagueId('CL')">Cancel</b-button>
        <b-button type="button" size="sm" variant="danger" class="rounded" @click="handleSelectLeagueId('DA')">Deselect all</b-button>
        <b-button type="button" size="sm" variant="primary" class="rounded" @click="handleSelectLeagueId('SA')">Select all</b-button>
      </div>
    </b-modal>
    <b-modal title="Edit Matches" centered v-model="matchEditModal" @ok="setMatchEditFn()" ok-variant="success">
      <b-card class="mb-0">
        <form ref="editMatchForm" method="post" :model="editMatchForm" autoComplete="on">
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="idEdit">matchId：</label>
                <b-form-input type="text" v-model="editMatchForm.matchId" disabled id="matchIdEdit"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="idEdit">scoreLeft：</label>
                <input class="form-control" autocomplete="off" @change="judgeNum2(editMatchForm.scoreLeft, 'scoreLeft')" type="text" v-model="editMatchForm.scoreLeft" placeholder="Enter scoreLeft">
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="idEdit">scoreRight：</label>
                <b-form-input type="text" v-model="editMatchForm.scoreRight" autocomplete="off"  @change="judgeNum2(editMatchForm.scoreRight, 'scoreRight')" placeholder="Enter scoreRight"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </form>
      </b-card>
    </b-modal>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import Model from './modal.vue'
import {validatNum2} from '../../model/validate'
export default {
  name: 'Result',
  components: {
    Model
  },
  props: {},
  data () {
    return {
      openingMatchesForm: {
        leagueIds: [],
        date: '',
        rtype: 1
      },
      rtypeOptions: [
        { value: 1, text: '今日' },
        { value: 2, text: '早盘' },
        { value: 3, text: '滚球' }
      ],
      openingMatchesList: [],
      openLeagueModal: false,
      matchEditModal: false,
      isNum2: [],
      editMatchForm: {
        matchId: '',
        scoreLeft: '',
        scoreRight: ''
      },
      oldMatchEdit: {
        matchId: '',
        scoreLeft: '',
        scoreRight: ''
      },
      matchSettedForm: {
        matchId: ''
      },
      pauseMatchForm: {
        id: '',
        status: ''
      },
      ControlArr: [],
      leagueIdsOptions: [],
      isRefresh: false,
      btnDisable: false,
      timedRefresh: '',
      checkedD: false
    }
  },
  created () {
    this.getMatchListFn()
  },
  mounted () {
    this.timedRefresh = setInterval(this.matchRefreshFn, 4000)
  },
  destroyed () {
    clearInterval(this.timedRefresh)
  },
  computed: {},
  methods: {
    ...mapActions(['getMameResultListAjax', 'getLeagueIdsAjax', 'setMatchResultScoreAjax', 'setMatchResultSettledAjax', 'operatingEventAjax']),
    getMatchListFn () {
      // this.openingMatchesList = []
      this.getMameResultListAjax(this.openingMatchesForm).then((data) => {
        this.openingMatchesList = data
        this.openingMatchesForm.leagueIds = []
      }).catch(err => {
        this.$notify({
          content: err,
          btn: 'close'
        })
      })
    },
    matchRefreshFn () {
      this.isRefresh = true
      this.getMatchListFn()
      // this.$notify({
      //   content: '正在刷新数据...',
      //   btn: 'close'
      // })
      setTimeout(() => {
        this.isRefresh = false
      }, 3000)
    },
    judgeNum2 (el, name) {
      // let elName = el.trim()
      let elName = el
      if (elName.length === 0) {
        this.isNum2.push(false)
        this.$notify({
          content: '赛事中' + name + '不能为空！',
          btn: 'close'
        })
      } else {
        if (validatNum2(el)) {
          this.isNum2.push(true)
        } else {
          this.isNum2.push(false)
          this.$notify({
            content: '赛事中' + name + '只能为0或正整数！',
            btn: 'close'
          })
        }
      }
    },
    openSelectLeagueId () {
      // this.getModifyMatchesFn()
      this.isModal = true
    },
    okModalFn () {
      this.isModal = false
    },
    cancelModalFn () {
      this.isModal = false
    },
    openMatchEditFn (item) {
      this.matchEditModal = true
      this.editMatchForm = {
        matchId: item.matchId,
        scoreLeft: item.scoreLeft,
        scoreRight: item.scoreRight
      }
      this.oldMatchEdit = {
        matchId: item.matchId,
        scoreLeft: item.scoreLeft,
        scoreRight: item.scoreRight
      }
    },
    setMatchEditFn () {
      this.isNum2 = []
      this.judgeNum2(this.editMatchForm.scoreLeft, 'scoreLeft')
      this.judgeNum2(this.editMatchForm.scoreRight, 'scoreRight')
      let oldObj = this.oldMatchEdit
      let newObj = this.editMatchForm
      Object.keys(oldObj).forEach(key => {
        // console.log(key + ' ------ ' + oldObj[key] + ' ------ ' + newObj[key])
        if (oldObj[key] === newObj[key]) {
          this.ControlArr.push(true)
        } else {
          this.ControlArr.push(false)
        }
      })
      if (this.ControlArr.indexOf(false) === -1) {
        this.ControlArr = []
        this.$notify({
          content: '未修改赛事信息！',
          btn: 'close'
        })
      } else {
        this.ControlArr = []
        if (this.isNum2.indexOf(false) === -1) {
          this.setMatchResultScoreAjax(this.editMatchForm).then((data) => {
            this.$notify({
              content: '赛事编辑成功！',
              btn: 'close'
            })
            this.editMatchForm = {}
            this.matchEditModal = false
            this.isNum2 = []
            this.getMatchListFn()
          }).catch(err => {
            this.$notify({
              content: err,
              btn: 'close'
            })
          })
        } else {
          this.$notify({
            content: '赛事编辑失败！',
            btn: 'close'
          })
        }
      }
    },
    openLeagueIdsModal () {
      this.openLeagueModal = true
      this.getModifyMatchesFn()
    },
    openLeagueModalFn () {
      this.openLeagueModal = false
      this.getMatchListFn()
    },
    settingMatchFn (id) {
      this.matchSettedForm = {
        matchId: id
      }
      this.btnDisable = true
      this.setMatchResultSettledAjax(this.matchSettedForm).then((data) => {
        this.$notify({
          content: '赛事正在进行手动结算...',
          btn: 'close'
        })
        this.matchSettedForm = {
          matchId: ''
        }
        this.getMatchListFn()
        this.btnDisable = false
      }).catch(err => {
        this.$notify({
          content: err,
          btn: 'close'
        })
      })
    },
    handleSelectLeagueId (ck) {
      switch (ck) {
        case 'SA' :
          this.openingMatchesForm.leagueIds = this.leagueIdsOptions.map(arr => arr.value)
          break
        case 'DA' :
          this.checkedD = false
          this.openingMatchesForm.leagueIds = []
          break
        case 'CL' :
          this.openingMatchesForm.leagueIds = []
          this.openLeagueModal = false
          break
        case 'OK' :
          this.openLeagueModal = false
          this.openLeagueModalFn()
          break
      }
    },
    openMatchFn (id, status) {
      this.pauseMatchForm = {
        id: id,
        status: status
      }
      this.btnDisable = true
      this.operatingEventAjax(this.pauseMatchForm).then((data) => {
        let msg = ''
        if (status === 0) {
          msg = '赛事竞猜已打开！'
        } else if (status === 1) {
          msg = '赛事竞猜已暂停！'
        } else if (status === 2) {
          msg = '赛事竞猜已取消！'
        } else if (status === 3) {
          msg = '赛事竞猜已关闭！'
        } else if (status === 4) {
          msg = '赛事已结束！'
        }
        this.$notify({
          content: msg,
          btn: 'close'
        })
        this.pauseMatchForm = {
          id: '',
          status: ''
        }
        this.btnDisable = false
        this.getMatchListFn()
      }).catch(err => {
        this.$notify({
          content: err,
          btn: 'close'
        })
      })
    },
    getModifyMatchesFn () {
      this.leagueIdsOptions = []
      this.getLeagueIdsAjax().then((data) => {
        let itemObj = {}
        for (let item of data) {
          itemObj = {
            text: item.category + ' - ' + item.league,
            value: item.lid
          }
          this.leagueIdsOptions.push(itemObj)
        }
      }).catch(err => {
        this.$notify({
          content: err,
          btn: 'close'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .ResultContent{
    width: 100%;
    height: auto;
    overflow: hidden;
    .card-header .btn-sm {
      margin-top: 0;
    }
    .btn-right1 {
      position: absolute;
      top: 0.75rem;
      right: 1.25rem;
    }
    .btn-right2 {
      position: absolute;
      top: 0.75rem;
      right: 6.6rem;
      right: 105px;
    }
    .btn-right3 {
      position: absolute;
      top: 0.75rem;
      right: 12rem;
      right: 193px;
    }
    .table.table-league td,.table.table-league th {
      vertical-align: middle;
    }
    .card-body, .card-block {
      padding: 1rem;
    }
    .openAll{
      position: relative;
      top: 50%;
      transform: translate(0%, -50%);
    }
    .input-group-text{
      padding: 0.375rem 0.25rem;
    }
    .operateCard{
      .card-header{
        text-align: left;
        padding: 0.25rem 1rem;
        i.fa{
          color: #ffc107;
          margin-right: 5px;
        }
        .matchRefresh{
         cursor: pointer;
          i.fa{
            color: #000d4d;
            margin-right: 0px;
            &.action,&:hover{
              color: #ffc107;
            }
          }
        }
      }
      .card-body{
        padding: 0px !important;
        .teamTitle{
          width: 100%;
          height: auto;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          cursor: pointer;
          &:hover{
            color: #20A8D8;
          }
        }
      }
    }
  }
  .modal-content{
    border-radius: 8px !important;
  }
  .sort-table{
    width: 100%;
    text-align: center;
  }
  .sort-table{
    border: 1px solid #c2cfd6
  }
  .sort-table tr th,.sort-table tr td{
    border-right: 1px solid #c2cfd6;
    border-bottom: 1px solid #c2cfd6;
  }
  .vdatetime-input{
    width: 100%;
    height: 28px;
    box-sizing: border-box;
    padding: 0.25rem 0.5rem;
    font-size: 0.76563rem;
    line-height: 1.5;
    color: #3e515b;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #c2cfd6;
    border-radius: 0;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  }
  .select-LeagueId-btn{
    padding-top: 15px;
    display: flex;
    flex-direction: row-reverse;
    button{
      width: 80px;
      margin-right: 10px;
    }
  }
</style>
