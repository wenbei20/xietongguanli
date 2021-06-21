<template>
  <div class="app-container">
    <div class="communicate">
      <el-row>
        <el-col class="left">
          <div class="chat-menu">
            <div
              v-for="(item, index) in list"
              :key="index"
              :class="['item', listActive && listActive.name === item.name ? 'active' : null]"
              @click="menuClick(item)"
            >
              <el-avatar icon="el-icon-user-solid" />
              <div class="content">
                <h3 class="title">
                  <span v-if="item.type === 'group'">讨论组</span>
                  {{ item.name }}
                </h3>
                <p class="info">{{ item.count }}人</p>
              </div>
            </div>
          </div>
        </el-col>
        <el-col class="right">
          <div v-if="listActive" class="main-box">
            <div class="chat-box">
              <div class="chat-list">
                <div
                  v-for="(item, index) in listActive.content"
                  :key="index"
                  :class="['item', item.type]"
                >
                  <el-avatar>{{ item.from }}</el-avatar>
                  <div class="content">
                    <div v-if="!item.type" class="name">{{ item.from }}</div>
                    <div class="frame">{{ item.text }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="editor-box">
              <div class="topbar">
                <div class="item">表情</div>
                <div class="item">文档</div>
                <div class="item">图片</div>
              </div>
              <div class="content" contenteditable="true" />
              <div class="footbar">
                <el-button>发送</el-button>
              </div>
            </div>
          </div>
          <div v-else class="main-box">
            <div class="empty">
              <img :src="defaultImg" class="picture">
              <div class="title">打开世界的另一扇窗</div>
              <div class="subtitle">主动一点，世界会变更大。</div>
              <div class="other">
                您还可以发起：
                <a href="##" style="display: inline-block; margin: 0 20px;">
                  <el-avatar :src="tengxunhuiyi" size="mini" /><br>
                  腾讯会议
                </a>
                <a href="##" style="display: inline-block; margin: 0 20px;">
                  <el-avatar :src="weixin" size="mini" /><br>
                  微信
                </a>
                <a href="##" style="display: inline-block; margin: 0 20px;">
                  <el-avatar :src="qq" size="mini" /><br>
                  QQ
                </a>
                <a href="##" style="display: inline-block; margin: 0 20px;">
                  <el-avatar :src="xingxin" size="mini" /><br>
                  行信
                </a>
                <a href="##" style="display: inline-block; margin: 0 20px;">
                  <el-avatar :src="msn" size="mini" /><br>
                  MSN
                </a>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import defaultImg from '@/assets/empty/chat-128x128.png'
import tengxunhuiyi from '@/assets/tools/tengxunhuiyi.png'
import weixin from '@/assets/tools/weixin.png'
import qq from '@/assets/tools/qq.png'
import xingxin from '@/assets/tools/xingxin.png'
import msn from '@/assets/tools/msn.png'

export default {
  name: 'Communicate',
  data() {
    return {
      defaultImg,
      tengxunhuiyi,
      weixin,
      qq,
      xingxin,
      msn,
      listActive: null,
      list: [
        {
          type: 'group', name: '项目1', count: '23',
          content: [
            { from: '张三', text: '今天什么时候开会？', time: '2020-09-22 13:01:20' },
            { from: '李四', text: '不知道啊', time: '2020-09-22 13:01:28' },
            { from: '王五', text: '。。。。', time: '2020-09-22 13:02:01' },
            { from: '李小凤', type: 'me', text: '5402', time: '2020-09-22 13:02:28' }
          ]
        },
        {
          type: 'group', name: '项目2', count: '21',
          content: [
            { from: '卡卡', text: '这次需求怎么还没出？', time: '2020-09-22 13:01:20' },
            { from: '洛洛', text: '听说快了', time: '2020-09-22 13:01:28' },
            { from: '如若', text: '。。。。', time: '2020-09-22 13:02:01' },
            { from: 'YY', type: 'me', text: '今天下午开需求会', time: '2020-09-22 13:02:28' },
            { from: 'YY', type: 'me', text: '别急', time: '2020-09-22 13:02:28' }
          ]
        },
        {
          type: 'personal', name: '张三', count: '23',
          content: [
            { from: '张三', text: '今天什么时候开会？', time: '2020-09-22 13:01:20' },
            { from: '李小凤', type: 'me', text: '5402', time: '2020-09-22 13:02:28' }
          ]
        }
      ]
    }
  },
  methods: {
    menuClick(item) {
      this.listActive = item
    }
  }
}
</script>

<style lang="scss" scoped>
.communicate{ margin: -20px; height: calc(100% + 40px);
  .el-row, .el-col{ height: 100%;}
  .left{ width:200px;}
  .right{ width: calc(100% - 200px); background: #dfe3eb;}
}
.chat-menu{ width: 100%; height: 100%; background: #fff; overflow-y: auto;
  .item{ width: 100%; padding: 10px; transition: all .2s; cursor: pointer;
    .el-avatar{ margin-right: 5px; background: #586aea; width: 40px; height: 40px; vertical-align: top;}
    .content{ display: inline-block; width: calc(100% - 50px); padding-left: 5px; line-height: 20px;
      .title{ margin: 0; font-size: 12px; white-space: nowrap; overflow: hidden;; text-overflow: ellipsis;
        span{ background: #bac7e0; color: #fff; font-weight: 400; padding: 0 5px; float: right;}
      }
      .info{ font-size: 12px; margin: 0; text-align: left; color: #999;}
    }
    &:hover{ background: #eef0f3;}
    &.active{ background: #dfe3eb;}
  }
}
.main-box{ width: 100%; height:100%; height: 100%; background: #dfe3eb; box-shadow: 0 5px 7px rgba(0, 0, 0, .1) inset; }
.chat-box{ height: calc(100% - 200px); padding: 20px; overflow-y: auto; border-bottom: #ccc solid 1px;}
.chat-list{
  .item{ margin-bottom: 20px; display: flex; justify-content: flex-start;
    .el-avatar{ margin: 0 10px 0 0; vertical-align: top; order: 1; background: #586aea;}
    .content{ max-width: 80%; order: 2;
      .name{ line-height: 20px; font-size: 14px; color: rgba(0, 0, 0, .3);}
      .frame{ padding: 15px; margin-top: 5px; font-size: 14px; background: #fff; color: #151515; border-radius: 0 10px 10px 10px; width: fit-content;}
    }
    &.me{ flex-direction: row-reverse;
      .el-avatar{ margin: 0 0 0 10px;}
      .content{
        .frame{ border-radius: 10px 0 10px 10px; background: #c1cbdf;}
      }
    }
  }
}
.editor-box{ height: 200px;
  .topbar{ height: 30px; padding: 0 10px;
    .item{ line-height: 30px; font-size: 12px; padding: 0 10px; display: inline-block; cursor: pointer;}
  }
  .content{ height: calc(100% - 30px - 50px); padding: 5px 20px; font-size: 14px; line-height: 1.5; color: #333;}
  .footbar{ padding: 5px 20px; height: 50px; text-align: right;
    .el-button { padding: 7px 20px;}
  }
}
.empty{ margin: 0 auto; overflow: hidden; text-align: center;
  .picture{ margin-top: 150px;}
  .title{ font-size: 18px; color: #333; margin-top: 30px;}
  .subtitle{ font-size: 12px; color: #999; margin-top: 10px;}
  .other{ margin-top: 50px;}
}
</style>
