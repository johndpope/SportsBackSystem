<template>
  <div class="volumePage">
    <b-card>
      <b-row class="text-center mx-0 px-0 text-light bg-dark border">
        <b-col sm="1" class="border-right border-left py-2">wagerId</b-col>
        <b-col sm="1" class="border-right py-2">betTime</b-col>
        <b-col sm="4" class="border-right py-2">betType</b-col>
        <b-col sm="1" class="border-right py-2">betDetail</b-col>
        <b-col sm="1" class="border-right py-2">betOdd</b-col>
        <b-col sm="1" class="border-right py-2">state</b-col>
        <b-col sm="1" class="border-right py-2">betAmount</b-col>
        <b-col sm="1" class="border-right py-2">loginname</b-col>
        <b-col sm="1" class="py-2">id</b-col>
      </b-row>
      <b-row class="text-center mx-0 px-0 border-right border-bottom" :key="key" v-for="(item, key) in volumeList">
        <b-col sm="1" class="border-right border-left py-2">{{ item.wagerId }}</b-col>
        <b-col sm="1" class="border-right py-2">{{ item.betTime }}</b-col>
        <b-col sm="4" class="border-right py-2">{{ item.betType }}</b-col>
        <b-col sm="1" class="border-right py-2">{{ item.betDetail }}</b-col>
        <b-col sm="1" class="border-right py-2">{{ item.betOdd }}</b-col>
        <b-col sm="1" class="border-right py-2">{{ item.state }}</b-col>
        <b-col sm="1" class="border-right py-2">{{ item.betAmount }}</b-col>
        <b-col sm="1" class="border-right py-2">{{ item.loginname }}</b-col>
        <b-col sm="1" class="py-2">{{ item.id }}</b-col>
      </b-row>
      <div v-show="volumeList.length !== 0" class="bg-gray-100 border-left border-right">
        <b-row class="text-center mx-0 px-0  border-bottom">
          <b-col sm="8" class="py-2"></b-col>
          <b-col sm="1" class="py-2 ">小计:</b-col>
          <b-col sm="1" class="py-2">{{ pageTotal.totalAmount }}</b-col>
          <b-col sm="1" class="py-2 ">笔数:</b-col>
          <b-col sm="1" class="py-2">{{ pageTotal.totalCount }}</b-col>
        </b-row>
        <b-row class="text-center mx-0 px-0  border-bottom">
          <b-col sm="8" class="py-2"></b-col>
          <b-col sm="1" class="py-2">总计:</b-col>
          <b-col sm="1" class="py-2"> {{ volumeTotal.totalAmount }} </b-col>
          <b-col sm="1" class="py-2">总笔数:</b-col>
          <b-col sm="1" class="py-2">{{ volumeTotal.totalCount }}</b-col>
        </b-row>
      </div>
      <b-row class="mx-0" v-show="volumeList.length === 0">
        <b-col sm="12" md="12" class="text-center border border-top-0 py-2 bg-primary">
          <i class="fa fa-spinner fa-spin"></i> 暂无数据！
        </b-col>
      </b-row>
      <div slot="footer" v-if="volumeList.length>0">
        <b-form inline class="d-flex justify-content-end">
          <label class="mr-1">第</label>
          <b-form-select id="pageNum" v-model="volumeObj.pageNum" size="sm" class="mr-1" :plain="true" :options="pageNumOptions" @input="handleGetListAut()"></b-form-select>
          <label class="mx-1">页，每页</label>
          <b-form-select id="pageSize" v-model="volumeObj.pageSize" size="sm" :plain="true" :options="pageSizeOptions" @input="handleGetListAut()"></b-form-select>
          <label class="ml-1">条</label>
        </b-form>
      </div>
    </b-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'volume',
  data () {
    return {
      volumeObj: {
        matchId: '',
        pageNum: 1,
        pageSize: 20
      },
      volumeList: [],
      pageSizeOptions: [20, 50, 100],
      pageNumOptions: [],
      volumeTotal: {},
      pageTotal: {
        totalAmount: 0,
        totalCount: 0
      }
    }
  },
  mounted () {
    this.handleGetVolume()
  },
  methods: {
    ...mapActions([ 'postGameWagerByMatchIDS', 'setTime' ]),
    handleGetVolume () {
      if (this.$route.params.code) {
        this.volumeObj.matchId = this.$route.params.code
        this.postGameWagerByMatchIDS(this.volumeObj).then(res => {
          if (res) {
            this.volumeList = res.list.list
            this.volumeTotal = res.totalamount
            for (let i = 1; i <= res.list.pages; i++) {
              this.pageNumOptions.push(i)
            }
            this.volumeList.forEach(arr => {
              this.pageTotal.totalAmount += (arr.betAmount)
              this.setTime(arr.betTime).then(res => {
                arr.betTime = res
              })
            })
            this.pageTotal.totalCount = res.list.total
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">

</style>
