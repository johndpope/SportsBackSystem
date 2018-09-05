<template>
  <div class="operateContent">
    <b-row>
      <b-col sm="12">
        <form ref="openingMatchesForm" name="openingMatchesForm">
          <b-card>
            <div slot="header">
              <b-form inline class="d-flex justify-content-start">
                <input class="form-control form-control-sm col-1 mr-4" @focus="openLeagueIdsModal()" type="text" v-model="openingMatchesForm.leagueIds" placeholder="Select LeagueIds">
                <b-form-select id="rtypes" v-model="openingMatchesForm.rtype" size="sm" class="col-1 mr-4" @input="getEventHandicapListFn()" :plain="true" :options="rtypeOptions">
                  <template slot="first">
                    <option :value="''" disabled>Select EventType</option>
                  </template>
                </b-form-select>
                <b-form-input v-if="openingMatchesForm.rtype === 2" id="date" class="col-1 mr-4" type="date" size="sm" v-model="openingMatchesForm.date" :plain="true" placeholder="" title="Event Date"></b-form-input>
                <b-button type="button" size="sm" variant="primary" class="rounded" @click="getEventHandicapListFn()"><i class="fa fa-dot-circle-o"></i> Inquire</b-button>
              </b-form>
              <b-button :disabled="pauseAllInfo.pause !== 1" inline type="button" size="sm" variant="primary" class="rounded btn-right2" @click="setMatchValveInfoFn(1)" title="Pause All Match"><i class="fa fa-pause" :class="{'fa-play': false}"></i> Pause All</b-button>
              <b-button  :disabled="pauseAllInfo.close !== 1" inline type="button" size="sm" variant="primary" class="rounded btn-right1" @click="setMatchValveInfoFn(3)" title="Close All Match"><i class="fa fa-stop" :class="{'fa-play': false}"></i> Close All</b-button>
            </div>
            <b-row class="text-center mx-0 px-0 text-light bg-dark border border-warning">
              <b-col sm="4" md="4" class="px-1">
                <b-row class="mx-0 h-100">
                  <b-col sm="3" class="p-1 align-self-center">赛事时间</b-col>
                  <b-col sm="2" class="p-1 d-flex align-items-center justify-content-center border-right border-left">赛事ID</b-col>
                  <b-col sm="7" class="p-1 align-self-center">比赛战队</b-col>
                </b-row>
              </b-col>
              <b-col sm="6" md="6"  class="px-0">
                <b-row class="mx-0">
                  <b-col sm="4" class="px-0">
                    <b-row class="mx-0 h-100">
                      <b-col sm="2" class="p-1 d-flex align-items-center justify-content-center border-right border-left">Margin</b-col>
                      <b-col sm="10" class="p-1 d-flex align-items-center justify-content-center border-right border-left">
                        独赢盘
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col sm="4" class="px-0">
                    <b-row class="mx-0 h-100">
                      <b-col sm="2" class="p-1 d-flex align-items-center justify-content-center border-right">Margin</b-col>
                      <b-col sm="10" class="p-1 d-flex align-items-center justify-content-center border-right border-left">
                        让分盘
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col sm="4" class="px-0 h-100">
                    <b-row class="mx-0">
                      <b-col sm="2" class="p-1 d-flex align-items-center justify-content-center border-right">Margin</b-col>
                      <b-col sm="10" class="p-1 d-flex align-items-center justify-content-center border-right border-left">
                        大小盘
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-col>
              <b-col sm="2" md="2" class="p-1 d-flex align-items-center justify-content-center">
                赛事操作
              </b-col>
            </b-row>
            <b-row class="mx-0" v-if="openingMatchesList.length === 0">
              <b-col sm="12" md="12" class="text-center border border-top-0 py-3 bg-primary">
                <i class="fa fa-spinner fa-spin"></i> 暂无操盘数据！
              </b-col>
            </b-row>
            <b-card else class="bg-light card-accent-warning text-center mb-3 operateCard" v-for="(itemArr, index) in openingMatchesList" :key="index" style="border-top-color: #a4b7c1 !important;border-left-color: #a4b7c1 !important;">
              <div slot="header">
                <strong><i class="fa fa-star"></i><span class="text-primary" v-text="itemArr.category"></span> - <span v-text="itemArr.league"></span></strong>
                <!--<span class="float-right matchRefresh" @click="matchRefreshFn()" title="Refresh"><i class="fa fa-refresh" :class="{'fa-spin': isRefresh,'action':isRefresh}"></i></span>-->
              </div>
              <blockquote class="card-blockquote mb-0 px-0">
                <b-row class="text-center mx-0 border-bottom" v-for="(item, index) in itemArr.gameMatches" :key="index" :id="item.id" style="border-bottom-color: #a4b7c1 !important;">
                  <b-col sm="4" md="4" class="px-0">
                    <b-row class="mx-0 h-100">
                      <b-col sm="3" class="p-0">
                        <div class="border-bottom align-items-center line-row line-row-pad">
                          <p class="mb-0" v-text="item.matchTime"></p>
                          <p class="mb-0 text-warning" v-text="(item.liveType === 1) ? 'Live' : ''"></p>
                        </div>
                      </b-col>
                      <b-col sm="2" class="p-0 border-left border-right d-flex  justify-content-center">
                        <div class="border-bottom align-items-center line-row line-row-pads">
                          {{ item.matchId }}
                        </div>
                      </b-col>
                      <b-col sm="7" md="7" class="p-0">
                        <div class="line-row border-bottom line-row-pad">
                          <p class="mb-1 teamTitle" :title="item.teamLeft" v-text="item.teamLeft"></p>
                          <p class="mb-0 teamTitle" :title="item.teamRight" v-text="item.teamRight"></p>
                        </div>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col sm="6" md="6"  class="px-0 border-right">
                    <b-row class="mx-0 h-100">
                      <b-col sm="4" class="px-0">
                        <b-row class="mx-0 h-100">
                          <b-col sm="2" class="p-0 border-right border-left d-flex justify-content-center">
                            <div class="line-row border-bottom line-row-pads">
                              {{ item.marginHdpWinner }}
                            </div>
                          </b-col>
                          <b-col sm="10" class="px-0">
                            <b-row class="mx-0 p-0" v-for="(oddsItem, index) in item.gameOdds" :key="index" v-if="oddsItem.betType === '2'">
                              <div class="line-row border-bottom d-flex justify-content-center">
                                <b-col sm="4" class="p-1 align-self-center">
                                  <p class="mb-1">
                                    <span v-text="oddsItem.ratioH" @click="handleClickShowInp($event, oddsItem, 'LF')" :class="{'text-success':oddsItem.ratioH < oddsItem.ratioV, 'text-info': oddsItem.ratioH === oddsItem.ratioV}"></span>
                                    <input  v-model="oddsItem.ratioH" type="text" class="form-control from-s">
                                  </p>
                                  <p class="mb-0">
                                    <span v-text="oddsItem.ratioV" @click="handleClickShowInp($event, oddsItem)" :class="{'text-success':oddsItem.ratioH > oddsItem.ratioV, 'text-info': oddsItem.ratioH === oddsItem.ratioV}"></span>
                                    <input  v-model="oddsItem.ratioV" type="text" class="form-control from-s">
                                  </p>
                                </b-col>
                                <b-col sm="4" @click="handleClickToVolume(item.matchId)" class="p-1 align-self-center btn-vol">
                                  <p class="mb-1">
                                    <span v-text="oddsItem.totalBetH"></span>
                                    <span class="mx-0">/</span>
                                    <span v-text="oddsItem.numBetH"></span>
                                  </p>
                                  <p class="mb-0">
                                    <span v-text="oddsItem.totalBetV"></span>
                                    <span class="mx-0">/</span>
                                    <span v-text="oddsItem.numBetV"></span>
                                  </p>
                                </b-col>
                                <b-col sm="4" class="p-1 align-self-center">
                                  <!--<b-button type="button" size="sm" variant="primary" :disabled="oddsItem.status === 2 || oddsItem.status === 3 || oddsItem.status === 4" class="rounded mb-1" v-b-modal.modal-center title="Edit Odds" @click="openOddsEditFn(oddsItem)"><i class="fa fa-pencil"></i></b-button>-->
                                  <b-button type="button" size="sm" variant="primary" :disabled="oddsItem.status === 2 || oddsItem.status === 3 || oddsItem.status === 4" class="rounded"  :class="{'bg-warning': oddsItem.status === 0,'bg-secondary': oddsItem.status === 1}" v-b-modal.modal-center @click="openOddsFn(oddsItem.id, (oddsItem.status === 0) ? 1 : 0)" :title="(oddsItem.status === 0) ? 'Pause Odds' : 'Unpause Odds'"><i class="fa" :class="{'fa-pause': oddsItem.status === 0, 'fa-play': oddsItem.status !== 0}"></i></b-button>
                                  <b-button type="button" size="sm" variant="primary" :disabled="oddsItem.status === 2 || oddsItem.status === 3 || oddsItem.status === 4" class="rounded" :class="{'bg-warning': (oddsItem.status === 1 || oddsItem.status === 0)}" v-b-modal.modal-center :title="(oddsItem.status === 2 || oddsItem.status === 3 || oddsItem.status === 4) ? 'Open Odds' : 'Close Odds'"  @click="openOddsFn(oddsItem.id, (oddsItem.status === 0 || oddsItem.status === 1) ? 3 : 0)"><i class="fa" :class="{'fa-play': (oddsItem.status === 2 || oddsItem.status === 3 || oddsItem.status === 4), 'fa-stop': (oddsItem.status === 0 || oddsItem.status === 1)}"></i></b-button>
                                  <!--<b-button type="button" size="sm" variant="primary" :disabled="oddsItem.status === 2 || oddsItem.status === 3 || oddsItem.status === 4" class="rounded" :class="{'bg-secondary': (oddsItem.status === 2 || oddsItem.status === 4)}" v-b-modal.modal-center :title="(oddsItem.status === 4) ? 'Settled Odds' : 'Cancel Odds'" @click="openOddsFn(oddsItem.id, 2)"><i class="fa" :class="{'fa-ban':oddsItem.status !== 4, 'fa-wrench': oddsItem.status === 4}"></i></b-button>-->
                                </b-col>
                              </div>
                            </b-row>
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col sm="4" class="px-0 border-left border-right">
                        <b-row class="mx-0 h-100">
                          <b-col sm="2" class="p-0 border-right d-flex justify-content-center">
                            <div class="line-row border-bottom line-row-pads">
                              {{ item.marginHdpWinner }}
                            </div>
                          </b-col>
                          <b-col sm="10" class="px-0">
                            <b-row class="mx-0  p-0" v-for="(oddsItem, index) in item.gameOdds" :key="index" v-if="oddsItem.betType === '0'">
                              <div class="line-row border-bottom d-flex justify-content-center">
                                <b-col sm="4" class="p-1 align-self-center">
                                  <p class="mb-1">
                                    <span v-text="oddsItem.betH" class="mr-1 text-warning"></span>
                                    <span class="bet-weight" v-text="oddsItem.ratioH" @click="handleClickShowInp($event, oddsItem, 'LF')" :class="{'text-success':oddsItem.ratioH < oddsItem.ratioV, 'text-info': oddsItem.ratioH === oddsItem.ratioV}"></span>
                                    <input type="text" v-model="oddsItem.ratioH" class="form-control from-ss">
                                  </p>
                                  <p class="mb-0">
                                    <span style="padding: 0 10px;"></span>
                                    <span class="bet-weight" v-text="oddsItem.ratioV" @click="handleClickShowInp($event, oddsItem)" :class="{'text-success':oddsItem.ratioH > oddsItem.ratioV, 'text-info': oddsItem.ratioH === oddsItem.ratioV}"></span>
                                    <input type="text" v-model="oddsItem.ratioV" class="form-control from-ss">
                                  </p>
                                </b-col>
                                <b-col sm="4" @click="handleClickToVolume(item.matchId)" class="p-1 align-self-center btn-vol">
                                  <p class="mb-1">
                                    <span v-text="oddsItem.totalBetH"></span>
                                    <span class="mx-0">/</span>
                                    <span v-text="oddsItem.numBetH"></span>
                                  </p>
                                  <p class="mb-0">
                                    <span v-text="oddsItem.totalBetV"></span>
                                    <span class="mx-0">/</span>
                                    <span v-text="oddsItem.numBetV"></span>
                                  </p>
                                </b-col>
                                <b-col sm="4" class="p-1 align-self-center">
                                  <!--<b-button type="button" size="sm" variant="primary" :disabled="btnDisable || oddsItem.status === 2 || oddsItem.status === 3 || oddsItem.status === 4" class="rounded mb-1" v-b-modal.modal-center title="Edit Odds" @click="openOddsEditFn(oddsItem)"><i class="fa fa-pencil"></i></b-button>-->
                                  <b-button type="button" size="sm" variant="primary" :disabled="btnDisable || oddsItem.status === 2 || oddsItem.status === 3 || oddsItem.status === 4" class="rounded "  :class="{'bg-warning': oddsItem.status === 0,'bg-secondary': oddsItem.status === 1}" v-b-modal.modal-center @click="openOddsFn(oddsItem.id, (oddsItem.status === 0) ? 1 : 0)" :title="(oddsItem.status === 0) ? 'Pause Odds' : 'Unpause Odds'"><i class="fa" :class="{'fa-pause': oddsItem.status === 0, 'fa-play': oddsItem.status !== 0}"></i></b-button>
                                  <b-button type="button" size="sm" variant="primary" :disabled="btnDisable || oddsItem.status === 2 || oddsItem.status === 3 || oddsItem.status === 4" class="rounded" :class="{'bg-warning': (oddsItem.status === 1 || oddsItem.status === 0)}" v-b-modal.modal-center :title="(oddsItem.status === 2 || oddsItem.status === 3 || oddsItem.status === 4) ? 'Open Odds' : 'Close Odds'"  @click="openOddsFn(oddsItem.id, (oddsItem.status === 0 || oddsItem.status === 1) ? 3 : 0)"><i class="fa" :class="{'fa-play': (oddsItem.status === 2 || oddsItem.status === 3 || oddsItem.status === 4), 'fa-stop': (oddsItem.status === 0 || oddsItem.status === 1)}"></i></b-button>
                                  <!--<b-button type="button" size="sm" variant="primary" :disabled="btnDisable || oddsItem.status === 2 || oddsItem.status === 3 || oddsItem.status === 4" class="rounded" :class="{'bg-secondary': (oddsItem.status === 2 || oddsItem.status === 4)}" v-b-modal.modal-center :title="(oddsItem.status === 4) ? 'Settled Odds' : 'Cancel Odds'" @click="openOddsFn(oddsItem.id, 2)"><i class="fa" :class="{'fa-ban':oddsItem.status !== 4, 'fa-wrench': oddsItem.status === 4}"></i></b-button>-->
                                </b-col>
                              </div>
                            </b-row>
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col sm="4" class="px-0">
                        <b-row class="mx-0 h-100">
                          <b-col sm="2" class="p-0 border-right ">
                            <div class="line-row border-bottom line-row-pads">
                              {{ item.marginOu }}
                            </div>
                          </b-col>
                          <b-col sm="10" class="px-0">
                            <b-row class="mx-0 p-0" v-for="(oddsItem, index) in item.gameOdds" :key="index" v-if="oddsItem.betType === '1'">
                              <div class="line-row border-bottom d-flex justify-content-center">
                                <b-col sm="4" class="p-1 align-self-center">
                                  <p class="mb-1">
                                    <span v-text="oddsItem.betH" class="mr-1 text-warning"></span>
                                    <span class="bet-weight" v-text="oddsItem.ratioH" @click="handleClickShowInp($event, oddsItem, 'LF')" :class="{'text-success':oddsItem.ratioH < oddsItem.ratioV, 'text-info': oddsItem.ratioH === oddsItem.ratioV}"></span>
                                    <input type="text" v-model="oddsItem.ratioH" class="form-control from-ss">
                                  </p>
                                  <p class="mb-0">
                                    <span class="mr-1 text-warning" style="padding: 0 9px">u</span>
                                    <span  class="bet-weight" v-text="oddsItem.ratioV" @click="handleClickShowInp($event, oddsItem)" :class="{'text-success':oddsItem.ratioH > oddsItem.ratioV, 'text-info': oddsItem.ratioH === oddsItem.ratioV}"></span>
                                    <input type="text" v-model="oddsItem.ratioV" class="form-control from-ss">
                                  </p>
                                </b-col>
                                <b-col sm="4" @click="handleClickToVolume(item.matchId)" class="p-1 align-self-center btn-vol">
                                  <p class="mb-1">
                                    <span v-text="oddsItem.totalBetH"></span>
                                    <span class="mx-0">/</span>
                                    <span v-text="oddsItem.numBetH"></span>
                                  </p>
                                  <p class="mb-0">
                                    <span v-text="oddsItem.totalBetV"></span>
                                    <span class="mx-0">/</span>
                                    <span v-text="oddsItem.numBetV"></span>
                                  </p>
                                </b-col>
                                <b-col sm="4" class="p-1 align-self-center">
                                  <!--<b-button type="button" size="sm" variant="primary" :disabled="btnDisable || oddsItem.status === 2 || oddsItem.status === 3 || oddsItem.status === 4" class="rounded mb-1" v-b-modal.modal-center title="Edit Odds" @click="openOddsEditFn(oddsItem)"><i class="fa fa-pencil"></i></b-button>-->
                                  <b-button type="button" size="sm" variant="primary" :disabled="btnDisable || oddsItem.status === 2 || oddsItem.status === 3 || oddsItem.status === 4" class="rounded "  :class="{'bg-warning': oddsItem.status === 0,'bg-secondary': oddsItem.status === 1}" v-b-modal.modal-center @click="openOddsFn(oddsItem.id, (oddsItem.status === 0) ? 1 : 0)" :title="(oddsItem.status === 0) ? 'Pause Odds' : 'Unpause Odds'"><i class="fa" :class="{'fa-pause': oddsItem.status === 0, 'fa-play': oddsItem.status !== 0}"></i></b-button>
                                  <b-button type="button" size="sm" variant="primary" :disabled="btnDisable || oddsItem.status === 2 || oddsItem.status === 3 || oddsItem.status === 4" class="rounded" :class="{'bg-warning': (oddsItem.status === 1 || oddsItem.status === 0)}" v-b-modal.modal-center :title="(oddsItem.status === 2 || oddsItem.status === 3 || oddsItem.status === 4) ? 'Open Odds' : 'Close Odds'"  @click="openOddsFn(oddsItem.id, (oddsItem.status === 0 || oddsItem.status === 1) ? 3 : 0)"><i class="fa" :class="{'fa-play': (oddsItem.status === 2 || oddsItem.status === 3 || oddsItem.status === 4), 'fa-stop': (oddsItem.status === 0 || oddsItem.status === 1)}"></i></b-button>
                                  <!--<b-button type="button" size="sm" variant="primary" :disabled="btnDisable || oddsItem.status === 2 || oddsItem.status === 3 || oddsItem.status === 4" class="rounded" :class="{'bg-secondary': (oddsItem.status === 2 || oddsItem.status === 4)}" v-b-modal.modal-center :title="(oddsItem.status === 4) ? 'Settled Odds' : 'Cancel Odds'" @click="openOddsFn(oddsItem.id, 2)"><i class="fa" :class="{'fa-ban':oddsItem.status !== 4, 'fa-wrench': oddsItem.status === 4}"></i></b-button>-->
                                </b-col>
                              </div>
                            </b-row>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col sm="2" md="2" class="p-0">
                    <div class="line-row border-bottom line-row-pad">
                      <b-row class="mx-0">
                        <b-col sm="12" class="p-0">
                          <b-row class="mx-0">
                            <b-col sm="12" class="p-2 align-self-center">
                              <b-button type="button" size="sm" variant="primary" :disabled="btnDisable || item.matchStatus === 2 || item.matchStatus === 3 || item.matchStatus === 4" class="rounded" v-b-modal.modal-center title="Add Odds" @click="openAddOddsModal(item)"><i class="fa fa-plus"></i></b-button>
                              <b-button type="button" size="sm" variant="primary" :disabled="btnDisable || item.matchStatus === 2 || item.matchStatus === 3 || item.matchStatus === 4" class="rounded"  :class="{'bg-warning': item.matchStatus === 0,'bg-secondary': item.matchStatus === 1}" v-b-modal.modal-center @click="openMatchFn(item.matchId, (item.matchStatus === 0) ? 1 : 0)" :title="(item.matchStatus === 0) ? 'Pause Match' : 'Unpause Match'"><i class="fa" :class="{'fa-pause': item.matchStatus === 0, 'fa-play': item.matchStatus !== 0}"></i></b-button>
                              <b-button type="button" size="sm" variant="primary" :disabled="btnDisable || item.matchStatus === 2 || item.matchStatus === 3 || item.matchStatus === 4" class="rounded" :class="{'bg-warning': (item.matchStatus === 1 || item.matchStatus === 0)}" v-b-modal.modal-center :title="(item.matchStatus === 2 || item.matchStatus === 3 || item.matchStatus === 4) ? 'Open Match' : 'Close Match'"  @click="openMatchFn(item.matchId, (item.matchStatus === 0 || item.matchStatus === 1) ? 3 : 0)"><i class="fa" :class="{'fa-play': (item.matchStatus === 2 || item.matchStatus === 3 || item.matchStatus === 4), 'fa-stop': (item.matchStatus === 0 || item.matchStatus === 1)}"></i></b-button>
                              <b-button type="button" size="sm" variant="primary" :disabled="btnDisable || item.matchStatus === 2 || item.matchStatus === 3 || item.matchStatus === 4" class="rounded" :class="{'bg-secondary': (item.matchStatus === 2 || item.matchStatus === 4)}" v-b-modal.modal-center :title="(item.matchStatus === 4) ? 'Settled Match' : 'Cancel Match'" @click="openMatchFn(item.matchId, 2)"><i class="fa" :class="{'fa-ban':item.matchStatus !== 4, 'fa-wrench': item.matchStatus === 4}"></i></b-button>
                              <input type="checkbox" :checked="item.liveType === 1" @change="handleSetRollBall(item.liveType, item.matchId)" class="run-ball">
                            </b-col>
                          </b-row>
                        </b-col>
                        <!--<b-col sm="4" class="p-1 border-left">-->
                        <!--<b-button type="button" size="sm" variant="primary" class="rounded" v-b-modal.modal-center><i class="fa fa-plus"></i>  Add</b-button>-->
                        <!--</b-col>-->
                      </b-row>
                    </div>
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
                  <input  type="checkbox" :value="item.value" :checked="checkedD"  v-model="openingMatchesForm.leagueIds" :id="'check' + key">
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
    <b-modal title="Add Odds" centered v-model="openOddsAddModal" @ok="OddsAddFn()" ok-variant="success">
      <b-card class="mb-0">
        <form ref="oddsAddForm" method="post"  autoComplete="on">
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label for="addMatchId">matchId:</label>
                <input class="form-control"  type="text" disabled v-model="oddsAddForm.matchId" placeholder="Select matchId">
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group >
                <label for="betTypeAdd">oddsType:</label>
                <b-form-select id="betTypeAdd" v-model="oddsAddForm.betType" :plain="true" :options="betTypeOptions">
                  <template slot="first">
                    <option :value="''" disabled>Select oddsType</option>
                  </template>
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="remark">betH：</label>
                <b-form-input type="text" v-model="oddsAddForm.betH" :disabled="(oddsAddForm.betType === 2) ? true : false" autocomplete="off"  @change="judgeNum2(oddsAddForm.betH,'betH')" id="teamLeft" placeholder="Enter betH"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="remark">betV：</label>
                <b-form-input type="text" v-model="oddsAddForm.betV" :disabled="(oddsAddForm.betType === 2) ? true : false" autocomplete="off"  @change="judgeNum2(oddsAddForm.betV,'betV')" id="teamRight" placeholder="Enter betV"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="remark">ratioH：</label>
                <b-form-input type="text" v-model="oddsAddForm.ratioH" autocomplete="off" @change="judgeNum(oddsAddForm.ratioH,'ratioH')"  placeholder="Enter ratioH"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="remark">ratioV：</label>
                <b-form-input type="text" v-model="oddsAddForm.ratioV" autocomplete="off" @change="judgeNum(oddsAddForm.ratioV,'ratioV')"  placeholder="Enter ratioV"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="12">
              <b-form-group >
                <label for="categoryAdd">mlineType:</label>
                <b-form-select id="categoryAdd" v-model="oddsAddForm.mlineType" :plain="true" :options="mlineTypeOptions">
                  <template slot="first">
                    <option :value="''" disabled>Select mlineType</option>
                  </template>
                </b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
        </form>
      </b-card>
    </b-modal>
    <b-modal title="Edit Odds" centered v-model="oddsEditModal" @ok="setOddsEditFn()" ok-variant="success">
      <b-card class="mb-0">
        <form ref="oddsEditForm" method="post" :model="oddsEditForm" autoComplete="on">
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="idEdit">ID：</label>
                <b-form-input type="text" v-model="oddsEditForm.id" disabled id="oddsIdEdit"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="idEdit">betH：</label>
                <input class="form-control" :disabled="isBet" autocomplete="off" @change="judgeNum2(oddsEditForm.betH, 'betH')" type="text" v-model="oddsEditForm.betH" placeholder="Enter betH">
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="idEdit">betV：</label>
                <b-form-input type="text" v-model="oddsEditForm.betV" :disabled="isBet" autocomplete="off"  @change="judgeNum2(oddsEditForm.betV, 'betV')" placeholder="Enter betV"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="idEdit">ratioH：</label>
                <b-form-input type="text" v-model="oddsEditForm.ratioH" autocomplete="off" @change="judgeNum(oddsEditForm.ratioH, 'ratioH')" placeholder="Enter ratioH"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="idEdit">ratioV：</label>
                <b-form-input type="text" v-model="oddsEditForm.ratioV" autocomplete="off" @change="judgeNum(oddsEditForm.ratioV, 'ratioV')" placeholder="Enter ratioV"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </form>
      </b-card>
    </b-modal>
    <b-modal v-model="confirmRollBall" hide-header centered @ok="handleSetRollBall()">
      <p class="my-4">是否确认切换滚球？</p>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import Model from './modal.vue'
import {validatNum, validatNum3} from '../../model/validate'
export default {
  name: 'Operate',
  components: {
    Model
  },
  props: {},
  data () {
    return {
      openingMatchesForm: {
        leagueIds: [],
        date: '',
        rtype: 1
      },
      rtypeOptions: [
        { value: 1, text: '今日' },
        { value: 2, text: '早盘' },
        { value: 3, text: '滚球' }
      ],
      openingMatchesList: [],
      openLeagueModal: false,
      openOddsAddModal: false,
      oddsEditModal: false,
      isBet: false,
      matchSort: true,
      oddsAddForm: {
        matchId: '',
        betType: '',
        betH: '',
        betV: '',
        ratioH: '',
        ratioV: '',
        mlineType: ''
      },
      betTypeOptions: [
        { value: 0, text: '让分' },
        { value: 1, text: '大小' },
        { value: 2, text: '独赢' }
      ],
      mlineTypeOptions: [
        { value: 0, text: '1x2' },
        { value: 1, text: 'HDP' },
        { value: 2, text: 'OU' },
        { value: 2, text: 'OE' },
        { value: 2, text: 'OBT' }
      ],
      isUser: [],
      isRole: [],
      isNum: [],
      isNum2: [],
      oodsBetType: '',
      oddsEditForm: {
        id: '',
        betH: '',
        betV: '',
        ratioH: '',
        ratioV: ''
      },
      oldoddsEdit: {
        id: '',
        betH: '',
        betV: '',
        ratioH: '',
        ratioV: ''
      },
      pauseOddsForm: {
        oddId: '',
        status: ''
      },
      pauseMatchForm: {
        id: '',
        status: ''
      },
      ControlArr: [],
      getLeagueIdsArr: [],
      leagueIdsOptions: [],
      isRefresh: false,
      pauseAllInfo: {},
      pauseAllForm: {
        status: ''
      },
      btnDisable: false,
      timedRefresh: '',
      checkedD: false,
      confirmRollBall: false,
      inpSelect: {
        item: '',
        elt: '',
        sta: ''
      }
    }
  },
  created () {
    this.getEventHandicapListFn()
    this.getMatchValveInfoFn()
  },
  mounted () {
    // this.timedRefresh = setInterval(this.matchRefreshFn, 4000)
    let _self = this
    document.onkeydown = function (e) {
      if (!e) e = window.event
      if ((e.keyCode || e.which) === 13) {
        _self.handleUpdateBet()
      }
    }
  },
  // destroyed () {
  //   clearInterval(this.timedRefresh)
  // },
  computed: {},
  methods: {
    ...mapActions([ 'getEventHandicapListAjax', 'getLeagueIdsAjax', 'addEventHandicapAjax', 'editEventHandicapAjax', 'operatingEventHandicapAjax', 'operatingEventAjax', 'getMatchValveInfoAjax', 'setMatchValveInfoAjax', 'postSetLiveTypeS', 'postUpdateOddsByIdS', 'setTime' ]),
    ...mapMutations([ 'setMatchId' ]),
    handleSelectLeagueId (ck) {
      switch (ck) {
        case 'SA' :
          this.openingMatchesForm.leagueIds = this.leagueIdsOptions.map(arr => arr.value)
          break
        case 'DA' :
          this.checkedD = false
          this.openingMatchesForm.leagueIds = []
          break
        case 'CL' :
          this.openingMatchesForm.leagueIds = []
          this.openLeagueModal = false
          break
        case 'OK' :
          this.openLeagueModal = false
          this.openLeagueModalFn()
          break
      }
    },
    getEventHandicapListFn () {
      this.getEventHandicapListAjax(this.openingMatchesForm).then((data) => {
        if (data.length !== 0) {
          this.openingMatchesList = data
          data.forEach(arr => {
            arr.gameMatches.forEach(arr => {
              this.setTime(arr.matchTime).then(res => {
                arr.matchTime = res
              })
            })
          })
        }
        this.openingMatchesForm.leagueIds = []
      }).catch(err => {
        this.$notify({
          content: err,
          btn: 'close'
        })
      })
    },
    matchRefreshFn () {
      this.isRefresh = true
      this.getEventHandicapListFn()
      setTimeout(() => {
        this.isRefresh = false
      }, 3000)
    },
    getMatchValveInfoFn () {
      this.getMatchValveInfoAjax().then((data) => {
        this.pauseAllInfo = data
      }).catch(err => {
        this.$notify({
          content: err,
          btn: 'close'
        })
      })
    },
    setMatchValveInfoFn (status) {
      this.pauseAllForm = {
        status: status
      }
      this.setMatchValveInfoAjax(this.pauseAllForm).then((data) => {
        let msg
        if (status === 1) {
          msg = '赛事已全部暂停！'
        } else if (status === 3) {
          msg = '赛事已全部关盘！'
        }
        this.$notify({
          content: msg,
          btn: 'close'
        })
        this.getEventHandicapListFn()
        this.getMatchValveInfoFn()
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
          content: '盘口中' + name + '不能为空！',
          btn: 'close'
        })
      } else {
        if (validatNum(el)) {
          this.isNum.push(true)
        } else {
          this.isNum.push(false)
          this.$notify({
            content: '盘口中' + name + '只能为0或正数或带三位小数',
            btn: 'close'
          })
        }
      }
    },
    judgeNum2 (el, name) {
      // let elName = el.trim()
      let elName = el
      if (this.oddsAddForm.betType === 2) {
        this.isNum2.push(true)
        this.oddsAddForm.betH = ''
        this.oddsAddForm.betV = ''
      } else if (this.oodsBetType === '2') {
        this.isNum2.push(true)
        this.oddsEditForm.betH = ''
        this.oddsEditForm.betV = ''
      } else {
        if (elName.length === 0) {
          this.isNum2.push(false)
          this.$notify({
            content: '盘口中' + name + '不能为空！',
            btn: 'close'
          })
        } else {
          if (validatNum3(el)) {
            this.isNum2.push(true)
          } else {
            this.isNum2.push(false)
            this.$notify({
              content: '盘口中' + name + '只能为0或正负数！',
              btn: 'close'
            })
          }
        }
      }
    },
    judgeRole (el, user) {
      let userRole = el
      if (userRole !== '' && userRole !== null && userRole !== undefined) {
        this.isRole.push(true)
      } else {
        this.$notify({
          content: '请选择' + user + '！',
          btn: 'close'
        })
        this.isRole.push(false)
      }
    },
    openAddOddsModal (item) {
      this.oddsAddForm = {
        matchId: item.matchId,
        betType: '',
        betH: '',
        betV: '',
        ratioH: '',
        ratioV: '',
        mlineType: ''
      }
      this.openOddsAddModal = true
    },
    OddsAddFn () {
      this.isNum = []
      this.isNum2 = []
      this.isRole = []
      this.judgeRole(this.oddsAddForm.betType, 'betType')
      this.judgeNum2(this.oddsAddForm.betH, 'betH')
      this.judgeNum2(this.oddsAddForm.betV, 'betV')
      this.judgeNum(this.oddsAddForm.ratioH, 'ratioH')
      this.judgeNum(this.oddsAddForm.ratioV, 'ratioV')
      this.judgeRole(this.oddsAddForm.mlineType, 'mlineType')
      if ((this.isNum.indexOf(false) === -1) && (this.isNum2.indexOf(false) === -1) && (this.isRole.indexOf(false) === -1)) {
        if (this.oddsAddForm.betType === 2) {
          this.oddsAddForm.betH = ''
          this.oddsAddForm.betV = ''
        }
        this.addEventHandicapAjax(this.oddsAddForm).then((data) => {
          this.$notify({
            content: '盘口新增成功!',
            btn: 'close'
          })
          this.oddsAddForm = {
            matchId: '',
            betType: '',
            betH: '',
            betV: '',
            ratioH: '',
            ratioV: '',
            mlineType: ''
          }
          this.openOddsAddModal = false
          this.isNum = []
          this.isNum2 = []
          this.isRole = []
          this.getEventHandicapListFn()
        }).catch(err => {
          this.$notify({
            // content: err,
            content: '本赛事已有独赢盘口，不能再增添新独赢盘口',
            btn: 'close'
          })
        })
      } else {
        this.$notify({
          content: '盘口新增失败！',
          btn: 'close'
        })
      }
    },
    openSelectLeagueId () {
      // this.getModifyMatchesFn()
      this.isModal = true
    },
    okModalFn () {
      this.isModal = false
    },
    cancelModalFn () {
      this.isModal = false
    },
    openOddsEditFn (item) {
      this.oddsEditModal = true
      this.oodsBetType = item.betType
      if (item.betType === '2') {
        this.isBet = true
      } else {
        this.isBet = false
      }
      this.oddsEditForm = {
        id: item.id,
        betH: item.betH,
        betV: item.betV,
        ratioH: item.ratioH,
        ratioV: item.ratioV
      }
      this.oldoddsEdit = {
        id: item.id,
        betH: item.betH,
        betV: item.betV,
        ratioH: item.ratioH,
        ratioV: item.ratioV
      }
    },
    setOddsEditFn () {
      this.isNum = []
      this.isNum2 = []
      this.judgeNum2(this.oddsEditForm.betH, 'betH')
      this.judgeNum2(this.oddsEditForm.betV, 'betV')
      this.judgeNum(this.oddsEditForm.ratioH, 'ratioH')
      this.judgeNum(this.oddsEditForm.ratioV, 'ratioV')
      let oldObj = this.oldoddsEdit
      let newObj = this.oddsEditForm
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
          content: '未修改盘口信息！',
          btn: 'close'
        })
      } else {
        this.ControlArr = []
        if ((this.isNum2.indexOf(false) === -1) && (this.isNum.indexOf(false) === -1)) {
          this.editEventHandicapAjax(this.oddsEditForm).then((data) => {
            this.$notify({
              content: '盘口编辑成功！',
              btn: 'close'
            })
            this.oddsEditForm = {}
            this.matchesEdit = false
            this.oddsEditModal = false
            this.isNum = []
            this.isNum2 = []
            this.getEventHandicapListFn()
          }).catch(err => {
            this.$notify({
              content: err,
              btn: 'close'
            })
          })
        } else {
          this.$notify({
            content: '盘口编辑失败！',
            btn: 'close'
          })
        }
      }
    },
    openLeagueIdsModal () {
      this.openLeagueModal = true
      this.getModifyMatchesFn()
    },
    openLeagueModalFn () {
      this.openLeagueModal = false
      this.getEventHandicapListFn()
    },
    openOddsFn (id, status) {
      this.pauseOddsForm = {
        oddId: id,
        status: status
      }
      this.btnDisable = true
      this.operatingEventHandicapAjax(this.pauseOddsForm).then((data) => {
        this.btnDisable = false
        let msg = ''
        if (status === 0) {
          msg = '盘口竞猜已打开！'
        } else if (status === 1) {
          msg = '盘口竞猜已暂停！'
        } else if (status === 2) {
          msg = '盘口竞猜已取消！'
        } else if (status === 3) {
          msg = '盘口竞猜已关闭！'
        } else {
          msg = '出现盘口未知状态！'
        }
        this.$notify({
          content: msg,
          btn: 'close'
        })
        this.pauseOddsForm = {
          oddId: '',
          status: ''
        }
        this.getEventHandicapListFn()
      }).catch(err => {
        this.$notify({
          content: err,
          btn: 'close'
        })
      })
    },
    openMatchFn (id, status) {
      this.pauseMatchForm = {
        id: id,
        status: status
      }
      this.btnDisable = true
      this.operatingEventAjax(this.pauseMatchForm).then((data) => {
        this.btnDisable = false
        let msg = ''
        if (status === 0) {
          msg = '赛事竞猜已打开！'
        } else if (status === 1) {
          msg = '赛事竞猜已暂停！'
        } else if (status === 2) {
          msg = '赛事竞猜已取消！'
        } else if (status === 3) {
          msg = '赛事竞猜已关闭！'
        } else {
          msg = '出现赛事未知状态！'
        }
        this.$notify({
          content: msg,
          btn: 'close'
        })
        this.pauseMatchForm = {
          id: '',
          status: ''
        }
        this.getEventHandicapListFn()
      }).catch(err => {
        this.$notify({
          content: err,
          btn: 'close'
        })
      })
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
    handleSetRollBall (num, mid) {
      if (num || mid) {
        this.handleSetRollBall.mid = mid
        this.handleSetRollBall.num = num
        this.confirmRollBall = true
        return
      }
      let data = {
        matchId: this.handleSetRollBall.mid,
        liveType: this.handleSetRollBall.num === 0 ? 1 : 0
      }
      this.postSetLiveTypeS(data).then(res => {
        if (res && res === 'success') {
          this.getEventHandicapListFn()
          this.$notify({
            content: '修改成功',
            btn: 'close'
          })
        } else {
          this.$notify({
            content: '修改失败',
            btn: 'close'
          })
        }
      })
    },
    handleClickToVolume (item) {
      this.$router.push({
        name: 'Volume',
        params: {
          code: item
        }
      })
      // this.setMatchId(item)
      // window.open('localhost:8080/operate/volume')
    },
    handleClickShowInp (e, item, dir) {
      e.target.style.display = 'none'
      e.target.nextElementSibling.style.display = 'inline-block'
      e.target.nextElementSibling.focus()
      this.inpSelect.item = item
      this.inpSelect.elt = e.target
      this.inpSelect.sta = dir
    },
    handleUpdateBet () {
      let data = {
        oddsId: this.inpSelect.item.id
      }
      if (this.inpSelect.sta === 'LF') {
        data.odds_h = this.inpSelect.item.ratioH
      } else {
        data.odds_v = this.inpSelect.item.ratioV
      }
      this.postUpdateOddsByIdS(data).then(res => {
        if (res) {
          this.inpSelect.elt.style.display = 'inline-block'
          this.inpSelect.elt.nextElementSibling.style.display = 'none'
          this.inpSelect.item.ratioH = res.ratio_h
          this.inpSelect.item.ratioV = res.ratio_v
        }
      })
    }
  }
}
</script>
S
<style lang="scss" scoped>
  .operateContent{
    width: 100%;
    height: auto;
    overflow: hidden;
    .card-header .btn-sm {
      margin-top: 0;
    }
    .btn-right1 {
      position: absolute;
      top: 0.75rem;
      right: 1.25rem;
    }
    .btn-right2 {
      position: absolute;
      top: 0.75rem;
      right: 6.6rem;
      right: 105px;
    }
    .btn-right3 {
      position: absolute;
      top: 0.75rem;
      right: 12rem;
      right: 193px;
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
    .operateCard{
      .card-header{
        text-align: left;
        padding: 0.25rem 1rem;
        i.fa{
          color: #ffc107;
          margin-right: 5px;
        }
        .matchRefresh{
          cursor: pointer;
          i.fa{
            color: #000d4d;
            margin-right: 0px;
            &.action,&:hover{
              color: #ffc107;
            }
          }
        }
      }
      .card-body{
        padding: 0px !important;
        .teamTitle{
          width: 100%;
          height: auto;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          cursor: pointer;
          text-align: left;
          padding-left: 5px;
          &:hover{
            color: #20A8D8;
          }
        }
      }
    }
  }
  .card-blockquote>div:nth-child(2n-1){
    background-color: #fff;
  }
  .modal-content{
    border-radius: 8px !important;
  }
  .sort-table{
    width: 100%;
    text-align: center;
  }
  .sort-table{
    border: 1px solid #c2cfd6
  }
  .sort-table tr th,.sort-table tr td{
    border-right: 1px solid #c2cfd6;
    border-bottom: 1px solid #c2cfd6;
  }
  .vdatetime-input{
    width: 100%;
    height: 28px;
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
  .line-row{
    height: 45px;
    width: 100%;
  }
  .line-row-pad{
    padding-top: 2px;
  }
  .line-row-pads{
    padding-top: 12px;
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
  .run-ball{
    vertical-align: middle;
    margin-left: 5px;
    width: 15px;
    height: 15px;
  }
  .btn-vol{
    cursor: pointer;
  }
  .from-s,.from-ss {
    display: none;
    margin-top: 2px;
    height: 20px;
    font-size: 12px;
    padding: 0;
  }
  .from-ss {
    width: 50%;
  }
  .bet-weight {
    font-weight: bold;
  }
</style>
