<template>
  <div class="operationContent">
    <b-row>
      <b-col sm="12">
        <form ref="gameSettingFindForm" name="gameSettingFindForm">
          <b-card>
            <div slot="header">
              <b-form inline class="d-flex justify-content-start">
                <b-input id="gameSetting_id" class="col-1 mr-4" size="sm" type="text" autocomplete="off" v-model="gameSettingFindForm.id" placeholder="Enter gameSetting Id"></b-input>
                <b-button type="button" size="sm" variant="primary" class="rounded" @click="findeGameSettingFn()"><i class="fa fa-dot-circle-o"></i> Inquire</b-button>
              </b-form>
              <b-button inline type="button" size="sm" variant="primary" class="rounded btn-right" @click="gameSettingAdd = true"><i class="fa fa-plus"></i> Add</b-button>
            </div>
            <table class="table table-hover table-striped text-center mb-0">
              <thead class="thead-light">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">MinBet</th>
                <th scope="col">MaxBet</th>
                <th scope="col">MaxPayout</th>
                <th scope="col">MaxHdp</th>
                <th scope="col">MaxOu</th>
                <th scope="col">MaxOe</th>
                <th scope="col">MaxObt</th>
                <th scope="col">MarginHdpWinner</th>
                <th scope="col">MarginOu</th>
                <th scope="col">Createtime</th>
                <th scope="col">Remark</th>
                <th scope="col">Setting</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in gameSettingList" :key="index" v-if="gameSettingList.length>0" :id="item.id">
                <th scope="row" v-text="item.id"></th>
                <td v-text="item.minBet"></td>
                <td v-text="item.maxBet"></td>
                <td v-text="item.maxPayout"></td>
                <td v-text="item.maxHdp"></td>
                <td v-text="item.maxOu"></td>
                <td v-text="item.maxOe"></td>
                <td v-text="item.maxObt"></td>
                <td v-text="item.marginHdpWinner"></td>
                <td v-text="item.marginOu"></td>
                <td v-text="item.createtime"></td>
                <td v-text="item.remark"></td>
                <td>
                  <b-button type="button" size="sm" variant="primary" class="rounded" v-b-modal.modal-center @click="opengameSettingEditFn(item)"><i class="fa fa-edit"></i> Edit</b-button>
                </td>
              </tr>
              <tr v-if="gameSettingList.length<=0">
                <td colspan="13"><i class="fa fa-spinner fa-spin"></i> 暂无游戏设置记录</td>
              </tr>
              </tbody>
            </table>
            <div slot="footer" v-if="gameSettingList.length>0">
              <b-form inline class="d-flex justify-content-end">
                <label class="mr-1">第</label>
                <b-form-select id="pageNum" v-model="gameSettingListForm.pageNum" size="sm" class="mr-1" :plain="true" :options="pageNumOptions" @input="gameSettingListFn()"></b-form-select>
                <label class="mx-1">页，每页</label>
                <b-form-select id="pageSize" v-model="gameSettingListForm.pageSize" size="sm" :plain="true" :options="pageSizeOptions" @input="gameSettingListFn()"></b-form-select>
                <label class="ml-1">条</label>
              </b-form>
            </div>
          </b-card>
        </form>
      </b-col>
    </b-row>
    <Model :isOpentModal="isModal" :titleName="titleName" @cancel="cancelSettingFn()">
      <div slot="body">
        <table class="table table-hover table-striped text-center mb-0">
          <thead class="thead-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">MinBet</th>
            <th scope="col">MaxBet</th>
            <th scope="col">MaxPayout</th>
            <th scope="col">MaxHdp</th>
            <th scope="col">MaxOu</th>
            <th scope="col">MaxOe</th>
            <th scope="col">MaxObt</th>
            <th scope="col">MarginHdpWinner</th>
            <th scope="col">MarginOu</th>
            <th scope="col">Createtime</th>
            <th scope="col">Remark</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="findGameSettingList.hasOwnProperty('id')" :id="findGameSettingList.id">
            <th scope="row" v-text="findGameSettingList.id"></th>
            <td v-text="findGameSettingList.minBet"></td>
            <td v-text="findGameSettingList.maxBet"></td>
            <td v-text="findGameSettingList.maxPayout"></td>
            <td v-text="findGameSettingList.maxHdp"></td>
            <td v-text="findGameSettingList.maxOu"></td>
            <td v-text="findGameSettingList.maxOe"></td>
            <td v-text="findGameSettingList.maxObt"></td>
            <td v-text="findGameSettingList.marginHdpWinner"></td>
            <td v-text="findGameSettingList.marginOu"></td>
            <td v-text="findGameSettingList.createtime"></td>
            <td v-text="findGameSettingList.remark"></td>
          </tr>
          <tr v-if="!findGameSettingList.hasOwnProperty('id')">
            <td colspan="12">暂无此游戏设置记录</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div slot="footer"></div>
    </Model>
    <b-modal title="Add GameSetting" centered v-model="gameSettingAdd" @ok="gameSettingAddFn()" ok-variant="success">
      <b-card class="mb-0">
        <form ref="gameSettingAddForm" method="post"  autoComplete="off">
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label for="gameSettingAdd.minBet">minBet：</label>
                <b-form-input type="text" v-model="gameSettingAddForm.minBet" autocomplete="off" @change="judgeNum(gameSettingAddForm.minBet, 'minBet')" id="gameSettingAdd.minBet" placeholder="Enter gameSetting minBet"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="gameSettingAdd.maxBet">maxBet：</label>
                <b-form-input type="text" v-model="gameSettingAddForm.maxBet" autocomplete="off" @change="judgeNum(gameSettingAddForm.maxBet, 'maxBet')" id="gameSettingAdd.maxBet" placeholder="Enter gameSetting maxBet"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label for="gameSettingAdd.maxPayout">maxPayout：</label>
                <b-form-input type="text" v-model="gameSettingAddForm.maxPayout" autocomplete="off" @change="judgeNum(gameSettingAddForm.maxPayout, 'maxPayout')" id="gameSettingAdd.maxPayout" placeholder="Enter gameSetting maxPayout"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="gameSettingAdd.maxHdp">maxHdp：</label>
                <b-form-input type="text" v-model="gameSettingAddForm.maxHdp" autocomplete="off" @change="judgeNum(gameSettingAddForm.maxHdp, 'maxHdp')" id="gameSettingAdd.maxHdp" placeholder="Enter gameSetting maxHdp"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label for="gameSettingAdd.maxOu">maxOu：</label>
                <b-form-input type="text" v-model="gameSettingAddForm.maxOu" autocomplete="off" @change="judgeNum(gameSettingAddForm.maxOu, 'maxOu')" id="gameSettingAdd.maxOu" placeholder="Enter gameSetting maxOu"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="gameSettingAdd.maxOe">maxOe：</label>
                <b-form-input type="text" v-model="gameSettingAddForm.maxOe" autocomplete="off" @change="judgeNum(gameSettingAddForm.maxOe, 'maxOe')" id="gameSettingAdd.maxOe" placeholder="Enter gameSetting maxOe"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label for="gameSettingAdd.maxObt">maxObt：</label>
                <b-form-input type="text" v-model="gameSettingAddForm.maxObt" autocomplete="off" @change="judgeNum(gameSettingAddForm.maxObt, 'maxObt')" id="gameSettingAdd.maxObt" placeholder="Enter gameSetting maxObt"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="gameSettingAdd.marginHdpWinner">marginHdpWinner：</label>
                <b-form-input type="text" v-model="gameSettingAddForm.marginHdpWinner" autocomplete="off" @change="judgeNum(gameSettingAddForm.marginHdpWinner, 'marginHdpWinner')" id="gameSettingAdd.marginHdpWinner" placeholder="Enter gameSetting marginHdpWinner"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label for="gameSettingAdd.marginOu">marginOu：</label>
                <b-form-input type="text" v-model="gameSettingAddForm.marginOu" autocomplete="off" @change="judgeNum(gameSettingAddForm.marginOu, 'marginOu')" id="gameSettingAdd.marginOu" placeholder="Enter gameSetting marginOu"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="gameSettingAdd.remark">remark：</label>
                <b-form-input type="text" v-model="gameSettingAddForm.remark" autocomplete="off" id="gameSettingAdd.remark" placeholder="Enter gameSetting remark"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </form>
      </b-card>
    </b-modal>
    <b-modal title="Edit GameSetting" centered v-model="gameSettingEdit" @ok="gameSettingEditFn()" ok-variant="success">
      <b-card class="mb-0">
        <form ref="gameSettingEditForm" method="post"  autoComplete="off">
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label for="gameSettingEdit.id">id：</label>
                <b-form-input type="text" v-model="gameSettingEditForm.id" autocomplete="off" disabled id="gameSettingEdit.id" placeholder="Enter gameSetting id"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="gameSettingEdit.minBet">minBet：</label>
                <b-form-input type="text" v-model="gameSettingEditForm.minBet" autocomplete="off" @change="judgeNum(gameSettingEditForm.minBet, 'minBet')" id="gameSettingEdit.minBet" placeholder="Enter gameSetting minBet"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="gameSettingEdit.maxBet">maxBet：</label>
                <b-form-input type="text" v-model="gameSettingEditForm.maxBet" autocomplete="off" @change="judgeNum(gameSettingEditForm.maxBet, 'maxBet')" id="gameSettingEdit.maxBet" placeholder="Enter gameSetting maxBet"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="gameSettingEdit.maxPayout">maxPayout：</label>
                <b-form-input type="text" v-model="gameSettingEditForm.maxPayout" autocomplete="off" @change="judgeNum(gameSettingEditForm.maxPayout, 'maxPayout')" id="gameSettingEdit.maxPayout" placeholder="Enter gameSetting maxPayout"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="gameSettingEdit.maxHdp">maxHdp：</label>
                <b-form-input type="text" v-model="gameSettingEditForm.maxHdp" autocomplete="off" @change="judgeNum(gameSettingEditForm.maxHdp, 'maxHdp')" id="gameSettingEdit.maxHdp" placeholder="Enter gameSetting maxHdp"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="gameSettingEdit.maxOu">maxOu：</label>
                <b-form-input type="text" v-model="gameSettingEditForm.maxOu" autocomplete="off" @change="judgeNum(gameSettingEditForm.maxOu, 'maxOu')" id="gameSettingEdit.maxOu" placeholder="Enter gameSetting maxOu"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="gameSettingEdit.maxOe">maxOe：</label>
                <b-form-input type="text" v-model="gameSettingEditForm.maxOe" autocomplete="off" @change="judgeNum(gameSettingEditForm.maxOe, 'maxOe')" id="gameSettingEdit.maxOe" placeholder="Enter gameSetting maxOe"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="gameSettingEdit.maxObt">maxObt：</label>
                <b-form-input type="text" v-model="gameSettingEditForm.maxObt" autocomplete="off" @change="judgeNum(gameSettingEditForm.maxObt, 'maxObt')" id="gameSettingEdit.maxObt" placeholder="Enter gameSetting maxObt"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="gameSettingEdit.marginHdpWinner">marginHdpWinner：</label>
                <b-form-input type="text" v-model="gameSettingEditForm.marginHdpWinner" autocomplete="off" @change="judgeNum(gameSettingEditForm.marginHdpWinner, 'marginHdpWinner')" id="gameSettingEdit.marginHdpWinner" placeholder="Enter gameSetting marginHdpWinner"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="gameSettingEdit.marginOu">marginOu：</label>
                <b-form-input type="text" v-model="gameSettingEditForm.marginOu" autocomplete="off" @change="judgeNum(gameSettingEditForm.marginOu, 'marginOu')" id="gameSettingEdit.marginOu" placeholder="Enter gameSetting marginOu"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="gameSettingEdit.remark">remark：</label>
                <b-form-input type="text" v-model="gameSettingEditForm.remark" autocomplete="off" id="gameSettingEdit.remark" placeholder="Enter gameSetting remark"></b-form-input>
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
import {validatNum} from '../../model/validate'
export default {
  name: 'GameSetting',
  components: {
    Model
  },
  props: {},
  data () {
    return {
      gameSettingListForm: {
        pageNum: 1,
        pageSize: 20
      },
      pageNumOptions: [],
      pageSizeOptions: [20, 50, 100],
      gameSettingList: [],
      gameSettingAdd: false,
      findGameSettingInfo: false,
      gameSettingEdit: false,
      gameSettingFindForm: {
        id: ''
      },
      findGameSettingList: {},
      gameSettingAddForm: {
        minBet: '',
        maxBet: '',
        maxPayout: '',
        maxHdp: '',
        maxOu: '',
        maxOe: '',
        maxObt: '',
        marginHdpWinner: '',
        marginOu: '',
        remark: ''
      },
      isNum: [],
      gameSettingEditForm: {
        id: '',
        minBet: '',
        maxBet: '',
        maxPayout: '',
        maxHdp: '',
        maxOu: '',
        maxOe: '',
        maxObt: '',
        marginHdpWinner: '',
        marginOu: '',
        remark: ''
      },
      oldgameSettingEdit: {
        id: '',
        minBet: '',
        maxBet: '',
        maxPayout: '',
        maxHdp: '',
        maxOu: '',
        maxOe: '',
        maxObt: '',
        marginHdpWinner: '',
        marginOu: '',
        remark: ''
      },
      ControlArr: [],
      isModal: false,
      titleName: 'Find GameSetting'
    }
  },
  created () {
    this.gameSettingListFn()
  },
  mounted () {

  },
  computed: {},
  methods: {
    ...mapActions(['getLeagueAddSelectId', 'addGameSettingAjax', 'updateGameSettingAjax', 'findGameSettingAjax']),
    gameSettingListFn () {
      this.getLeagueAddSelectId(this.gameSettingListForm).then((data) => {
        this.pageNumOptions = []
        this.gameSettingList = data.list
        for (let i = 1; i <= data.pages; i++) {
          this.pageNumOptions.push(i)
        }
      }).catch(err => {
        this.$notify({
          content: err,
          btn: 'close'
        })
      })
    },
    judgeNum (el, name) {
      // let minBet = el.trim()
      let minBet = el
      if (minBet.length === 0) {
        this.isNum.push(false)
        this.$notify({
          content: 'gameSetting中' + name + '不能为空！',
          btn: 'close'
        })
      } else {
        if (validatNum(el)) {
          this.isNum.push(true)
        } else {
          this.isNum.push(false)
          this.$notify({
            content: 'gameSetting中' + name + '只能为正整数或带两个小数！',
            btn: 'close'
          })
        }
      }
    },
    findeGameSettingFn () {
      this.isModal = true
      this.findGameSettingAjax(this.gameSettingFindForm).then((data) => {
        this.findGameSettingList = data
        this.gameSettingFindForm.id = ''
      }).catch(err => {
        this.$notify({
          content: err,
          btn: 'close'
        })
      })
    },
    gameSettingAddFn () {
      this.isNum = []
      this.judgeNum(this.gameSettingAddForm.minBet, 'minBet')
      this.judgeNum(this.gameSettingAddForm.maxBet, 'maxBet')
      this.judgeNum(this.gameSettingAddForm.maxPayout, 'maxPayout')
      this.judgeNum(this.gameSettingAddForm.maxHdp, 'maxHdp')
      this.judgeNum(this.gameSettingAddForm.maxOu, 'maxOu')
      this.judgeNum(this.gameSettingAddForm.maxOe, 'maxOe')
      this.judgeNum(this.gameSettingAddForm.maxObt, 'maxObt')
      this.judgeNum(this.gameSettingAddForm.marginHdpWinner, 'marginHdpWinner')
      this.judgeNum(this.gameSettingAddForm.marginOu, 'marginOu')
      if (this.isNum.indexOf(false) === -1) {
        this.addGameSettingAjax(this.gameSettingAddForm).then((data) => {
          this.$notify({
            content: '游戏设置新增成功！',
            btn: 'close'
          })
          this.gameSettingAddForm = {
            minBet: '',
            maxBet: '',
            maxPayout: '',
            maxHdp: '',
            maxOu: '',
            maxOe: '',
            maxObt: '',
            marginHdpWinner: '',
            marginOu: '',
            remark: ''
          }
          this.gameSettingAdd = false
          this.gameSettingListFn()
        })
      } else {
        this.$notify({
          content: '游戏设置新增失败！',
          btn: 'close'
        })
      }
    },
    opengameSettingEditFn (item) {
      this.gameSettingEdit = true
      this.gameSettingEditForm = {
        id: item.id,
        minBet: item.minBet,
        maxBet: item.maxBet,
        maxPayout: item.maxPayout,
        maxHdp: item.maxHdp,
        maxOu: item.maxOu,
        maxOe: item.maxOe,
        maxObt: item.maxObt,
        marginHdpWinner: item.marginHdpWinner,
        marginOu: item.marginOu,
        remark: item.remark
      }
      this.oldgameSettingEdit = {
        id: item.id,
        minBet: item.minBet,
        maxBet: item.maxBet,
        maxPayout: item.maxPayout,
        maxHdp: item.maxHdp,
        maxOu: item.maxOu,
        maxOe: item.maxOe,
        maxObt: item.maxObt,
        marginHdpWinner: item.marginHdpWinner,
        marginOu: item.marginOu,
        remark: item.remark
      }

      if (!item.remark) {
        this.gameSettingEditForm.remark = ''
        this.oldgameSettingEdit.remark = ''
      }
    },
    gameSettingEditFn () {
      this.judgeNum(this.gameSettingEditForm.minBet, 'minBet')
      this.judgeNum(this.gameSettingEditForm.maxBet, 'maxBet')
      this.judgeNum(this.gameSettingEditForm.maxPayout, 'maxPayout')
      this.judgeNum(this.gameSettingEditForm.maxHdp, 'maxHdp')
      this.judgeNum(this.gameSettingEditForm.maxOu, 'maxOu')
      this.judgeNum(this.gameSettingEditForm.maxOe, 'maxOe')
      this.judgeNum(this.gameSettingEditForm.maxObt, 'maxObt')
      this.judgeNum(this.gameSettingEditForm.marginHdpWinner, 'marginHdpWinner')
      this.judgeNum(this.gameSettingEditForm.marginOu, 'marginOu')
      let oldObj = this.oldgameSettingEdit
      let newObj = this.gameSettingEditForm
      Object.keys(oldObj).forEach(key => {
        if (oldObj[key] === newObj[key]) {
          this.ControlArr.push(true)
        } else {
          this.ControlArr.push(false)
        }
      })
      if (this.ControlArr.indexOf(false) === -1) {
        this.ControlArr = []
        this.$notify({
          content: '未修改游戏设置信息！',
          btn: 'close'
        })
      } else {
        this.ControlArr = []
        if (this.isNum.indexOf(false) === -1) {
          this.updateGameSettingAjax(this.gameSettingEditForm).then((data) => {
            this.$notify({
              content: '游戏设置编辑成功！',
              btn: 'close'
            })
            this.gameSettingEditForm = {
              id: '',
              minBet: '',
              maxBet: '',
              maxPayout: '',
              maxHdp: '',
              maxOu: '',
              maxOe: '',
              maxObt: '',
              marginHdpWinner: '',
              marginOu: '',
              remark: ''
            }
            this.gameSettingEdit = false
            this.isNum = []
            this.gameSettingListFn()
          })
        } else {
          this.$notify({
            content: '游戏设置编辑失败！',
            btn: 'close'
          })
        }
      }
    },
    cancelSettingFn () {
      this.isModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .operationContent{
    width: 100%;
    height: auto;
    overflow: hidden;
    .card-header .btn-sm {
      margin-top: 0;
    }
    .btn-right {
      position: absolute;
      top: 0.75rem;
      right: 1.25rem;
    }
    .table.table-gameSetting td,.table.table-gameSetting th {
      padding:5px 3px !important;
      vertical-align: middle;
    }
  }
  .modal-content{
    border-radius: 8px !important;
  }
</style>
