<template>
    <b-card>
        <div slot="header">
          <b-form inline class="d-flex justify-content-start">
            <b-form-select id="rtypes" v-model="roleId" size="sm" class="col-1 mr-4"  :plain="true" :options="listAllRole">
             <template slot="first">
               <option :value="''" disabled>Select Role</option>
              </template>
            </b-form-select>
            <b-button type="button" size="sm" variant="primary" class="rounded"  @click="handleClickByRoles()"><i class="fa fa-dot-circle-o"></i> Inquire</b-button>
          </b-form>
          <b-button type="button" size="sm" variant="primary" class="rounded roue btn-right1"  @click="handleAbsentAuthority()"><i class="fa fa-plus"></i> 角色权限</b-button>
       </div>
        <table class="table table-hover table-striped text-center mb-0 table-sm">
           <thead class="thead-light">
             <tr>
               <th>ID</th>
               <th>NAME</th>
               <th>PID</th>
               <th>PIDS</th>
               <th>STATE</th>
               <th>OPERATION</th>
             </tr>
           </thead>
          <tbody>
             <tr class="list-tr" v-for="(item,key) in authorList" :key="key">
               <td> {{ item.id }} </td>
               <td> {{ item.name }} </td>
               <td> {{ item.pid }} </td>
               <td> {{ item.pids }} </td>
               <td> {{ item.state }}</td>
               <td>
                 <b-button inline type="button" size="sm" variant="primary" class="rounded btn-right" @click="handleDeleteRoleAuthority(item.id)"><i class="fa fa-trash-o"></i> 删除</b-button>
               </td>
             </tr>
             <tr v-if="authorList.length === 0">
               <td colspan="6" class="py-2" v-if="!permissionSelect"><i class="fa fa-spinner fa-spin"></i> 暂无数据</td>
               <td colspan="6" class="py-2" v-if="permissionSelect"><i class="fa fa-gear fa-spin"></i> 请选择角色</td>
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
      <b-modal title="Add role permissions" v-model="addPermissions" size="lg" centered @ok="handleAddRoleAuthority()" ok-variant="success">
        <b-card class="mb-0">
          <form ref="" method="post"  autoComplete="on">
            <b-row>
              <b-col sm="12">
                <b-form-group label="">
                  <b-form-checkbox-group v-model="permissionsIds" name="leagueIds" :options="permissionsOptions">
                  </b-form-checkbox-group>
                </b-form-group>
              </b-col>
            </b-row>
          </form>
        </b-card>
      </b-modal>
      <b-modal v-model="deleteRole" hide-header centered @ok="handleDeleteRoleAuthority()">
        <p class="my-4">是否确认删除？</p>
      </b-modal>
    </b-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'permissions',
  components: {},
  props: {},
  data () {
    return {
      pageN: 1,
      pageS: 20,
      authorList: [],
      pageNumOptions: [],
      pageSizeOptions: [20, 50, 100],
      permissionSelect: true,
      listAllRole: [],
      roleId: '',
      addPermissions: false,
      deleteRole: false,
      permissionsAddList: [],
      permissionsOptions: [],
      permissionsIds: []
    }
  },
  created () {
    this.handleGetListAllRoles()
  },
  mounted () {

  },
  computed: {},
  methods: {
    ...mapActions([ 'postListAllRoles', 'postListAuthorityByRoles', 'absentAuthority', 'addRoleAuthority', 'deleteRoleAuthority' ]),
    handleGetListAllRoles () {
      this.postListAllRoles().then(res => {
        if (res && res.length !== 0) {
          res.forEach((arr) => {
            let item = {}
            item.value = arr.id
            item.text = arr.name
            this.listAllRole.push(item)
          })
        }
      })
    },
    handleClickByRoles () {
      this.authorList = []
      if (!this.roleId) {
        this.$notify({
          content: '请选择角色',
          btn: 'close'
        })
        return
      }
      let data = {
        pageNum: this.pageN,
        pageSize: this.pageS,
        roleId: this.roleId
      }
      this.postListAuthorityByRoles(data).then(res => {
        if (res.list && res.list.length !== 0) {
          this.authorList = res.list
          for (let i = 1; i <= res.pages; i++) {
            this.pageNumOptions.push(i)
          }
        } else {
          this.permissionSelect = false
        }
      })
    },
    handleAbsentAuthority () {
      this.permissionsOptions = []
      this.permissionsIds = []
      if (!this.roleId) {
        this.$notify({
          content: '请选择角色',
          btn: 'close'
        })
        return
      }
      let data = {
        roleId: this.roleId
      }
      this.absentAuthority(data).then(res => {
        if (res && res.length !== 0) {
          res.forEach((arr) => {
            let item = {}
            item.value = arr.id
            item.text = arr.name
            this.permissionsOptions.push(item)
            this.addPermissions = true
          })
        }
      })
    },
    handleAddRoleAuthority () {
      if (this.permissionsIds.length === 0) {
        this.$notify({
          content: '请选择权限',
          btn: 'close'
        })
        return false
      }
      let data = {
        roleId: this.roleId,
        authorityIds: this.permissionsIds
      }
      this.addRoleAuthority(data).then(res => {
        if (res && res === 'success') {
          this.$notify({
            content: '增加成功',
            btn: 'close'
          })
          this.handleClickByRoles()
        } else {
          this.$notify({
            content: '增加失败',
            btn: 'close'
          })
        }
      })
    },
    handleDeleteRoleAuthority (sid) {
      if (sid) {
        this.deleteRole = true
        this.handleDeleteRoleAuthority.id = sid
        return false
      }
      let data = {
        id: this.handleDeleteRoleAuthority.id,
        roleId: this.roleId
      }
      this.deleteRoleAuthority(data).then(res => {
        if (res) {
          this.$notify({
            content: '删除成功',
            btn: 'close'
          })
          this.handleClickByRoles()
        } else {
          this.$notify({
            content: '删除失败',
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
    font-size: 20px;
  }
  .list-tr:hover{
    color:#20a8d8
  }
  .rounded{
    margin-top: 0;
  }
  .btn-right1 {
    position: absolute;
    top: 0.75rem;
    right: 1.25rem;
  }
  .roue {
    margin-left: 25px;
  }
  .table-striped thead th:last-child{
    width: 10%;
  }
  .table th, .table td {
    vertical-align: middle;
  }
</style>
