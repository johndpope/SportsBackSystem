<template>
  <div class="app flex-row align-items-center loginBg">
    <canvas id="canvas" width="1920" height="846"></canvas>
    <div class="container loginModal">
      <b-row class="justify-content-center">
        <b-col md="5">
          <b-card-group>
            <b-card no-body class="p-4 cardBg">
              <b-card-body>
                <h1 class="text-center" style="color: #fff;">Login</h1>
                <p class="text-muted text-center" style="color: #aaa !important;">Sign In to your account</p>
                <form ref="loginForm" method="post" :model="loginForm" autoComplete="on">
                  <b-input-group class="mb-3" title="6~15 number and alphabet combination">
                    <b-input-group-prepend>
                      <b-input-group-text class="inputBg"><i class="icon-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <input type="text" class="form-control inputBg" v-model="loginForm.username" placeholder="Username"
                           autoComplete="on" @blur="judgeUser()" @keyup.enter="handleLogin ()">
                  </b-input-group>
                  <b-input-group class="mb-4" title="6~15 number and alphabet combination">
                    <b-input-group-prepend>
                      <b-input-group-text class="inputBg"><i class="icon-lock"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <input type="password" class="form-control inputBg" v-model="loginForm.password" placeholder="Password" @blur="judgePwd()" @keyup.enter="handleLogin ()">
                  </b-input-group>
                  <b-row>
                    <b-col cols="12" class="text-center">
                      <b-button variant="primary rounded"   :disabled="btnDisable" class="px-4" @click="handleLogin ()">Login
                      </b-button>
                    </b-col>
                    <b-col cols="6" class="text-right" hidden>
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" hidden style="width:44%;">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import {validatUser} from '../../model/validate'
import {mapState} from 'vuex'
export default {
  name: 'Login',
  components: {},
  props: {},
  data () {
    return {
      loginForm: {
        username: 'shelby001',
        password: 'asdf1234'
      },
      isUser: false,
      isPwd: false,
      btnDisable: false
    }
  },
  created () {

  },
  mounted () {
    var threeD = function (param) {
      this.transIn = {}
      this.transOut = {}
      this.transIn.vtx = (param.vtx)
      this.transIn.sz = (param.sz)
      this.transIn.rot = (param.rot)
      this.transIn.pos = (param.pos)
    }

    threeD.prototype.vupd = function () {
      this.transOut = trans.steps(
        this.transIn.vtx,
        this.transIn.sz,
        this.transIn.rot,
        this.transIn.pos,
        cam.disp
      )
    }

    var Build = function () {
      this.vel = 0.04
      this.lim = 360
      this.diff = 200
      this.initPos = 100
      this.toX = _x
      this.toY = _y
      this.go()
    }

    Build.prototype.go = function () {
      this.canvas = document.getElementById("canvas")
      this.canvas.width = window.innerWidth
      this.canvas.height = o.offsetHeight
      this.$ = canvas.getContext("2d")
      this.$.globalCompositeOperation = 'source-over'
      this.varr = []
      this.dist = []
      this.calc = []

      for (var i = 0, len = num; i < len; i++) {
        this.add()
      }

      this.rotObj = {
        x: 0,
        y: 0,
        z: 0
      };
      this.objSz = {
        x: w / 5,
        y: h / 5,
        z: w / 5
      };
    }

    Build.prototype.add = function () {
      this.varr.push(new threeD({
        vtx: {
          x: rnd(),
          y: rnd(),
          z: rnd()
        },
        sz: {
          x: 0,
          y: 0,
          z: 0
        },
        rot: {
          x: 20,
          y: -20,
          z: 0
        },
        pos: {
          x: this.diff * Math.sin (360 * Math.random() * Math.PI / 180),
          y: this.diff * Math.sin (360 * Math.random() * Math.PI / 180),
          z: this.diff * Math.sin (360 * Math.random() * Math.PI / 180)
        }
      }));
      this.calc.push({
        x: 360 * Math.random(),
        y: 360 * Math.random(),
        z: 360 * Math.random()
      });
    }

    Build.prototype.upd = function () {
      cam.obj.x += (this.toX - cam.obj.x) * 0.05
      cam.obj.y += (this.toY - cam.obj.y) * 0.05
    }

    Build.prototype.draw = function () {
      this.$.clearRect(0, 0, this.canvas.width, this.canvas.height)
      cam.upd()
      this.rotObj.x += 0.1
      this.rotObj.y += 0.1
      this.rotObj.z += 0.1

      for (var i = 0; i < this.varr.length; i++) {
        for (var val in this.calc[i]) {
          if (this.calc[i].hasOwnProperty(val)) {
            this.calc[i][val] += this.vel
            if (this.calc[i][val] > this.lim) this.calc[i][val] = 0
          }
        }

        this.varr[i].transIn.pos = {
          x: this.diff * Math.cos(this.calc[i].x * Math.PI / 180),
          y: this.diff * Math.sin (this.calc[i].y * Math.PI / 180),
          z: this.diff * Math.sin (this.calc[i].z * Math.PI / 180)
        }
        this.varr[i].transIn.rot = this.rotObj
        this.varr[i].transIn.sz = this.objSz
        this.varr[i].vupd()
        if (this.varr[i].transOut.p < 0) continue
        var g = this.$.createRadialGradient(this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p, this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p * 2);
        this.$.globalCompositeOperation = 'lighter'
        g.addColorStop(0, 'hsla(255, 255%, 255%, 1)')
        g.addColorStop(.5, 'hsla(' + (i + 2) + ',85%, 40%,1)')
        g.addColorStop(1, 'hsla(' + (i) + ',85%, 40%,.5)')
        this.$.fillStyle = g
        this.$.beginPath()
        this.$.arc(this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p * 2, 0, Math.PI * 2, false);
        this.$.fill()
        this.$.closePath()
      }
    }
    Build.prototype.anim = function () {
      window.requestAnimationFrame = (function () {
        return window.requestAnimationFrame ||
          function (callback, element) {
            window.setTimeout(callback, 1000 / 60);
          };
      })();
      var anim = function () {
        this.upd();
        this.draw();
        window.requestAnimationFrame(anim);
      }.bind(this);
      window.requestAnimationFrame(anim);
    }

    Build.prototype.run = function () {
      this.anim();

      window.addEventListener('mousemove', function (e) {
        this.toX = (e.clientX - this.canvas.width / 2) * -0.8;
        this.toY = (e.clientY - this.canvas.height / 2) * 0.8;
      }.bind(this));
      window.addEventListener('touchmove', function (e) {
        e.preventDefault();
        this.toX = (e.touches[0].clientX - this.canvas.width / 2) * -0.8;
        this.toY = (e.touches[0].clientY - this.canvas.height / 2) * 0.8;
      }.bind(this));
      window.addEventListener('mousedown', function (e) {
        for (var i = 0; i < 100; i++) {
          this.add();
        }
      }.bind(this));
      window.addEventListener('touchstart', function (e) {
        e.preventDefault();
        for (var i = 0; i < 100; i++) {
          this.add();
        }
      }.bind(this));
    }
    var app = new Build()
    app.run()
  },
  computed: {
    ...mapState({
      token: state => state.token
    })
  },
  methods: {
    judgeUser () {
      let userName = this.loginForm.username.trim()
      if (userName.length === 0) {
        this.$notify({
          content: '用户名不能为空！',
          btn: 'close'
        })
      } else {
        if (userName.length < 6 || userName.length > 15) {
          this.$notify({
            content: '用户名由6-15个字符组成！',
            btn: 'close'
          })
        } else {
          if (validatUser(userName)) {
            this.isUser = true
          } else {
            this.$notify({
              content: '用户名由数字与字母组成！',
              btn: 'close'
            })
          }
        }
      }
    },
    judgePwd () {
      let passWord = this.loginForm.password.trim()
      if (passWord.length === 0) {
        this.$notify({
          content: '密码不能为空！',
          btn: 'close'
        })
      } else {
        if (passWord.length < 6 || passWord.length > 15) {
          this.$notify({
            content: '密码由6-15个字符组成！',
            btn: 'close'
          })
        } else {
          if (validatUser(passWord)) {
            this.isPwd = true
          } else {
            this.$notify({
              content: '密码由数字与字母组成！',
              btn: 'close'
            })
          }
        }
      }
    },
    handleLogin () {
      this.judgeUser()
      this.judgePwd()
      this.btnDisable = true
      if (this.isUser && this.isPwd) {
        this.$store.dispatch('LoginByUser', this.loginForm).then(() => {
          this.$notify({
            content: '登录成功',
            btn: 'close'
          })
          this.loginForm = {
            username: 'will001',
            password: 'asdf1234'
          }
          this.isUser = false
          this.isPwd = false
          this.btnDisable = false
          this.$router.push({path: '/index'})
        }).catch(err => {
          this.$notify({
            content: err,
            btn: 'close'
          })
        })
      }
    }
  },
  watch: {}
}

var o = document.getElementsByTagName('body')[0]
var num = 200
var w = window.innerWidth
var h = o.offsetHeight
var max = 100
var _x = 0
var _y = 0
var _z = 150
var dtr = function (d) {
  return d * Math.PI / 180
}

var rnd = function () {
  return Math.sin (Math.floor(Math.random() * 360) * Math.PI / 180)
}
var dist = function (p1, p2, p3) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2))
}

var cam = {
  obj: {
    x: _x,
    y: _y,
    z: _z
  },
  dest: {
    x: 0,
    y: 0,
    z: 1
  },
  dist: {
    x: 0,
    y: 0,
    z: 200
  },
  ang: {
    cplane: 0,
    splane: 0,
    ctheta: 0,
    stheta: 0
  },
  zoom: 1,
  disp: {
    x: w / 2,
    y: h / 2,
    z: 0
  },
  upd: function () {
    cam.dist.x = cam.dest.x - cam.obj.x
    cam.dist.y = cam.dest.y - cam.obj.y
    cam.dist.z = cam.dest.z - cam.obj.z
    cam.ang.cplane = -cam.dist.z / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z)
    cam.ang.splane = cam.dist.x / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z)
    cam.ang.ctheta = Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z) / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z)
    cam.ang.stheta = -cam.dist.y / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z)
  }
}

var trans = {
  parts: {
    sz: function (p, sz) {
      return {
        x: p.x * sz.x,
        y: p.y * sz.y,
        z: p.z * sz.z
      };
    },
    rot: {
      x: function (p, rot) {
        return {
          x: p.x,
          y: p.y * Math.cos(dtr(rot.x)) - p.z * Math.sin (dtr(rot.x)),
          z: p.y * Math.sin (dtr(rot.x)) + p.z * Math.cos(dtr(rot.x))
        };
      },
      y: function (p, rot) {
        return {
          x: p.x * Math.cos(dtr(rot.y)) + p.z * Math.sin (dtr(rot.y)),
          y: p.y,
          z: -p.x * Math.sin (dtr(rot.y)) + p.z * Math.cos(dtr(rot.y))
        };
      },
      z: function (p, rot) {
        return {
          x: p.x * Math.cos(dtr(rot.z)) - p.y * Math.sin (dtr(rot.z)),
          y: p.x * Math.sin (dtr(rot.z)) + p.y * Math.cos(dtr(rot.z)),
          z: p.z
        };
      }
    },
    pos: function (p, pos) {
      return {
        x: p.x + pos.x,
        y: p.y + pos.y,
        z: p.z + pos.z
      };
    }
  },
  pov: {
    plane: function (p) {
      return {
        x: p.x * cam.ang.cplane + p.z * cam.ang.splane,
        y: p.y,
        z: p.x * -cam.ang.splane + p.z * cam.ang.cplane
      };
    },
    theta: function (p) {
      return {
        x: p.x,
        y: p.y * cam.ang.ctheta - p.z * cam.ang.stheta,
        z: p.y * cam.ang.stheta + p.z * cam.ang.ctheta
      };
    },
    set: function (p) {
      return {
        x: p.x - cam.obj.x,
        y: p.y - cam.obj.y,
        z: p.z - cam.obj.z
      };
    }
  },
  persp: function (p) {
    return {
      x: p.x * cam.dist.z / p.z * cam.zoom,
      y: p.y * cam.dist.z / p.z * cam.zoom,
      z: p.z * cam.zoom,
      p: cam.dist.z / p.z
    };
  },
  disp: function (p, disp) {
    return {
      x: p.x + disp.x,
      y: -p.y + disp.y,
      z: p.z + disp.z,
      p: p.p
    };
  },
  steps: function (_obj_, sz, rot, pos, disp) {
    var _args = trans.parts.sz(_obj_, sz)
    _args = trans.parts.rot.x(_args, rot)
    _args = trans.parts.rot.y(_args, rot)
    _args = trans.parts.rot.z(_args, rot)
    _args = trans.parts.pos(_args, pos)
    _args = trans.pov.plane(_args)
    _args = trans.pov.theta(_args)
    _args = trans.pov.set(_args)
    _args = trans.persp(_args)
    _args = trans.disp(_args, disp)
    return _args
  }
}

window.addEventListener('resize', function () {
  canvas.width = w = window.innerWidth
  canvas.height = h = window.innerHeight
}, false)
</script>

<style lang="scss">
  .loginBg {
    height: 100%;
    background-image: -webkit-radial-gradient(ellipse farthest-corner at center top, #000d4d 0%, #000105 100%);
    background-image: radial-gradient(ellipse farthest-corner at center top, #000d4d 0%, #000105 100%);
    cursor: move;
  }
  canvas{
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 1;
    position: absolute;
  }
  .loginModal{
    position: relative;
    z-index: 9999;
  }
  .cardBg{
    background-color: rgba(0, 0, 0, 0.5);
    border-color: rgba(0, 0, 0, 0.7);
    border-radius: 6px;
  }
  .inputBg{
    background-color: rgba(0, 0, 0, 0.5);
    border-color: rgba(256, 256, 256, 0.5);
    color: #ffff;
  }
</style>
