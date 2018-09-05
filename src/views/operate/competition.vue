<template>
  <div>
     <div v-if="matchSort" class="competitionContent">
      <b-row>
        <b-col sm="12">
          <form ref="combingMatchesForm" name="combingMatchesForm">
            <b-card>
              <div slot="header">
                <b-form inline class="d-flex justify-content-start">
                  <input class="form-control form-control-sm col-1 mr-4" @focus="openLeagueIdsModal()" type="text" v-model="combingMatchesForm.leagueIds" placeholder="Select LeagueIds">
                  <b-form-select id="rtypes" v-model="combingMatchesForm.rtype" size="sm" class="col-1 mr-4" @input="getMatchesListFn()" :plain="true" :options="rtypeOptions">
                    <template slot="first">
                      <option :value="''" disabled>Select EventType</option>
                    </template>
                  </b-form-select>
                  <b-form-input v-if="false" id="date" class="col-1 mr-4" type="date" size="sm" v-model="combingMatchesForm.date" :plain="true" placeholder="" title="Event Date"></b-form-input>
                  <b-button type="button" size="sm" variant="primary" class="rounded" @click="getMatchesListFn()"><i class="fa fa-dot-circle-o"></i> Inquire</b-button>
                </b-form>
                <b-button inline type="button" size="sm" variant="primary" class="rounded btn-right" @click="openAddMatchesModal()"><i class="fa fa-plus"></i> Add</b-button>
              </div>
              <b-row class="text-center mx-0 px-0 text-light bg-dark border border-warning">
                <b-col sm="11" class="p-0 d-flex justify-content-start">
                  <b-col sm="1" md="1" class="px-1 border-right">
                    <b-col sm="12" class="p-1 align-self-center">联赛名称</b-col>
                  </b-col>
                  <b-col sm="1" md="1" class="px-1 border-right">
                    <b-col sm="12" class="p-1 align-self-center">联赛类型</b-col>
                  </b-col>
                  <b-col sm="3" md="3" class="px-1 border-right">
                    <b-col sm="12" class="p-1 align-self-center">比赛战队</b-col>
                  </b-col>
                  <b-col sm="2" md="2" class="px-0 border-right">
                    <b-row class="mx-0 h-100">
                      <b-col sm="4" class="p-1 align-self-center border-right">赛事时间</b-col>
                      <b-col sm="4" class="p-1 align-self-center border-right">赛事状态</b-col>
                      <b-col sm="4" class="p-1 align-self-center">赛事权重</b-col>
                    </b-row>
                  </b-col>
                  <b-col sm="4" md="4" class="px-0 border-right">
                    <b-row class="mx-0 h-100">
                      <b-col sm="4" class="p-1 align-self-center border-right">独赢盘</b-col>
                      <b-col sm="4" class="p-1 align-self-center border-right">让分盘</b-col>
                      <b-col sm="4" class="p-1 align-self-center">大小盘</b-col>
                    </b-row>
                  </b-col>
                  <b-col sm="1" md="1" class="px-1 border-right">
                    <b-col sm="12" class="p-1 align-self-center">赛事编辑</b-col>
                  </b-col>
                </b-col>
                <b-col sm="1" md="1" class="px-1 border-right">
                  <b-col sm="12" class="p-1 align-self-center">赛事操作</b-col>
                </b-col>
              </b-row>
              <b-row class="mx-0" v-if="combingMatchesList.length === 0">
                <b-col sm="12" md="12" class="text-center border border-top-0 py-2 bg-primary">
                  <i class="fa fa-spinner fa-spin"></i> 暂无赛事数据！
                </b-col>
              </b-row>
              <b-card else class="  text-center " v-for="(itemArr, index) in combingMatchesList" :key="index">
                <blockquote class="card-blockquote mb-0 p-0">
                  <b-row class="posr">
                    <b-col sm="11" class="p-0 d-flex justify-content-start" v-for="(item, index) in itemArr" :key="index" v-if="itemArr.length>0" :id="item.id">
                      <b-col sm="1" class="px-0 border-right border-bottom line-col">
                        {{ item.league }}
                      </b-col>
                      <b-col sm="1" class="px-0 border-right border-bottom line-col">
                        {{ item.category }}
                      </b-col>
                      <b-col sm="3" class="px-0 border-right border-bottom line-cols">
                        <p class="mb-1 teamTitle" :title="item.teamLeft" v-text="item.teamLeft"></p>
                        <p class="mb-0 teamTitle" :title="item.teamRight" v-text="item.teamRight"></p>
                      </b-col>
                      <b-col sm="2 d-flex justify-content-center border-bottom border-right" class="px-0">
                        <b-col sm="4" class="p-0 border-right  line-colss">{{ item.matchTime }}</b-col>
                        <b-col sm="4" class="p-0 border-right line-col">{{ item.strMatchStatus }}</b-col>
                        <b-col sm="4" class="p-0 line-col">{{ item.priority }}</b-col>
                      </b-col>
                      <b-col sm="4" class="px-0 border-bottom border-right">
                        <b-row class="mx-0 h-100">
                          <b-col sm="4" class="px-0">
                            <b-row class="mx-0 p-0 d-flex justify-content-center" v-for="(oddsItem, index) in item.gameOdds" :key="index" v-if="oddsItem.betType === '2'">
                              <b-col sm="12" class="p-1 align-self-center">
                                <p class="mb-1">
                                  <span v-text="oddsItem.ratioH" :class="{'text-success':oddsItem.ratioH < oddsItem.ratioV, 'text-info': oddsItem.ratioH === oddsItem.ratioV}"></span>
                                </p>
                                <p class="mb-0">
                                  <span v-text="oddsItem.ratioV" :class="{'text-success':oddsItem.ratioH > oddsItem.ratioV, 'text-info': oddsItem.ratioH === oddsItem.ratioV}"></span>
                                </p>
                              </b-col>
                            </b-row>
                          </b-col>
                          <b-col sm="4" class="px-0 border-left border-right">
                            <b-row class="mx-0  p-0 d-flex justify-content-center" v-for="(oddsItem, index) in item.gameOdds" :key="index" v-if="oddsItem.betType === '0'">
                              <b-col sm="12" class="p-1 align-self-center">
                                <p class="mb-1">
                                  <span v-text="oddsItem.betH" class="mr-1 text-warning"></span>
                                  <span v-text="oddsItem.ratioH" :class="{'text-success':oddsItem.ratioH < oddsItem.ratioV, 'text-info': oddsItem.ratioH === oddsItem.ratioV}"></span>
                                </p>
                                <p class="mb-0">
                                  <span v-text="oddsItem.betV" class="mr-1 text-warning"></span>
                                  <span v-text="oddsItem.ratioV" :class="{'text-success':oddsItem.ratioH > oddsItem.ratioV, 'text-info': oddsItem.ratioH === oddsItem.ratioV}"></span>
                                </p>
                              </b-col>
                            </b-row>
                          </b-col>
                          <b-col sm="4" class="px-0">
                            <b-row class="mx-0 p-0" v-for="(oddsItem, index) in item.gameOdds" :key="index" v-if="oddsItem.betType === '1'">
                              <b-col sm="12" class="p-1 align-self-center">
                                <p class="mb-1">
                                  <span v-text="oddsItem.betH" class="mr-1 text-warning"></span>
                                  <span v-text="oddsItem.ratioH" :class="{'text-success':oddsItem.ratioH < oddsItem.ratioV, 'text-info': oddsItem.ratioH === oddsItem.ratioV}"></span>
                                </p>
                                <p class="mb-0">
                                  <span v-text="oddsItem.betV" class="mr-1 text-warning"></span>
                                  <span v-text="oddsItem.ratioV" :class="{'text-success':oddsItem.ratioH > oddsItem.ratioV, 'text-info': oddsItem.ratioH === oddsItem.ratioV}"></span>
                                </p>
                              </b-col>
                            </b-row>
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col sm="1" class="px-0 border-right border-bottom">
                        <b-button type="button" size="sm" variant="primary" class="rounded openAll" v-b-modal.modal-center @click="openMatchesFn(item.gid, item.id)"><i class="fa fa-lightbulb-o"></i>  Open</b-button>
                        <b-button type="button" size="sm" variant="primary" class="rounded openAll" v-b-modal.modal-center @click="openMatchesEditFn(item.id)"><i class="fa fa-edit"></i> Edit</b-button>
                      </b-col>
                    </b-col>
                    <b-col sm="1" md="1" class="px-0 border-bottom posa">
                      <b-button type="button" size="sm" variant="primary" class="rounded openAll" v-b-modal.modal-center @click="openMatchesFn(itemArr[0].gid, '')"><!--<i class="fa fa-lightbulb-o"></i> -->Open All</b-button>
                      <b-button type="button" size="sm" variant="primary" class="rounded openAll"  v-b-modal.modal-center @click=" handleClickSortList(itemArr)"><!--<i class="fa fa-magic"></i> -->SortOut</b-button>
                    </b-col>
                  </b-row>
                </blockquote>
              </b-card>
            </b-card>
          </form>
        </b-col>
      </b-row>
      <b-modal title="Select LeagueIds" hide-header hide-footer size="lg" centered v-model="openLeagueModal"  ok-variant="success">
        <b-card class="mb-0">
          <form ref="" method="post"  autoComplete="on">
            <b-row>
              <b-col sm="12">
                <b-row class="p-1">
                  <b-col sm="6" class="p-1" :key="key" v-for="(item, key) in leagueIdsOptions">
                    <input  type="checkbox" :value="item.value" :checked="checkedD"  v-model="combingMatchesForm.leagueIds" :id="'check' + key">
                    <label class="px-1 labels" :for="'check' + key">{{ item.text }}</label>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </form>
        </b-card>
        <div class="select-LeagueId-btn">
          <b-button type="button" size="sm" variant="success" class="rounded" @click="handleSelectLeagueId('OK')">Ok</b-button>
          <b-button type="button" size="sm" variant="secondary" class="rounded" @click="handleSelectLeagueId('CL')">Cancel</b-button>
          <b-button type="button" size="sm" variant="danger" class="rounded" @click="handleSelectLeagueId('DA')">Deselect all</b-button>
          <b-button type="button" size="sm" variant="primary" class="rounded" @click="handleSelectLeagueId('SA')">Select all</b-button>
        </div>
      </b-modal>
      <b-modal title="Add Matches" centered  v-model="matchesAdd" @ok="matchesAddFn()" ok-variant="success">
        <b-card class="mb-0">
          <form ref="matchesAddForm" method="post"  autoComplete="on">
            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="addLeagueId">联赛名称:</label>
                  <input class="form-control form-control-sm" @focus="openSelectLeagueId()" @change="judgeUser(matchesAddForm.leagueId,'联赛名称')" type="text" v-model="matchesAddForm.leagueId" placeholder="Select LeagueId">
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="remark">联赛日期：</label>
                  <datetime  type="datetime" v-model="times" :value-zone="'UTC+8'" placeholder="Enter matchTime" format="yyyy-MM-dd HH:mm:ss"></datetime>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="remark">联赛左队：</label>
                  <b-form-input type="text" v-model="matchesAddForm.teamLeft" autocomplete="off"  @change="judgeUser(matchesAddForm.teamLeft,'联赛左队')" id="teamLeft" placeholder="Enter teamLeft"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="remark">联赛右队：</label>
                  <b-form-input type="text" v-model="matchesAddForm.teamRight" autocomplete="off"  @change="judgeUser(matchesAddForm.teamRight,'联赛右队')" id="teamRight" placeholder="Enter teamRight"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="remark">直播地址：</label>
                  <b-form-input type="text" v-model="matchesAddForm.liveUrl" autocomplete="off" id="liveUrl" placeholder="Enter liveUrl"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group >
                  <label for="categoryAdd">联赛类别:</label>
                  <b-form-select id="categoryAdd" v-model="matchesAddForm.liveType" @input="judgeRole(matchesAddForm.liveType, '联赛类别')" :plain="true" :options="liveTypeOptions">
                    <template slot="first">
                      <option :value="''" disabled>Select liveType</option>
                    </template>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col sm="12">
                <b-form-group>
                  <label for="remark">备注：</label>
                  <b-form-input type="text" v-model="matchesAddForm.remark" autocomplete="off" id="remark" placeholder="Enter Remark"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </form>
        </b-card>
      </b-modal>
      <b-modal size="lg" hide-footer hide-header centered v-model="matchesEdit" @ok="setMatchesEditFn()" >
         <b-button-group size="sm">
           <b-button :pressed="true" @click="handleSelectMenu('mc')" variant="primary">Edit Matches</b-button>
           <b-button :pressed="false" @click="handleSelectMenu('go')" variant="success">GameOdds</b-button>
           <b-button :pressed="true" @click="handleSelectMenu('ad')" variant="warning">AddOdds</b-button>
         </b-button-group>
         <b-card v-show="selectMenu === 'mc'" class="mb-0">
           <form ref="matchesEditForm" method="post" :model="matchesEditForm" autoComplete="on">
             <b-row>
               <b-col sm="4">
                 <b-form-group>
                   <label for="idEdit">左战队名：</label>
                   <b-form-input type="text" v-model="matchesEditForm.teamLeftCn" autocomplete="off"  @change="judgeUser(matchesEditForm.teamLeftCn, '左战队名')" id="matchesTeamLeft"  placeholder="Enter teamLeftCn"></b-form-input>
                 </b-form-group>
               </b-col>
               <b-col sm="4">
                 <b-form-group>
                   <label for="idEdit">team left：</label>
                   <b-form-input type="text" v-model="matchesEditForm.teamLeft" autocomplete="off"  @change="judgeUser(matchesEditForm.teamLeft, 'team left')" id="matchesTeamLeft" placeholder="Enter teamLeft"></b-form-input>
                 </b-form-group>
               </b-col>
               <b-col sm="4">
                 <b-form-group>
                   <label for="idEdit">赛事ID：</label>
                   <b-form-input type="text" v-model="matchesEditForm.matchId" disabled id="matchesIdEdit"></b-form-input>
                 </b-form-group>
               </b-col>
               <b-col sm="4">
                 <b-form-group>
                   <label for="idEdit">右战队名：</label>
                   <b-form-input type="text" v-model="matchesEditForm.teamRightCn" autocomplete="off" @change="judgeUser(matchesEditForm.teamRightCn, '右战队名')" id="matchesTeamRight" placeholder="Enter teamRightCn"></b-form-input>
                 </b-form-group>
               </b-col>
               <b-col sm="4">
                 <b-form-group>
                   <label for="idEdit">team right：</label>
                   <b-form-input type="text" v-model="matchesEditForm.teamRight" autocomplete="off"  @change="judgeUser(matchesEditForm.teamRight, 'team right')" id="matchesTeamLeft" placeholder="Enter teamRight"></b-form-input>
                 </b-form-group>
               </b-col>
               <b-col sm="4">
                 <b-form-group>
                   <label for="idEdit">赛事时间：</label>
                   <!--<b-form-input type="text" v-model="matchesEditForm.matchTime" autocomplete="off" id="matchesRemark"></b-form-input>-->
                   <datetime  type="datetime" v-model="times" :value-zone="'UTC+8'" placeholder="Enter matchTime" format="yyyy-MM-dd HH:mm:ss"></datetime>
                 </b-form-group>
               </b-col>
               <b-col sm="4">
                 <b-form-group>
                   <label for="idEdit">联赛ID：</label>
                   <input class="form-control form-control-sm" id="MatchesLeagueId" autocomplete="off" @focus="openSelectLeagueId()" @change="judgeUser(matchesEditForm.leagueId, '联赛ID')" type="text" v-model="matchesEditForm.leagueId" placeholder="Select LeagueId">
                 </b-form-group>
               </b-col>
               <b-col sm="4">
                 <b-form-group>
                   <label for="idEdit">直播地址：</label>
                   <b-form-input type="text" v-model="matchesEditForm.liveUrl" autocomplete="off" placeholder="Emter liveUrl" id="matchesLiveUrl"></b-form-input>
                 </b-form-group>
               </b-col>
               <b-col sm="4">
                 <b-form-group>
                   <label for="idEdit">赛事备注：</label>
                   <b-form-input type="text" v-model="matchesEditForm.remark" autocomplete="off" placeholder="Emter Remark" id="matchesRemark"></b-form-input>
                 </b-form-group>
               </b-col>
             </b-row>
           </form>
           <b-button-group class="float-right" size="sm">
             <b-button :pressed="true" class="rounded" variant="secondary" @click="matchesEdit = false" style="margin-right:10px">Cancel</b-button>
             <b-button :pressed="false" class="rounded" @click="setMatchesEditFn()" variant="danger">submit</b-button>
           </b-button-group>
         </b-card>
         <b-card v-show="selectMenu === 'go'" class="mb-0">
           <form ref="matchesEditForm" method="post" :model="matchesEditForm" autoComplete="on">
             <table class="sort-gameOdds">
               <thead>
               <tr>
                 <th>betH</th>
                 <th>betA</th>
                 <th>ratioH</th>
                 <th>ratioA</th>
                 <th>mlineType</th>
                 <th>manual</th>
                 <th>status</th>
                 <th>betType</th>
               </tr>
               </thead>
               <tbody>
                 <tr v-if="gameOdds.length" v-for="(item,key) in gameOdds" :key="key">
                    <td>
                      <b-form-group>
                         <b-form-input type="text" v-model="item.betH" autocomplete="off" placeholder="Enter betH" ></b-form-input>
                      </b-form-group>
                    </td>
                    <td>
                      <b-form-group>
                         <b-form-input type="text" v-model="item.betV" autocomplete="off" placeholder="Enter betV" ></b-form-input>
                      </b-form-group>
                    </td>
                    <td>
                      <!--<b-form-group>-->
                         <!--<b-form-input type="text" v-model="item.ratioH" autocomplete="off" @blur="handleChangeOdds(key)" placeholder="Enter ratioH" ></b-form-input>-->
                      <!--</b-form-group>-->
                      <input type="text" @blur="handleChangeOdds(item.ratioH,key)" v-model="item.ratioH" placeholder="Enter ratioH" class="form-control">
                    </td>
                    <td>
                      <b-form-group>
                         <b-form-input type="text" v-model="item.ratioV" disabled autocomplete="off" placeholder="Enter ratioV" ></b-form-input>
                      </b-form-group>
                    </td>
                   <td>
                     <b-form-group>
                       <b-form-select id="categoryEdit" v-model="item.mlineType" :plain="true" :options="mlineTypeOptions">
                         <template slot="first">
                           <option :value="''" disabled>select mlineType</option>
                         </template>
                       </b-form-select>
                     </b-form-group>
                   </td>
                   <td>
                     <b-form-group>
                       <b-form-select id="categoryEdit" v-model="item.manual" :plain="true" :options="winningWayOptions">
                         <template slot="first">
                           <option :value="''" disabled>select manual</option>
                         </template>
                       </b-form-select>
                     </b-form-group>
                   </td>
                   <td>
                     <b-form-group>
                       <b-form-select id="categoryEdit" v-model="item.status" :plain="true" :options="statusOptions">
                         <template slot="first">
                           <option :value="''" disabled>select status</option>
                         </template>
                       </b-form-select>
                     </b-form-group>
                   </td>
                    <td>
                      <b-form-group>
                        <b-form-select id="categoryEdit" v-model="item.betType" :plain="true" :options="gameOddsOptions">
                          <template slot="first">
                            <option :value="''" disabled>select betType</option>
                          </template>
                        </b-form-select>
                      </b-form-group>
                    </td>
                 </tr>
                 <tr v-if="gameOdds.length === 0">
                   <td colspan="8" ><i class="fa fa-spinner fa-spin"></i> 暂无数据!</td>
                 </tr>
               </tbody>
             </table>
           </form>
          <b-button-group class="float-right sort-btn pb-0" size="sm">
            <b-button :pressed="true" class="rounded" @click="matchesEdit = false" variant="secondary">Cancel</b-button>
            <b-button :pressed="false" class="rounded mr-0" @click="handleUpdateOdds" variant="danger">submit</b-button>
          </b-button-group>
         </b-card>
         <b-card v-show="selectMenu === 'ad'" class="mb-0">
           <form ref="matchesEditForm" method="post" :model="matchesEditForm" autoComplete="on">
             <table class="sort-gameOdd">
               <thead>
               <tr>
                 <th>betH</th>
                 <th>betV</th>
                 <th>ratioH</th>
                 <th>ratioV</th>
                 <th>mlineType</th>
                 <th>betType</th>
               </tr>
               </thead>
               <tbody>
               <tr>
                 <td>
                   <b-form-group>
                     <b-form-input type="text" v-model="addOddsList.betH" autocomplete="off" placeholder="Enter betH"></b-form-input>
                   </b-form-group>
                 </td>
                 <td>
                   <b-form-group>
                     <b-form-input type="text" v-model="addOddsList.betV" autocomplete="off" placeholder="Enter betV"></b-form-input>
                   </b-form-group>
                 </td>
                 <td>
                   <b-form-group>
                     <b-form-input type="text" v-model="addOddsList.ratioH" autocomplete="off" placeholder="Enter ratioH"></b-form-input>
                   </b-form-group>
                 </td>
                 <td>
                   <b-form-group>
                     <b-form-input type="text" v-model="addOddsList.ratioV" autocomplete="off" placeholder="Enter ratioV"></b-form-input>
                   </b-form-group>
                 </td>
                 <td>
                   <b-form-group>
                     <b-form-select id="categoryEdit" v-model="addOddsList.mlineType" :plain="true" :options="mlineTypeOptions">
                       <template slot="first">
                         <option :value="''" disabled>select mlineType</option>
                       </template>
                     </b-form-select>
                   </b-form-group>
                 </td>
                 <td>
                   <b-form-group>
                     <b-form-select id="categoryEdit" v-model="addOddsList.betType" :plain="true" :options="gameOddsOptions">
                       <template slot="first">
                         <option :value="''" disabled>select betType</option>
                       </template>
                     </b-form-select>
                   </b-form-group>
                 </td>
               </tr>
               </tbody>
             </table>
           </form>
           <b-button-group class="float-right sort-btn pb-0" size="sm">
             <b-button :pressed="true" class="rounded" @click="matchesEdit = false" variant="secondary">Cancel</b-button>
             <b-button :pressed="false" class="rounded mr-0" @click="handleClickAddOdds" variant="danger">submit</b-button>
           </b-button-group>
         </b-card>
       </b-modal>
      <Model :isOpentModal="isModal" :titleName="titleName" @cancel="cancelModalFn()" @ok="okModalFn()">
        <div slot="body">
          <b-form-group label="">
            <b-form-radio-group v-model="matchesAddForm.leagueId" :options="leagueIdsOptions" name="radioInline">
            </b-form-radio-group>
          </b-form-group>
        </div>
      </Model>
    </div>
     <b-card v-if="!matchSort">
       <table class="table table-hover table-striped text-center table-sm mb-0">
          <thead class="thead-darks thead-dark">
            <tr>
              <th class="et" scope="col">联赛名称</th>
              <th class="et" scope="col">联赛类型</th>
              <th class="ft" scope="col">左战队</th>
              <th class="ft" scope="col" style="position: relative">
                右战队
              <b-button size="sm" class="pa-btn" @click="handleClickPushAll()" variant="primary">
                MoveAll
              </b-button>
              </th>
              <th class="et" scope="col">联赛名称(otherList)</th>
              <th class="et" scope="col">联赛类型(otherList)</th>
              <th class="ft" scope="col">左战队(otherList)</th>
              <th class="ft" scope="col">右战队(otherList)</th>
           </tr>
          </thead>
       </table>
       <draggable v-model="sortOutList.mainList" class="dragArea dragArea-o" :options="{group:'people'}">
          <div v-if="sortOutList.mainList.length"  @mousedown="handleClickScroll()" class="sort-tr" v-for="(element,key) in sortOutList.mainList" :key="key">
            <span>{{ element.league }}</span>
            <span>{{ element.category }}</span>
            <span>{{ element.teamLeft }}</span>
            <span>{{ element.teamRight }}</span>
          </div>
         <div v-if="!sortOutList.mainList.length" class="sort-none">暂无赛事</div>
       </draggable>
       <draggable v-model="sortOutList.otherList" class="dragArea dragArea-w" :options="{group:'people'}">
         <div v-if="sortOutList.otherList.length" @mousedown="handleClickScroll()" class="sort-tr" v-for="(element,key) in sortOutList.otherList" :key="key">
           <span @click="handleClickScroll($event)">{{ element.league }}</span>
           <span @click="handleClickScroll($event)">{{ element.category }}</span>
           <span @click="handleClickScroll($event)">{{ element.teamLeft }}</span>
           <span @click="handleClickScroll($event)">{{ element.teamRight }}</span>
         </div>
         <div v-if="!sortOutList.otherList.length" class="sort-none">暂无赛事</div>
       </draggable>
     </b-card>
     <div v-if="!matchSort" class="sort-btn float-right">
      <b-button class="rounded" type="button" size="sm" variant="danger" @click="handleClickSetSort('qx')">Cancel</b-button>
      <b-button type="button" size="sm" variant="primary" @click="handleClickSetSort('qd')" class="rounded">OK</b-button>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import draggable from 'vuedraggable'
import Model from './modal.vue'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import {validatNum2} from '../../model/validate'
export default {
  name: 'Competition',
  components: {
    Model,
    Datetime,
    draggable
  },
  props: {},
  data () {
    return {
      combingMatchesForm: {
        leagueIds: [],
        // date: '',
        rtype: 2
      },
      rtypeOptions: [
        { value: 1, text: '今日' },
        { value: 2, text: '早盘' }
      // { value: 3, text: '滚球' }
      ],
      combingMatchesList: [],
      leagueGameSettingList: {},
      openLeagueModal: false,
      matchesAdd: false,
      matchesEdit: false,
      matchSort: true,
      matchesAddForm: {
        leagueId: '',
        teamLeft: '',
        teamRight: '',
        matchTime: '',
        liveUrl: '',
        remark: '',
        liveType: ''
      },
      liveTypeOptions: [
        { value: 0, text: '非滚球' },
        { value: 1, text: '滚球' }
      ],
      isUser: [],
      isRole: false,
      isNum: [],
      getMatchesEditForm: {
        id: ''
      },
      getMatchesEditInfo: {},
      matchesEditForm: {
        id: '',
        leagueId: '',
        teamLeft: '',
        teamLeftCn: '',
        teamRightCn: '',
        teamRight: '',
        scoreLeft: '',
        scoreRight: '',
        matchStatus: '',
        liveUrl: '',
        remark: ''
      },
      oldMatchesEdit: {
        id: '',
        leagueId: '',
        teamLeft: '',
        teamRight: '',
        teamLeftCn: '',
        teamRightCn: '',
        scoreLeft: '',
        scoreRight: '',
        matchStatus: '',
        liveUrl: '',
        remark: ''
      },
      matchStatusOptions: [
        { value: -2, text: '初始化' },
        { value: -1, text: '规整' },
        { value: 0, text: '竞猜中' },
        { value: 1, text: '暂停中' },
        { value: 2, text: '已取消' },
        { value: 3, text: '已关盘' },
        { value: 4, text: '已结算' }
      ],
      gameOddsOptions: [
        { value: 0, text: '让分' },
        { value: 1, text: '大小' },
        { value: 2, text: '独赢' }
      ],
      manualOptions: [
        { value: 0, text: '手动' },
        { value: 1, text: '自动' }
      ],
      mlineTypeOptions: [
        { value: 0, text: '1x2' },
        { value: 1, text: 'HDP' },
        { value: 2, text: 'OU' },
        { value: 3, text: 'OE' },
        { value: 4, text: 'OBT' }
      ],
      statusOptions: [
        { value: 0, text: '竞猜中' },
        { value: 1, text: '暂停中' },
        { value: 2, text: '已取消' },
        { value: 0, text: '已关盘' },
        { value: 0, text: '已结算' }
      ],
      ControlArr: [],
      isModal: false,
      titleName: 'Select LeagueId',
      openMatchForm: {
        gid: '',
        id: ''
      },
      getLeagueIdsArr: [],
      leagueIdsOptions: [],
      sortOutList: {},
      times: null,
      gameOdds: [],
      selectMenu: 'mc',
      addOddsList: {
        mlineType: '',
        betType: ''
      },
      checkedD: false,
      winningWayOptions: [
        { value: 0, text: '自动' },
        { value: 1, text: '手到' }
      ]
    }
  },
  created () {
    this.getMatchesListFn()
  },
  mounted () {

  },
  computed: {
  },
  methods: {
    ...mapActions([ 'getMatchesListAjax', 'getLeagueIdsAjax', 'getModifyMatchesAjax', 'setModifyMatchesAjax', 'setMatchPatternAjax',
      'openMatchAjax', 'addMatchAjax', 'getMatchSortAjax', 'setMatchSortAjax', 'postAddOdd', 'postUpdateOdds', 'postUpdateOddsByIdS' ]),
    getMatchesListFn () {
      this.combingMatchesList = []
      this.getMatchesListAjax(this.combingMatchesForm).then((data) => {
        let dataList = data
        let dataObj = {}
        for (let item of dataList) {
          let itemGid = item.gid
          let dataArr = []
          if (itemGid !== '') {
            if (!dataObj[itemGid]) {
              dataObj[itemGid] = item
              for (let it of dataList) {
                if (itemGid === it.gid) {
                  dataArr.push(it)
                }
              }
              this.combingMatchesList.push(dataArr)
            }
          } else {
            dataArr.push(item)
            this.combingMatchesList.push(dataArr)
          }
        }
        this.combingMatchesForm.leagueIds = []
      }).catch(err => {
        this.$notify({
          content: err,
          btn: 'close'
        })
      })
    },
    judgeUser (el, name) {
      let elName = el.trim()
      if (elName.length === 0) {
        this.$notify({
          content: name + '不能为空！',
          btn: 'close'
        })
        this.isUser.push(false)
      } else {
        this.isUser.push(true)
      }
    },
    judgeNum (el, name) {
      // let elName = el.trim()
      let elName = el
      if (elName.length === 0) {
        this.isNum.push(false)
        this.$notify({
          content: '赛事中' + name + '不能为空！',
          btn: 'close'
        })
      } else {
        if (validatNum2(el)) {
          this.isNum.push(true)
        } else {
          this.isNum.push(false)
          this.$notify({
            content: '赛事中' + name + '只能为0或正整数！',
            btn: 'close'
          })
        }
      }
    },
    judgeRole (el, user) {
      let userRole = el
      if (userRole !== '' && userRole !== null && userRole !== undefined) {
        this.isRole = true
      } else {
        this.$notify({
          content: '请选择' + user + '！',
          btn: 'close'
        })
        this.isRole = false
      }
    },
    openAddMatchesModal () {
      this.matchesAddForm = {
        leagueId: '',
        teamLeft: '',
        teamRight: '',
        matchTime: '',
        liveUrl: '',
        remark: '',
        liveType: ''
      }
      this.matchesAdd = true
      this.getModifyMatchesFn()
    },
    matchesAddFn () {
      this.isUser = []
      this.judgeUser(this.matchesAddForm.leagueId, '联赛名称')
      this.judgeUser(this.matchesAddForm.matchTime, '联赛日期')
      this.judgeUser(this.matchesAddForm.teamLeft, '联赛左队')
      this.judgeUser(this.matchesAddForm.teamRight, '联赛右队')
      this.judgeRole(this.matchesAddForm.liveType, '联赛类别')
      if (this.isRole && (this.isUser.indexOf(false) === -1)) {
        this.addMatchAjax(this.matchesAddForm).then((data) => {
          this.$notify({
            content: '联赛新增成功！',
            btn: 'close'
          })
          this.matchesAddForm = {
            leagueId: '',
            teamLeft: '',
            teamRight: '',
            matchTime: '',
            liveUrl: '',
            remark: '',
            liveType: ''
          }
          this.matchesAdd = false
          this.isRole = false
          this.isUser = []
          this.getMatchesListFn()
        })
      } else {
        this.$notify({
          content: '联赛新增失败！',
          btn: 'close'
        })
      }
    },
    openSelectLeagueId () {
    // this.getModifyMatchesFn()
      this.isModal = true
    },
    okModalFn () {
      this.matchesEditForm.leagueId = this.matchesAddForm.leagueId
      this.isModal = false
    },
    cancelModalFn () {
      this.matchesAddForm.leagueId = ''
      this.isModal = false
    },
    openMatchesEditFn (item) {
      this.matchesEditForm = {}
      this.oldMatchesEdit = {}
      this.matchesEdit = true
      this.getMatchesEditForm = {
        id: item
      }
      this.getModifyMatchesAjax(this.getMatchesEditForm).then((data) => {
        this.getMatchesEditInfo = data
        this.gameOdds  = this.getMatchesEditInfo.gameOdds.filter(arr => {
          delete arr.oddsName
          arr.matchId = this.getMatchesEditInfo.matchId
          return arr
        })
        this.gameOdds = this.getMatchesEditInfo.gameOdds
        this.matchesEditForm = {
          id: this.getMatchesEditInfo.id,
          matchId: this.getMatchesEditInfo.matchId,
          leagueId: this.getMatchesEditInfo.leagueId,
          teamLeft: this.getMatchesEditInfo.teamLeft,
          teamRight: this.getMatchesEditInfo.teamRight,
          teamLeftCn: this.getMatchesEditInfo.teamLeftCn,
          teamRightCn: this.getMatchesEditInfo.teamRightCn,
          scoreLeft: this.getMatchesEditInfo.scoreLeft,
          scoreRight: this.getMatchesEditInfo.scoreRight,
          gameOdds: this.getMatchesEditInfo.gameOdds,
          matchTime: this.getMatchesEditInfo.matchTime,
          matchStatus: '',
          liveUrl: '',
          remark: ''
        }
        this.oldMatchesEdit = {
          id: this.getMatchesEditInfo.id,
          matchId: this.getMatchesEditInfo.matchId,
          leagueId: this.getMatchesEditInfo.leagueId,
          teamLeft: this.getMatchesEditInfo.teamLeft,
          teamRight: this.getMatchesEditInfo.teamRight,
          scoreLeft: this.getMatchesEditInfo.scoreLeft,
          scoreRight: this.getMatchesEditInfo.scoreRight,
          teamLeftCn: this.getMatchesEditInfo.teamLeftCn,
          teamRightCn: this.getMatchesEditInfo.teamRightCn,
          matchStatus: '',
          liveUrl: '',
          remark: ''
        }
        for (let x = 0; x < this.matchStatusOptions.length; x++) {
          let obj = this.matchStatusOptions[x]
          if (obj.value === this.getMatchesEditInfo.matchStatus) {
            this.matchesEditForm.matchStatus = obj.value
            this.oldMatchesEdit.matchStatus = obj.value
          }
        }

        if (!this.getMatchesEditInfo.liveUrl) {
          this.matchesEditForm.liveUrl = ''
          this.oldMatchesEdit.liveUrl = ''
        } else {
          this.matchesEditForm.liveUrl = this.getMatchesEditInfo.liveUrl
          this.oldMatchesEdit.liveUrl = this.getMatchesEditInfo.liveUrl
        }

        if (!this.getMatchesEditInfo.remark) {
          this.matchesEditForm.remark = ''
          this.oldMatchesEdit.remark = ''
        } else {
          this.matchesEditForm.remark = this.getMatchesEditInfo.remark
          this.oldMatchesEdit.remark = this.getMatchesEditInfo.remark
        }
      }).catch(err => {
        this.$notify({
          content: err,
          btn: 'close'
        })
      })
    },
    setMatchesEditFn () {
      this.isRole = false
      this.isUser = []
      this.isNum = []
      this.judgeUser(this.matchesEditForm.leagueId, '联赛ID')
      this.judgeUser(this.matchesEditForm.teamLeft, '左战队名')
      this.judgeUser(this.matchesEditForm.teamRight, '右战队名')
      this.judgeNum(this.matchesEditForm.scoreLeft, '左比分')
      this.judgeNum(this.matchesEditForm.scoreRight, '右比分')
      this.judgeRole(this.matchesEditForm.matchStatus, '赛事状态')
      let oldObj = this.oldMatchesEdit
      let newObj = this.matchesEditForm
      Object.keys(oldObj).forEach(key => {
      // console.log(key + ' ------ ' + oldObj[key] + ' ------ ' + newObj[key])
        if (oldObj[key] === newObj[key]) {
          this.ControlArr.push(true)
        } else {
          this.ControlArr.push(false)
        }
      })
      if (this.ControlArr.indexOf(false) === -1) {
        this.ControlArr = []
        this.$notify({
          content: '未修改联赛信息！',
          btn: 'close'
        })
      } else {
        this.ControlArr = []
        if (this.isRole && (this.isUser.indexOf(false) === -1) && (this.isNum.indexOf(false) === -1)) {
          this.setModifyMatchesAjax(this.matchesEditForm).then((data) => {
            this.$notify({
              content: '联赛编辑成功！',
              btn: 'close'
            })
            this.matchesEditForm = {}
            this.matchesEdit = false
            this.isRole = false
            this.isUser = []
            this.isNum = []
            this.getMatchesListFn()
          }).catch(err => {
            this.$notify({
              content: err,
              btn: 'close'
            })
          })
        } else {
          this.$notify({
            content: '联赛编辑失败！',
            btn: 'close'
          })
        }
      }
    },
    getSettingIdData (num) {
      this.settingIdForm.pageNum = num
      this.openSettingModal()
    },
    setSettingId (num) {
      this.getSettingID = num
    },
    openLeagueIdsModal () {
      this.openLeagueModal = true
      this.getModifyMatchesFn()
    },
    openLeagueModalFn () {
      this.openLeagueModal = false
      this.getMatchesListFn()
    },
    openMatchesFn (gid, id) {
      console.log(gid)
      this.openMatchForm = {
        gid: gid,
        id: id
      }
      this.openMatchAjax(this.openMatchForm).then((data) => {
        this.$notify({
          content: '赛事已开盘！',
          btn: 'close'
        })
        this.openMatchForm = {
          gid: '',
          id: ''
        }
        this.getMatchesListFn()
      }).catch(err => {
        this.$notify({
          content: err,
          btn: 'close'
        })
      })
    },
    handleSelectLeagueId (ck) {
      switch (ck) {
        case 'SA' :
          this.combingMatchesForm.leagueIds = this.leagueIdsOptions.map(arr => arr.value)
          break
        case 'DA' :
          this.checkedD = false
          this.combingMatchesForm.leagueIds = []
          break
        case 'CL' :
          this.combingMatchesForm.leagueIds = []
          this.openLeagueModal = false
          break
        case 'OK' :
          this.openLeagueModal = false
          this.getMatchesListFn()
          break
      }
    },
    getModifyMatchesFn () {
      this.leagueIdsOptions = []
      this.getLeagueIdsAjax().then((data) => {
        let itemObj = {}
        for (let item of data) {
          itemObj = {
            text: item.category + ' - ' + item.league,
            value: item.lid
          }
          this.leagueIdsOptions.push(itemObj)
        }
      }).catch(err => {
        this.$notify({
          content: err,
          btn: 'close'
        })
      })
    },
    handleClickSortList (item) {
      let data = {}
      data.gid = item[0].gid ? item[0].gid : ''
      data.id = item[0].gid ? '' : Number(item[0].id)
      this.getMatchSortAjax(data).then(res => {
        if (res) {
          this.sortOutList = res
          this.matchSort = false
        } else {
          this.$notify({
            content: '暂无赛事',
            btn: 'close'
          })
        }
      }).catch(err => {
        throw err
      })
    },
    handleClickSetSort (type) {
      if (type === 'qx') {
        this.matchSort = true
        return false
      } else {
        let data = []
        data = this.sortOutList.mainList.map(arr => arr.id)
        if (!data.length) {
          this.$notify({
            content: '赛事不能为空',
            btn: 'close'
          })
          return false
        }
        this.setMatchSortAjax(data).then(res => {
          if (res === 'success') {
            this.$notify({
              content: '操作成功',
              btn: 'close'
            })
            this.matchSort = true
            this.getMatchesListFn()
          }
        }).catch(err => {
          throw err
        })
      }
    },
    handleSelectMenu (type) {
      switch (type) {
        case 'mc' :
          this.selectMenu = 'mc'
          break
        case 'go' :
          this.selectMenu = 'go'
          break
        case 'ad' :
          this.selectMenu = 'ad'
          break
      }
    },
    handleClickScroll () {
      let dragO = document.querySelector('.dragArea-o')
      let dragOH = dragO.offsetHeight
      let dragW = document.querySelector('.dragArea-w')
      let dragWH = dragW.offsetHeight
      dragO.style.height = `${dragWH}px`
      let dragOChild = dragO.children
      if (dragOH >= dragWH) {
        let newOH = null
        for (let i = 0; i < dragOChild.length; i++) {
          newOH += dragOChild[i].offsetHeight
        }
        dragO.style.height = `${newOH + 20}px`
      }
    },
    handleClickAddOdds () {
      this.addOddsList.matchId = this.matchesEditForm.matchId
      this.postAddOdd(this.addOddsList).then(res => {
        if (res === 'success') {
          this.$notify({
            content: '操作成功！',
            btn: 'close'
          })
          this.openMatchesEditFn(this.getMatchesEditInfo.id)
          this.selectMenu = 'go'
          this.addOddsList = {
            mlineType: '',
            betType: ''
          }
        }
      })
    },
    handleUpdateOdds () {
      this.postUpdateOdds(this.gameOdds).then(res => {
        if (res === 'success') {
          this.getMatchesListFn(this.getMatchesEditInfo.id)
          this.$notify({
            content: '编辑成功',
            btn: 'close'
          })
          this.matchesEdit = false
          this.selectMenu = 'mc'
        }
      })
    },
    handleClickPushAll () {
      if (this.sortOutList.otherList.length !== 0) {
        this.sortOutList.mainList = this.sortOutList.mainList.concat(this.sortOutList.otherList)
        this.sortOutList.otherList = []
      }
    },
    handleChangeOdds (rat, key) {
      let data = {
        oddsId: this.getMatchesEditInfo.id,
        odds: rat
      }
      this.postUpdateOddsByIdS(data).then(res => {
        if (res) {
          this.gameOdds[key].ratioH = res.ratio_h
          this.gameOdds[key].ratioV = res.ratio_v
        }
      })
    }
  },
  watch: {
    times (nev) {
      let time = nev
      time = time.slice(0, 19)
      time = time.replace(/T/, ' ')
      this.matchesAddForm.matchTime = time
      this.matchesEditForm.matchTime = time
    }
  }
}
</script>

<style lang="scss">
  .competitionContent{
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
      vertical-align: middle;
    }
    .card-body, .card-block {
      padding: 1rem;
    }
    .openAll{
      position: relative;
      top: 50%;
      transform: translate(0%, -50%);
    }
    .input-group-text{
      padding: 0.375rem 0.25rem;
    }
  }
  .modal-content{
    border-radius: 8px !important;
  }
  .dragArea{
    float: left;
    width: 50%;
  }
  .sort-tr span{
    display: inline-block;
    text-align: center;
    font-size: 12px;
    padding: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sort-tr span:first-child,.sort-tr span:nth-child(2){
    width: 18%;
  }
  .sort-tr span:nth-child(3),.sort-tr span:last-child{
    width: 31%;
  }
  .card-body h2{
    background-color: #eee;
    padding: 10px;
    margin: 20px 0;
  }
  .sort-none{
    text-align: center;
    padding: 4px;
    color: #fff;
    background-color: #666;
  }
  .sort-btn{
    padding: 10px 0;
    button {
      margin-right: 10px;
    }
  }
  .thead-darks tr th.et{
    width: 8.7%;
  }
  .thead-darks tr th.ft{
    width: 15%;
  }
  .card{
    margin-bottom: .5rem;
  }
  .dragArea .sort-tr:nth-child(2n - 1){
    background-color: #4c6f7b;
    color:#fff;
  }
  .dragArea-w .sort-tr:nth-child(2n - 1){
    background-color: #879296;
  }
  .vdatetime-input{
    width: 100%;
    height: 35px;
    box-sizing: border-box;
    padding: 0.25rem 0.5rem;
    font-size: 0.76563rem;
    line-height: 1.5;
    color: #3e515b;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #c2cfd6;
    border-radius: 0;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  }
  .sort-table{
    list-style: none;
    padding: 0 16px;
    margin: 0;
    background-color:#151b1e;
    color: #fff;
    li{
      display: inline-block;
      padding: 4px;
      width: 11.5%;
      text-align: center
    }
  }
  .card-body>div:nth-child(2n-1){
    background-color: #dee6ea;
  }
  .table-league th,.table-league td{
    width: 12.1%;
    span {
       display: inline-block;
       width: 150px;
       overflow: hidden;
       text-overflow:ellipsis;
       white-space: nowrap;
      }
    &:hover{
      color:#20a8d8
    }
  }
  .table-league th:first-child,.table-league td:first-child{
    width: 16.1%;
  }
  .sort-gameOdds,.sort-gameOdd{
    width: 100%;
    text-align: center;
     tr{
       border:1px solid rgba(0, 0, 0, 0.2);
       padding: 5px 0;
     }
    tr th,tr td{
      width: 12.5%;
      padding: 4px;
      border-right:1px solid rgba(0, 0, 0, 0.2);
      border-bottom:1px solid rgba(0, 0, 0, 0.2);
    }
    .form-control{
      text-align: center;
      padding: .2rem .1rem;
    }
    .form-group{
      margin: 0
    }
    ::-webkit-input-placeholder { /* WebKit browsers */
      color: #c2ced4;
    }
  }
  .sort-gameOdd tr th,.sort-gameOdd tr td{
    width: 14.2%;
  }
  .card {
    margin-bottom: 0;
  }
  .competitionContent .card-body {
    padding-top: 0;
    padding-bottom: 0;
  }
  .line-col{ padding-top: 15px !important;}
  .line-cols{
    padding-left: 5px !important;;
    padding-top: 5px;
    text-align: left;
  }
  .line-colss{
    padding-top: 5px !important;;
  }
  .labels{
    margin-bottom: 0;
  }
  .select-LeagueId-btn{
    padding-top: 15px;
    display: flex;
    flex-direction: row-reverse;
    button{
      width: 80px;
      margin-right: 10px;
    }
  }
  .posr {position: relative}
  .posa {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .pa-btn{
    width: 50px;
    border-radius: 3px;
    padding: 0;
    position: absolute;
    right: 25px;
  }
</style>
