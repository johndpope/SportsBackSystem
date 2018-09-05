<template>
  <div class="operationContent">
    <b-row>
      <b-col sm="12">
        <form ref="leagueListForm" name="leagueListForm">
          <b-card>
            <div slot="header">
              <b-form inline class="d-flex justify-content-start">
                <b-form-select id="category" v-model="leagueListForm.category" size="sm" class="col-1 mr-4" :plain="true" :options="categoryOptions">
                  <template slot="first">
                    <option :value="''" disabled>Select category</option>
                  </template>
                </b-form-select>
                <b-form-select id="leagueStatus" v-model="leagueListForm.leagueStatus" size="sm" class="col-1 mr-4" :plain="true" :options="leagueStatusOptions">
                  <template slot="first">
                    <option :value="''" disabled>Select leagueStatus</option>
                  </template>
                </b-form-select>
                <b-form-select id="sportType" v-model="leagueListForm.sportType" size="sm" class="col-1 mr-4" :plain="true" :options="sportTypeOptions">
                  <template slot="first">
                    <option :value="''" disabled>Select sportType</option>
                  </template>
                </b-form-select>
                <b-input id="marginHdpWinner" class="col-1 mr-4" size="sm" type="text" v-model="leagueListForm.marginHdpWinner" placeholder="Enter marginHdpWinner"></b-input>
                <b-button type="button" size="sm" variant="primary" class="rounded" :disabled="btnDisable" @click="leagueListFn()"><i class="fa fa-dot-circle-o"></i> Inquire</b-button>
              </b-form>
              <b-button inline type="button" size="sm" variant="primary" class="rounded btn-right" @click="leagueAdd = true"><i class="fa fa-plus"></i> Add</b-button>
            </div>
            <table class="table table-hover table-striped text-center mb-0">
              <thead class="thead-light">
              <tr>
                <th scope="col">联赛ID</th>
                <th scope="col">联赛名称</th>
                <th scope="col">联赛类别</th>
                <th scope="col">联赛状态</th>
                <th scope="col">赛事类型</th>
                <th scope="col">创建时间</th>
                <th scope="col">备注</th>
                <th scope="col">编辑</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in leagueList" :key="index" v-if="leagueList.length>0" :id="item.id">
                <th scope="row" v-text="item.lid"></th>
                <td v-text="item.league"></td>
                <td v-text="item.category"></td>
                <td v-text="item.status"></td>
                <td v-text="item.sportType"></td>
                <td v-text="item.createtime"></td>
                <td v-text="item.remark"></td>
                <td>
                  <b-button type="button" size="sm" variant="primary" class="rounded" v-b-modal.modal-center @click="openLeagueSettingInfo(item.gameSetting)"><i class="fa fa-search"></i> GameSetting</b-button>
                  <b-button type="button" size="sm" variant="primary" class="rounded" v-b-modal.modal-center @click="openleagueEditFn(item)"><i class="fa fa-edit"></i> Edit</b-button>
                </td>
              </tr>
              <tr v-if="leagueList.length<=0">
                <td colspan="10"><i class="fa fa-spinner fa-spin"></i> 暂无联赛记录</td>
              </tr>
              </tbody>
            </table>
            <div slot="footer" v-if="leagueList.length>0">
              <b-form inline class="d-flex justify-content-end">
                <label class="mr-1">第</label>
                <b-form-select id="pageNum" v-model="leagueListForm.pageNum" size="sm" class="mr-1" :plain="true" :options="pageNumOptions" @input="leagueListFn()"></b-form-select>
                <label class="mx-1">页，每页</label>
                <b-form-select id="pageSize" v-model="leagueListForm.pageSize" size="sm" :plain="true" :options="pageSizeOptions" @input="leagueListFn()"></b-form-select>
                <label class="ml-1">条</label>
              </b-form>
            </div>
          </b-card>
        </form>
      </b-col>
    </b-row>
    <b-modal title="Add league" centered v-model="leagueAdd" @ok="leagueAddFn()" ok-variant="success">
      <b-card class="mb-0">
        <form ref="leagueAddForm" method="post"  autoComplete="on">
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="leagueAdd">联赛名称:</label>
                <b-form-input type="text" v-model="leagueAddForm.league" autocomplete="off" @change="judgeUser(leagueAddForm.league)" id="leagueAdd" placeholder="Enter league"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group >
                <label for="categoryAdd">联赛类别:</label>
                <b-form-select id="categoryAdd" v-model="leagueAddForm.category" :plain="true" :options="categoryOptions">
                  <template slot="first">
                    <option :value="''" disabled>Select category</option>
                  </template>
                </b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group >
                <label for="sportTypeAdd">联赛类型:</label>
                <b-form-select id="sportTypeAdd" v-model="leagueAddForm.sportType" :plain="true" :options="sportTypeOptions">
                  <template slot="first">
                    <option :value="''" disabled>Select sportType</option>
                  </template>
                </b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="settingIdAdd">SettingID：</label>
                <div class="input-group">
                  <input type="text" class="form-control" v-model="leagueAddForm.settingId" autocomplete="off" id="settingIdAdd" @focus="openSettingModal()" placeholder="Enter settingId">
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="openSettingModal()">Select SettingId</button>
                  </div>
                </div>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="remark">备注：</label>
                <b-form-input type="text" v-model="leagueAddForm.remark" autocomplete="off" id="remark" placeholder="Emter Remark"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </form>
      </b-card>
    </b-modal>
    <b-modal title="League GameSetting" size="lg" centered v-model="leagueSettingInfo" hide-footer>
      <table class="table table-hover table-striped text-center mb-0 table-league">
        <thead class="thead-light">
        <tr>
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
        <tr :id="leagueGameSettingList.id">
          <th scope="row" v-text="leagueGameSettingList.minBet"></th>
          <td v-text="leagueGameSettingList.maxBet"></td>
          <td v-text="leagueGameSettingList.maxPayout"></td>
          <td v-text="leagueGameSettingList.maxHdp"></td>
          <td v-text="leagueGameSettingList.maxOu"></td>
          <td v-text="leagueGameSettingList.maxOe"></td>
          <td v-text="leagueGameSettingList.maxObt"></td>
          <td v-text="leagueGameSettingList.marginHdpWinner"></td>
          <td v-text="leagueGameSettingList.marginOu"></td>
          <td v-text="leagueGameSettingList.createtime"></td>
          <td v-text="leagueGameSettingList.remark"></td>
        </tr>
        <tr v-if="leagueGameSettingList.length<=0">
          <td colspan="11"><i class="fa fa-spinner fa-spin"></i> 暂无联赛GameSettingId记录</td>
        </tr>
        </tbody>
      </table>
    </b-modal>
    <b-modal title="Edit League" centered v-model="leagueEdit" @ok="leagueEditFn()" ok-variant="success">
      <b-card class="mb-0">
        <form ref="leagueEditForm" method="post" :model="leagueEditForm" autoComplete="on">
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="idEdit">联赛ID：</label>
                <b-form-input type="text" v-model="leagueEditForm.id" disabled id="idEdit"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label for="leagueEdit">联赛名称：</label>
                <b-form-input type="text" v-model="leagueEditForm.leagueCn" @change="judgeUser(leagueEditForm.league)" id="leagueEdit" placeholder="Enter League"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="leagueEdit">League name：</label>
                <b-form-input type="text" v-model="leagueEditForm.league" @change="judgeUser(leagueEditForm.league)" id="leagueEdit" placeholder="Enter League"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b-form-group >
                <label for="categoryEdit">联赛类别:</label>
                <b-form-select id="categoryEdit" v-model="leagueEditForm.categoryCn" :plain="true" :options="categoryOptions">
                  <template slot="first">
                    <option :value="''" disabled>Select category</option>
                  </template>
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group >
                <label for="categoryEdit">League category:</label>
                <b-form-select id="categoryEdit" v-model="leagueEditForm.category" :plain="true" :options="engCategoryOptions">
                  <template slot="first">
                    <option :value="''" disabled>Select category</option>
                  </template>
                </b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b-form-group >
                <label for="sportTypeEdit">赛事类型:</label>
                <b-form-select id="sportTypeEdit" v-model="leagueEditForm.sportType" :plain="true" :options="sportTypeOptions">
                  <template slot="first">
                    <option :value="''" disabled>Select sportType</option>
                  </template>
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group >
                <label for="leagueStatusEdit">联赛状态:</label>
                <b-form-select id="leagueStatusEdit" v-model="leagueEditForm.leagueStatus" :plain="true" :options="leagueStatusOptions">
                  <template slot="first">
                    <option :value="''" disabled>Select leagueStatus</option>
                  </template>
                </b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="settingIdEdit">SettingID：</label>
                <div class="input-group">
                  <input type="text" class="form-control" v-model="leagueEditForm.settingId" id="settingIdEdit" disabled placeholder="Enter settingId">
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="openSettingModal()">Select SettingId</button>
                  </div>
                </div>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="remarkEdit">备注：</label>
                <b-form-input type="text" v-model="leagueEditForm.remark" autocomplete="off" id="remarkEdit" placeholder="Emter Remark"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </form>
      </b-card>
    </b-modal>
    <Model :isOpentModal="isModal" :titleName="titleName" @cancel="cancelSettingFn()" @ok="okSettingFn()">
       <div slot="body">
         <table class="table table-hover table-striped text-center mb-0">
           <thead class="thead-light">
           <tr>
             <th scope="col">SettingId</th>
             <th scope="col">MinBet</th>
             <th scope="col">MaxBet</th>
             <th scope="col">MaxPayout</th>
             <th scope="col">MaxHdp</th>
             <th scope="col">MaxOu</th>
             <th scope="col">MaxOe</th>
             <th scope="col">MaxObt</th>
             <th scope="col">MarginHdpWinner</th>
             <th scope="col">MarginOu</th>
             <th scope="col">Remark</th>
             <!--<th scope="col">Createtime</th>-->
           </tr>
           </thead>
           <tbody>
           <tr v-for="(item, index) in settingIdList" :key="index" v-if="settingIdList.length>0" :id="item.id">
             <th>
               <div class="custom-control custom-radio" @change="setSettingId(item.id)">
                 <input type="radio" class="custom-control-input" :id="'id'+item.id" name="radio-stacked" required :value="item.id">
                 <label class="custom-control-label" :for="'id'+item.id" v-text="item.id"></label>
               </div>
             </th>
             <th v-text="item.minBet"></th>
             <td v-text="item.maxBet"></td>
             <td v-text="item.maxPayout"></td>
             <td v-text="item.maxHdp"></td>
             <td v-text="item.maxOu"></td>
             <td v-text="item.maxOe"></td>
             <td v-text="item.maxObt"></td>
             <td v-text="item.marginHdpWinner"></td>
             <td v-text="item.marginOu"></td>
             <td v-text="item.remark" />
             <!--<td v-text="item.createtime"></td>-->
           </tr>
           <tr v-if="settingIdList.length=0">
             <td colspan="10">暂无联赛GameSettingId记录</td>
           </tr>
           </tbody>
           <tfoot v-if="settingIdData.pages>1">
           <tr>
             <td colspan="11">
               <nav aria-label="Page navigation example mb-0">
                 <ul class="pagination justify-content-end mb-0">
                   <li class="page-item" :class="{'disabled': settingIdData.prePage === 0}" @click="getSettingIdData(settingIdData.prePage)">
                     <a class="page-link" href="javascript:;" tabindex="-1">Previous</a>
                   </li>
                   <li class="page-item" :class="{'disabled': settingIdData.pageNum === settingIdData.pages}" @click="getSettingIdData(settingIdData.nextPage)">
                     <a class="page-link" href="javascript:;" tabindex="-1">Next</a>
                   </li>
                 </ul>
               </nav>
             </td>
           </tr>
           </tfoot>
         </table>
       </div>
    </Model>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import Model from './modal.vue'
export default {
  name: 'league',
  components: {
    Model
  },
  props: {},
  data () {
    return {
      leagueListForm: {
        category: '',
        leagueStatus: '',
        sportType: '',
        marginHdpWinner: '',
        pageNum: 1,
        pageSize: 20
      },
      pageNumOptions: [],
      pageSizeOptions: [20, 50, 100],
      categoryOptions: [
        { value: '', text: 'All' },
        { value: 'CS:GO', text: 'CS:GO' },
        { value: '英雄联盟', text: '英雄联盟' },
        { value: '守望先锋', text: '守望先锋' },
        { value: '星际争霸2', text: '星际争霸2' },
        { value: 'Dota 2', text: 'Dota 2' }
      ],
      engCategoryOptions: [
        { value: 'CS:GO', text: 'CS:GO' },
        { value: 'League of Legends', text: 'League of Legends' },
        { value: 'Overwatch', text: 'Overwatch' },
        { value: 'Starcraft 2', text: 'Starcraft 2' },
        { value: 'Dota 2', text: 'Dota 2' }
      ],
      leagueStatusOptions: [
        { value: '', text: 'All' },
        { value: -1, text: '初始化' },
        { value: 0, text: '进行中' },
        { value: 1, text: '过期' }
      ],
      sportTypeOptions: [
        { value: '', text: 'All' },
        { value: 'esport', text: 'esport' },
        { value: 'Sport', text: 'Sport' }
      ],
      leagueList: [],
      leagueGameSettingList: {},
      leagueAdd: false,
      leagueSettingInfo: false,
      leagueEdit: false,
      leagueAddForm: {
        category: '',
        league: '',
        sportType: '',
        settingId: '',
        remark: ''
      },
      isUser: false,
      isRole: [],
      leagueEditForm: {},
      oldleagueEdit: {},
      ControlArr: [],
      isSettingId: false,
      settingIdValue: '',
      isModal: false,
      titleName: 'Select GameSettingId',
      settingIdForm: {
        pageNum: 1,
        pageSize: 6
      },
      settingIdData: {},
      settingIdList: [],
      getSettingID: '',
      btnDisable: false
    }
  },
  created () {
    this.leagueListFn()
  },
  mounted () {

  },
  computed: {},
  methods: {
    ...mapActions(['getLeagueList', 'getLeagueEdit', 'getLeagueAdd', 'getLeagueAddSelectId', 'getFindGameLeagueID']),
    leagueListFn () {
      this.btnDisable = true
      this.getLeagueList(this.leagueListForm).then((data) => {
        this.pageNumOptions = []
        this.leagueList = data.list
        for (let i = 1; i <= data.pages; i++) {
          this.pageNumOptions.push(i)
        }
        this.btnDisable = false
      }).catch(err => {
        this.$notify({
          content: err,
          btn: 'close'
        })
      })
    },
    judgeUser (el) {
      let category = el.trim()
      if (category.length === 0) {
        this.$notify({
          content: '联赛名称不能为空！',
          btn: 'close'
        })
      } else {
        this.isUser = true
      }
    },
    judgeRole (el, user) {
      let userRole = el
      if (userRole !== '' && userRole !== null && userRole !== undefined) {
        this.isRole.push(true)
      } else {
        this.$notify({
          content: '请选择' + user + '！',
          btn: 'close'
        })
        this.isRole.push(false)
      }
    },
    openLeagueSettingInfo (item) {
      this.leagueSettingInfo = true
      this.leagueGameSettingList = item
    },
    leagueAddFn () {
      this.isRole = []
      this.judgeUser(this.leagueAddForm.league)
      this.judgeRole(this.leagueAddForm.category, '联赛类别')
      this.judgeRole(this.leagueAddForm.sportType, '联赛类型')
      this.judgeRole(this.leagueAddForm.settingId, '联赛ID')
      if (this.isUser && (this.isRole.indexOf(false) === -1)) {
        this.getLeagueAdd(this.leagueAddForm).then((data) => {
          this.$notify({
            content: '联赛新增成功！',
            btn: 'close'
          })
          this.leagueAddForm = {
            category: '',
            league: '',
            sportType: '',
            settingId: '',
            remark: ''
          }
          this.leagueAdd = false
          this.isUser = false
          this.isRole = []
          this.leagueListFn()
        })
      } else {
        this.$notify({
          content: '联赛新增失败！',
          btn: 'close'
        })
      }
    },
    openleagueEditFn (item) {
      let data = {
        id: item.id
      }
      this.getFindGameLeagueID(data).then(res => {
        if (res) {
          this.leagueEditForm = {
            id: res.id,
            league: res.league,
            settingId: res.settingId,
            leagueCn: res.leagueCn,
            categoryCn: res.categoryCn,
            category: res.category,
            sportType: res.sportType,
            leagueStatus: res.leagueStatus,
            remark: res.remark
          }
          this.oldleagueEdit = {
            id: res.id,
            league: res.league,
            settingId: res.settingId,
            leagueCn: res.leagueCn,
            categoryCn: res.categoryCn,
            category: res.category,
            sportType: res.sportType,
            leagueStatus: res.leagueStatus,
            remark: res.remark
          }
          this.leagueEdit = true
        }
      }).catch(err => {
        throw err
      })
    },
    leagueEditFn () {
      console.log(this.leagueEditForm)
      console.log(this.oldleagueEdit)
      this.isRole = []
      this.judgeUser(this.leagueEditForm.league)
      this.judgeRole(this.leagueEditForm.category, '联赛类别')
      this.judgeRole(this.leagueEditForm.sportType, '联赛类型')
      this.judgeRole(this.leagueEditForm.settingId, '联赛ID')
      let oldObj = this.oldleagueEdit
      let newObj = this.leagueEditForm
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
          content: '未修改联赛信息！',
          btn: 'close'
        })
      } else {
        this.ControlArr = []
        if (this.isUser && (this.isRole.indexOf(false) === -1)) {
          this.getLeagueEdit(this.leagueEditForm).then((data) => {
            this.$notify({
              content: '联赛编辑成功！',
              btn: 'close'
            })
            this.leagueEditForm = {}
            this.leagueEdit = false
            this.isUser = false
            this.isRole = []
            this.leagueListFn()
          })
        } else {
          this.$notify({
            content: '联赛编辑失败！',
            btn: 'close'
          })
        }
      }
    },
    openSettingModal () {
      this.isModal = true
      this.getLeagueAddSelectId(this.settingIdForm).then((data) => {
        this.settingIdData = data
        this.settingIdList = data.list
      }).catch(err => {
        this.$notify({
          content: err,
          btn: 'close'
        })
      })
    },
    okSettingFn () {
      this.leagueAddForm.settingId = this.getSettingID
      this.leagueEditForm.settingId = this.getSettingID
      this.isModal = false
      this.getSettingID = ''
    },
    cancelSettingFn () {
      this.isModal = false
    },
    getSettingIdData (num) {
      if (num === 0) {
        return false
      }
      this.settingIdForm.pageNum = num
      this.openSettingModal()
    },
    setSettingId (num) {
      this.getSettingID = num
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
    .table.table-league td,.table.table-league th {
      padding:5px 3px !important;
      vertical-align: middle;
    }
  }
  .modal-content{
    border-radius: 8px !important;
  }
</style>
