<template>
  <div class="operationContent">
    <b-row>
      <b-col sm="12">
        <form ref="leagueListForm" name="leagueListForm">
          <b-card>
            <div slot="header">
              <b-form inline class="d-flex justify-content-start">
                <b-form-select id="category" v-model="agentData.status" size="sm" class="col-1 mr-4" :options="agentStatus" :plain="true">
                  <template slot="first">
                    <option :value="''" disabled>Select category</option>
                  </template>
                </b-form-select>
                <b-button type="button" size="sm" variant="primary" class="rounded" @click="handleGetAgentList"><i class="fa fa-dot-circle-o"></i> Inquire</b-button>
              </b-form>
              <b-button inline type="button" size="sm" variant="primary" class="rounded btn-right" @click="agentAdd = true"><i class="fa fa-plus"></i> Add</b-button>
            </div>
            <table class="table table-hover table-striped text-center mb-0">
              <thead class="thead-light">
              <tr>
                <th scope="col">agentcode</th>
                <th scope="col">agentkey</th>
                <th scope="col">createtime</th>
                <th scope="col">amount</th>
                <th scope="col">id</th>
                <th scope="col">maxtrans</th>
                <th scope="col">mintrans</th>
                <th scope="col">secretkey</th>
                <th scope="col">status</th>
                <th scope="col">whiteiplist</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="agentList" :key="key" v-for="(item,key) in agentList">
                <td>{{ item.agentcode }}</td>
                <td>
                  <span class="ellips" :title="item.title">{{ item.agentkey }}</span>
                </td>
                <td>{{ item.createtime }}</td>
                <td>
                  {{ item.amount }}
                </td>
                <td>{{ item.id }}</td>
                <td>{{ item.maxtrans }}</td>
                <td>{{ item.mintrans }}</td>
                <td>{{ item.secretkey }}</td>
                <td>{{ item.status }}</td>
                <td>{{ item.whiteiplist }}</td>
                <td>
                  <b-button type="button" size="sm" variant="primary" class="rounded" @click="handleClickShowEdit(item)"><i class="fa fa-edit"></i> Edit</b-button>
                </td>
              </tr>
              <tr v-if="!agentList">
                <td colspan="10"><i class="fa fa-spinner fa-spin"></i> 暂无联赛记录</td>
              </tr>
              </tbody>
            </table>
            <div slot="footer">
              <b-form inline class="d-flex justify-content-end">
                <label class="mr-1">第</label>
                <b-form-select id="pageNum" v-model="agentData.pageNum" size="sm" class="mr-1" :plain="true" :options="pageNumOptions" @input="handleGetAgentList()"></b-form-select>
                <label class="mx-1">页，每页</label>
                <b-form-select id="pageSize" v-model="agentData.pageSize" size="sm" :plain="true" :options="pageSizeOptions" @input="handleGetAgentList()"></b-form-select>
                <label class="ml-1">条</label>
              </b-form>
            </div>
          </b-card>
        </form>
      </b-col>
    </b-row>
    <b-modal title="Edit Official" centered v-model="agentEdit" @ok="handleClickPostEdit()" ok-variant="success">
      <b-card class="mb-0">
        <form ref="officialEditForm" method="post" :model="agentEditForm" autoComplete="on">
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label>agentcode：</label>
                <b-form-input type="text" v-model="agentEditForm.agentcode"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label>agentkey：</label>
                <b-form-input type="text" v-model="agentEditForm.agentkey"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label>amount：</label>
                <b-form-input type="text" v-model="agentEditForm.amount"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label>ID：</label>
                <b-form-input type="text" v-model="agentEditForm.id" ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label>maxtrans：</label>
                <b-form-input type="text" v-model="agentEditForm.maxtrans"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label>mintrans：</label>
                <b-form-input type="text" v-model="agentEditForm.mintrans" ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label>secretkey：</label>
                <b-form-input type="text" v-model="agentEditForm.secretkey"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <label>secretkey：</label>
              <b-form-select id="categoryEdit" v-model="agentEditForm.status" :plain="true" :options="agentStatus">
                <template slot="first">
                  <option :value="''" disabled>select manual</option>
                </template>
              </b-form-select>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label>whiteiplist：</label>
                <b-form-input type="text" v-model="agentEditForm.whiteiplist"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label>createtime：</label>
                <b-form-input type="text" v-model="agentEditForm.createtime"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </form>
      </b-card>
    </b-modal>
    <b-modal title="Add Official" centered v-model="agentAdd" @ok="handleClickPostAdd()" ok-variant="success">
      <b-card class="mb-0">
        <form ref="agentAddForm" method="post" :model="agentAddForm" autoComplete="on">
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label>agentcode：</label>
                <b-form-input type="text" v-model="agentAddForm.agentcode"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label>agentkey：</label>
                <b-form-input type="text" v-model="agentAddForm.agentkey"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label>amount：</label>
                <b-form-input type="text" v-model="agentAddForm.amount"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label>ID：</label>
                <b-form-input type="text" v-model="agentAddForm.id" ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label>maxtrans：</label>
                <b-form-input type="text" v-model="agentAddForm.maxtrans"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label>mintrans：</label>
                <b-form-input type="text" v-model="agentAddForm.mintrans" ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label>secretkey：</label>
                <b-form-input type="text" v-model="agentAddForm.secretkey"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <label>secretkey：</label>
              <b-form-select id="categoryEdit" v-model="agentAddForm.status" :plain="true" :options="agentStatus">
                <template slot="first">
                  <option :value="''" disabled>select manual</option>
                </template>
              </b-form-select>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label>whiteiplist：</label>
                <b-form-input type="text" v-model="agentAddForm.whiteiplist"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label>createtime：</label>
                <datetime  type="datetime" v-model="times" :value-zone="'UTC+8'" placeholder="Enter matchTime" format="yyyy-MM-dd HH:mm:ss"></datetime>
              </b-form-group>
            </b-col>
          </b-row>
        </form>
      </b-card>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Datetime } from 'vue-datetime'
import _ from 'lodash'
export default {
  name: 'Agent',
  components: {
    Datetime
  },
  props: {},
  data () {
    return {
      agentData: {
        pageNum: 1,
        pageSize: 20,
        status: 'ACTIVE'
      },
      agentList: [],
      agentStatus: [
        { value: 'ACTIVE', text: 'ACTIVE' },
        { value: 'INACTIVE', text: 'INACTIVE' },
        { value: 'CLOSED', text: 'CLOSED' },
        { value: 'SUSPENDED', text: 'SUSPENDED' }
      ],
      agentEdit: false,
      agentAdd: false,
      agentEditForm: {},
      agentAddForm: {},
      pageSizeOptions: [20, 50, 100],
      pageNumOptions: [],
      isRole: [],
      times: null
    }
  },
  created () {
  },
  mounted () {
    this.handleGetAgentList()
  },
  computed: {},
  methods: {
    ...mapActions([ 'postSelectGameAgentS', 'postEditGameAgentS', 'postAddGameAgentS' ]),
    judgeRole (el, user) {
      let userRole = el
      if (userRole !== '' && userRole !== null && userRole !== undefined) {
        this.isRole.push(true)
      } else {
        this.$notify({
          content: '请输入' + user + '！',
          btn: 'close'
        })
        this.isRole.push(false)
      }
    },
    handleGetAgentList () {
      this.postSelectGameAgentS(this.agentData).then(res => {
        if (res.list.length !== 0) {
          this.agentList = res.list
        }
        for (let i = 1; i <= res.pages; i++) {
          this.pageNumOptions.push(i)
        }
      })
    },
    handleClickShowEdit (item) {
      this.agentEdit = true
      if (item) {
        this.agentEditForm = _.cloneDeep(item)
      }
    },
    handleClickPostEdit () {
      this.judgeRole(this.agentEditForm.agentcode, 'agentcode')
      this.judgeRole(this.agentEditForm.agentkey, 'agentkey')
      this.judgeRole(this.agentEditForm.amount, 'amount')
      this.judgeRole(this.agentEditForm.id, 'id')
      this.judgeRole(this.agentEditForm.maxtrans, 'maxtrans')
      this.judgeRole(this.agentEditForm.secretkey, 'secretkey')
      this.judgeRole(this.agentEditForm.status, 'status')
      this.judgeRole(this.agentEditForm.whiteiplist, 'whiteiplist')
      if (this.isRole.indexOf(false) === -1) {
        this.postEditGameAgentS(this.agentEditForm).then(res => {
          if (res) {
            this.handleGetAgentList()
            this.$notify({
              content: '修改成功！',
              btn: 'close'
            })
            this.agentAddForm = {}
          } else {
            this.$notify({
              content: '修改失败！',
              btn: 'close'
            })
          }
        })
      }
    },
    handleClickPostAdd () {
      this.judgeRole(this.agentAddForm.agentcode, 'agentcode')
      this.judgeRole(this.agentAddForm.agentkey, 'agentkey')
      this.judgeRole(this.agentAddForm.amount, 'amount')
      this.judgeRole(this.agentAddForm.id, 'id')
      this.judgeRole(this.agentAddForm.maxtrans, 'maxtrans')
      this.judgeRole(this.agentAddForm.secretkey, 'secretkey')
      this.judgeRole(this.agentAddForm.status, 'status')
      this.judgeRole(this.agentAddForm.whiteiplist, 'whiteiplist')
      if (this.isRole.indexOf(false) === -1) {
        this.postAddGameAgentS(this.agentAddForm).then(res => {
          if (res) {
            this.getOfficialNews()
            this.$notify({
              content: '新增成功！',
              btn: 'close'
            })
          } else {
            this.$notify({
              content: '新增失败！',
              btn: 'close'
            })
          }
        })
      }
    }
  },
  watch: {
    times (nev) {
      let time = nev
      time = time.slice(0, 19)
      time = time.replace(/T/, ' ')
      this.agentAddForm.createtime = time
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
  .table-striped thead th,.table-striped tbody tr{
    width: 9.09%;
  }
  .ellips {
    display: inline-block;
    text-align: center;
    width: 230px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
