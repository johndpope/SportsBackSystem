<template>
  <div class="memberContent">
    <b-row>
      <b-col sm="12">
        <form ref="memberListForm" name="memberListForm">
          <b-card>
            <div slot="header">
              <b-form inline class="d-flex justify-content-start">
                <b-input id="loginname" class="col-1 mr-4" size="sm" type="text" v-model="memberListForm.loginname" placeholder="Member Name"></b-input>
                <b-form-select id="status" v-model="memberListForm.status" size="sm" class="col-1 mr-4" :plain="true" :options="statusMemberList">
                  <template slot="first">
                    <option :value="''" disabled>Select Status</option>
                  </template>
                </b-form-select>
                <b-button type="button" size="sm" variant="primary" class="rounded" :disable="btnDisable" @click="memberListFn()"><i class="fa fa-dot-circle-o"></i> Inquire</b-button>
              </b-form>
            </div>
            <table class="table table-hover table-striped text-center mb-0">
              <thead class="thead-light">
              <tr>
                <th scope="col">会员姓名</th>
                <th scope="col">账户余额</th>
                <th scope="col">代理Code</th>
                <!--<th scope="col">Locale</th>-->
                <!--<th scope="col">Product</th>-->
                <th scope="col">会员状态</th>
                <th scope="col">创建时间</th>
                <th scope="col">备注</th>
                <th scope="col">编辑</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in memberList" :key="index" v-if="memberList.length>0" :id="item.id">
                <th scope="row" v-text="item.loginname"></th>
                <td v-text="item.amount"></td>
                <td v-text="item.agentCode"></td>
                <!--<td v-text="item.locale"></td>-->
                <!--<td v-text="item.product"></td>-->
                <td v-text="item.status"></td>
                <td v-text="item.creattime"></td>
                <td v-text="item.remark"></td>
                <td>
                  <b-button type="button" size="sm" variant="primary" class="rounded" v-b-modal.modal-center @click="openMemberEditFn(item)"><i class="fa fa-edit"></i> Edit</b-button>
                </td>
              </tr>
              <tr v-if="memberList.length<=0">
                <td colspan="10"><i class="fa fa-spinner fa-spin"></i> 暂无会员记录</td>
              </tr>
              </tbody>
            </table>
            <div slot="footer" v-if="memberList.length>0">
              <b-form inline class="d-flex justify-content-end">
                <label class="mr-1">第</label>
                <b-form-select id="pageNum" v-model="memberListForm.pageNum" size="sm" class="mr-1" :plain="true" :options="pageNumOptions" @input="memberListFn()"></b-form-select>
                <label class="mx-1">页，每页</label>
                <b-form-select id="pageSize" v-model="memberListForm.pageSize" size="sm" :plain="true" :options="pageSizeOptions" @input="memberListFn()"></b-form-select>
                <label class="ml-1">条</label>
              </b-form>
            </div>
          </b-card>
        </form>
      </b-col>
    </b-row>
    <b-modal title="Edit Member" centered v-model="memberEdit" @ok="memberEditFn()" ok-variant="success">
      <b-card class="mb-0">
        <form ref="memberEditForm" method="post" :model="memberEditForm" autoComplete="on">
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="idEdit">会员ID：</label>
                <b-form-input type="text" v-model="memberEditForm.id" disabled id="idEdit"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="loginnameEdit">会员姓名：</label>
                <b-form-input type="text" v-model="memberEditForm.loginname" @change="judgeUser(memberEditForm.loginname)" id="loginnameEdit" placeholder="Enter Member Name"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="amountEdit">会员余额：</label>
                <b-form-input type="text" v-model="memberEditForm.amount" id="amountEdit" disabled></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="agentCodeEdit">代理Code：</label>
                <b-form-input type="text" v-model="memberEditForm.agentCode"  @change="judgeAgentCode(memberEditForm.agentCode)"  id="agentCodeEdit" placeholder="Enter AgentCode"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <!--<b-row>-->
            <!--<b-col sm="12">-->
              <!--<b-form-group>-->
                <!--<label for="localeEdit">Locale：</label>-->
                <!--<b-form-input type="text" v-model="memberEditForm.locale" id="localeEdit" placeholder="Enter Locale"></b-form-input>-->
              <!--</b-form-group>-->
            <!--</b-col>-->
          <!--</b-row>-->
          <!--<b-row>-->
            <!--<b-col sm="12">-->
              <!--<b-form-group>-->
                <!--<label for="productEdit">Product：</label>-->
                <!--<b-form-input type="text" v-model="memberEditForm.product" id="productEdit" placeholder="Enter Product"></b-form-input>-->
              <!--</b-form-group>-->
            <!--</b-col>-->
          <!--</b-row>-->
          <b-row>
            <b-col sm="12">
              <b-form-group >
                <label for="statusEdit">会员状态:</label>
                <b-form-select id="typeEdit" v-model="memberEditForm.status" :plain="true" :options="statusMemberList">
                  <template slot="first">
                    <option :value="''" disabled>Select Status</option>
                  </template>
                </b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="creattimeEdit">创建时间:</label>
                <b-form-input type="text" v-model="memberEditForm.creattime" disabled id="creattime"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="remarkEdit">备注：</label>
                <b-form-input type="text" v-model="memberEditForm.remark" id="remarkEdit" placeholder="Emter Remark"></b-form-input>
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
import {validatUser} from '../../model/validate'
export default {
  name: 'member',
  components: {},
  props: {},
  data () {
    return {
      memberListForm: {
        loginname: '',
        status: '',
        pageNum: 1,
        pageSize: 20
      },
      pageNumOptions: [],
      pageSizeOptions: [20, 50, 100],
      memberList: [],
      memberEdit: false,
      isUser: false,
      isAgentCode: false,
      statusMemberList: [
        { value: 'ACTIVE', text: '活跃' },
        { value: 'INACTIVE', text: '不活跃' },
        { value: 'CLOSED', text: '关闭' },
        { value: 'SUSPENDED', text: '暂停' },
        { value: '', text: 'All' }
      ],
      memberEditForm: {
        id: '',
        loginname: '',
        amount: '',
        agentCode: '',
        locale: '',
        product: '',
        status: '',
        createtime: '',
        remark: ''
      },
      oldmemberEdit: {
        id: '',
        loginname: '',
        amount: '',
        agentCode: '',
        locale: '',
        product: '',
        status: '',
        createtime: '',
        remark: ''
      },
      ControlArr: [],
      btnDisable: false
    }
  },
  created () {
    this.memberListFn()
  },
  mounted () {

  },
  computed: {},
  methods: {
    ...mapActions(['getMemberList', 'getMemberEdit']),
    memberListFn () {
      this.btnDisable = true
      console.log(this.btnDisable)
      this.getMemberList(this.memberListForm).then((data) => {
        this.pageNumOptions = []
        this.memberList = data.list
        for (let i = 1; i <= data.pages; i++) {
          this.pageNumOptions.push(i)
        }
      }).catch(err => {
        this.$notify({
          content: err,
          btn: 'close'
        })
      })
      this.btnDisable = false
    },
    judgeUser (el) {
      let loginname = el.trim()
      if (loginname.length === 0) {
        this.$notify({
          content: '会员名不能为空！',
          btn: 'close'
        })
      } else {
        if (loginname.length < 6 || loginname.length > 15) {
          this.$notify({
            content: '会员名由6-15个字符组成！',
            btn: 'close'
          })
        } else {
          if (validatUser(loginname)) {
            this.isUser = true
          } else {
            this.$notify({
              content: '会员名由数字与字母组成！',
              btn: 'close'
            })
          }
        }
      }
    },
    judgeAgentCode (el) {
      let code
      if (el === null || el === undefined) {
        code = ''
      } else {
        code = el.trim()
      }
      if (code.length === 0) {
        this.$notify({
          content: '代理Code不能为空！',
          btn: 'close'
        })
        this.isAgentCode = false
      } else {
        if (code.length < 1 || code.length > 10) {
          this.$notify({
            content: '代理Code由1-10个字符组成！',
            btn: 'close'
          })
          this.isAgentCode = false
        } else {
          this.isAgentCode = true
        }
      }
    },
    openMemberEditFn (item) {
      this.memberEdit = true
      this.memberEditForm = {
        id: item.id,
        loginname: item.loginname,
        amount: item.amount,
        agentCode: item.agentCode,
        locale: item.locale,
        product: item.product,
        creattime: item.creattime,
        remark: item.remark
      }
      this.oldmemberEdit = {
        id: item.id,
        loginname: item.loginname,
        amount: item.amount,
        agentCode: item.agentCode,
        locale: item.locale,
        product: item.product,
        creattime: item.creattime,
        remark: item.remark
      }
      for (let j = 0; j < this.statusMemberList.length; j++) {
        let obj = this.statusMemberList[j]
        if (obj.value === item.status) {
          this.memberEditForm.status = obj.value
          this.oldmemberEdit.status = obj.value
        }
      }

      if (item.remark === undefined) {
        this.memberEditForm.remark = ''
        this.oldmemberEdit.remark = ''
      }
    },
    memberEditFn () {
      this.judgeUser(this.memberEditForm.loginname)
      this.judgeAgentCode(this.memberEditForm.agentCode)
      let oldObj = this.oldmemberEdit
      let newObj = this.memberEditForm
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
          content: '未修改会员信息！',
          btn: 'close'
        })
      } else {
        this.ControlArr = []
        if (this.isUser && this.isAgentCode) {
          this.getMemberEdit(this.memberEditForm).then((data) => {
            this.$notify({
              content: '会员编辑成功！',
              btn: 'close'
            })
            this.memberEditForm = {}
            this.memberEdit = false
            this.isUser = false
            this.isAgentCode = false
            this.memberListFn()
          })
        } else {
          this.$notify({
            content: '会员编辑失败！',
            btn: 'close'
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .memberContent{
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
  }
  .modal-content{
    border-radius: 8px !important;
  }
</style>
