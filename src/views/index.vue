<template>
  <div class="animated fadeIn">
    <p class="text-info">Hello World</p>
    <p>{{ fullName }} ==> {{count}}</p>
    <p>{{token}}</p>
    <button @click="notify()">点击弹框</button>
    <div class="tabsContent">
      <Tabs :value="filter" @change="handleChangeTab">
        <Tab label="tab1" index="1">
          <div>tab1 content</div>
        </Tab>
        <Tab index="2">
          <div slot="label">tab2</div>
          <div>tab2 content</div>
        </Tab>
        <Tab label="tab3" index="3">
          <div>tab3 content</div>
        </Tab>
      </Tabs>
    </div>
    <div class="animated fadeIn">
      <b-row>
        <b-col sm="6">
          <b-card>
            <div slot="header">
              <strong>Credit Card</strong> <small>Form</small>
            </div>
            <form ref="infoForm" :model="infoForm">
              <b-row>
                <b-col sm="12">
                  <b-form-group>
                    <label for="name">Name</label>
                    <b-form-input type="text" v-model="infoForm.user" id="name" placeholder="Enter your name"></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="12">
                  <b-form-group>
                    <label for="ccnumber">Credit Card Number</label>
                    <b-form-input type="text" v-model="infoForm.num" id="ccnumber" placeholder="0000 0000 0000 0000"></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <b-form-group >
                    <label for="month1">Month</label>
                    <b-form-select v-model="infoForm.mon" id="month1"
                                   :plain="true"
                                   :options="[1,2,3,4,5,6,7,8,9,10,11,12]">
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group>
                    <label for="year1">Year</label>
                    <b-form-select v-model="infoForm.year" id="year1"
                                   :plain="true"
                                   :options="[2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025]">
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group>
                    <label for="cvv">CVV/CVC</label>
                    <b-form-input type="text" v-model="infoForm.cvv" id="cvv" placeholder="123"></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <div slot="footer">
                <b-button type="button" @click="setInfo" size="sm" variant="success"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
                <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
              </div>
            </form>
          </b-card>
        </b-col>
        <b-col sm="6">
          <b-card>
            <div slot="header">
              <strong>Company</strong> <small>Form</small>
            </div>
            <b-form-group>
              <label for="company">Company</label>
              <b-form-input type="text" id="company" placeholder="Enter your company name"></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="vat">VAT</label>
              <b-form-input type="text" id="vat" placeholder="PL1234567890"></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="street">Street</label>
              <b-form-input type="text" id="street" placeholder="Enter street name"></b-form-input>
            </b-form-group>
            <b-row>
              <b-col sm="8">
                <b-form-group>
                  <label for="city">City</label>
                  <b-form-input type="text" id="city" placeholder="Enter your city"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group>
                  <label for="postal-code">Postal Code</label>
                  <b-form-input type="text" id="postal-code" placeholder="Postal Code"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-form-group>
              <label for="country">Country</label>
              <b-form-input type="text" id="country" placeholder="Country name"></b-form-input>
            </b-form-group>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <b-card>
            <div slot="header">
              <strong>Basic Form</strong> Elements
            </div>
            <b-form-group
              description="Let us know your full name."
              label="Enter your name"
              label-for="basicName"
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="basicName" type="text"></b-form-input>
            </b-form-group>
            <b-form-group
              label="Static"
              label-for="basicStatic"
              :label-cols="3"
              :horizontal="true">
              <b-form-input plaintext id="basicStatic" type="text" value="Username"></b-form-input>
            </b-form-group>
            <b-form-group
              description="This is a help text"
              label="Text Input"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="basicText" type="text" placeholder="Text"></b-form-input>
            </b-form-group>
            <b-form-group
              label="Date" label-for="date"
              :label-cols="3"
              :horizontal="true">
              <b-form-input type="date" id="date"></b-form-input>
            </b-form-group>
            <b-form-group
              description="Please enter your email"
              label="Email Input"
              label-for="basicEmail"
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="basicEmail" type="email" placeholder="Enter your email"></b-form-input>
            </b-form-group>
            <b-form-group
              description="Please enter a complex password"
              label="Password Input"
              label-for="basicPassword"
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="basicPassword" type="password" placeholder="Enter your password"></b-form-input>
            </b-form-group>
            <b-form-group
              label="Disabled Input"
              label-for="basicInputDisabled"
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="basicInputDisabled" type="text" :disabled="true" placeholder="Disabled"></b-form-input>
            </b-form-group>
            <b-form-group
              label="Textarea"
              label-for="basicTextarea"
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="basicTextarea" :textarea="true" :rows="9" placeholder="Content.."></b-form-input>
            </b-form-group>
            <b-form-group
              label="Select"
              label-for="basicSelect"
              :label-cols="3"
              :horizontal="true">
              <b-form-select id="basicSelect"
                             :plain="true"
                             :options="['Please select','Option 1', 'Option 2', 'Option 3']"
                             value="Please select">
              </b-form-select>
            </b-form-group>
            <b-form-group
              label="Select large"
              label-for="basicSelectLg"
              :label-cols="3"
              :horizontal="true">
              <b-form-select id="basicSelectLg"
                             size="lg"
                             :plain="true"
                             :options="['Please select','Option 1', 'Option 2', 'Option 3']"
                             value="Please select">
              </b-form-select>
            </b-form-group>
            <b-form-group
              label="Select small"
              label-for="basicSelectSm"
              :label-cols="3"
              :horizontal="true">
              <b-form-select id="basicSelectSm"
                             size="sm"
                             :plain="true"
                             :options="['Please select','Option 1', 'Option 2', 'Option 3']"
                             value="Please select">
              </b-form-select>
            </b-form-group>
            <b-form-group
              label="Disabled select"
              label-for="basicSelectDisabled"
              :label-cols="3"
              :horizontal="true">
              <b-form-select id="basicSelectDisabled"
                             :plain="true"
                             :options="['Please select','Option 1', 'Option 2', 'Option 3']"
                             :disabled="true"
                             value="Please select">
              </b-form-select>
            </b-form-group>
            <b-form-group
              label="Select"
              label-for="basicMultiSelect"
              :label-cols="3"
              :horizontal="true">
              <b-form-select id="basicMultiSelect"
                             :plain="true"
                             :multiple="true"
                             :options="[
                {
                  text: 'Please select some item',
                  value: null
                },
                {
                  text: 'This is First option',
                  value: 'a'
                }, {
                  text: 'Default Selected Option',
                  value: 'b'
                }, {
                  text: 'This is another option',
                  value: 'c'
                }, {
                  text: 'This one is disabled',
                  value: 'd',
                  disabled: true
                }]"
                             :value="[null,'c']">
              </b-form-select>
            </b-form-group>
            <b-form-group
              label="Radios"
              label-for="basicRadios"
              :label-cols="3"
              :horizontal="true">
              <b-form-radio-group id="basicRadios"
                                  :plain="true"
                                  :options="[
                {text: 'Option 1 ',value: '1'},
                {text: 'Option 2 ',value: '2'},
                {text: 'Option 3 ',value: '3'}
              ]"
                                  checked="2"
                                  stacked>
              </b-form-radio-group>
            </b-form-group>
            <b-form-group
              label="Inline radios"
              label-for="basicInlineRadios"
              :label-cols="3"
              :horizontal="true">
              <b-form-radio-group id="basicInlineRadios"
                                  :plain="true"
                                  :options="[
                {text: 'Option 1 ',value: '1'},
                {text: 'Option 2 ',value: '2'},
                {text: 'Option 3 ',value: '3'}
              ]"
                                  :checked="3">
              </b-form-radio-group>
            </b-form-group>

            <b-form-group
              label="Checkboxes"
              label-for="basicCheckboxes"
              :label-cols="3"
              horizontal>
              <b-form-checkbox-group stacked id="basicCheckboxes" name="Checkboxes" :plain="true" :checked="[2,3]">
                <b-form-checkbox value="1">Option 1</b-form-checkbox>
                <b-form-checkbox value="2">Option 2</b-form-checkbox>
                <b-form-checkbox value="3">Option 3</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
            <b-form-group
              label="Inline checkboxes"
              label-for="basicInlineCheckboxes"
              :label-cols="3"
              :horizontal="true">
              <b-form-checkbox-group id="basicInlineCheckboxes" name="InlineCheckboxes" :plain="true" :checked="[1,3]">
                <b-form-checkbox :plain="true" value="1">Option 1</b-form-checkbox>
                <b-form-checkbox :plain="true" value="2">Option 2</b-form-checkbox>
                <b-form-checkbox :plain="true" value="3">Option 3</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
            <!--custom controls - radios/checkboxes - temporary fix-->
            <b-form-group
              label="Radios - custom"
              label-for="basicRadiosCustom"
              :label-cols="3"
              :horizontal="true">
              <b-form-radio-group
                id="basicRadiosCustom"
                value="1"
                stacked>
                <div class="custom-control custom-radio">
                  <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" value="1">
                  <label class="custom-control-label" for="customRadio1">Option 1</label>
                </div>
                <div class="custom-control custom-radio">
                  <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" value="2" checked>
                  <label class="custom-control-label" for="customRadio2">Option 2</label>
                </div>
                <div class="custom-control custom-radio">
                  <input type="radio" id="customRadio3" name="customRadio" class="custom-control-input" value="3">
                  <label class="custom-control-label" for="customRadio3">Option 3</label>
                </div>
              </b-form-radio-group>
            </b-form-group>
            <b-form-group
              label="Inline radios - custom"
              label-for="basicCustomRadios1"
              :label-cols="3"
              :horizontal="true">
              <b-form-radio-group
                id="basicCustomRadios1"
                name="customRadioInline1">
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input" value="1">
                  <label class="custom-control-label" for="customRadioInline1">Option 1</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" value="2" checked>
                  <label class="custom-control-label" for="customRadioInline2">Option 2</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="customRadioInline3" name="customRadioInline1" class="custom-control-input" value="3">
                  <label class="custom-control-label" for="customRadioInline3">Option 3</label>
                </div>
              </b-form-radio-group>
            </b-form-group>
            <b-form-group
              label="Checkboxes - custom"
              label-for="basicCustomCheckboxes"
              :label-cols="3"
              :horizontal="true">
              <b-form-checkbox-group stacked id="basicCustomCheckboxes">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="customChk1" value="1" checked>
                  <label class="custom-control-label" for="customChk1">Option 1</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="customChk2" value="2">
                  <label class="custom-control-label" for="customChk2">Option 2</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="customChk3" value="3">
                  <label class="custom-control-label" for="customChk3">Option 3</label>
                </div>
              </b-form-checkbox-group>
            </b-form-group>
            <b-form-group
              label="Inline checkboxes - custom"
              label-for="basicInlineCustomCheckboxes"
              :label-cols="3"
              :horizontal="true">
              <b-form-checkbox-group id="basicInlineCustomCheckboxes">
                <div class="custom-control custom-checkbox custom-control-inline">
                  <input type="checkbox" class="custom-control-input" id="customInChk1" value="1">
                  <label class="custom-control-label" for="customInChk1">Option 1</label>
                </div>
                <div class="custom-control custom-checkbox custom-control-inline">
                  <input type="checkbox" class="custom-control-input" id="customInChk2" value="2" checked>
                  <label class="custom-control-label" for="customInChk2">Option 2</label>
                </div>
                <div class="custom-control custom-checkbox custom-control-inline">
                  <input type="checkbox" class="custom-control-input" id="customInChk3" value="3">
                  <label class="custom-control-label" for="customInChk3">Option 3</label>
                </div>
              </b-form-checkbox-group>
            </b-form-group>
            <b-form-group
              label="File input"
              label-for="fileInput"
              :label-cols="3"
              :horizontal="true">
              <b-form-file id="fileInput" :plain="true"></b-form-file>
            </b-form-group>
            <b-form-group
              label="Multiple file input"
              label-for="fileInputMulti"
              :label-cols="3"
              :horizontal="true">
              <b-form-file id="fileInputMulti" :plain="true" :multiple="true"></b-form-file>
            </b-form-group>
            <div slot="footer">
              <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
              <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
            </div>
          </b-card>
          <b-card>
            <div slot="header">
              <strong>Inline</strong> Form
            </div>
            <!-- Bootstrap Vue has some problems with Inline forms that's why we use some standard bootstrap classes -->
            <b-form inline>
              <label class="mr-sm-2" for="inlineInput1">Name: </label>
              <b-input id="inlineInput1" type="text" placeholder="Jane Doe"></b-input>
              <label class="mx-sm-2" for="inlineInput2">Email: </label>
              <b-input id="inlineInput2" type="email" placeholder="jane.doe@example.com"></b-input>
            </b-form>
            <div slot="footer">
              <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
              <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
            </div>
          </b-card>
        </b-col>
        <b-col md="6">
          <b-card>
            <div slot="header">
              <strong>Horizontal</strong> Form
            </div>
            <b-form-group
              label="Email"
              label-for="horizEmail"
              description="Please enter your email."
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="horizEmail" type="email" placeholder="Enter Email.."></b-form-input>
            </b-form-group>
            <b-form-group
              label="Password"
              label-for="horizPass"
              description="Please enter your password."
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="horizPass" type="password" placeholder="Enter Password.."></b-form-input>
            </b-form-group>
            <div slot="footer">
              <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
              <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
            </div>
          </b-card>
          <b-card>
            <div slot="header">
              <strong>Normal</strong> Form
            </div>
            <b-form-group validated
                          label="Email"
                          label-for="normalEmail"
                          description="Please enter your email.">
              <b-form-input id="normalEmail" type="email" placeholder="Enter Email.." required></b-form-input>
            </b-form-group>
            <b-form-group validated
                          label="Password"
                          label-for="normalPass"
                          description="Please enter your password.">
              <b-form-input id="normalPass" type="password" placeholder="Enter Password.." required></b-form-input>
            </b-form-group>
            <div slot="footer">
              <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
              <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
            </div>
          </b-card>
          <b-card no-body :no-block="true">
            <div slot="header">
              Input <strong>Grid</strong>
            </div>
            <b-card-body>
              <b-row class="form-group">
                <b-col sm="3">
                  <b-form-input type="text" placeholder=".col-sm-3"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="form-group">
                <b-col sm="4">
                  <b-form-input type="text" placeholder=".col-sm-4"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="form-group">
                <b-col sm="5">
                  <b-form-input type="text" placeholder=".col-sm-5"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="form-group">
                <b-col sm="6">
                  <b-form-input type="text" placeholder=".col-sm-6"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="form-group">
                <b-col sm="7">
                  <b-form-input type="text" placeholder=".col-sm-7"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="form-group">
                <b-col sm="8">
                  <b-form-input type="text" placeholder=".col-sm-8"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="form-group">
                <b-col sm="9">
                  <b-form-input type="text" placeholder=".col-sm-9"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="form-group">
                <b-col sm="10">
                  <b-form-input type="text" placeholder=".col-sm-10"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="form-group">
                <b-col sm="11">
                  <b-form-input type="text" placeholder=".col-sm-11"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="form-group">
                <b-col sm="12">
                  <b-form-input type="text" placeholder=".col-sm-12"></b-form-input>
                </b-col>
              </b-row>
            </b-card-body>
            <div slot="footer">
              <b-button type="submit" size="sm" variant="primary"><i class="fa fa-user"></i> Login</b-button>
              <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
            </div>
          </b-card>
          <b-card>
            <div slot="header">
              Input <strong>Sizes</strong>
            </div>
            <b-form-group
              label="Small input"
              label-for="smInput"
              label-size="sm"
              :label-cols="5"
              :horizontal="true">
              <b-form-input id="smInput" type="text" size="sm" placeholder="size='sm'"></b-form-input>
            </b-form-group>
            <b-form-group
              label="Default input"
              label-for="defaultInput"
              :label-cols="5"
              :horizontal="true">
              <b-form-input  id="defaultInput" type="text" placeholder="normal"></b-form-input>
            </b-form-group>
            <b-form-group
              label="Large input"
              label-for="lgInput"
              label-size="lg"
              :label-cols="5"
              :horizontal="true">
              <b-form-input id="lgInput" type="text" size="lg" placeholder="size='lg'"></b-form-input>
            </b-form-group>
            <div slot="footer">
              <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
              <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="6">
          <b-card no-body :no-block="true">
            <div slot="header">
              <strong>Validation feedback</strong> Form
            </div>
            <b-card-body>
              <b-form-group>
                <label class="col-form-label" for="inputIsValid">Input is valid</label>
                <input type="text" class="form-control is-valid" id="inputIsValid">
                <b-form-valid-feedback>
                  Input is valid.
                </b-form-valid-feedback>
              </b-form-group>
              <b-form-group>
                <label class="col-form-label" for="inputIsInvalid">Input is invalid</label>
                <input type="text" class="form-control is-invalid" id="inputIsInvalid">
                <b-form-invalid-feedback>
                  Please provide a valid information.
                </b-form-invalid-feedback>
              </b-form-group>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col sm="12" md="6">
          <b-card no-body :no-block="true">
            <div slot="header">
              <strong>Validation feedback</strong> Form
            </div>
            <b-card-body>
              <b-form validated novalidate>
                <b-form-group label-for="inputSuccess2" label="Non-required input">
                  <b-form-input type="text" class="form-control-success" id="inputSuccess2"></b-form-input>
                  <b-form-valid-feedback>
                    Input is not required.
                  </b-form-valid-feedback>
                </b-form-group>
                <b-form-group label-for="inputError2" label="Required input">
                  <b-form-input type="text" class="form-control-warning" id="inputError2" required></b-form-input>
                  <b-form-valid-feedback>
                    Input provided.
                  </b-form-valid-feedback>
                  <b-form-invalid-feedback>
                    Please provide a required input.
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="4">
          <b-card>
            <div slot="header">
              <strong>Icon/Text</strong> Groups
            </div>
            <form :model="loginForm" ref="loginForm">
              <b-form-group>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" v-model="loginForm.user"  placeholder="Username"></b-form-input>
                </b-input-group>
              </b-form-group>
              <b-form-group>
                <b-input-group>
                  <b-form-input type="email" v-model="loginForm.email" placeholder="Email"></b-form-input>
                  <b-input-group-append><b-input-group-text><i class="fa fa-envelope-o"></i></b-input-group-text></b-input-group-append>
                </b-input-group>
              </b-form-group>
              <b-form-group>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text><i class="fa fa-euro"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" v-model="loginForm.num" placeholder="ex. $1.000.000"></b-form-input>
                  <b-input-group-append><b-input-group-text>.00</b-input-group-text></b-input-group-append>
                </b-input-group>
              </b-form-group>
              <div slot="footer">
                <b-button type="button" @click="getSubmit" size="sm" variant="success"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
                <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
              </div>
            </form>
          </b-card>
        </b-col>
        <b-col sm="4">
          <b-card>
            <div slot="header">
              <strong>Buttons</strong> Groups
            </div>
            <b-form-group>
              <b-input-group>
                <!-- Attach Left button -->
                <b-input-group-prepend>
                  <b-button variant="primary">
                    <i class="fa fa-search"></i> Search
                  </b-button>
                </b-input-group-prepend>
                <b-form-input type="text" placeholder="Username"></b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <b-form-input type="email" placeholder="Email"></b-form-input>
                <!-- Attach Right button -->
                <b-input-group-append>
                  <b-button variant="primary">Submit</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <!-- Attach Left button -->
                <b-input-group-prepend>
                  <b-button variant="primary"><i class="fa fa-facebook"></i></b-button>
                </b-input-group-prepend>
                <b-form-input type="email" placeholder="Email"></b-form-input>
                <!-- Attach Left button -->
                <b-input-group-append>
                  <b-button variant="primary"><i class="fa fa-twitter"></i></b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
            <div slot="footer">
              <b-button type="submit" size="sm" variant="success"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
              <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
            </div>
          </b-card>
        </b-col>
        <b-col sm="4">
          <b-card>
            <div slot="header">
              <strong>Dropdowns</strong> Groups
            </div>
            <b-form-group>
              <b-input-group>
                <!-- Attach Left button -->
                <b-input-group-prepend>
                  <b-dropdown text="Action" variant="primary">
                    <b-dropdown-item>Action</b-dropdown-item>
                    <b-dropdown-item>Another action</b-dropdown-item>
                    <b-dropdown-item>Something else here...</b-dropdown-item>
                    <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                  </b-dropdown>
                </b-input-group-prepend>
                <b-form-input placeholder="Username"></b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <b-form-input placeholder="Email"></b-form-input>
                <!-- Attach Right button -->
                <b-input-group-append>
                  <b-dropdown text="Action" variant="primary" right>
                    <b-dropdown-item>Action</b-dropdown-item>
                    <b-dropdown-item>Another action</b-dropdown-item>
                    <b-dropdown-item>Something else here...</b-dropdown-item>
                    <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                  </b-dropdown>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <!-- Attach Left button -->
                <b-input-group-prepend>
                  <b-dropdown text="Split" variant="primary" split>
                    <b-dropdown-item href="#">Action</b-dropdown-item>
                    <b-dropdown-item href="#">Another action</b-dropdown-item>
                    <b-dropdown-item href="#">Something else here...</b-dropdown-item>
                    <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                  </b-dropdown>
                </b-input-group-prepend>
                <b-form-input placeholder="..."></b-form-input>
                <!-- Attach Right button -->
                <b-input-group-append>
                  <b-dropdown text="Action" variant="primary" right>
                    <b-dropdown-item>Action</b-dropdown-item>
                    <b-dropdown-item>Another action</b-dropdown-item>
                    <b-dropdown-item>Something else here...</b-dropdown-item>
                    <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                  </b-dropdown>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
            <div slot="footer">
              <b-button type="submit" size="sm" variant="success"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
              <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <b-card>
            <div slot="header">
              Use the grid for big devices! <small><code>.col-lg-*</code> <code>.col-md-*</code> <code>.col-sm-*</code></small>
            </div>
            <b-row class="form-group">
              <b-col md="8">
                <b-form-input type="text" placeholder=".col-md-8"></b-form-input>
              </b-col>
              <b-col md="4">
                <b-form-input type="text" placeholder=".col-md-4"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="form-group">
              <b-col md="7">
                <b-form-input type="text" placeholder=".col-md-7"></b-form-input>
              </b-col>
              <b-col md="5">
                <b-form-input type="text" placeholder=".col-md-5"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="form-group">
              <b-col md="6">
                <b-form-input type="text" placeholder=".col-md-6"></b-form-input>
              </b-col>
              <b-col md="6">
                <b-form-input type="text" placeholder=".col-md-6"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="form-group">
              <b-col md="5">
                <b-form-input type="text" placeholder=".col-md-5"></b-form-input>
              </b-col>
              <b-col md="7">
                <b-form-input type="text" placeholder=".col-md-7"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="form-group">
              <b-col md="4">
                <b-form-input type="text" placeholder=".col-md-4"></b-form-input>
              </b-col>
              <b-col md="8">
                <b-form-input type="text" placeholder=".col-md-8"></b-form-input>
              </b-col>
            </b-row>
            <div slot="footer">
              <b-button type="submit" size="sm" variant="primary">Action</b-button>
              <b-button type="button" size="sm" variant="danger">Action</b-button>
              <b-button type="button" class="btn btn-sm btn-warning">Action</b-button>
              <b-button type="button" class="btn btn-sm btn-info">Action</b-button>
              <b-button type="button" size="sm" variant="success">Action</b-button>
            </div>
          </b-card>
        </b-col>
        <b-col md="6">
          <b-card>
            <div slot="header">
              Input Grid for small devices! <small> <code>.col-*</code></small>
            </div>
            <b-row class="form-group">
              <b-col cols="4">
                <b-form-input type="text" placeholder=".col-4"></b-form-input>
              </b-col>
              <b-col cols="8">
                <b-form-input type="text" placeholder=".col-8"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="form-group">
              <b-col cols="5">
                <b-form-input type="text" placeholder=".col-5"></b-form-input>
              </b-col>
              <b-col cols="7">
                <b-form-input type="text" placeholder=".col-7"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="form-group">
              <b-col cols="6">
                <b-form-input type="text" placeholder=".col-6"></b-form-input>
              </b-col>
              <b-col cols="6">
                <b-form-input type="text" placeholder=".col-6"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="form-group">
              <b-col cols="7">
                <b-form-input type="text" placeholder=".col-5"></b-form-input>
              </b-col>
              <b-col cols="5">
                <b-form-input type="text" placeholder=".col-5"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="form-group">
              <b-col cols="8">
                <b-form-input type="text" placeholder=".col-8"></b-form-input>
              </b-col>
              <b-col cols="4">
                <b-form-input type="text" placeholder=".col-4"></b-form-input>
              </b-col>
            </b-row>
            <div slot="footer">
              <b-button type="submit" size="sm" variant="primary">Action</b-button>
              <b-button type="button" size="sm" variant="danger">Action</b-button>
              <b-button type="button" class="btn btn-sm btn-warning">Action</b-button>
              <b-button type="button" class="btn btn-sm btn-info">Action</b-button>
              <b-button type="button" size="sm" variant="success">Action</b-button>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="4">
          <b-card>
            <div slot="header">
              Example Form
            </div>
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend><b-input-group-text>Username</b-input-group-text></b-input-group-prepend>
                <b-form-input type="text"></b-form-input>
                <b-input-group-append><b-input-group-text><i class="fa fa-user"></i></b-input-group-text></b-input-group-append>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend><b-input-group-text>Email</b-input-group-text></b-input-group-prepend>
                <b-form-input type="email"></b-form-input>
                <b-input-group-append><b-input-group-text><i class="fa fa-envelope"></i></b-input-group-text></b-input-group-append>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend><b-input-group-text>Password</b-input-group-text></b-input-group-prepend>
                <b-form-input type="password"></b-form-input>
                <b-input-group-append><b-input-group-text><i class="fa fa-asterisk"></i></b-input-group-text></b-input-group-append>
              </b-input-group>
            </b-form-group>
            <div class="form-group form-actions">
              <b-button type="submit" size="sm" variant="primary">Submit</b-button>
            </div>
          </b-card>
        </b-col>
        <b-col sm="4">
          <b-card>
            <div slot="header">
              Example Form
            </div>
            <b-form-group>
              <b-input-group>
                <b-form-input type="text" placeholder="Username"></b-form-input>
                <b-input-group-append><b-input-group-text><i class="fa fa-user"></i></b-input-group-text></b-input-group-append>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <b-form-input type="email" placeholder="Email"></b-form-input>
                <b-input-group-append><b-input-group-text><i class="fa fa-envelope"></i></b-input-group-text></b-input-group-append>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <b-form-input type="password" placeholder="Password"></b-form-input>
                <b-input-group-append><b-input-group-text><i class="fa fa-asterisk"></i></b-input-group-text></b-input-group-append>
              </b-input-group>
            </b-form-group>
            <div class="form-group form-actions">
              <b-button type="submit" class="btn btn-sm btn-secondary">Submit</b-button>
            </div>
          </b-card>
        </b-col>
        <b-col sm="4">
          <b-card>
            <div slot="header">
              Example Form
            </div>
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                </b-input-group-prepend>
                <b-form-input type="text" placeholder="Username"></b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text><i class="fa fa-envelope"></i></b-input-group-text>
                </b-input-group-prepend>
                <b-form-input type="email" placeholder="Email"></b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text><i class="fa fa-asterisk"></i></b-input-group-text>
                </b-input-group-prepend>
                <b-form-input type="password" placeholder="Password"></b-form-input>
              </b-input-group>
            </b-form-group>
            <div class="form-group form-actions">
              <b-button type="submit" size="sm" variant="success">Submit</b-button>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12">
          <b-card no-body>
            <div slot="header">
              <i class="fa fa-edit"></i> Form Elements
              <div class="card-actions">
                <a href="#" class="btn btn-setting"><i class="icon-settings"></i></a>
                <b-btn class="btn btn-minimize" v-b-toggle.collapse1><i class="icon-arrow-up"></i></b-btn>
                <a href="#" class="btn btn-close"><i class="icon-close"></i></a>
              </div>
            </div>
            <b-collapse id="collapse1" visible>
              <b-card-body>
                <b-form-group label="Prepended text" label-for="elementsEmail" description="Here's some help text">
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text>@</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input id="elementsEmail" type="email"></b-form-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group label="Appended text" label-for="elementsAppend" description="Here's some help text">
                  <b-input-group>
                    <b-form-input id="elementsAppend" type="text"></b-form-input>
                    <b-input-group-append><b-input-group-text>.00</b-input-group-text></b-input-group-append>
                  </b-input-group>
                </b-form-group>
                <b-form-group label="Append and prepend" label-for="elementsPrependAppend" description="Here's some help text">
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text>$</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input id="elementsPrependAppend" type="text"></b-form-input>
                    <b-input-group-append><b-input-group-text>.00</b-input-group-text></b-input-group-append>
                  </b-input-group>
                </b-form-group>
                <b-form-group label="Append with button" label-for="elementsAppendButton" description="Here's some help text">
                  <b-input-group>
                    <b-form-input id="elementsAppendButton" type="text"></b-form-input>
                    <b-input-group-append>
                      <b-button variant="primary">Go!</b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
                <b-form-group label="Two-buttons append" label-for="elementsTwoButtons">
                  <b-input-group>
                    <b-form-input id="elementsTwoButtons" type="text"></b-form-input>
                    <b-input-group-append>
                      <b-button variant="primary">Search</b-button>
                      <b-button variant="danger">Options</b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
                <div class="form-actions">
                  <b-button type="submit" variant="primary">Save changes</b-button>
                  <b-button type="button" variant="secondary">Cancel</b-button>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <b-card>
            <div slot="header">
              <strong>Options</strong>
            </div>
            <!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
            <b-button variant="primary">Primary</b-button>
            <!-- Secondary, outline button -->
            <b-button variant="secondary">Secondary</b-button>
            <!-- Indicates a successful or positive action -->
            <b-button variant="success">Success</b-button>
            <!-- Indicates caution should be taken with this action -->
            <b-button variant="warning">Warning</b-button>
            <!-- Indicates a dangerous or potentially negative action -->
            <b-button variant="danger">Danger</b-button>
            <!-- Deemphasize a button by making it look like a link while maintaining button behavior -->
            <b-button variant="link">Link</b-button>
          </b-card>
          <b-card>
            <div slot="header">
              <strong>With Icons</strong>
            </div>
            <b-button variant="primary"><i class="fa fa-star"></i>&nbsp; Primary</b-button>
            <b-button variant="secondary"><i class="fa fa-lightbulb-o"></i>&nbsp; Secondary</b-button>
            <b-button variant="success"><i class="fa fa-magic"></i>&nbsp; Success</b-button>
            <b-button variant="warning"><i class="fa fa-map-marker"></i>&nbsp; Warning</b-button>
            <b-button variant="danger"><i class="fa fa-rss"></i>&nbsp; Danger</b-button>
            <b-button variant="link"><i class="fa fa-link"></i>&nbsp; Link</b-button>
          </b-card>
          <b-card>
            <div slot="header">
              <strong>Size Large</strong> <small>Add this <code>size="lg"</code></small>
            </div>
            <b-button size="lg" variant="primary">Primary</b-button>
            <b-button size="lg" variant="secondary">Secondary</b-button>
            <b-button size="lg" variant="success">Success</b-button>
            <b-button size="lg" variant="info">Info</b-button>
            <b-button size="lg" variant="warning">Warning</b-button>
            <b-button size="lg" variant="danger">Danger</b-button>
            <b-button size="lg" variant="link">Link</b-button>
          </b-card>
          <b-card>
            <div slot="header">
              <strong>Size Small</strong> <small>Add this <code>size="sm"</code></small>
            </div>
            <b-button size="sm" variant="primary">Primary</b-button>
            <b-button size="sm" variant="secondary">Secondary</b-button>
            <b-button size="sm" variant="success">Success</b-button>
            <b-button size="sm" variant="info">Info</b-button>
            <b-button size="sm" variant="warning">Warning</b-button>
            <b-button size="sm" variant="danger">Danger</b-button>
            <b-button size="sm" variant="link">Link</b-button>
          </b-card>
          <b-card>
            <div slot="header">
              <strong>Disabled state</strong> <small>Add this <code>:disabled="true"</code></small>
            </div>
            <b-button size="lg" variant="primary" :disabled="true">Primary</b-button>
            <b-button size="lg" variant="secondary" :disabled="true">Secondary</b-button>
            <b-button size="lg" variant="success" :disabled="true">Success</b-button>
            <b-button size="lg" variant="info" :disabled="true">Info</b-button>
            <b-button size="lg" variant="warning" :disabled="true">Warning</b-button>
            <b-button size="lg" variant="danger" :disabled="true">Danger</b-button>
            <b-button size="lg" variant="link" :disabled="true">Link</b-button>
          </b-card>
          <b-card>
            <div slot="header">
              <strong>Active state</strong> <small>Add this <code>:active="true"</code></small>
            </div>
            <b-button variant="primary" :active="true">Primary</b-button>
            <b-button variant="secondary" :active="true">Secondary</b-button>
            <b-button variant="success" :active="true">Success</b-button>
            <b-button variant="info" :active="true">Info</b-button>
            <b-button variant="warning" :active="true">Warning</b-button>
            <b-button variant="danger" :active="true">Danger</b-button>
            <b-button variant="link" :active="true">Link</b-button>
          </b-card>
          <b-card header-tag="header">
            <div slot="header">
              <strong>Pressed state</strong> <small>Add this <code>:pressed="true"</code></small>
            </div>
            <b-button variant="primary" :pressed="true">Primary</b-button>
            <b-button variant="secondary" :pressed="true">Secondary</b-button>
            <b-button variant="success" :pressed="true">Success</b-button>
            <b-button variant="info" :pressed="true">Info</b-button>
            <b-button variant="warning" :pressed="true">Warning</b-button>
            <b-button variant="danger" :pressed="true">Danger</b-button>
            <b-button variant="link" :pressed="true">Link</b-button>
          </b-card>
          <b-card>
            <div slot="header">
              <strong>Toggle pressed state</strong>
            </div>
            <b-button variant="primary" :pressed.sync="myToggle">Primary {{myToggle ? 'On ' : 'Off'}}</b-button>
            <b-button variant="secondary" :pressed.sync="myToggle">Secondary {{myToggle ? 'On ' : 'Off'}}</b-button>
            <b-button variant="success" :pressed.sync="myToggle">Success {{myToggle ? 'On ' : 'Off'}}</b-button>
            <b-button variant="info" :pressed.sync="myToggle">Info {{myToggle ? 'On ' : 'Off'}}</b-button>
            <b-button variant="warning" :pressed.sync="myToggle">Warning {{myToggle ? 'On ' : 'Off'}}</b-button>
            <b-button variant="danger" :pressed.sync="myToggle">Danger {{myToggle ? 'On ' : 'Off'}}</b-button>
          </b-card>

          <b-card>
            <div slot="header">
              <strong>Block Level Buttons</strong> <small>Add this <code>:block="true"</code></small>
            </div>
            <b-button size="lg" variant="secondary" :block="true">Block level button</b-button>
            <b-button size="lg" variant="primary" :block="true">Block level button</b-button>
            <b-button size="lg" variant="success" :block="true">Block level button</b-button>
            <b-button size="lg" variant="info" :block="true">Block level button</b-button>
            <b-button size="lg" variant="warning" :block="true">Block level button</b-button>
            <b-button size="lg" variant="danger" :block="true">Block level button</b-button>
            <b-button size="lg" variant="link" :block="true">Block level button</b-button>
          </b-card>
        </b-col><!--/.col-->
        <b-col md="6">
          <b-card>
            <div slot="header">
              <strong>Options</strong>
            </div>
            <!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
            <b-button variant="outline-primary">Primary</b-button>
            <!-- Secondary, outline button -->
            <b-button variant="outline-secondary">Secondary</b-button>
            <!-- Indicates a successful or positive action -->
            <b-button variant="outline-success">Success</b-button>
            <!-- Indicates caution should be taken with this action -->
            <b-button variant="outline-warning">Warning</b-button>
            <!-- Indicates a dangerous or potentially negative action -->
            <b-button variant="outline-danger">Danger</b-button>
          </b-card>
          <b-card>
            <div slot="header">
              <strong>With Icons</strong>
            </div>
            <b-button variant="outline-primary"><i class="fa fa-star"></i>&nbsp; Primary</b-button>
            <b-button variant="outline-secondary"><i class="fa fa-lightbulb-o"></i>&nbsp; Secondary</b-button>
            <b-button variant="outline-success"><i class="fa fa-magic"></i>&nbsp; Success</b-button>
            <b-button variant="outline-warning"><i class="fa fa-map-marker"></i>&nbsp; Warning</b-button>
            <b-button variant="outline-danger"><i class="fa fa-rss"></i>&nbsp; Danger</b-button>
          </b-card>
          <b-card>
            <div slot="header">
              <strong>Size Large</strong> <small>Add this <code>size="lg"</code></small>
            </div>
            <b-button size="lg" variant="outline-primary">Primary</b-button>
            <b-button size="lg" variant="outline-secondary">Secondary</b-button>
            <b-button size="lg" variant="outline-success">Success</b-button>
            <b-button size="lg" variant="outline-info">Info</b-button>
            <b-button size="lg" variant="outline-warning">Warning</b-button>
            <b-button size="lg" variant="outline-danger">Danger</b-button>
          </b-card>
          <b-card>
            <div slot="header">
              <strong>Size Small</strong> <small>Add this <code>size="sm"</code></small>
            </div>
            <b-button size="sm" variant="outline-primary">Primary</b-button>
            <b-button size="sm" variant="outline-secondary">Secondary</b-button>
            <b-button size="sm" variant="outline-success">Success</b-button>
            <b-button size="sm" variant="outline-info">Info</b-button>
            <b-button size="sm" variant="outline-warning">Warning</b-button>
            <b-button size="sm" variant="outline-danger">Danger</b-button>
          </b-card>
          <b-card>
            <div slot="header">
              <strong>Disabled state</strong> <small>Add this <code>:disabled="true"</code></small>
            </div>
            <b-button variant="outline-primary" :disabled="true">Primary</b-button>
            <b-button variant="outline-secondary" :disabled="true">Secondary</b-button>
            <b-button variant="success" :disabled="true">Success</b-button>
            <b-button variant="outline-info" :disabled="true">Info</b-button>
            <b-button variant="outline-warning" :disabled="true">Warning</b-button>
            <b-button variant="outline-danger" :disabled="true">Danger</b-button>
          </b-card>
          <b-card>
            <div slot="header">
              <strong>Active state</strong> <small>Add this <code>:active="true"</code></small>
            </div>
            <b-button variant="outline-primary" :active="true">Primary</b-button>
            <b-button variant="outline-secondary" :active="true">Secondary</b-button>
            <b-button variant="outline-success" :active="true">Success</b-button>
            <b-button variant="outline-info" :active="true">Info</b-button>
            <b-button variant="outline-warning" :active="true">Warning</b-button>
            <b-button variant="outline-danger" :active="true">Danger</b-button>
          </b-card>
          <b-card>
            <div slot="header">
              <strong>Pressed state</strong> <small>Add this <code>:pressed="true"</code></small>
            </div>
            <b-button variant="outline-primary" :pressed="true">Primary</b-button>
            <b-button variant="outline-secondary" :pressed="true">Secondary</b-button>
            <b-button variant="outline-success" :pressed="true">Success</b-button>
            <b-button variant="outline-info" :pressed="true">Info</b-button>
            <b-button variant="outline-warning" :pressed="true">Warning</b-button>
            <b-button variant="outline-danger" :pressed="true">Danger</b-button>
          </b-card>
          <b-card>
            <div slot="header">
              <strong>Toggle pressed state</strong>
            </div>
            <b-button variant="outline-primary" :pressed.sync="myToggle">Primary {{myToggle ? 'On ' : 'Off'}}</b-button>
            <b-button variant="outline-secondary" :pressed.sync="myToggle">Secondary {{myToggle ? 'On ' : 'Off'}}</b-button>
            <b-button variant="outline-success" :pressed.sync="myToggle">Success {{myToggle ? 'On ' : 'Off'}}</b-button>
            <b-button variant="outline-info" :pressed.sync="myToggle">Info {{myToggle ? 'On ' : 'Off'}}</b-button>
            <b-button variant="outline-warning" :pressed.sync="myToggle">Warning {{myToggle ? 'On ' : 'Off'}}</b-button>
            <b-button variant="outline-danger" :pressed.sync="myToggle">Danger {{myToggle ? 'On ' : 'Off'}}</b-button>
          </b-card>
          <b-card>
            <div slot="header">
              <strong>Block Level Buttons</strong> <small>Add this <code>:block="true"</code></small>
            </div>
            <b-button size="lg" variant="outline-secondary" :block="true">Block level button</b-button>
            <b-button size="lg" variant="outline-primary" :block="true">Block level button</b-button>
            <b-button size="lg" variant="outline-success" :block="true">Block level button</b-button>
            <b-button size="lg" variant="outline-info" :block="true">Block level button</b-button>
            <b-button size="lg" variant="outline-warning" :block="true">Block level button</b-button>
            <b-button size="lg" variant="outline-danger" :block="true">Block level button</b-button>
          </b-card>
        </b-col><!--/.col-->
      </b-row>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex'
export default {
  name: 'dashboard',
  data () {
    return {
      filter: '1',
      selected: [],
      loginForm: {
        user: '',
        email: '',
        num: ''
      },
      infoForm: {
        user: '',
        num: '',
        mon: '',
        year: '',
        cvv: ''
      },
      info: this.token,
      myToggle: false
    }
  },
  mounted () {
    let i = 1
    setInterval(() => {
      this.updataCount({
        num: i++,
        time: 1000
      })
    }, 1000)
  },
  computed: {
    ...mapState({
      count: state => state.count,
      messages: state => state.messages,
      token: state => state.token
    }),
    ...mapGetters({
      fullName: 'fullName'
    })
  },
  methods: {
    ...mapMutations(['updataCount']),
    notify () {
      this.$notify({
        content: 'test $notify',
        btn: 'close'
      })
    },
    handleChangeTab (value) {
      this.filter = value
    },
    getSubmit () {
      console.log(this.loginForm)
    },
    setInfo () {
      console.log(this.infoForm)
    }
  }
}
</script>
<style>
  .tabsContent{
    background-color: rbga(0,0,0,0,5);
    padding: 10px 0;
  }
</style>
