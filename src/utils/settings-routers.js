export default {
  setting: {
    name: '应用设置',
    component: 'setting',
    items: [{ name: '项目设置' }, { name: '应用设置' }]
  },
  addyingyong: {
    name: '添加应用与排序',
    component: 'setting',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '添加应用与排序' }
    ]
  },

  xuqiu: {
    name: '需求',
    component: 'xuqiu',
    items: [{ name: '项目设置' }, { name: '应用设置', component: 'setting' }, { name: '需求' }]
  },
  xianshi: {
    name: '显示设置',
    component: 'xianshi',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '需求', component: 'xuqiu' },
      { name: '显示设置' }
    ]
  },
  qiyongSZ: {
    name: '启用设置',
    component: 'qiyongSZ',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '需求', component: 'xuqiu' },
      { name: '启用设置' }
    ]
  },
  gongzuoliu: {
    name: '工作流设置',
    component: 'gongzuoliu',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '需求', component: 'xuqiu' },
      { name: '工作流设置' }
    ]
  },

  gongzuoliuEdit: {
    name: '编辑工作流',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '需求', component: 'xuqiu' },
      { name: '工作流设置', component: 'gongzuoliu' },
      { name: '编辑工作流' }
    ]
  },

  gongzuoliuAdd: {
    name: '增加工作流',
    isSameComp: 'gongzuoliuEdit',
    from: 'xuqiuAdd',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '需求', component: 'xuqiu' },
      { name: '工作流设置', component: 'gongzuoliu' },
      { name: '增加工作流' }
    ]
  },

  ziduanSZ: {
    name: '字段设置',
    component: 'ziduanSZ',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '需求', component: 'xuqiu' },
      { name: '字段设置' }
    ]
  },
  xinzengZD: {
    name: '增加/编辑自定义字段',
    component: 'ziduanSZ',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '需求', component: 'xuqiu' },
      { name: '字段设置', component: 'ziduanSZ' },
      { name: '增加/编辑自定义字段' }
    ]
  },
  editZD: {
    name: '编辑系统字段',
    component: 'editZD',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '需求', component: 'xuqiu' },
      { name: '字段设置', component: 'ziduanSZ' },
      { name: '编辑系统字段' }
    ]
  },
  chuangjianYM: {
    name: '创建页面模板',
    component: 'xianshi',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '需求', component: 'xuqiu' },
      { name: '显示设置', component: 'xianshi' },
      { name: '创建页面模板' }
    ]
  },

  editYM: {
    name: '编辑页面设置',
    component: 'editYM',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '需求', component: 'xuqiu' },
      { name: '显示设置', component: 'xianshi' },
      { name: '编辑页面设置' }
    ]
  },
  chakanYM: {
    name: '查看页面设置',
    component: 'chakanYM',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '需求', component: 'xuqiu' },
      { name: '显示设置', component: 'xianshi' },
      { name: '查看页面设置' }
    ]
  },
  xinzengCJ: {
    name: '新增创建页面模板',
    component: 'xinzengCJ',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '需求', component: 'xuqiu' },
      { name: '显示设置', component: 'xianshi' },
      { name: '创建页面模板', component: 'chuangjianYM' },
      { name: '新增创建页面模板' }
    ]
  },
  //  迭代设置

  diedai: {
    name: '迭代',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '迭代' }
    ]
  },
  diedaiziduan: {
    name: '字段设置',
    isSameComp: 'ziduanSZ',
    from: 'diedia',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '迭代', component: 'diedai' },
      { name: '字段设置' }
    ]
  },
  xinzengZD_DD: {
    name: '增加自定义字段',
    isSameComp: 'xinzengZD',
    from: 'diedia',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '迭代', component: 'diedai' },
      { name: '字段设置', component: 'diedaiziduan' },
      { name: '增加自定义字段' }
    ]
  },
  editZD_DD: {
    name: '编辑自定义字段',
    isSameComp: 'editZD',
    from: 'diedia',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '迭代', component: 'diedai' },
      { name: '字段设置', component: 'diedaiziduan' },
      { name: '编辑自定义字段' }
    ]
  },

  xianshiSZ_DD: {
    name: '显示设置',
    isSameComp: 'xianshi',
    from: 'diedia',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '迭代', component: 'diedai' },
      { name: '显示设置' }
    ]
  },
  chuangjianYM_DD: {
    name: '创建页面模板',
    isSameComp: 'chuangjianYM',
    from: 'diedia',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '迭代', component: 'diedai' },
      { name: '显示设置', component: 'xianshiSZ_DD' },
      { name: '创建页面模板' }
    ]
  },
  diedaijindu: {
    name: '迭代进度',
    isSameComp: 'chuangjianYM',
    from: 'diedaijindu',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '迭代', component: 'diedai' },
      { name: '显示设置', component: 'xianshiSZ_DD' },
      { name: '迭代进度' }
    ]
  },

  xinzengchuangjian_DD: {
    name: '新增创建页面模板',
    isSameComp: 'xinzengCJ',
    from: 'diedia',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '迭代', component: 'diedai' },
      { name: '显示设置', component: 'xianshiSZ_DD' },
      { name: '创建页面模板', component: 'chuangjianYM_DD' },
      { name: '新增创建页面模板' }
    ]
  },

  // 缺陷设置

  quexianSZ: {
    name: '缺陷',
    component: 'quexianSZ',
    items: [{ name: '项目设置' }, { name: '应用设置', component: 'setting' }, { name: '缺陷' }]
  },
  // ziduan
  ziduanSZ_QX: {
    name: '字段设置',
    isSameComp: 'ziduanSZ',
    from: 'quexian',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '缺陷', component: 'quexianSZ' },
      { name: '字段设置' }
    ]
  },

  gongzuoliu_QX: {
    name: '工作流设置',
    isSameComp: 'gongzuoliu',
    from: 'quexian',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '缺陷', component: 'quexianSZ' },
      { name: '工作流设置' }
    ]
  },

  gongzuoliuEdit_QX: {
    name: '编辑工作流',
    isSameComp: 'gongzuoliuEdit',
    from: 'quexian',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '缺陷', component: 'quexianSZ' },
      { name: '工作流设置', component: 'gongzuoliu_QX' },
      { name: '编辑工作流' }
    ]
  },

  gongzuoliuAdd_QX: {
    name: '增加工作流',
    isSameComp: 'gongzuoliuEdit',
    from: 'quexianAdd',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '缺陷', component: 'quexianSZ' },
      { name: '工作流设置', component: 'gongzuoliu_QX' },
      { name: '增加工作流' }
    ]
  },
  editZD_QX: {
    name: '编辑自定义字段',
    isSameComp: 'editZD',
    from: 'quexian',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '缺陷', component: 'quexianSZ' },
      { name: '字段设置', component: 'ziduanSZ_QX' },
      { name: '编辑自定义字段' }
    ]
  },
  xinzengZD_QX: {
    name: '编辑自定义字段',
    isSameComp: 'xinzengZD',
    from: 'quexian',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '缺陷', component: 'quexianSZ' },
      { name: '字段设置', component: 'ziduanSZ_QX' },
      { name: '编辑自定义字段' }
    ]
  },

  // xianshi

  xianshiSZ_QX: {
    name: '显示设置',
    isSameComp: 'xianshi',
    from: 'quexian',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '缺陷', component: 'quexianSZ' },
      { name: '显示设置' }
    ]
  },
  chuangjianYM_QX: {
    name: '创建页面模板',
    isSameComp: 'chuangjianYM',
    from: 'quexian',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '缺陷', component: 'quexianSZ' },
      { name: '显示设置', component: 'xianshiSZ_QX' },
      { name: '创建页面模板' }
    ]
  },
  xinzengchuangjian_QX: {
    name: '新增创建页面模板',
    isSameComp: 'xinzengCJ',
    from: 'quexian',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '缺陷', component: 'quexianSZ' },
      { name: '显示设置', component: 'xianshiSZ_QX' },
      { name: '创建页面模板', component: 'chuangjianYM_QX' },
      { name: '新增创建页面模板' }
    ]
  },
  editchuangjian_QX: {
    name: '编辑创建页面模板',
    isSameComp: 'xinzengCJ',
    from: 'quexian',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '缺陷', component: 'quexianSZ' },
      { name: '显示设置', component: 'xianshiSZ_QX' },
      { name: '创建页面模板', component: 'chuangjianYM_QX' },
      { name: '编辑创建页面模板' }
    ]
  },
  editYM_QX: {
    name: '编辑页面设置',
    isSameComp: 'editYM',
    from: 'quexian',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '缺陷', component: 'quexianSZ' },
      { name: '显示设置', component: 'xianshiSZ_QX' },
      { name: '编辑页面设置' }
    ]
  },
  chakanYM_QX: {
    name: '查看页面设置',
    isSameComp: 'chakanYM',
    from: 'quexian',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '缺陷', component: 'quexianSZ' },
      { name: '显示设置', component: 'xianshiSZ_QX' },
      { name: '查看页面设置' }
    ]
  },
  qiyongSZ_QX: {
    name: '启用设置',
    component: 'qiyongSZ_QX',
    items: [
      { name: '项目设置' },
      { name: '应用设置', component: 'setting' },
      { name: '缺陷', component: 'quexianSZ' },
      { name: '启用设置' }
    ]
  },

  //  其他设置

  otherSet: {
    name: '其他设置',
    component: 'otherSet',
    items: [{ name: '项目设置' }, { name: '其他设置' }]
  },

  // 公共参数
  gonggong: {
    name: '项目公共参数设置',
    items: [
      { name: '项目设置' },
      { name: '其他设置', component: 'otherSet' },
      { name: '项目公共参数设置' }
    ]
  },
  mokuai: {
    name: '模块',
    items: [
      { name: '项目设置' },
      { name: '其他设置', component: 'otherSet' },
      { name: '项目公共参数设置', component: 'gonggong' },
      { name: '模块' }
    ]
  },
  addmokuai: {
    name: '添加模块',
    items: [
      { name: '项目设置' },
      { name: '其他设置', component: 'otherSet' },
      { name: '项目公共参数设置', component: 'gonggong' },
      { name: '模块', component: 'mokuai' },
      { name: '添加模块' }
    ]
  },
  editmokuai: {
    name: '编辑模块',
    isSameComp: 'addmokuai',
    from: 'mokuai',
    items: [
      { name: '项目设置' },
      { name: '其他设置', component: 'otherSet' },
      { name: '项目公共参数设置', component: 'gonggong' },
      { name: '模块', component: 'mokuai' },
      { name: '编辑模块' }
    ]
  },

  banben: {
    name: '版本',
    items: [
      { name: '项目设置' },
      { name: '其他设置', component: 'otherSet' },
      { name: '项目公共参数设置', component: 'gonggong' },
      { name: '版本' }
    ]
  },
  editbanben: {
    name: '编辑版本',
    items: [
      { name: '项目设置' },
      { name: '其他设置', component: 'otherSet' },
      { name: '项目公共参数设置', component: 'gonggong' },
      { name: '版本', component: 'banben' },
      { name: '编辑版本' }
    ]

  },

  addbanben: {
    name: '添加版本',
    isSameComp: 'editbanben',
    from: 'mokuai',
    items: [
      { name: '项目设置' },
      { name: '其他设置', component: 'otherSet' },
      { name: '项目公共参数设置', component: 'gonggong' },
      { name: '版本', component: 'banben' },
      { name: '添加版本' }
    ]

  },

  jixian: {
    name: '基线',
    items: [
      { name: '项目设置' },
      { name: '其他设置', component: 'otherSet' },
      { name: '项目公共参数设置', component: 'gonggong' },
      { name: '基线' }
    ]
  },

  addjixian: {
    name: '新增基线',
    items: [
      { name: '项目设置' },
      { name: '其他设置', component: 'otherSet' },
      { name: '项目公共参数设置', component: 'gonggong' },
      { name: '基线', component: 'jixian' },
      { name: '新增基线' }
    ]
  },
  editjixian: {
    name: '编辑基线',
    isSameComp: 'addjixian',
    from: 'jixian',
    items: [
      { name: '项目设置' },
      { name: '其他设置', component: 'otherSet' },
      { name: '项目公共参数设置', component: 'gonggong' },
      { name: '基线', component: 'jixian' },
      { name: '编辑基线' }
    ]
  },

  // 公共试图
  shitu: {
    name: '项目系统视图设置',
    items: [
      { name: '项目设置' },
      { name: '其他设置', component: 'otherSet' },
      { name: '项目系统视图设置' }
    ]
  },
  xuqiushitu: {
    name: '需求系统视图',
    from: 'xuqiu',
    items: [
      { name: '项目设置' },
      { name: '其他设置', component: 'otherSet' },
      { name: '项目系统视图设置', component: 'shitu' },
      { name: '需求系统视图' }
    ]
  },

  diedaishitu: {
    name: '迭代系统视图',
    isSameComp: 'xuqiushitu',
    from: 'diedai',
    items: [
      { name: '项目设置' },
      { name: '其他设置', component: 'otherSet' },
      { name: '项目系统视图设置', component: 'shitu' },
      { name: '迭代系统视图' }
    ]
  },

  quexianshitu: {
    name: '缺陷系统视图',
    isSameComp: 'xuqiushitu',
    from: 'quexian',
    items: [
      { name: '项目设置' },
      { name: '其他设置', component: 'otherSet' },
      { name: '项目系统视图设置', component: 'shitu' },
      { name: '缺陷系统视图' }
    ]
  },

  // 成员与权限

  power: {
    name: '成员与权限',
    component: 'otherSet',
    items: [{ name: '项目设置' }, { name: '成员与权限' }]
  },
  chengyuan: {
    name: '成员',
    items: [
      { name: '项目设置' },
      { name: '成员与权限', component: 'power' },
      { name: '成员' }
    ]
  },
  yonghuzu: {
    name: '用户组权限',
    items: [
      { name: '项目设置' },
      { name: '成员与权限', component: 'power' },
      { name: '用户组权限' }
    ]
  },
  changyuanqiyong: {
    name: '其他设置',
    items: [
      { name: '项目设置' },
      { name: '成员与权限', component: 'power' },
      { name: '其他设置' }
    ]
  },

  //
  report: {
    name: '消息设置',
    component: 'otherSet',
    items: [{ name: '项目设置' }, { name: '消息设置' }]
  }

}
