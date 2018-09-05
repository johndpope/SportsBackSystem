<template>
  <div class="operationContent">
    <b-row>
      <b-col sm="12">
        <form ref="employeeListForm" name="employeeListForm">
          <b-card>
            <div slot="header">
              <b-form inline class="d-flex justify-content-start">
                <b-input id="username" class="col-1 mr-4" size="sm" type="text" v-model="employeeListForm.username" placeholder="User Name"></b-input>
                <b-form-select id="roleId" v-model="employeeListForm.roleId" size="sm" class="col-1 mr-4" :plain="true" :options="roleList">
                  <template slot="first">
                    <option :value="''" disabled>Select Role</option>
                  </template>
                </b-form-select>
                <b-button type="button" size="sm" variant="primary" class="rounded" :disabled="btnDisable" @click="employeeListFn()"><i class="fa fa-dot-circle-o"></i> Inquire</b-button>
              </b-form>
              <b-button inline type="button" size="sm" variant="primary" class="rounded btn-right" @click="employeeAdd = true"><i class="fa fa-plus"></i> Add</b-button>
            </div>
            <table class="table table-hover table-striped text-center mb-0">
              <thead class="thead-light">
              <tr>
                <th scope="col">用户姓名</th>
                <th scope="col">用户密码</th>
                <th scope="col">用户角色</th>
                <th scope="col">用户状态</th>
                <th scope="col">创建时间</th>
                <th scope="col">备注</th>
                <th scope="col">编辑</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in employeeList" :key="index" v-if="employeeList.length>0" :id="item.id">
                <th scope="row" v-text="item.username"></th>
                <td v-text="item.password"></td>
                <td v-text="item.roleName"></td>
                <td v-text="item.type"></td>
                <td v-text="item.createtime"></td>
                <td v-text="item.remark"></td>
                <td>
                  <b-button type="button" size="sm" variant="primary" class="rounded" v-b-modal.modal-center @click="openEmployeeEditFn(item)"><i class="fa fa-edit"></i> Edit</b-button>
                </td>
              </tr>
              <tr v-if="employeeList.length<=0">
                <td colspan="10"><i class="fa fa-spinner fa-spin"></i> 暂无员工记录</td>
              </tr>
              </tbody>
            </table>
            <div slot="footer" v-if="employeeList.length>0">
              <b-form inline class="d-flex justify-content-end">
                <label class="mr-1">第</label>
                <b-form-select id="pageNum" v-model="employeeListForm.pageNum" size="sm" class="mr-1" :plain="true" :options="pageNumOptions" @input="employeeListFn()"></b-form-select>
                <label class="mx-1">页，每页</label>
                <b-form-select id="pageSize" v-model="employeeListForm.pageSize" size="sm" :plain="true" :options="pageSizeOptions" @input="employeeListFn()"></b-form-select>
                <label class="ml-1">条</label>
              </b-form>
            </div>
          </b-card>
        </form>
      </b-col>
    </b-row>
    <b-modal title="Add Employee" centered v-model="employeeAdd" @ok="employeeAddFn()" ok-variant="success">
      <b-card class="mb-0">
        <form ref="employeeAddForm" method="post" :model="employeeAddForm" autoComplete="on">
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="usernameAdd">用户姓名：</label>
                <b-form-input type="text" v-model="employeeAddForm.username" @change="judgeUser(employeeAddForm.username)" id="usernameAdd" placeholder="Enter UserName"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="passwordAdd">用户密码</label>
                <b-form-input type="password" v-model="employeeAddForm.password" @change="judgePwd(employeeAddForm.password)" id="passwordAdd" placeholder="Enter PassWord"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group >
                <label for="roleIdAdd">用户角色:</label>
                <b-form-select id="roleIdAdd" v-model="employeeAddForm.roleId" :plain="true" :options="roleList">
                  <template slot="first">
                    <option :value="''" disabled>Select Role</option>
                  </template>
                </b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="remark">备注：</label>
                <b-form-input type="text" v-model="employeeAddForm.remark" id="remark" placeholder="Emter Remark"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </form>
      </b-card>
    </b-modal>
    <b-modal title="Edit Employee" centered v-model="employeeEdit" @ok="employeeEditFn()" ok-variant="success">
      <b-card class="mb-0">
        <form ref="employeeAddForm" method="post" :model="employeeAddForm" autoComplete="on">
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="idEdit">用户ID：</label>
                <b-form-input type="text" v-model="employeeEditForm.id" disabled id="idEdit"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="usernameEdit">用户姓名：</label>
                <b-form-input type="text" v-model="employeeEditForm.username" @change="judgeUser(employeeEditForm.username)" id="usernameEdit" placeholder="Enter UserName"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="passwordEdit">用户密码</label>
                <b-form-input type="text" v-model="employeeEditForm.password" @change="judgePwd(employeeEditForm.password)" id="passwordEdit" placeholder="Enter PassWord"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group >
                <label for="roleIdEdit">用户角色:</label>
                <b-form-select id="roleIdEdit" v-model="employeeEditForm.roleId" :plain="true" :options="roleList">
                  <template slot="first">
                    <option :value="''" disabled>Select Role</option>
                  </template>
                </b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group >
                <label for="typeEdit">用户状态:</label>
                <b-form-select id="typeEdit" v-model="employeeEditForm.type" :plain="true" :options="statusList">
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
                <label for="createtimeEdit">创建时间:</label>
                <b-form-input type="text" v-model="employeeEditForm.createtime" disabled id="createtimeEdit"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="remarkEdit">备注：</label>
                <b-form-input type="text" v-model="employeeEditForm.remark" id="remarkEdit" placeholder="Emter Remark"></b-form-input>
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
  name: 'employee',
  components: {},
  props: {},
  data () {
    return {
      employeeListForm: {
        username: '',
        roleId: '',
        pageNum: 1,
        pageSize: 20
      },
      pageNumOptions: [],
      pageSizeOptions: [20, 50, 100],
      employeeList: [],
      roleList: [],
      employeeAdd: false,
      employeeEdit: false,
      employeeAddForm: {
        username: '',
        password: '',
        roleId: '',
        remark: ''
      },
      isUser: false,
      isPwd: false,
      isRole: false,
      statusList: [
        { value: 0, text: '启用' },
        { value: 1, text: '禁用' }
      ],
      employeeEditForm: {
        id: '',
        username: '',
        password: '',
        roldId: '',
        type: '',
        createtime: '',
        remark: ''
      },
      oldEmployeeEdit: {
        id: '',
        username: '',
        password: '',
        roldId: '',
        type: '',
        createtime: '',
        remark: ''
      },
      ControlArr: [],
      btnDisable: false
    }
  },
  created () {
    this.employeeListFn()
  },
  mounted () {

  },
  computed: {},
  methods: {
    ...mapActions(['getEmployeeList', 'getEmployeeAdd', 'getEmployeeEdit']),
    employeeListFn () {
      this.btnDisable = true
      this.getEmployeeList(this.employeeListForm).then((data) => {
        this.roleList = []
        this.pageNumOptions = []
        this.employeeList = data.page.list
        for (let i = 1; i <= data.page.pages; i++) {
          this.pageNumOptions.push(i)
        }
        for (let j = 0; j < data.roleList.length; j++) {
          let opetionObj = {}
          opetionObj.value = data.roleList[j].id
          opetionObj.text = data.roleList[j].name
          this.roleList.push(opetionObj)
        }
        this.roleList.push({ value: '', text: 'All' })
        this.btnDisable = false
      }).catch(err => {
        this.$notify({
          content: err,
          btn: 'close'
        })
      })
    },
    judgeUser (el) {
      let userName = el.trim()
      if (userName.length === 0) {
        this.$notify({
          content: '用户名不能为空！',
          btn: 'close'
        })
      } else {
        if (userName.length < 6 || userName.length > 15) {
          this.$notify({
            content: '用户名由6-15个字符组成！',
            btn: 'close'
          })
        } else {
          if (validatUser(userName)) {
            this.isUser = true
          } else {
            this.$notify({
              content: '用户名由数字与字母组成！',
              btn: 'close'
            })
          }
        }
      }
    },
    judgePwd (el) {
      let passWord = el.trim()
      if (passWord.length === 0) {
        this.$notify({
          content: '密码不能为空！',
          btn: 'close'
        })
      } else {
        if (passWord.length < 6 || passWord.length > 15) {
          this.$notify({
            content: '密码由6-15个字符组成！',
            btn: 'close'
          })
        } else {
          if (validatUser(passWord)) {
            this.isPwd = true
          } else {
            this.$notify({
              content: '密码由数字与字母组成！',
              btn: 'close'
            })
          }
        }
      }
    },
    judgeRole (el) {
      let userRole = el
      if (userRole !== '') {
        this.isRole = true
      } else {
        this.$notify({
          content: '请选择角色！',
          btn: 'close'
        })
        this.isRole = false
      }
    },
    employeeAddFn () {
      this.judgeUser(this.employeeAddForm.username)
      this.judgePwd(this.employeeAddForm.password)
      this.judgeRole(this.employeeAddForm.roleId)
      if (this.isUser && this.isPwd && this.isRole) {
        this.getEmployeeAdd(this.employeeAddForm).then((data) => {
          this.$notify({
            content: '员工新增成功！',
            btn: 'close'
          })
          this.employeeAddForm = {
            username: '',
            password: '',
            roleId: '',
            remark: ''
          }
          this.employeeAdd = false
          this.isUser = false
          this.isPwd = false
          this.isRole = false
          this.employeeListFn()
        })
      } else {
        this.$notify({
          content: '员工新增失败！',
          btn: 'close'
        })
      }
    },
    openEmployeeEditFn (item) {
      this.employeeEdit = true
      this.employeeEditForm = {
        id: item.id,
        username: item.username,
        password: item.password,
        createtime: item.createtime,
        remark: item.remark
      }
      this.oldEmployeeEdit = {
        id: item.id,
        username: item.username,
        password: item.password,
        createtime: item.createtime,
        remark: item.remark
      }
      for (let i = 0; i < this.roleList.length; i++) {
        let obj = this.roleList[i]
        if (obj.text === item.roleName) {
          this.employeeEditForm.roleId = obj.value
          this.oldEmployeeEdit.roleId = obj.value
        }
      }
      for (let j = 0; j < this.statusList.length; j++) {
        let obj = this.statusList[j]
        if (obj.text === item.type) {
          this.employeeEditForm.type = obj.value
          this.oldEmployeeEdit.type = obj.value
        }
      }
    },
    employeeEditFn () {
      this.judgeUser(this.employeeEditForm.username)
      this.judgePwd(this.employeeEditForm.password)
      this.judgeRole(this.employeeEditForm.roleId)
      let oldObj = this.oldEmployeeEdit
      let newObj = this.employeeEditForm
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
          content: '未修改员工信息！',
          btn: 'close'
        })
      } else {
        this.ControlArr = []
        if (this.isUser && this.isPwd && this.isRole) {
          this.getEmployeeEdit(this.employeeEditForm).then((data) => {
            this.$notify({
              content: '员工编辑成功！',
              btn: 'close'
            })
            this.employeeEditForm = {}
            this.employeeEdit = false
            this.isUser = false
            this.isPwd = false
            this.isRole = false
            this.employeeListFn()
          })
        } else {
          this.$notify({
            content: '员工编辑失败！',
            btn: 'close'
          })
        }
      }
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
  }
  .modal-content{
    border-radius: 8px !important;
  }
</style>
