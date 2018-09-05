<template>
  <div class="flowContent">
    <b-row>
      <b-col sm="12">
        <form ref="flowForm" name="flowForm">
          <b-card>
            <div slot="header">
              <b-form inline class="d-flex justify-content-around">
                <b-input id="loginname" size="sm" class="col-1" type="text" v-model="flowForm.loginname" placeholder="Member Account"></b-input>
                <b-input id="pno" class="col-1" size="sm" type="text" v-model="flowForm.pno" placeholder="Note  Number"></b-input>
                <div class="input-group">
                  <b-form-input id="startTime" type="date" size="sm" v-model="flowForm.startTime" :plain="true" placeholder="Starting Time" title="Starting Time"></b-form-input>
                  <label for="time" class="mx-2">-</label>
                  <b-form-input id="endTime" type="date" size="sm" v-model="flowForm.endTime" :plain="true" placeholder="End Time" title="End Time"></b-form-input>
                </div>
                <!--<b-form-select id="type" v-model="flowForm.type" size="sm" class="col-1" :plain="true" :options="typeOptions" @input="setListGame()">-->
                  <!--<template slot="first">-->
                    <!--<option :value="''" disabled>Select Types</option>-->
                  <!--</template>-->
                <!--</b-form-select>-->
                <!--<b-button type="button" size="sm" variant="primary" class="rounded">Select Types</b-button>-->
                <input class="form-control form-control-sm col-1 mr-4"  type="text"  placeholder="Select Types" v-model="flowForm.type" @focus="showSelectType = true">
                <b-button type="button" size="sm" variant="primary" class="rounded" @click="flowFn()"><i class="fa fa-dot-circle-o"></i> Inquire</b-button>
              </b-form>
            </div>
            <table class="table table-hover table-striped text-center mb-0">
              <thead class="thead-light">
              <tr>
                <th scope="col">注单号</th>
                <th scope="col">会员账号</th>
                <th scope="col">类型</th>
                <th scope="col">操作前金额</th>
                <th scope="col">金额</th>
                <th scope="col">操作后后额</th>
                <th scope="col">时间</th>
                <th scope="col">备注</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in flowList" :key="index" v-if="flowList.length>0" :id="item.id">
                <th scope="row" v-text="item.pno"></th>
                <td v-text="item.loginname"></td>
                <td v-text="item.type"></td>
                <td v-text="item.beforeCredit"></td>
                <td v-text="item.remit"></td>
                <td v-text="item.newCredit"></td>
                <td v-text="item.createtime"></td>
                <td v-text="item.remark"></td>
              </tr>
              <tr v-if="flowList.length<=0">
                <td colspan="10"><i class="fa fa-spinner fa-spin"></i> 暂无流水记录</td>
              </tr>
              </tbody>
            </table>
            <div slot="footer" v-if="flowList.length>0">
              <b-form inline class="d-flex justify-content-end">
                <label class="mr-1">第</label>
                <b-form-select id="pageNum" v-model="flowForm.pageNum" size="sm" class="mr-1" :plain="true" :options="pageNumOptions" @input="flowFn()"></b-form-select>
                <label class="mx-1">页，每页</label>
                <b-form-select id="pageSize" v-model="flowForm.pageSize" size="sm" :plain="true" :options="pageSizeOptions" @input="flowFn()"></b-form-select>
                <label class="ml-1">条</label>
              </b-form>
            </div>
          </b-card>
        </form>
      </b-col>
    </b-row>
    <b-modal title="Select LeagueIds" size="lg"  hide-footer hide-header  centered v-model="showSelectType" ok-variant="success">
      <b-card class="mb-0">
        <form ref="" method="post"  autoComplete="on">
          <b-row>
            <b-col sm="12">
              <b-form-group label="">
                <b-form-checkbox-group v-model="flowForm.type" name="leagueIds" :options="typeOptions">
                </b-form-checkbox-group>
              </b-form-group>
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
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'flow',
  components: {},
  props: {},
  data () {
    return {
      flowForm: {
        pno: '',
        loginname: '',
        type: '',
        startTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 20
      },
      pageNumOptions: [],
      pageSizeOptions: [20, 50, 100],
      typeOptions: [
        { value: 201, text: '主账户转账到体育' },
        { value: 202, text: '体育转账到主账户' },
        { value: 930, text: '电竞下注' },
        { value: 931, text: '电竞派彩' },
        { value: 932, text: '电竞取消' },
        { value: 933, text: '电竞返现' }
      ],
      flowList: [],
      showSelectType: false,
      showMod: false,
      checked: false
    }
  },
  created () {
    this.flowFn()
  },
  mounted () {

  },
  computed: {},
  methods: {
    ...mapActions(['flowRecords']),
    flowFn () {
      this.pageNumOptions = []
      this.flowRecords(this.flowForm).then((data) => {
        this.flowList = data.list
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
    handleSelectLeagueId (type) {
      switch (type) {
        case 'CL' :
          this.showSelectType = false
          this.flowForm.type = ''
          break
        case 'OK' :
          this.showSelectType = false
          break
        case 'SA' :
          this.flowForm.type = this.typeOptions.map(arr => arr.value)
          break
        case 'DA' :
          this.flowForm.type = ''
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .flowContent{
    width: 100%;
    height: auto;
    overflow: hidden;
  }
  .select-type{
     list-style: none;
     padding: 0;
     margin: 0;
     li{
       display: inline-block;
       width: 49%;
       text-align: left;
       input{
         vertical-align: middle
       }
     }
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
