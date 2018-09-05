<template>
  <div class="transferContent">
    <b-row>
      <b-col sm="12">
        <form ref="transferForm" name="transferForm">
          <b-card>
            <div slot="header">
              <b-form inline class="d-flex justify-content-around">
                <b-input id="loginname" size="sm" class="col-1" type="text" v-model="transferForm.loginname" placeholder="Member Account"></b-input>
                <b-input id="pno" class="col-1" size="sm" type="text" v-model="transferForm.pno" placeholder="Order  Number"></b-input>
                <div class="input-group">
                  <b-form-input id="startTime" type="date" size="sm" v-model="transferForm.startTime" :plain="true" placeholder="Starting Time" title="Starting Time"></b-form-input>
                  <label for="time" class="mx-2">-</label>
                  <b-form-input id="endTime" type="date" size="sm" v-model="transferForm.endTime" :plain="true" placeholder="End Time" title="End Time"></b-form-input>
                </div>
                <b-form-select id="code" v-model="transferForm.code" size="sm" class="col-1" :plain="true" :options="codeOptions" @input="setListGame()">
                  <template slot="first">
                    <option :value="''" disabled>Select Transfer types</option>
                  </template>
                </b-form-select>
                <b-button type="button" size="sm" variant="primary" class="rounded" @click="setTransfer()"><i class="fa fa-dot-circle-o"></i> Inquire</b-button>
              </b-form>
            </div>
            <table class="table table-hover table-striped text-center mb-0">
              <thead class="thead-light">
              <tr>
                <th scope="col">订单号</th>
                <th scope="col">会员账号</th>
                <th scope="col">转帐类型</th>
                <th scope="col">转帐前金额</th>
                <th scope="col">转账金额</th>
                <th scope="col">转账后后额</th>
                <th scope="col">转账时间</th>
                <th scope="col">备注</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in transferList" :key="index" v-if="transferList.length>0" :id="item.id">
                <th scope="row" v-text="item.pno"></th>
                <td v-text="item.loginname"></td>
                <td v-text="item.code"></td>
                <td v-text="item.beforeCredit"></td>
                <td v-text="item.remit"></td>
                <td v-text="item.newCredit"></td>
                <td v-text="item.creattime"></td>
                <td v-text="item.remark"></td>
              </tr>
              <tr v-if="transferList.length<=0">
                <td colspan="10"><i class="fa fa-spinner fa-spin"></i> 暂无转账记录</td>
              </tr>
              </tbody>
            </table>
            <div slot="footer" v-if="transferList.length>0">
              <b-form inline class="d-flex justify-content-end">
                <label class="mr-1">第</label>
                <b-form-select id="pageNum" v-model="transferForm.pageNum" size="sm" class="mr-1" :plain="true" :options="pageNumOptions" @input="setTransfer()"></b-form-select>
                <label class="mx-1">页，每页</label>
                <b-form-select id="pageSize" v-model="transferForm.pageSize" size="sm" :plain="true" :options="pageSizeOptions" @input="setTransfer()"></b-form-select>
                <label class="ml-1">条</label>
              </b-form>
            </div>
          </b-card>
        </form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'transfer',
  components: {},
  props: {},
  data () {
    return {
      transferForm: {
        pno: '',
        loginname: '',
        code: '',
        startTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 20
      },
      pageNumOptions: [],
      pageSizeOptions: [20, 50, 100],
      codeOptions: [
        { value: '', text: 'All' },
        { value: 201, text: '主账户转账到体育' },
        { value: 202, text: '体育转账到主账户' }
      ],
      transferList: []
    }
  },
  created () {
    this.setTransfer()
  },
  mounted () {

  },
  computed: {},
  methods: {
    ...mapActions(['TransferRecords']),
    setTransfer () {
      this.pageNumOptions = []
      this.TransferRecords(this.transferForm).then((data) => {
        this.transferList = data.list
        for (let i = 1; i <= data.pages; i++) {
          this.pageNumOptions.push(i)
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
  .transferContent{
    width: 100%;
    height: auto;
    overflow: hidden;
  }
</style>
