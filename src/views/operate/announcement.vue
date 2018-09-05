<template>
  <div class="operationContent">
    <b-row>
      <b-col sm="12">
        <form ref="leagueListForm" name="leagueListForm">
          <b-card>
            <div slot="header">
              <b-form inline class="d-flex justify-content-start">
                <b-form-select id="category" v-model="officialData.rollState" size="sm" class="col-1 mr-4" :options="officialStatus" :plain="true">
                  <template slot="first">
                    <option :value="''" disabled>Select category</option>
                  </template>
                </b-form-select>
                <b-button type="button" size="sm" variant="primary" class="rounded" @click="getOfficialNews"><i class="fa fa-dot-circle-o"></i> Inquire</b-button>
              </b-form>
              <b-button inline type="button" size="sm" variant="primary" class="rounded btn-right" @click="officialAdd = true"><i class="fa fa-plus"></i> Add</b-button>
            </div>
            <table class="table table-hover table-striped text-center mb-0">
              <thead class="thead-light">
              <tr>
                <th scope="col">权重</th>
                <th scope="col">标题</th>
                <th scope="col">内容</th>
                <th scope="col">创建时间</th>
                <th scope="col">公告状态</th>
                <th scope="col">ID</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
                <tr v-if="officialList" :key="key" v-for="(item,key) in officialList">
                  <td>{{ item.indexSeq }}</td>
                  <td>
                    <span class="ellips" :title="item.title">{{ item.title }}</span>
                  </td>
                  <td>
                    <span class="ellips" :title="item.content">{{ item.content }}</span>
                  </td>
                  <td>{{ item.createtime }}</td>
                  <td>{{ item.rollState }}</td>
                  <td>{{ item.id }}</td>
                  <td>
                    <b-button type="button" size="sm" variant="primary" class="rounded" @click="handleClickShowEdit(item)"><i class="fa fa-edit"></i> Edit</b-button>
                    <b-button type="button" size="sm" variant="primary" class="rounded" @click="handleClickPostDelete(item.id)"> Delete</b-button>
                  </td>
                </tr>
                <tr v-if="!officialList">
                  <td colspan="10"><i class="fa fa-spinner fa-spin"></i> 暂无联赛记录</td>
                </tr>
              </tbody>
            </table>
            <div slot="footer">
              <b-form inline class="d-flex justify-content-end">
                <label class="mr-1">第</label>
                <b-form-select id="pageNum" v-model="officialData.pageNum" size="sm" class="mr-1" :plain="true" :options="pageNumOptions" @input="getOfficialNews()"></b-form-select>
                <label class="mx-1">页，每页</label>
                <b-form-select id="pageSize" v-model="officialData.pageSize" size="sm" :plain="true" :options="pageSizeOptions" @input="getOfficialNews()"></b-form-select>
                <label class="ml-1">条</label>
              </b-form>
            </div>
          </b-card>
        </form>
      </b-col>
    </b-row>
    <b-modal title="Edit Official" centered v-model="officialEdit" @ok="handleClickPostEdit()" ok-variant="success">
      <b-card class="mb-0">
        <form ref="officialEditForm" method="post" :model="officialEditForm" autoComplete="on">
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label>权重：</label>
                <b-form-input type="text" v-model="officialEditForm.indexSeq"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label>创建时间：</label>
                <b-form-input type="text" v-model="officialEditForm.createtime"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label>公告状态：</label>
                <b-form-input type="text" v-model="officialEditForm.rollState"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label>ID：</label>
                <b-form-input type="text" v-model="officialEditForm.id" ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label>标题：</label>
                <b-form-input type="text" v-model="officialEditForm.title" ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label>Title：</label>
                <b-form-input type="text" v-model="officialEditForm.titleCn" ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label>内容：</label>
                <b-form-textarea v-model="officialEditForm.contentCn" placeholder="Enter something" :rows="3" :max-rows="6">
                </b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label>content：</label>
                <b-form-textarea v-model="officialEditForm.content" placeholder="Enter something" :rows="3" :max-rows="6">
                </b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
        </form>
      </b-card>
    </b-modal>
    <b-modal title="Add Official" centered v-model="officialAdd" @ok="handleClickPostAdd()" ok-variant="success">
      <b-card class="mb-0">
        <form ref="officialAddForm" method="post" :model="officialAddForm" autoComplete="on">
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label>权重：</label>
                <b-form-input type="text" v-model="officialAddForm.indexSeq"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label>创建时间：</label>
                <!--<b-form-input type="text" v-model="officialAddForm.createtime"></b-form-input>-->
                <datetime  type="datetime" v-model="times" :value-zone="'UTC+8'" placeholder="Enter matchTime" format="yyyy-MM-dd HH:mm:ss"></datetime>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label>公告状态：</label>
                <b-form-input type="text" v-model="officialAddForm.rollState"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label>ID：</label>
                <b-form-input type="text" v-model="officialAddForm.id" ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label>标题：</label>
                <b-form-input type="text" v-model="officialAddForm.titleCn" ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label>Title：</label>
                <b-form-input type="text" v-model="officialAddForm.title" ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label>内容：</label>
                <b-form-textarea v-model="officialAddForm.contentCn" placeholder="Enter something" :rows="3" :max-rows="6">
                </b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label>Content：</label>
                <b-form-textarea v-model="officialAddForm.content" placeholder="Enter something" :rows="3" :max-rows="6">
                </b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
        </form>
      </b-card>
    </b-modal>
    <b-modal v-model="deleteOfficial" hide-header centered @ok="handleClickPostDelete()">
      <p class="my-4">是否确认删除？</p>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Datetime } from 'vue-datetime'
import _ from 'lodash'
export default {
  name: 'announcement',
  components: {
    Datetime
  },
  props: {},
  data () {
    return {
      officialData: {
        pageNum: 1,
        pageSize: 20,
        rollState: 1
      },
      officialList: [],
      officialStatus: [
        { value: 1, text: '启用' },
        { value: 0, text: '停用' }
      ],
      officialEdit: false,
      officialAdd: false,
      officialEditForm: {},
      officialAddForm: {},
      pageSizeOptions: [20, 50, 100],
      pageNumOptions: [],
      isRole: [],
      deleteOfficial: false,
      times: null
    }
  },
  created () {
  },
  mounted () {
    this.getOfficialNews()
  },
  computed: {},
  methods: {
    ...mapActions([ 'getInitESportBulletinS', 'postEditESportBulletinS', 'postAddESportBulletinS', 'postDeleteSportBulletinS' ]),
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
    getOfficialNews () {
      this.getInitESportBulletinS(this.officialData).then(res => {
        if (res.list.length !== 0) {
          this.officialList = res.list
        }
        for (let i = 1; i <= res.pages; i++) {
          this.pageNumOptions.push(i)
        }
      })
    },
    handleClickShowEdit (item) {
      this.officialEdit = true
      if (item) {
        this.officialEditForm = _.cloneDeep(item)
      }
    },
    handleClickPostEdit () {
      this.judgeRole(this.officialEditForm.id, 'ID')
      this.judgeRole(this.officialEditForm.title, 'title')
      this.judgeRole(this.officialEditForm.content, 'content')
      this.judgeRole(this.officialEditForm.createtime, '创建时间')
      this.judgeRole(this.officialEditForm.rollState, '状态')
      this.judgeRole(this.officialEditForm.indexSeq, '权重')
      if (this.isRole.indexOf(false) === -1) {
        this.postEditESportBulletinS(this.officialEditForm).then(res => {
          if (res) {
            this.getOfficialNews()
            this.$notify({
              content: '修改成功！',
              btn: 'close'
            })
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
      this.judgeRole(this.officialAddForm.id, 'ID')
      this.judgeRole(this.officialAddForm.title, 'title')
      this.judgeRole(this.officialAddForm.content, 'content')
      this.judgeRole(this.officialAddForm.createtime, '创建时间')
      this.judgeRole(this.officialAddForm.rollState, '状态')
      this.judgeRole(this.officialAddForm.indexSeq, '权重')
      this.judgeRole(this.officialAddForm.titleCn, '标题')
      this.judgeRole(this.officialAddForm.contentCn, '内容')
      if (this.isRole.indexOf(false) === -1) {
        this.postAddESportBulletinS(this.officialAddForm).then(res => {
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
    },
    handleClickPostDelete (ids) {
      if (ids) {
        this.handleClickPostDelete.id = ids
        this.deleteOfficial = true
      } else {
        let data = {
          id: this.handleClickPostDelete.id
        }
        this.postDeleteSportBulletinS(data).then(res => {
          if (res) {
            this.getOfficialNews()
            this.$notify({
              content: '删除成功！',
              btn: 'close'
            })
          } else {
            this.$notify({
              content: '删除失败！',
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
      this.officialAddForm.createtime = time
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
    width: 14.28%;
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
