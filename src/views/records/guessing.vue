<template>
   <div class="guessingContent animated fadeIn">
     <b-row>
       <b-col sm="12">
         <form ref="guessingForm" name="guessingForm">
           <b-card>
             <div slot="header">
               <b-form inline class="d-flex justify-content-between">
                 <b-input id="loginname" size="sm" class="col-1" type="text" v-model="guessingForm.loginname" placeholder="Member Account"></b-input>
                 <b-input id="wagerId" class="col-1" size="sm" type="text" v-model="guessingForm.wagerId" placeholder="Note Number"></b-input>
                 <div class="input-group">
                     <!--<b-form-input id="startTime" type="date" size="sm" v-model="guessingForm.startTime" :plain="true" placeholder="Starting Time" title="Starting Time"></b-form-input>-->
                     <datetime type="datetime" v-model="start" :value-zone="'UTC+8'" placeholder="Starting Time" format="yyyy-MM-dd HH:mm:ss"></datetime>
                     <label for="time" class="mx-2">-</label>
                     <!--<b-form-input id="endTime" type="date" size="sm" v-model="guessingForm.endTime" :plain="true" placeholder="End Time" title="End Time"></b-form-input>-->
                     <datetime type="datetime" v-model="end" :value-zone="'UTC+8'" placeholder="End Time" format="yyyy-MM-dd HH:mm:ss"></datetime>
                 </div>
                 <b-form-select id="gameType" v-model="matchForm.gameType" size="sm" class="col-1" :plain="true" :options="gameTypeOptions" @input="setListGame()">
                   <template slot="first">
                     <option :value="null" disabled>Select Game types</option>
                   </template>
                 </b-form-select>
                 <b-form-select id="leagueId" v-model="matchForm.leagueId" size="sm" class="col-1" :plain="true" :options="leagueIdOptions" @input="setListLeague()">
                   <template slot="first">
                     <option :value="null" disabled>Select League type</option>
                   </template>
                 </b-form-select>
                 <b-form-select id="matchId" v-model="guessingForm.matchId" size="sm" class="col-1" :plain="true" :options="matchIdOptions" @input="setListMatch()">
                   <template slot="first">
                     <option :value="null" disabled>Select Event type</option>
                   </template>
                 </b-form-select>
                 <b-form-select id="oddsId" v-model="guessingForm.oddsId" size="sm" class="col-1" :plain="true" :options="oddsIdOptions">
                   <template slot="first">
                     <option :value="null" disabled>Select Handicap type</option>
                   </template>
                 </b-form-select>
                 <b-form-select id="betStatus" v-model="guessingForm.betStatus" size="sm" class="col-1" :plain="true" :options="betStatusOptions">
                   <template slot="first">
                     <option :value="null" disabled>Select Note type</option>
                   </template>
                 </b-form-select>
                 <b-button type="button" size="sm" variant="primary" class="rounded" @click="setGuessing()"><i class="fa fa-dot-circle-o"></i> Inquire</b-button>
               </b-form>
             </div>
             <table class="table table-hover table-striped text-center mb-0">
               <thead class="thead-light">
               <tr>
                 <th scope="col">注单号</th>
                 <th scope="col">会员账号</th>
                 <th scope="col">下注时间</th>
                 <th scope="col">竞猜类型</th>
                 <th scope="col">竞猜详情</th>
                 <th scope="col">结算赔率</th>
                 <th scope="col">竞猜金额</th>
                 <th scope="col">派彩金额</th>
                 <th scope="col">用户输赢</th>
                 <th scope="col">注单状态</th>
               </tr>
               </thead>
               <tbody>
                <tr v-for="(item, index) in guessingList" :key="index" v-if="guessingList.length>0" :id="item.id">
                 <th scope="row" v-text="item.wagerId"></th>
                 <td v-text="item.loginname"></td>
                 <td v-text="item.betTime"></td>
                 <td v-text="item.betType"></td>
                 <td v-text="item.betDetail"></td>
                 <td v-text="item.betOdd"></td>
                 <td v-text="item.betAmount"></td>
                 <td v-text="item.payoutAmount"></td>
                 <td v-text="item.winloss"></td>
                 <td v-text="item.state"></td>
               </tr>
                <tr v-if="guessingList.length<=0">
                 <td colspan="10"><i class="fa fa-spinner fa-spin"></i> 暂无竞猜记录</td>
               </tr>
               </tbody>
               <tfoot>
                 <tr>
                 <td colspan="4"></td>
                 <td>页竞猜金额 /页下注账户数 /页用户输赢</td>
                 <td>{{ pageTotal.totalAmount }}</td>
                 <td>{{ pageTotal.totalCount }}</td>
                 <td>{{ pageTotal.totalWinloss }}</td>
                 <td colspan="2"></td>
               </tr>
                 <tr>
                 <td colspan="4"></td>
                 <td>总竞猜金额 /总下注账户数 /总用户输赢</td>
                 <td>{{ guessTotal.totalAmount }}</td>
                 <td>{{ guessTotal.totalCount}}</td>
                 <td>{{ guessTotal.totalWinloss }}</td>
                 <td colspan="2"></td>
               </tr>
               </tfoot>
             </table>
             <div slot="footer" v-if="guessingList.length>0">
               <b-form inline class="d-flex justify-content-end">
                 <label class="mr-1">第</label>
                 <b-form-select id="pageNum" v-model="guessingForm.pageNum" size="sm" class="mr-1" :plain="true" :options="pageNumOptions" @input="setGuessing()"></b-form-select>
                 <label class="mx-1">页，每页</label>
                 <b-form-select id="pageSize" v-model="guessingForm.pageSize" size="sm" :plain="true" :options="pageSizeOptions" @input="setGuessing()"></b-form-select>
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
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

export default {
  name: 'guessing',
  components: {
    Datetime
  },
  props: {},
  data () {
    return {
      guessingForm: {
        pageNum: 1,
        pageSize: 20,
        loginname: '',
        wagerId: '',
        startTime: null,
        endTime: null,
        betStatus: null,
        matchId: null,
        oddsId: null
      },
      matchForm: {
        gameType: null,
        leagueId: null,
        matchId: null
      },
      pageNumOptions: [],
      pageSizeOptions: [20, 50, 100],
      betStatusOptions: [
        { value: 1, text: 'PENDING' },
        { value: 2, text: 'OPEN' },
        { value: 3, text: 'SETTED' },
        { value: 4, text: 'CANCELLED' },
        { value: 5, text: 'DELETED' }
      ],
      matchIdOptions: [],
      oddsIdOptions: [],
      gameTypeOptions: [
        { value: 'CS:GO', text: 'CS:GO' },
        { value: '英雄联盟', text: '英雄联盟' },
        { value: 'Starcraft 2', text: 'Starcraft 2' },
        { value: 'Dota 2', text: 'Dota 2' }
      ],
      start: null,
      end: null,
      leagueIdOptions: [],
      guessingList: [],
      guessTotal: {},
      pageTotal: {
        totalAmount: 0,
        totalCount: 0,
        totalWinloss: 0
      }
    }
  },
  watch: {
    start (nev) {
      let time = nev
      time = time.slice(0, 19)
      time = time.replace(/T/, ' ')
      this.guessingForm.startTime = time
    },
    end (nev) {
      let time = nev
      time = time.slice(0, 19)
      time = time.replace(/T/, ' ')
      this.guessingForm.endTime = time
    }
  },
  created () {
    this.setGuessing()
  },
  mounted () {
  },
  methods: {
    ...mapActions([ 'GiessingMatch', 'GiessingRecords', 'setTime' ]),
    setGuessing () {
      this.pageNumOptions = []
      this.GiessingRecords(this.guessingForm).then((data) => {
        this.guessingList = data.list.list
        this.guessTotal = data.totalamount
        for (let i = 1; i <= data.list.pages; i++) {
          this.pageNumOptions.push(i)
        }
        this.guessingList.forEach(arr => {
          this.pageTotal.totalAmount += arr.betAmount
          if (arr.winloss) {
            this.pageTotal.totalWinloss += arr.winloss
            this.setTime(arr.betTime).then(res => {
              arr.betTime = res
            })
          }
        })
        this.pageTotal.totalAmount = this.pageTotal.totalAmount.toFixed(1)
        this.pageTotal.totalCount = data.list.total
      }).catch(err => {
        this.$notify({
          content: err,
          btn: 'close'
        })
      })
    },
    setListGame () {
      this.matchForm.leagueId = null
      this.guessingForm.matchId = null
      this.guessingForm.oddsId = null
      this.matchIdOptions = []
      this.oddsIdOptions = []
      this.leagueIdOptions = []
      this.GiessingMatch(this.matchForm).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let opetionObj = {}
          opetionObj.value = data[i].id
          opetionObj.text = data[i].type
          this.leagueIdOptions.push(opetionObj)
        }
      }).catch(err => {
        this.$notify({
          content: err,
          btn: 'close'
        })
      })
    },
    setListLeague () {
      this.guessingForm.matchId = null
      this.guessingForm.oddsId = null
      this.matchIdOptions = []
      this.oddsIdOptions = []
      this.GiessingMatch(this.matchForm).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let opetionObj = {}
          opetionObj.value = data[i].id
          opetionObj.text = data[i].type
          this.matchIdOptions.push(opetionObj)
        }
      }).catch(err => {
        this.$notify({
          content: err,
          btn: 'close'
        })
      })
    },
    setListMatch () {
      this.matchForm.matchId = this.guessingForm.matchId
      this.oddsIdOptions = []
      this.guessingForm.oddsId = null
      this.GiessingMatch(this.matchForm).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let opetionObj = {}
          opetionObj.value = data[i].id
          opetionObj.text = data[i].type
          this.oddsIdOptions.push(opetionObj)
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
   .guessingContent{
      width: 100%;
      height: auto;
     overflow: hidden;
   }
</style>
