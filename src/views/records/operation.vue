<template>
  <div class="operationContent">
    <b-row>
      <b-col sm="12">
        <form ref="operationForm" name="operationForm">
          <b-card>
            <div slot="header">
              <b-form inline class="d-flex justify-content-around">
                <b-input id="operator" class="col-1" size="sm" type="text" v-model="operationForm.operator" placeholder="Operation Name"></b-input>
                <b-input id="matchId" size="sm" class="col-1" type="text" v-model="operationForm.matchId" placeholder="Event Id"></b-input>
                <b-input id="oddsId" size="sm" class="col-1" type="text" v-model="operationForm.oddsId" placeholder="Handicap Id"></b-input>
                <b-input id="action" size="sm" class="col-1" type="text" v-model="operationForm.action" placeholder="Operation Type"></b-input>
                <div class="input-group">
                  <b-form-input id="startTime" type="date" size="sm" v-model="operationForm.startTime" :plain="true" placeholder="Starting Time" title="Starting Time"></b-form-input>
                  <label for="time" class="mx-2">-</label>
                  <b-form-input id="endTime" type="date" size="sm" v-model="operationForm.endTime" :plain="true" placeholder="End Time" title="End Time"></b-form-input>
                </div>
                <b-button type="button" size="sm" variant="primary" class="rounded" @click="operationFn()"><i class="fa fa-dot-circle-o"></i> Inquire</b-button>
              </b-form>
            </div>
            <table class="table table-hover table-striped text-center mb-0">
              <thead class="thead-light">
              <tr>
                <th scope="col">操作者</th>
                <th scope="col">赛事类型</th>
                <th scope="col">赛事详情</th>
                <th scope="col">操作类型</th>
                <th scope="col">赛事ID</th>
                <th scope="col">盘口ID</th>
                <th scope="col">盘口类型</th>
                <th scope="col">时间</th>
                <th scope="col">备注</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in operationList" :key="index" v-if="operationList.length>0" :id="item.id">
                <th scope="row" v-text="item.operator"></th>
                <td v-text="item.category"></td>
                <td v-text="item.content"></td>
                <td v-text="item.action"></td>
                <td v-text="item.matchid"></td>
                <td v-text="item.oddsid"></td>
                <td v-text="item.oddsName"></td>
                <td v-text="item.createtime"></td>
                <td v-text="item.remark"></td>
              </tr>
              <tr v-if="operationList.length<=0">
                <td colspan="10"><i class="fa fa-spinner fa-spin"></i> 暂无操盘记录</td>
              </tr>
              </tbody>
            </table>
            <div slot="footer" v-if="operationList.length>0">
              <b-form inline class="d-flex justify-content-end">
                <label class="mr-1">第</label>
                <b-form-select id="pageNum" v-model="operationForm.pageNum" size="sm" class="mr-1" :plain="true" :options="pageNumOptions" @input="operationFn()"></b-form-select>
                <label class="mx-1">页，每页</label>
                <b-form-select id="pageSize" v-model="operationForm.pageSize" size="sm" :plain="true" :options="pageSizeOptions" @input="operationFn()"></b-form-select>
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
  name: 'operation',
  components: {},
  props: {},
  data () {
    return {
      operationForm: {
        operator: '',
        matchId: '',
        oddsId: '',
        action: '',
        startTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 20
      },
      pageNumOptions: [],
      pageSizeOptions: [20, 50, 100],
      operationList: []
    }
  },
  created () {
    this.operationFn()
  },
  mounted () {

  },
  computed: {},
  methods: {
    ...mapActions(['operationRecords']),
    operationFn () {
      this.pageNumOptions = []
      this.operationRecords(this.operationForm).then((data) => {
        this.operationList = data.list
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
  .operationContent{
    width: 100%;
    height: auto;
    overflow: hidden;
  }
</style>
