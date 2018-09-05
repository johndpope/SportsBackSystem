<template>
  <b-card>
    <div slot="header">
      <b-button inline type="button" size="sm" variant="primary" @click="addRole = true" class="rounded btn-right float-right"><i class="fa fa-plus"></i> Add</b-button>
    </div>
    <table class="table table-hover table-striped table-sm text-center mb-0">
      <thead class="thead-light">
      <tr>
        <th>ID</th>
        <th>NAME</th>
        <th>REMARK</th>
        <th>OPERATION</th>
      </tr>
      </thead>
      <tbody>
      <tr class="list-tr" v-for="(item,key) in authorList" :key="key">
        <td> {{ item.id }} </td>
        <td> {{ item.name }} </td>
        <td> {{ item.remark }} </td>
        <td>
          <b-button inline type="button" size="sm" variant="primary" class="rounded btn-right" @click="handleDeleteRole(item.id)">删除</b-button>
          <b-button inline type="button" size="sm" variant="primary" class="rounded btn-right" @click="handleClickEdit(item)">修改</b-button>
        </td>
      </tr>
      <tr v-if="authorList.length === 0">
        <td colspan="5" class="py-2"><i class="fa fa-spinner fa-spin"></i> 暂无数据</td>
      </tr>
      </tbody>
    </table>
    <div slot="footer" v-if="authorList.length>0">
      <b-form inline class="d-flex justify-content-end">
        <label class="mr-1">第</label>
        <b-form-select id="pageNum" v-model="pageN" size="sm" class="mr-1" :plain="true" :options="pageNumOptions" @input="handleGetListAut()"></b-form-select>
        <label class="mx-1">页，每页</label>
        <b-form-select id="pageSize" v-model="pageS" size="sm" :plain="true" :options="pageSizeOptions" @input="handleGetListAut()"></b-form-select>
        <label class="ml-1">条</label>
      </b-form>
    </div>
    <b-modal v-model="deleteRole" hide-header centered @ok="handleDeleteRole()">
      <p class="my-4">是否确认删除？</p>
    </b-modal>
    <b-modal v-model="editRole" centered  title="Edit Role"  @ok="handleEditRole()" >
      <b-card>
          <b-col sm="12">
            <b-form-group>
              <label>Name:</label>
              <input class="form-control form-control-sm" v-model="editRoleObj.name" type="text"  placeholder="name">
            </b-form-group>
          </b-col>
          <b-col sm="12">
            <b-form-group>
              <label >Remark：</label>
              <b-form-input type="text"  autocomplete="off" v-model="editRoleObj.remark" placeholder="remark"></b-form-input>
            </b-form-group>
          </b-col>
      </b-card>
    </b-modal>
    <b-modal v-model="addRole" centered title="Add Role"  @ok="handleAddRole()" >
      <b-card>
        <b-col sm="12">
          <b-form-group>
            <label>Name:</label>
            <input class="form-control form-control-sm" v-model="addRoleObj.name" type="text"  placeholder="name">
          </b-form-group>
        </b-col>
        <b-col sm="12">
          <b-form-group>
            <label >Remark：</label>
            <b-form-input type="text"  autocomplete="off" v-model="addRoleObj.remark" placeholder="remark"></b-form-input>
          </b-form-group>
        </b-col>
      </b-card>
    </b-modal>
  </b-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'role',
  components: {},
  props: {},
  data () {
    return {
      pageN: 1,
      pageS: 20,
      authorList: [],
      pageNumOptions: [],
      pageSizeOptions: [20, 50, 100],
      deleteRole: false,
      addRole: false,
      editRole: false,
      editRoleObj: {
        name: '',
        remark: '',
        id: ''
      },
      addRoleObj: {
        name: '',
        remark: ''
      }
    }
  },
  created () {
    this.handleGetListAut()
  },
  mounted () {

  },
  computed: {},
  methods: {
    ...mapActions([ 'getListAut', 'postDeleteRoles', 'EditRole', 'postAddRole' ]),
    handleGetListAut () {
      this.pageNumOptions = []
      let data = {
        pageNum: this.pageN,
        pageSize: this.pageS
      }
      this.getListAut(data).then(res => {
        if (res.list) {
          this.authorList = res.list
        }
        for (let i = 1; i <= res.pages; i++) {
          this.pageNumOptions.push(i)
        }
      })
    },
    handleDeleteRole (its) {
      if (its) {
        this.handleDeleteRole.id = its
        this.deleteRole = true
        return false
      }
      let data = {
        id: this.handleDeleteRole.id
      }
      this.postDeleteRoles(data).then(res => {
        if (res) {
          this.$notify({
            content: '删除成功',
            btn: 'close'
          })
          this.handleGetListAut()
        } else {
          this.$notify({
            content: '删除失败',
            btn: 'close'
          })
        }
      })
    },
    handleClickEdit (eid) {
      this.editRole = true
      this.editRoleObj.id = eid.id
      this.editRoleObj.name = eid.name
      this.editRoleObj.remark = eid.remark
    },
    handleEditRole () {
      if (!this.editRoleObj.name) {
        this.$notify({
          content: 'name不能为空',
          btn: 'close'
        })
        return
      }
      this.EditRole(this.editRoleObj).then(res => {
        if (res) {
          this.$notify({
            content: '修改成功',
            btn: 'close'
          })
          this.editRoleObj.name = ''
          this.editRoleObj.remark = ''
          this.handleGetListAut()
        } else {
          this.$notify({
            content: '修改失败',
            btn: 'close'
          })
        }
      })
    },
    handleAddRole () {
      if (!this.addRoleObj.name) {
        this.$notify({
          content: 'name不能为空',
          btn: 'close'
        })
        return
      }
      if (!this.addRoleObj.remark) {
        this.$notify({
          content: 'remark不能为空',
          btn: 'close'
        })
        return
      }
      this.postAddRole(this.addRoleObj).then(res => {
        if (res) {
          this.$notify({
            content: '新增成功',
            btn: 'close'
          })
          this.handleGetListAut()
        } else {
          this.$notify({
            content: '新增失败',
            btn: 'close'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-striped thead th{
    font-size: 16px;
    width: 28.3%;
  }
  .table-striped thead th:last-child{
    width: 15%;
  }
  .list-tr:hover{
    color:#20a8d8
  }
  .my-4{ font-size: 16px}
  .table th, .table td {
    vertical-align: middle;
  }
</style>
