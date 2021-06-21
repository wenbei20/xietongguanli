/* global d3, document */
/* jshint latedef:nofunc */
'use strict'

import * as d3 from 'd3'

export default function Neo4jd3(_selector, _options) {
  var container; /* var graph; */ var info; var node; var zoom; var nodes; var relationship; var relationshipOutline; var relationshipOverlay; var relationshipText; var relationships; var selector; var simulation; var svg; var svgNodes; var svgRelationships; var svgScale; var svgTranslate; var selD; var showArcs; var selNode; var Arrow; var fullscreenOpened; var fullscreenW; var fullscreenH; var SingleNodeChild = {}

  var dependsNode = []
  var sameRelations = {}
  var ColorContainer // 右下角颜色展示容器
  var toolBox // 右上工具展示容器
  //   var highlighted
  //   var changecolor
  var classes2colors = {}
  var justLoaded = false
  var numClasses = 0
  var selectorWidth = document.querySelector(_selector).clientWidth
  var selectorHeight = document.querySelector(_selector).offsetHeight
  var ColorInfoLength = ''
  var DeleteState = {}
  var oldnodeRadius = 0
  var userPamas = {}

  var wwidth = document.querySelector(_selector).clientWidth
  var options = {
    show: true,
    showMenu: true,
    arrowSize: 4,
    colors: colors(),
    // highlight: undefined,
    // iconMap: undefined,
    // icons: undefined,
    imageMap: {},
    // images: undefined,
    infoPanel: false,
    minCollision: 80,
    neo4jData: undefined,
    // neo4jDataUrl: undefined,
    nodeOutlineFillColor: undefined,
    nodeRadius: 25,
    openBigDistance: 200,
    relationshipColor: '#a5abb6',
    zoomFit: false,
    minscale: 1, // 最小缩小比例
    maxscale: 1.5, // 最大放大比例
    // ColorInfo:[
    //     {color:"#73CD7C",info:"组群1"},
    //     {color:"#E7569F",info:"组群2"},
    //     {color:"#9256E1",info:"组群3"},
    //     {color:"#F3D647",info:"组群4"},
    // ],
    ColorPamas: {
      outdivWidth: 100,
      ColorWidth: 40,
      offsetTop: 30,
      ColorHeight: 20,
      fontSize: 12,
      fontColor: '#444',
      outdivX: 50,
      outdivY: 30
    },
    toolBoxPamas: {
      SingleWidth: 100,
      SingleHeight: 100,
      outerWidth: 30,
      outerHeight: 70,
      outdivX: 30,
      outdivY: 20,
      outerRx: 5,
      outerRy: 5

    },

    // userPamas:{
    //     NodeTextPosX:0,
    //     NodeTextPosY:0,
    //     NodeSize:0,
    //     NodeTextSize:0,
    //     ColorInfo:[
    //         {color:"#73CD7C",info:"组群1"},
    //         {color:"#E7569F",info:"组群2"},
    //         {color:"#9256E1",info:"组群3"},
    //         {color:"#F3D647",info:"组群4"},
    //     ],
    // },

    userPamas: {
      '产品': {
        NodeTextPosX: 0,
        NodeTextPosY: 0,
        NodeSize: 0,
        NodeTextSize: 0,
        color: '#73CD7C'
      },
      '项目': {
        NodeTextPosX: 0,
        NodeTextPosY: 0,
        NodeSize: 0,
        NodeTextSize: 0,
        color: '#E7569F'
      },
      '功能': {
        NodeTextPosX: 0,
        NodeTextPosY: 0,
        NodeSize: 0,
        NodeTextSize: 0,
        color: '#9256E1'
      },
      '用例': {
        NodeTextPosX: 0,
        NodeTextPosY: 0,
        NodeSize: 0,
        NodeTextSize: 0,
        color: '#F3D647'
      }
    },

    maxArrowGap: 2, // 最大关系线箭头间距
    minArrowGap: 1.5, // 最小关系线箭头间距
    DownLoadImgFileName: '图谱',
    getClickNodeChildrenData: ''
  }
  function resize (){
    selectorWidth = document.querySelector(_selector).clientWidth
    selectorHeight = document.querySelector(_selector).clientHeight

    changeColorInfoPos()

    changeToolBoxPos()
  }

  window.addEventListener('resize',resize , false)

  function appendGraph(container) {
    zoom = d3.zoom().scaleExtent([0.6, 1.5]).on('zoom', () => {
      svg.attr('transform', d3.event.transform.translate(wwidth, 0))
      // svg.attr("transform",d3.event.transform.scale(1.2).translate(wwidth,0))
    })
    svg = container.append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('class', 'neo4jd3-graph')
      .call(d3.zoom().scaleExtent([options.minscale, options.maxscale]).on('zoom', function() {
        svg.attr('transform', d3.event.transform.scale(1))
      }))
    //    .call(d3.zoom().scaleExtent([options.minscale , options.maxscale]).on('zoom', function() {
    //             svg.attr("transform",d3.event.transform.scale(1).translate(svg.node().parentElement.parentElement.clientWidth *1.5, svg.node().parentElement.parentElement.clientHeight / -4))
    //     }))
      .on('dblclick.zoom', null)
      .append('g')
      .attr('class', 'gbox')
      .attr('width', '100%')
      .attr('height', '100%')

    svgRelationships = svg.append('g')
      .attr('class', 'relationships')

    svgNodes = svg.append('g')
      .attr('class', 'nodes')
  }

  // *******************************************************************************************************************************************************************************************
  function AppendToolBox() {
    const outsvg = d3.select('svg')
    toolBox = outsvg.append('g')
      .attr('class', 'toolbox')
    toolBox.append('rect')
      .attr('class', 'toolBoxOuter')
      .attr('width', function() { return options.toolBoxPamas.outerWidth })
      .attr('height', function() { return options.toolBoxPamas.outerHeight })
      .attr('rx', function() { return options.toolBoxPamas.outerRx })
      .attr('ry', function() { return options.toolBoxPamas.outerRy })
      .attr('fill', '#fff')
      .attr('stroke', '#D14B4A')
      .attr('stroke-width', 1)
    toolBox.append('rect')
      .attr('class', 'toolBoxLine')
      .attr('width', function() { return options.toolBoxPamas.outerWidth })
      .attr('height', 1)
    // .attr('x',1)
      .attr('y', function() { return options.toolBoxPamas.outerHeight / 2 })
      .attr('fill', '#D14B4A')

    // return  "&#xf030"; 相机
    // &#xf065  全屏
    const arr = ['&#xf065', '&#xf0c7']

    // let arr2 = ['&#xf01e','&#xf112']

    changeToolBoxPos()

    arr.forEach((item, i) => {
      toolBox.append('text')
        .attr('class', function() { return 'toolboxText' + i })
        .style('font-size', '14px')
        .style('fill', '#D14B4A')
        .style('cursor', 'pointer')
        .attr('x', function() { return options.toolBoxPamas.outerWidth / 2 })
        .attr('y', function() { return options.toolBoxPamas.outerHeight / 2 * (i + 1) - options.toolBoxPamas.outerHeight / 6 })
        .attr('text-anchor', 'middle')
        .attr('font-family', 'FontAwesome')
        .html(() => { return item })
        .on('click', function() {
          if (i === 0) { FullScreen() } else if (i === 1) { downloadfun() }
        })
    })
  }

  function FullScreen() {
    if (!fullscreenOpened) {
      const width = document.querySelector('html').clientWidth - 4
      const height = document.querySelector('html').clientHeight - 4

      const out = d3.select('svg')

      const outdiv = document.querySelector(_selector)

      fullscreenW = outdiv.clientWidth
      fullscreenH = outdiv.clientHeight
      out.attr('width', () => { return width })
        .attr('height', () => { return height })

      outdiv.style.width = width + 'px'
      outdiv.style.height = height + 'px'

      d3.select('.toolboxText0')
        .html(() => { return '&#xf066' })

      changeToolBoxPos()
      changeColorInfoPos()
      fullscreenOpened = true
    } else {
      const outdiv = document.querySelector(_selector)
      outdiv.style.width = fullscreenW + 'px'
      outdiv.style.height = fullscreenH + 'px'

      d3.select('svg').attr('width', '100%')
        .attr('height', '100%')

      d3.select('.toolboxText0')
        .html(() => { return '&#xf065' })

      changeToolBoxPos()
      changeColorInfoPos()
      fullscreenOpened = false
    }
  }

  function changeToolBoxPos() {
    const selectorWidth = document.querySelector(_selector).clientWidth
    toolBox.attr('transform', function() {
      const width = toolBox.node().getBBox().width
      return 'translate(' + (selectorWidth - width - options.toolBoxPamas.outdivX) + ',' + (options.toolBoxPamas.outdivY) + ') scale(1)'
    })
  }
  function changeColorInfoPos() {
    if (ColorContainer) {
      const width = ColorContainer.node().getBBox().width
      const selectorWidth = document.querySelector(_selector).clientWidth
      const selectorHeight = document.querySelector(_selector).clientHeight
      const height = ColorContainer.node().getBBox().height
      ColorContainer.attr('transform', function() {
        return 'translate(' + (selectorWidth - width - options.ColorPamas.outdivX) + ',' + (selectorHeight - height - options.ColorPamas.outdivY) + ') scale(1)'
      })
    }
  }

  function appendColorInfo() {
    const outsvg = d3.select('.neo4jd3-graph')
    ColorContainer = outsvg.append('g')
      .attr('class', 'ColorInfoDiv')
      .attr('width', '100')
      .attr('height', function(d) {
        console.log('options.userPamas', options.userPamas)
        // if(Array.isArray(options.userPamas.ColorInfo) && options.userPamas.ColorInfo.length > 0 ){
        if (Object.keys(options.userPamas).length > 0) {
          ColorInfoLength = Object.keys(options.userPamas).length
          return ColorInfoLength * 30
        } else {
          return 0
        }
      })

    appendSingleColorInfo()
  }
  function appendSingleColorInfo() {
    if (ColorInfoLength) {
      // options.userPamas.ColorInfo.forEach((item,i)=>{
      let i = 0
      for (const key in options.userPamas) {
        ColorContainer.append('rect')
          .attr('class', function(d) {
            return 'colordiv' + (i + 1)
          })
          .attr('width', function() {
            return options.ColorPamas.ColorWidth
          })
          .attr('cursor', 'pointer')
          .attr('height', function() {
            return options.ColorPamas.ColorHeight
          })
          .attr('x', function() {
            return options.ColorPamas.outdivWidth / 2
          })
          .attr('y', function() {
            return (options.ColorPamas.offsetTop) * i
            // return (options.ColorPamas.offsetTop)*i + (options.ColorPamas.offsetTop - options.ColorPamas.ColorHeight)/2
          })
          .style('fill', function() {
            // return item.color
            return options.userPamas[key].color
          })
          .attr('rx', '5')
          .attr('ry', '5')
          .on('click', function() {
            if (DeleteState[key] && DeleteState[key].isdelete) {
              updateNodesAndRelationships(DeleteState[key].nodes, DeleteState[key].relationships)
              tick()
              // simulation.alphaTarget(0.02).velocityDecay(0.02).restart()
              simulation.alphaTarget(0.0015).velocityDecay(0.1).restart()
              DeleteState[key].isdelete = false
              DeleteState[key].nodes = []
              DeleteState[key].relationships = []
            } else {
              let count1 = 0; let count2 = 0
              d3.selectAll('.node').each(function(d, i) {
                if (d.labels === key) {
                  d3.select(this).remove()
                  if (!DeleteState[key]) {
                    DeleteState[key] = {}
                  }
                  if (!DeleteState[key].nodes) {
                    DeleteState[key].nodes = []
                  }
                  DeleteState[key].nodes.push(d)
                  DeleteState[key].isdelete = true
                  nodes.splice((i - count1), 1)
                  count1++
                  node.each(function(d, i) {
                    if (d.labels === key) {
                      d3.select(this).remove()
                    }
                  })
                }
              })

              d3.selectAll('.relationship').each(function(d, i) {
                if (d.target.labels === key || d.source.labels === key) {
                  d3.select(this).remove()
                  if (!DeleteState[key].relationships) {
                    DeleteState[key].relationships = []
                  }
                  DeleteState[key].relationships.push(d)
                  relationships.splice((i - count2), 1)
                  count2++

                  relationship.each(function(d, i) {
                    if (d.target.labels === key || d.source.labels === key) {
                      d3.select(this).remove()
                    }
                  })
                }
              })

              console.log('relationship', relationship)
              console.log('relationships', relationships)
            }
          })

        ColorContainer.append('text')
          .text(function() { return key })
          .attr('font-size', function() {
            return options.ColorPamas.fontSize
          })
          .attr('fill', function() {
            return options.ColorPamas.fontColor
          })
          .attr('pointer-events', 'none')
          .attr('text-anchor', 'right')
          .attr('x', function() {
            return options.ColorPamas.ColorWidth - key.length * options.ColorPamas.fontSize + 5
          })
          .attr('y', function() {
            return options.ColorPamas.offsetTop * i + options.ColorPamas.fontSize
            // return options.ColorPamas.offsetTop*i + (options.ColorPamas.offsetTop- options.ColorPamas.ColorHeight)/2
          })

        i++
      }
      changeColorInfoPos()
    }
  }

  function interpolateZoom(translate, scale) {
    return d3.transition().duration(200).tween('zoom', function() {
      return function() {
        zoom.translateTo(svg, translate[0], translate[1])
        zoom.scaleBy(svg, scale)

        svg.attr('transform', 'translate(' + translate[0] + ',' + translate[1] + ')' +
                        'scale(' + scale + ')')
      }
    })
  }

  //    缩放点击
  function zoomClick() {
    var direction = 1
    var factor = 0.1
    var target_zoom = 1
    var center = [selectorWidth / 2, selectorHeight / 2]
    var extent = zoom.scaleExtent()
    var translate0 = []
    var l = []
    var str = svg.attr('transform')
    console.log('str', str)

    if (!str) str = 'translate( 0 , 0 )  scale( 1 )'

    str = str.replace('translate(', '')
    str = str.replace('scale(', '').split(')')
    var translate = str[0].split(',')
    // view = {x: translate[0], y: translate[1], k: zoom.scale()};
    var view = { x: Number(translate[0]), y: Number(translate[1]), k: Number(str[1]) }

    d3.event.preventDefault()
    direction = (this.className === 'fangda') ? 1 : -1
    target_zoom = view.k * (1 + factor * direction)

    target_zoom = target_zoom < extent[0] ? extent[0] : target_zoom
    target_zoom = target_zoom > extent[1] ? extent[1] : target_zoom

    if (target_zoom < extent[0] || target_zoom > extent[1]) { return false }

    translate0 = [(center[0] - view.x) / view.k, (center[1] - view.y) / view.k]
    view.k = target_zoom
    l = [translate0[0] * view.k + view.x, translate0[1] * view.k + view.y]

    view.x += center[0] - l[0]
    view.y += center[1] - l[1]

    interpolateZoom([view.x, view.y], view.k)
  }

  function downloadfun() { // canvas图片转img下载功能
    var html = document.getElementsByTagName('html')[0]

    var Bwidth = html.clientWidth
    var Bheight = html.clientHeight
    var Bmax = Bwidth > Bheight ? Bwidth : Bheight
    var Bmin = Bwidth > Bheight ? Bheight : Bwidth

    var canvas = document.createElement('canvas')
    var g = document.querySelector('.gbox').getBBox()
    var svgbox = document.querySelector('#myD3 svg')
    var gbox = document.querySelector('.gbox')
    var x = (g.width / 2 - html.clientWidth / 2)
    var y = (g.height / 2 - html.clientheight / 2)
    // var y = 0;
    // g.y < 0 ? y = Math.abs(g.y) : y = 0
    // gbox.style.transform = "translate(" + x + 'px' + "," + (y-60) + "px" + ")  scale(1)"; //偏移位置
    gbox.style.transform = 'translate(' + x + 'px' + ',' + y + 'px' + ')  scale(1)'

    d3.select('.toolbox')
      .style('opacity', 0)

    d3.selectAll('.ring')
      .style('opacity', 0)

    // svgbox.style.width = g.width +100
    // svgbox.style.height = g.height+100

    var c = canvas.getContext('2d')
    var img = new Image()
    const s = new XMLSerializer().serializeToString(svgbox)
    console.log('s', s)
    // let news = handleStr(s)
    img.src = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(s)))}`
    img.onload = function() {
      const outdiv = document.querySelector(_selector)
      canvas.width = outdiv.clientWidth
      canvas.height = outdiv.clientHeight + 50
      c.fillStyle = '#fff'
      c.fillRect(0, 0, canvas.width, canvas.height)
      c.drawImage(img, 0, 0)
      const ImgBase64 = canvas.toDataURL('image/png')
      downloadFileByBase64(ImgBase64)
    }

    gbox.style.transform = ''
    // svgbox.style.width = Bmax
    // svgbox.style.height = Bmin
    d3.select('.toolbox')
      .style('opacity', 1)

    d3.selectAll('.ring')
      .style('opacity', 'none')
  }

  // function handleStr(s){

  //     let sub = s.substr(0,500)
  //     let newarr = sub.split('"')
  //     let t1 = newarr.indexOf(' transform=')
  //     newarr[t1+1] = "translate(0,0) scale(1)"
  //     let newsub = newarr.join('"')
  //     let newStr = newsub + s.substr(500)
  //     return newStr
  // }

  function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','); var mime = arr[0].match(/:(.*?);/)[1]
    var bstr = atob(arr[1]); var n = bstr.length; var u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }

  function downloadFile(url, name) {
    var a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('download', name)
    a.setAttribute('target', '_blank')
    const clickEvent = document.createEvent('MouseEvents')
    clickEvent.initEvent('click', true, true)
    a.dispatchEvent(clickEvent)
  }

  function downloadFileByBase64(base64) {
    var myBlob = dataURLtoBlob(base64)
    var myUrl = URL.createObjectURL(myBlob)
    const filename = options.DownLoadImgFileName
    downloadFile(myUrl, filename)
  }

  function changeNodeColor(g, c) {
    console.log('g', g)
    removeMenu(d3.select('.selected'))
    const str = '.Group' + (g - 1) + ' .outline'
    const str2 = '.colordiv' + (g)
    d3.selectAll(str)
      .style('fill', c)
      .style('stroke', c)

    d3.selectAll(str2)
      .style('fill', c)

    if (options.userPamas[Object.keys(options.userPamas)[g]]) {
      options.userPamas[Object.keys(options.userPamas)[g]].color = c
    }
  }

  function changeNodeTextPosition(x, y) {
    removeMenu(d3.select('.selected'))
    const alltext = d3.selectAll('.node text')
    alltext.attr('dy', function(d) {
      let fine
      if (y > 0) {
        fine = d.TextPosY + options.nodeRadius + y
      } else if (y < 0) {
        fine = d.TextPosY - options.nodeRadius + y
      } else {
        fine = d.TextPosY
      }
      userPamas[d.labels].NodeTextPosY = fine
      return fine
    })
      .attr('dx', function(d) {
        const fz = parseInt(d3.select(this).attr('font-size'))
        let fine
        if (x > 0) {
          fine = d.TextPosX + options.nodeRadius + x + d.name.length * fz / 2
        } else if (x < 0) {
          fine = d.TextPosX - options.nodeRadius + x - d.name.length * fz / 2
        } else {
          fine = d.TextPosX
        }
        userPamas[d.labels].NodeTextPosX = fine
        return fine
      })
  }

  function changeNodeTextFontSize(s) {
    removeMenu(d3.select('.selected'))
    d3.selectAll('.node text')
      .attr('font-size', function(d) {
        const doms = d3.select(this).attr('font-size')
        let fine
        if (doms && !isNaN(s)) {
          fine = parseInt(doms) + s
        } else if (doms) {
          fine = doms
        } else if (!isNaN(s)) {
          fine = s
        } else {
          fine = 0
        }
        userPamas[d.labels].NodeTextSize = fine
        return fine
      })
  }
  function changeNodeSize(s) {
    removeMenu(d3.select('.selected'))
    d3.selectAll('.node circle')
      .attr('r', function(d) {
        const domr = d3.select(this).attr('r')
        let fine
        if (domr && !isNaN(s)) {
          fine = parseInt(domr) + s
        } else if (domr) {
          fine = domr
        } else if (!isNaN(s)) {
          fine = s
        } else {
          fine = 0
        }
        options.nodeRadius = fine
        userPamas[d.labels].NodeSize = fine
        return fine
      })
    d3.selectAll('.node text')
      .attr('dy', function(d) {
        const dom = d3.select(this)
        const domDy = dom.attr('dy')
        if (domDy && parseInt(domDy) !== 0) {
          const temp = parseInt(domDy)

          if (temp === d.TextPosY) return temp
          else {
            return temp > 0 ? temp + s : temp - s
          }
        }

        return 0
      })
      .attr('dx', function() {
        const dom = d3.select(this)
        const domDx = dom.attr('dx')
        if (domDx && parseInt(domDx) !== 0) {
          const temp = parseInt(domDx)
          return temp > 0 ? temp + s : temp - s
        }

        return 0
      })

    tick()
  }

  function resetGraph() {
    nodes.forEach((item, i) => {
      if (item.hasRequest) {
        item.hasRequest = false
      }
    })
  }

  function ShowOrHideText(bool, id) {
    const op = bool ? 0 : 1
    const str = '.id' + id + ' text'
    d3.select(str).style('opacity', op)
  }

  //  信息展示框

  function appendInfoPanel(container) {
    return container.append('div')
      .attr('class', 'neo4jd3-info')
  }

  function appendInfoElement(cls, isNode, property, value) {
    var elem = info.append('span')

    elem
      .attr('class', cls)
      .html('<strong>' + property + '</strong>' + (value ? (': ' + value) : ''))

    if (!value) {
      elem.style('background-color', function(d) {
        return options.nodeOutlineFillColor ? options.nodeOutlineFillColor : (isNode ? class2color(property) : defaultColor())
      })
        .style('border-color', function(d) {
          return options.nodeOutlineFillColor ? class2darkenColor(options.nodeOutlineFillColor) : (isNode ? class2darkenColor(property) : defaultDarkenColor())
        })
        .style('color', function(d) {
          return options.nodeOutlineFillColor ? class2darkenColor(options.nodeOutlineFillColor) : '#fff'
        })
    }
  }

  function appendInfoElementClass(cls, node) {
    appendInfoElement(cls, true, node)
  }

  function appendInfoElementProperty(cls, property, value) {
    appendInfoElement(cls, false, property, value)
  }

  function appendInfoElementRelationship(cls, relationship) {
    appendInfoElement(cls, false, relationship)
  }
  //  信息展示框

  function appendNode() {
    return node.enter()
      .append('g')
    //    .attr('class', function(d) {
    //     //    var highlight, i,

    //         let    classes = 'node id' + d.id,

    //         //    label = d.labels;

    //     //    if (icon(d)) {
    //     //        classes += ' node-icon';
    //     //    }

    //     //    if (image(d)) {
    //     //        classes += ' node-image';
    //     //    }

    //     //    if (options.highlight) {
    //     //        for (i = 0; i < options.highlight.length; i++) {
    //     //            highLightName = options.highlight[i];

    //     //            if (label === highLightName) {
    //     //                classes += ' node-highlighted';
    //     //                break;
    //     //            }
    //     //        }
    //     //    }

    //         return classes;
    //    })
      .attr('class', function(d) {
        const arr = Object.keys(userPamas)

        const index = arr.indexOf(d.labels)
        if (index !== -1) {
          return 'node id' + d.id + ' Group' + index
        } else {
          return 'node id' + d.id
        }
      })
      .on('click', function(Single) {
        //    let selNode
        _options.clickNode()
        return false

        // if (d3.event.defaultPrevented) {
        //   return
        // }
        // if (options.show) {
        //   var _selNode = d3.select(this)
        //   if (_selNode.classed('selected')) {
        //     removeMenu(_selNode, Single)
        //   } else {
        //     // if(selNode){
        //     //     removeMenu(selNode,Single)
        //     // }
        //     Single.fixed = true
        //     Single.fx = Single.x
        //     Single.fy = Single.y

        //     _selNode.classed('selected', true)
        //     selNode = _selNode
        //     selD = Single

        //     var partition = d3.partition()
        //       .size([2 * Math.PI, 40 * 40])

        //     var arc = d3.arc()
        //       .startAngle(function(a, i) {
        //         return i * Math.PI * 2 / 3
        //       })
        //       .endAngle(function(a, i) {
        //         return (i + 1) * Math.PI * 2 / 3
        //       })
        //       .innerRadius(() => {
        //         return options.nodeRadius * 1.16
        //       })
        //       .outerRadius(() => { return options.nodeRadius + 30 })
        //     var rootNodes = { name: '1', children: [{ name: '11' }, { name: '12' }, { name: '13' }] }

        //     var roothierarchy = d3.hierarchy(rootNodes, function(d) { return d.children })
        //       .count()

        //     var linknodes = partition(roothierarchy)
        //     var links = roothierarchy.links(linknodes)

        //     var arcs = _selNode.selectAll('g')
        //       .data(links)
        //       .enter()
        //       .append('g')
        //       .attr('class', function() {
        //         return 'arcs' + Single.id
        //       })

        //     var arcspath = arcs.append('path')
        //       .attr('display', function() {
        //         // console.log('display', d)
        //         return node.depth ? null : null
        //       }) // hide inner ring
        //       .attr('d', arc)
        //       .style('stroke', '#fff')
        //       .style('fill', '#a5a5a5')
        //       .style('cursor', 'pointer')
        //       .on('click', function(d, i) {
        //         d3.event.stopPropagation()
        //         if (d.target.data.name == '11') {
        //           if (selD.showDetail && options.showDetailCallback && options.showDetailCallback instanceof Function) {
        //             options.showDetailCallback(selD)
        //             removeMenu(selNode, Single)
        //           } else {
        //             if (options.deleteCallback && options.deleteCallback instanceof Function) {
        //               var tempNodeLen = nodes.length
        //               var tempRelLen = relationships.length

        //               nodes = nodes.map(function(obj) {
        //                 return obj.index == selD.index ? null : obj
        //               })

        //               var tempRel = relationships.map(function(obj) {
        //                 return (obj.source.index == selD.index || obj.target.index == selD.index) ? obj : null
        //               })

        //               options.deleteCallback(selD, tempRel, function(flag) {
        //                 if (flag) {
        //                   deleteData(selD)
        //                 }
        //               })
        //             }
        //             removeMenu(selNode, Single)
        //           }
        //         } else if (d.target.data.name == '12') {
        //           if (options.enterNodeCallback && options.enterNodeCallback instanceof Function) {
        //             options.enterNodeCallback(selD)
        //           }
        //           // removeMenu(selNode,Single);
        //           // 增加节点
        //           const str = '.buttonText1' + Single.id

        //           putChildrenNodeAndRela(Single, str)
        //           // if(!Single.childrenNotOpen){

        //           //     // d3.selectAll('.node').each((d,i)=>{
        //           //     //     console.log('d', d)
        //           //     // })
        //           //     let childrenId = []
        //           //     let chReId = []
        //           //     let count1=0 , count2=0
        //           //     SingleNodeChild[Single.id] = {}
        //           //     SingleNodeChild[Single.id].nodes = Single.children.nodes
        //           //     SingleNodeChild[Single.id].relationships  = Single.children.relationships
        //           //     Single.children.nodes.forEach((item,i)=>{
        //           //         childrenId.push(item.id)
        //           //     })
        //           //     Single.children.relationships.forEach((item,i)=>{
        //           //         chReId.push(item.id)
        //           //     })
        //           //     d3.selectAll('.node').each(function(d,i){
        //           //         let index = childrenId.indexOf(d.id)
        //           //         if(index !== -1){
        //           //             d3.select(this).remove()
        //           //             nodes.splice((i-count1),1)
        //           //             count1++
        //           //             node.each(function(d,i){
        //           //                 if(d.id === childrenId[index]){
        //           //                     d3.select(this).remove()

        //           //                 }
        //           //             })
        //           //         }
        //           //     })
        //           //     d3.selectAll('.relationship').each(function(d,i){
        //           //         let index = chReId.indexOf(d.id)
        //           //         if(index !== -1){
        //           //             d3.select(this).remove()
        //           //             relationships.splice((i-count2),1)
        //           //             count2++
        //           //             relationship.each(function(d,i){
        //           //                 if(d.target.id === chReId[index] || d.source.id === chReId[index]){
        //           //                     d3.select(this).remove()

        //           //                 }
        //           //             })
        //           //         }
        //           //     })
        //           //     Single.childrenNotOpen = true
        //           //     d3.select(str)
        //           //         // .html('&#xf00d')
        //           //         .html('&#xf0b2')

        //           // }else if(SingleNodeChild[Single.id] && Single.childrenNotOpen && SingleNodeChild[Single.id].nodes){

        //           //     updateNodesAndRelationships(SingleNodeChild[Single.id].nodes,SingleNodeChild[Single.id].relationships)
        //           //     tick()
        //           //     simulation.alphaTarget(0.0015).velocityDecay(0.1).restart();

        //           //     delete SingleNodeChild[Single.id]
        //           //     d3.select(str)
        //           //         .html('&#xf066')
        //           //     Single.childrenNotOpen = false

        //           // }else if(!SingleNodeChild[Single.id] &&  Single.childrenNotOpen &&  !Single.hasRequest){

        //           //     if(options.getClickNodeChildrenData && options.getClickNodeChildrenData instanceof Function){
        //           //         options.getClickNodeChildrenData(Single).then(res=>{
        //           //             if(res.nodes.length === 0 ) return
        //           //             Single.children = res
        //           //             let newData = updataNodesChildren(res,true)
        //           //             updateWithD3Data(newData)
        //           //             tick()
        //           //             simulation.alphaTarget(0.0015).velocityDecay(0.1).restart();

        //           //             d3.select(str)
        //           //             .html('&#xf066')

        //           //             Single.hasRequest = true
        //           //             Single.childrenNotOpen = false

        //           //         })

        //           //     }
        //           //     // let newData = updataNodesChildren(Single.children,true)
        //           //     // updateWithD3Data(newData)
        //           //     // tick()
        //           //     // Single.childrenNotOpen = false
        //           //     // d3.select('.buttonText1')
        //           //     //     .html('&#xf066')
        //           // }
        //         } else {
        //           if (options.showDetailCallback && options.showDetailCallback instanceof Function) {
        //             options.showDetailCallback(selD)
        //             removeMenu(selNode, Single)
        //           } else {
        //             removeMenu(selNode, Single)
        //           }
        //         }
        //       })
        //       .on('dblclick', function(d, i) {
        //         d3.event.stopPropagation()
        //       })
        //       .on('mouseover', function(d) {
        //         d3.select(this)
        //           .style('fill', '#666')
        //       })
        //       .on('mouseout', function(d) {
        //         d3.select(this)
        //           .transition()
        //           .duration(200)
        //           .style('fill', '#a5a5a5')

        //         highlightObject(null)
        //       })
        //       .on('mousedown.drag', function() {
        //         return d3.event.stopPropagation()
        //       })

        //     arcs.append('text')
        //       .attr('class', function(d, i) { return 'buttonText' + i + Single.id })
        //       .style('font-size', '12px')
        //       .style('font-family', 'FontAwesome')
        //       .style('fill', '#fff')
        //       .style('cursor', 'pointer')
        //       .attr('text-anchor', 'middle')
        //       .attr('font-family', 'FontAwesome')
        //       .attr('transform', function(d, i) {
        //         i = 2 * i + 1
        //         return 'translate(' + Math.sin(i * Math.PI / 3) * (options.nodeRadius + 18) + ',' + -Math.cos(i * Math.PI / 3) * (options.nodeRadius + 23) + ')'
        //         // return "translate(" +Math.sin(i*Math.PI/3)*(options.nodeRadius + 18)+ "," + -Math.cos(i*Math.PI/3 )*48*(options.nodeRadius/25) + ")";
        //       })
        //       .html(function(d, i) {
        //         if (i == 0) {
        //           return '&#xf06e'
        //         } else if (i == 1) {
        //           return Single.childrenNotOpen ? '&#xf0b2' : '&#xf066'
        //         } else if (i == 2) {
        //           return '&#xf00d'
        //         } else if (i == 3) {
        //           return '&#xf09c'
        //         }
        //       })
        //       .on('click', function(d, i) {
        //         d3.event.stopPropagation()
        //         if (d.target.data.name == '11') {
        //           if (selD.showDetail && options.showDetailCallback && options.showDetailCallback instanceof Function) {
        //             options.showDetailCallback(selD)
        //             removeMenu(selNode, Single)
        //           } else {
        //             if (options.deleteCallback && options.deleteCallback instanceof Function) {
        //               var tempNodeLen = nodes.length
        //               var tempRelLen = relationships.length

        //               nodes = nodes.map(function(obj) {
        //                 return obj.index == selD.index ? null : obj
        //               })

        //               var tempRel = relationships.map(function(obj) {
        //                 return (obj.source.index == selD.index || obj.target.index == selD.index) ? obj : null
        //               })

        //               options.deleteCallback(selD, tempRel, function(flag) {
        //                 if (flag) {
        //                   deleteData(selD)
        //                 }
        //               })
        //             }
        //           }
        //         } else if (d.target.data.name == '12') {
        //           // updateData(selD);
        //           if (options.enterNodeCallback && options.enterNodeCallback instanceof Function) {
        //             options.enterNodeCallback(selD)
        //           }
        //           removeMenu(selNode, Single)
        //         } else {
        //           if (options.isProc && options.showDetailCallback && options.showDetailCallback instanceof Function) {
        //             options.showDetailCallback(selD)
        //             removeMenu(selNode, Single)
        //           } else {
        //             removeMenu(selNode, Single)
        //           }
        //         }
        //       })
        //       .on('mouseover', function(d) {

        //       })
        //       .on('mouseout', function(d) {

        //       })

        //     showArcs = arcs
        //   }
        // }
        // //    d.fx = d.fy = null;

        // if (typeof options.onNodeClick === 'function') {
        //   options.onNodeClick(Single)
        // }
      })
      .on('dblclick', function(d) {
        //    stickNode(d);
        if (typeof options.onNodeDoubleClick === 'function') {
          options.onNodeDoubleClick(d)
        }
      })
      .on('mouseenter', function(d) {
        if (info) {
          //    左上角信息展示
          updateInfo(d)
        }

        highlightObject(d)

        if (typeof options.onNodeMouseEnter === 'function') {
          options.onNodeMouseEnter(d)
        }
      })
      .on('mouseleave', function(d) {
        //    if (info) {
        //        clearInfo(d);
        //    }

        highlightObject(null)

        if (typeof options.onNodeMouseLeave === 'function') {
          options.onNodeMouseLeave(d)
        }
      })
      .call(d3.drag()
        .on('start', dragStarted)
        .on('drag', dragged)
        .on('end', dragEnded))
      .on('collide', d3.forceCollide().radius(100))
  }

  //   function putChildrenNodeAndRela(Single, str) {
  //     if (!Single.childrenNotOpen) {
  //       // d3.selectAll('.node').each((d,i)=>{
  //       //     console.log('d', d)
  //       // })
  //       const childrenId = []
  //       const chReId = []
  //       let count1 = 0; let count2 = 0
  //       SingleNodeChild[Single.id] = {}
  //       SingleNodeChild[Single.id].nodes = Single.children.nodes
  //       SingleNodeChild[Single.id].relationships = Single.children.relationships
  //       Single.children.nodes.forEach((item, i) => {
  //         childrenId.push(item.id)
  //       })
  //       Single.children.relationships.forEach((item, i) => {
  //         chReId.push(item.id)
  //       })
  //       d3.selectAll('.node').each(function(d, i) {
  //         const index = childrenId.indexOf(d.id)
  //         if (index !== -1) {
  //           d3.select(this).remove()
  //           nodes.splice((i - count1), 1)
  //           count1++
  //           node.each(function(d, i) {
  //             if (d.id === childrenId[index]) {
  //               d3.select(this).remove()
  //             }
  //           })
  //         }
  //       })
  //       d3.selectAll('.relationship').each(function(d, i) {
  //         const index = chReId.indexOf(d.id)
  //         if (index !== -1) {
  //           d3.select(this).remove()
  //           relationships.splice((i - count2), 1)
  //           count2++
  //           relationship.each(function(d, i) {
  //             if (d.target.id === chReId[index] || d.source.id === chReId[index]) {
  //               d3.select(this).remove()
  //             }
  //           })
  //         }
  //       })
  //       Single.childrenNotOpen = true
  //       d3.select(str)
  //         .html('&#xf0b2')
  //     } else if (SingleNodeChild[Single.id] && Single.childrenNotOpen && SingleNodeChild[Single.id].nodes) {
  //       updateNodesAndRelationships(SingleNodeChild[Single.id].nodes, SingleNodeChild[Single.id].relationships)
  //       tick()
  //       simulation.alphaTarget(0.0015).velocityDecay(0.1).restart()

  //       delete SingleNodeChild[Single.id]
  //       d3.select(str)
  //         .html('&#xf066')
  //       Single.childrenNotOpen = false
  //     } else if (!SingleNodeChild[Single.id] && Single.childrenNotOpen && !Single.hasRequest) {
  //       if (options.getClickNodeChildrenData && options.getClickNodeChildrenData instanceof Function) {
  //         options.getClickNodeChildrenData(Single).then(res => {
  //           if (res.nodes.length === 0) return
  //           Single.children = res
  //           const newData = updataNodesChildren(res, true)
  //           updateWithD3Data(newData)
  //           tick()
  //           simulation.alphaTarget(0.0015).velocityDecay(0.1).restart()

  //           d3.select(str)
  //             .html('&#xf066')

  //           Single.hasRequest = true
  //           Single.childrenNotOpen = false
  //         })
  //       }
  //     }
  //   }

  function updataNodesChildren(obj, bool) {
    const data = {
      nodes: [],
      relationships: []
    }
    data.nodes = obj.nodes
    if (bool && obj.nodes && obj.nodes.length > 0) {
      obj.nodes.forEach((item, i) => {
        item.isChild = true
      })
    }
    data.relationships = obj.relationships
    data.nodes.forEach((item, index) => {
      item.x = obj.nodes[index].x,
      item.y = obj.nodes[index].y
      item.childrenNotOpen = true
    })
    data.relationships.forEach((item, index) => {
      item.source = item.startNode
      item.target = item.endNode
      item.linknum = 0

      let key

      const arrname = item.startNode + '|' + item.endNode
      const arrname2 = item.endNode + '|' + item.startNode
      for (let i = index + 1; i < data.relationships.length; i++) {
        if (data.relationships[i].startNode === item.startNode && data.relationships[i].endNode === item.endNode) {
          item.hasSame = true

          data.relationships[i].hasSame = true
        } else if (data.relationships[i].startNode === item.endNode && data.relationships[i].endNode === item.startNode) {
          item.hasSame = true
          data.relationships[i].hasSame = true
        }
      }
      if (item.hasSame) {
        if (!sameRelations[arrname] && !sameRelations[arrname2]) {
          sameRelations[arrname] = []
          key = arrname
          item.direction = 1
        } else if (Array.isArray(sameRelations[arrname])) {
          key = arrname
          item.direction = 1
        } else if (Array.isArray(sameRelations[arrname2])) {
          key = arrname2
          item.direction = -1
        }
        sameRelations[key].push(item)

        // //  给有相同relation的node打上标记
      }
    })
    console.log('sameRelations', sameRelations)

    for (const key in sameRelations) {
      const len = sameRelations[key].length
      let count = 0
      let flag
      if (len % 2 !== 0) {
        sameRelations[key].forEach((item, i) => {
          if (i !== 0) {
            if (i % 2 !== 0) {
              flag = -1
              count++
            } else {
              flag = 1
            }
            item.linknum = count * flag
          }
        })
      } else {
        sameRelations[key].forEach((item, i) => {
          if (i % 2 !== 0) {
            flag = -1
          } else {
            flag = 1
            count++
          }
          item.linknum = count * flag
        })
      }
    }

    return data
  }

  function highlightObject(obj) {
    if (obj) {
      var objId = obj.id
      dependsNode = dependsNode.concat([objId])
      relationships.forEach(function(lkItem) {
        if (objId === lkItem['source']['id']) {
          dependsNode = dependsNode.concat([lkItem.target.id])
        } else if (objId === lkItem['target']['id']) {
          dependsNode = dependsNode.concat([lkItem.source.id])
        }
      })

      // 隐藏
      svg.selectAll('.relationship').filter(function(d) {
        return (dependsNode.indexOf(d.source.id) == -1 || dependsNode.indexOf(d.target.id) == -1)
      }).transition().duration(100).style('opacity', 0.1)

      svg.selectAll('.node').filter(function(d, i) {
        return ((dependsNode.indexOf(d.id) == -1))
      }).transition().duration(100).style('opacity', 0.1)
    } else {
      // 取消高亮
      svg.selectAll('.relationship').filter(function() {
        return true
      }).transition().duration(100).style('opacity', 1)

      svg.selectAll('.node').filter(function(d, i) {
        return ((dependsNode.indexOf(d.id) == -1))
      }).transition().duration(100).style('opacity', 1)
      // highlighted = null,
      dependsNode = []
    }
  }

  function removeMenu(selNode, d) {
    // if(selNode.size() === 0) return
    if (!d) return
    d.fixed = false
    d.fx = null
    d.fy = null
    selNode.classed('selected', false)
    // showArcs.remove();
    // selNode = null;

    const str = '.arcs' + d.id
    d3.selectAll(str).remove()
  }

  function appendNodeToGraph() {
    var n = appendNode()
    appendRingToNode(n)
    appendOutlineToNode(n)

    appendTextToNode(n)
    if (options.images) {
      appendImageToNode(n)
    }

    return n
  }

  function appendOutlineToNode(node) {
    return node.append('circle')
      .attr('class', 'outline')
      .attr('r', function(d) {
        if (userPamas[d.labels].NodeSize) {
          return userPamas[d.labels].NodeSize
        } else {
          return options.nodeRadius
        }
      })
      .style('fill', function(d) {
        let color
        // if(Array.isArray(options.userPamas.ColorInfo) && options.userPamas.ColorInfo.length> 0 ){
        if (options.userPamas[d.labels]) {
          // options.userPamas.ColorInfo.forEach((item,i)=>{
          //         if(item.info === d.labels){
          //             color = item.color
          //         }
          // })
          color = options.userPamas[d.labels].color
        }

        return color || '#405f9e'

        //    return options.nodeOutlineFillColor ? options.nodeOutlineFillColor : class2color(d.labels);
      })
      .style('stroke', function(d) {
        //    return options.nodeOutlineFillColor ? class2darkenColor(options.nodeOutlineFillColor) : class2darkenColor(d.labels);
        let color
        // if(Array.isArray(options.userPamas.ColorInfo) && options.userPamas.ColorInfo.length> 0 ){
        //     options.userPamas.ColorInfo.forEach((item,i)=>{
        //             if(item.info === d.labels){
        //                 color = item.color
        //             }
        //     })
        // }
        if (options.userPamas[d.labels]) {
          color = options.userPamas[d.labels].color
        }

        return color || '#405f9e'
      })
      .append('title').text(function(d) {
        return d.name
      })
  }

  function appendRingToNode(node) {
    return node.append('circle')
      .attr('class', 'ring')
      .attr('r', function(d) {
        // console.log('userPamas',userPamas )
        // console.log('d.labels',d.labels )
        if (userPamas[d.labels].NodeSize) {
          return userPamas[d.labels].NodeSize
        } else {
          return options.nodeRadius * 1.16
        }
      })
      .attr('fill', 'rgba(255,255,255,0)')
      .append('title').text(function(d) {
        return d.name
      })
  }

  // function appendTextToNode(node) {
  //     return node.append('text')
  //                .attr('class', function(d) {
  //                    return 'text' + (icon(d) ? ' icon' : '');
  //                })
  //                .attr('fill', '#ffffff')
  //                .attr('font-size', function(d) {
  //                    return icon(d) ? (options.nodeRadius + 'px') : '10px';
  //                })
  //                .attr('pointer-events', 'none')
  //                .attr('text-anchor', 'middle')
  //                .attr('y', function(d) {
  //                    return icon(d) ? (parseInt(Math.round(options.nodeRadius * 0.32)) + 'px') : '4px';
  //                })
  //                .html(function(d) {
  //                    var _icon = icon(d);
  //                    return _icon ? '&#x' + _icon : d.id;
  //                });
  // }
  function appendTextToNode(node) {
    return node.append('text')
      .attr('class', 'text')
      .style('fill', function(d) {
        return '#000'
      })
      .attr('cursor', 'pointer')
      .attr('text-anchor', 'middle')
      .attr('font-size', function(d) {
        if (userPamas[d.labels].NodeTextSize) {
          return userPamas[d.labels].NodeTextSize
        } else {
          return 10
        }
      })
      .attr('dy', function(d) {
        d.TextPosX = 0
        // if(d.labels.length>10){
        //     d.TextPosY = 10
        //     // return 10
        //     if(!isNaN(userPamas[d.labels].NodeTextPosY)){
        //         return 10 + userPamas[d.labels].NodeTextPosY
        //     }else {
        //         return 10
        //     }
        // }else if(d.labels.length == 10){
        //     d.TextPosY = -3

        //     // return -3
        //     if(!isNaN(userPamas[d.labels].NodeTextPosY)){
        //         return -3 + userPamas[d.labels].NodeTextPosY
        //     }else {
        //         return -3
        //     }

        // }else {

        d.TextPosY = 3
        if (!isNaN(userPamas[d.labels].NodeTextPosY)) {
          return 3 + userPamas[d.labels].NodeTextPosY
        } else {
          return 3
        }
        // }
      })
      .attr('dx', function(d) {
        d.TextPosX = 0
        // return 0 + userPamas.NodeTextPosX
        if (!isNaN(userPamas[d.labels].NodeTextPosX)) {
          return userPamas[d.labels].NodeTextPosX
        } else {
          return 0
        }
      })
      .text(function(d) {
        // return d.name;
        // if(d.labels.length>5 && !d.TextOpened){
        //         // appendDubbleTextToNode(d.id,6)
        //         return d.labels.slice(0,5)
        // }else {
        //     return d.labels
        // }

        // if(!userPamas[d.labels].NodeTextPosY && !userPamas[d.labels].NodeTextPosX) {
        //     if(d.name.length>5 && !d.TextOpened){
        //                 appendDubbleTextToNode(d.id,6)
        //                 return d.name.slice(0,5)
        //         }

        // }else {
        //     return d.name
        // }

        return d.name

        // d.TextOpened = false
        // console.log('d.name', d)
      })
    // .append('title').text(function(d) {
    //     return d.name
    // })
  }
  function appendDubbleTextToNode(id, leng) {
    const str = '.id' + id
    const thisnode = d3.select(str)
    return thisnode.append('text')
      .attr('class', 'text')
      .style('fill', function(d) {
        return '#fff'
      })
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('dy', function(d) {
        if (leng === 6) {
          if (d.name.length > 10) {
            return 3
          } else {
            return 9
          }
        } else if (leng === 11) {
          return 17
        }
      })
      .text(function(d) {
        if (leng === 6) {
          if (d.labels.length > 10) {
            appendDubbleTextToNode(d.index, 11)
          }
          return d.labels.slice(5, 10)
        } else if (leng === 11) {
          if (d.labels.length > 15) {
            return d.labels.slice(10, 14) + '...'
          } else {
            return d.labels.slice(10)
          }
        }
      })
      .append('title').text(function(d) {
        return d.name
      })
  }

  // function appendRandomDataToNode(d) {
  //     var data = updataNodesChildren(d);
  //     updateWithNeo4jData(data);
  // }

  function appendRelationship() {
    return relationship.enter()
      .append('g')
      .attr('class', function(d) {
        return 'relationship RelationId' + d.id
      })
      .on('dblclick', function(d) {
        if (typeof options.onRelationshipDoubleClick === 'function') {
          options.onRelationshipDoubleClick(d)
        }
      })

    // 显示连接线的右上角显示框
    //    .on('mouseenter', function(d) {
    //        if (info) {
    //            updateInfo(d);
    //        }
    //    });
  }

  function appendOutlineToRelationship(r) {
    return r.append('path')
      .attr('class', 'outline')
      .attr('fill', '#a5abb6')
      .attr('stroke', 'none')
  }

  function appendOverlayToRelationship(r) {
    return r.append('path')
      .attr('class', 'overlay')
      .attr('fill', 'rgba(255,255,255,0)')
      .on('click', function(d) {
        if (options.RelationClick && options.RelationClick instanceof Function) {
          options.RelationClick(d)
        }
      })
  }

  function appendTextToRelationship(r) {
    return r.append('text')
      .attr('class', 'text')
      .attr('fill', '#000000')
      .attr('font-size', '8px')
      .attr('pointer-events', 'none')
      .attr('text-anchor', 'middle')
      .text(function(d) {
        return d.type
      })
  }

  function appendRelationshipToGraph() {
    var relationship = appendRelationship()
    var text = appendTextToRelationship(relationship)
    var outline = appendOutlineToRelationship(relationship)
    var overlay = appendOverlayToRelationship(relationship)
    Arrow = appendArrowToRelationship(relationship)

    return {
      outline: outline,
      overlay: overlay,
      relationship: relationship,
      text: text,
      Arrow: Arrow
    }
  }

  function class2color(cls) {
    var color = classes2colors[cls]

    if (!color) {
      color = options.colors[numClasses % options.colors.length]
      classes2colors[cls] = color
      numClasses++
    }

    return color
  }

  function class2darkenColor(cls) {
    return d3.rgb(class2color(cls)).darker(1)
  }

  function clearInfo() {
    info.html('')
  }

  function color() {
    return options.colors[options.colors.length * Math.random() << 0]
  }

  function colors() {
    // d3.schemeCategory10,
    // d3.schemeCategory20,
    return [
      '#68bdf6', // light blue
      '#6dce9e', // green #1
      '#faafc2', // light pink
      '#f2baf6', // purple
      '#ff928c', // light red
      '#fcea7e', // light yellow
      '#ffc766', // light orange
      '#405f9e', // navy blue
      '#a5abb6', // dark gray
      '#78cecb', // green #2,
      '#b88cbb', // dark purple
      '#ced2d9', // light gray
      '#e84646', // dark red
      '#fa5f86', // dark pink
      '#ffab1a', // dark orange
      '#fcda19', // dark yellow
      '#797b80', // black
      '#c9d96f', // pistacchio
      '#47991f', // green #3
      '#70edee', // turquoise
      '#ff75ea' // pink
    ]
  }

  function contains(array, id) {
    var filter = array.filter(function(elem) {
      return elem.id === id
    })

    return filter.length > 0
  }

  function defaultColor() {
    return options.relationshipColor
  }

  function defaultDarkenColor() {
    return d3.rgb(options.colors[options.colors.length - 1]).darker(1)
  }

  function dragEnded(d) {
    if (!d3.event.active) {
      simulation.alphaTarget(0)
    }
    if (d.fixed) {
      d.fx = d.x
      d.fy = d.y
    } else {
      d.fx = null
      d.fy = null
    }
    d3.selectAll('.node')
      .on('mouseenter', function(d) {
        highlightObject(d)
      })
    if (typeof options.onNodeDragEnd === 'function') {
      options.onNodeDragEnd(d)
    }
  }

  function dragged(d) {
    stickNode(d)
  }

  function dragStarted(d) {
    if (!d3.event.active) {
      simulation.alphaTarget(0.3).restart()
      d3.selectAll('.node')
        .on('mouseenter', function(d) {
          return false
        })
    }

    d.fx = d.x
    d.fy = d.y

    if (typeof options.onNodeDragStart === 'function') {
      options.onNodeDragStart(d)
    }
  }

  function extend(obj1, obj2) {
    var obj = {}

    merge(obj, obj1)
    merge(obj, obj2)

    return obj
  }

  function icon(d) {
    var code

    if (options.iconMap && options.showIcons && options.icons) {
      if (options.icons[d.labels] && options.iconMap[options.icons[d.labels]]) {
        code = options.iconMap[options.icons[d.labels]]
      } else if (options.iconMap[d.labels]) {
        code = options.iconMap[d.labels]
      } else if (options.icons[d.labels]) {
        code = options.icons[d.labels]
      }
    }

    return code
  }

  function image(d) {
    var i, imagesForLabel, img, imgLevel, label, labelPropertyValue, property, value

    if (options.images) {
      imagesForLabel = options.imageMap[d.labels]

      if (imagesForLabel) {
        imgLevel = 0

        for (i = 0; i < imagesForLabel.length; i++) {
          labelPropertyValue = imagesForLabel[i].split('|')

          switch (labelPropertyValue.length) {
            case 3:
              value = labelPropertyValue[2]
              /* falls through */
            case 2:
              property = labelPropertyValue[1]
              /* falls through */
            case 1:
              label = labelPropertyValue[0]
          }

          if (d.labels === label &&
                        (!property || d.properties[property] !== undefined) &&
                        (!value || d.properties[property] === value)) {
            if (labelPropertyValue.length > imgLevel) {
              img = options.images[imagesForLabel[i]]
              imgLevel = labelPropertyValue.length
            }
          }
        }
      }
    }

    return img
  }

  function init(_selector, _options) {
    // if(options.iconMap){
    //     initIconMap();
    // }

    merge(options, _options)
    merge(userPamas, options.userPamas)
    oldnodeRadius = options.nodeRadius

    if (options.icons) {
      options.showIcons = true
    }

    if (!options.minCollision) {
      options.minCollision = options.nodeRadius * 2
    }

    // if(options.images){
    //     initImageMap();
    // }

    const allutton = d3.selectAll('.fangda' + ',' + ' .suoxiao')
      .on('click', zoomClick)

    selector = _selector

    container = d3.select(selector)

    container.attr('class', 'neo4jd3')
      .html('')

    if (options.infoPanel) {
      info = appendInfoPanel(container)
    }

    appendGraph(container)
    if (!_options.isNoColorTool) {
      appendColorInfo()
      AppendToolBox()
    }
    simulation = initSimulation()

    if (options.neo4jData) {
      loadNeo4jData(options.neo4jData)
    }
    // else if (options.neo4jDataUrl) {
    //     loadNeo4jDataFromUrl(options.neo4jDataUrl);
    // }
    else {
      console.error('no Data 数据源出错')
    }

    // simulation = initSimulation();
  }
  function getSameRelationNodeId() {
    const arr = Object.keys(sameRelations)
    const newarr = []
    if (arr.length > 0) {
      arr.forEach((item, i) => {
        Array.prototype.push.apply(newarr, item.split('|'))
      })
    }
    console.log('newarr', newarr)
    return newarr
  }

  function initIconMap() {
    Object.keys(options.iconMap).forEach(function(key, index) {
      var keys = key.split(',')
      var value = options.iconMap[key]

      keys.forEach(function(key) {
        options.iconMap[key] = value
      })
    })
  }

  function initImageMap() {
    var key, keys, selector

    for (key in options.images) {
      if (options.images.hasOwnProperty(key)) {
        keys = key.split('|')

        if (!options.imageMap[keys[0]]) {
          options.imageMap[keys[0]] = [key]
        } else {
          options.imageMap[keys[0]].push(key)
        }
      }
    }
  }

  function initSimulation() {
    var simulation = d3.forceSimulation()
    //                           .velocityDecay(0.8)
    //                           .force('x', d3.force().strength(0.002))
    //                           .force('y', d3.force().strength(0.002))
      .force('collide', d3.forceCollide().radius(function(d) {
        if (d.isMulitChild) {
          //    console.log('就是这个节点',d )
          return 100
        }
        return options.minCollision
      }).strength(0.05).iterations(5))
    //    .force('charge', d3.forceManyBody())
    //    .force('charge', d3.forceManyBody().strength([-100]))
      .force('link', d3.forceLink().id(function(d) { return d.id }).distance(function(d) { return 20 }))
      .force('center', d3.forceCenter(svg.node().parentElement.parentElement.clientWidth / 2, svg.node().parentElement.parentElement.clientHeight / 2))
      .on('tick', function() {
        tick()
      })
      .velocityDecay(0.2)
    //    .force("collide", d3.forceCollide().radius(50).strength(0.2).iterations(5))
      .on('end', function() {
        if (options.zoomFit && !justLoaded) {
          //    justLoaded = true;
          zoomFit(2)
        }
      })

    return simulation
  }

  function loadNeo4jData() {
    nodes = []
    relationships = []

    updateWithNeo4jData(options.neo4jData)
  }

  function loadNeo4jDataFromUrl(neo4jDataUrl) {
    nodes = []
    relationships = []

    d3.json(neo4jDataUrl, function(error, data) {
      if (error) {
        throw error
      }

      updateWithNeo4jData(data)
    })
  }

  function merge(target, source) {
    Object.keys(source).forEach(function(property) {
      target[property] = source[property]
    })
  }

  function neo4jDataToD3Data(data) {
    var graph = {
      nodes: [],
      relationships: []
    }

    data.nodes.forEach(function(node) {
      if (!contains(graph.nodes, node.id)) {
        node.childrenNotOpen = true
        graph.nodes.push(node)
      }
    })

    data.relationships.forEach(function(relationship) {
      relationship.source = relationship.startNode
      relationship.target = relationship.endNode
      graph.relationships.push(relationship)
    })

    data.relationships.sort(function(a, b) {
      if (a.source > b.source) {
        return 1
      } else if (a.source < b.source) {
        return -1
      } else {
        if (a.target > b.target) {
          return 1
        }

        if (a.target < b.target) {
          return -1
        } else {
          return 0
        }
      }
    })
    data.relationships.forEach((item, index) => {
      item.source = item.startNode
      item.target = item.endNode
      item.linknum = 0
      let key

      const arrname = item.startNode + '|' + item.endNode
      const arrname2 = item.endNode + '|' + item.startNode

      for (let i = index + 1; i < data.relationships.length; i++) {
        if (data.relationships[i].startNode === item.startNode && data.relationships[i].endNode === item.endNode) {
          item.hasSame = true
          data.relationships[i].hasSame = true
        } else if (data.relationships[i].startNode === item.endNode && data.relationships[i].endNode === item.startNode) {
          item.hasSame = true
          data.relationships[i].hasSame = true
        }
      }
      if (item.hasSame) {
        if (!sameRelations[arrname] && !sameRelations[arrname2]) {
          sameRelations[arrname] = []
          key = arrname
          item.direction = 1
        } else if (Array.isArray(sameRelations[arrname])) {
          key = arrname
          item.direction = 1
        } else if (Array.isArray(sameRelations[arrname2])) {
          key = arrname2
          item.direction = -1
        }
        sameRelations[key].push(item)
      }
    })

    for (const key in sameRelations) {
      const len = sameRelations[key].length
      let count = 0
      let flag
      if (len % 2 !== 0) {
        sameRelations[key].forEach((item, i) => {
          if (i !== 0) {
            if (i % 2 !== 0) {
              flag = -1
              count++
            } else {
              flag = 1
            }
            item.linknum = count * flag
          }
        })
      } else {
        sameRelations[key].forEach((item, i) => {
          if (i % 2 !== 0) {
            flag = -1
          } else {
            flag = 1
            count++
          }
          item.linknum = count * flag
        })
      }
    }

    // console.log('data.relationships',data.relationships )
    // console.log('sameRelations', sameRelations)

    return graph
  }

  // function updataNodesChildren(d, maxNodesToGenerate) {
  //     var data = {
  //             nodes: [],
  //             relationships: []
  //         },
  //         i,
  //         label,
  //         node,
  //         numNodes = (maxNodesToGenerate * Math.random() << 0) + 1,
  //         relationship,
  //         s = size();

  //     for (i = 0; i < numNodes; i++) {
  //         label = randomLabel();

  //         node = {
  //             id: s.nodes + 1 + i,
  //             labels: [label],
  //             properties: {
  //                 random: label
  //             },
  //             x: d.x,
  //             y: d.y
  //         };

  //         data.nodes[data.nodes.length] = node;

  //         relationship = {
  //             id: s.relationships + 1 + i,
  //             type: label.toUpperCase(),
  //             startNode: d.id,
  //             endNode: s.nodes + 1 + i,
  //             properties: {
  //                 from: Date.now()
  //             },
  //             source: d.id,
  //             target: s.nodes + 1 + i,
  //             linknum: s.relationships + 1 + i
  //         };

  //         data.relationships[data.relationships.length] = relationship;
  //     }

  //     return data;
  // }

  // function randomLabel() {
  //     var icons = Object.keys(options.iconMap);
  //     return icons[icons.length * Math.random() << 0];
  // }

  function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle
    var cos = Math.cos(radians)
    var sin = Math.sin(radians)
    var nx = (cos * (x - cx)) + (sin * (y - cy)) + cx
    var ny = (cos * (y - cy)) - (sin * (x - cx)) + cy

    return { x: nx, y: ny }
  }

  function rotatePoint(c, p, angle) {
    return rotate(c.x, c.y, p.x, p.y, angle)
  }

  function rotation(source, target) {
    return Math.atan2(target.y - source.y, target.x - source.x) * 180 / Math.PI
  }

  function size() {
    return {
      nodes: nodes.length,
      relationships: relationships.length
    }
  }
  /*
    function smoothTransform(elem, translate, scale) {
        var animationMilliseconds = 5000,
            timeoutMilliseconds = 50,
            steps = parseInt(animationMilliseconds / timeoutMilliseconds);

        setTimeout(function() {
            smoothTransformStep(elem, translate, scale, timeoutMilliseconds, 1, steps);
        }, timeoutMilliseconds);
    }

    function smoothTransformStep(elem, translate, scale, timeoutMilliseconds, step, steps) {
        var progress = step / steps;

        elem.attr('transform', 'translate(' + (translate[0] * progress) + ', ' + (translate[1] * progress) + ') scale(' + (scale * progress) + ')');

        if (step < steps) {
            setTimeout(function() {
                smoothTransformStep(elem, translate, scale, timeoutMilliseconds, step + 1, steps);
            }, timeoutMilliseconds);
        }
    }
*/
  function stickNode(d) {
    d.fx = d3.event.x
    d.fy = d3.event.y
  }

  function tick() {
    tickNodes()
    tickRelationships()
  }

  function tickNodes() {
    if (node) {
      node.attr('transform', function(d) {
        return 'translate(' + d.x + ', ' + d.y + ')'
      })
    }
  }

  function tickRelationships() {
    if (relationship) {
      relationship.attr('transform', function(d) {
        var angle = rotation(d.source, d.target)
        return 'translate(' + d.source.x + ', ' + d.source.y + ') rotate(' + angle + ')'
      })

      tickRelationshipsTexts()
      tickRelationshipsOutlines()
      tickRelationshipsOverlays()
      tickRelationshipsArrow()
    }
  }
  function tickRelationshipsArrow() {
    relationship.each(function() {
      var rel = d3.select(this)
      var arrow = rel.select('.Arrow')

      arrow.attr('d', function(d) {
        if (d.linknum !== 0) {
          var center = { x: 0, y: 0 }
          var angle = rotation(d.source, d.target)
          var u = unitaryVector(d.source, d.target)

          var n = unitaryNormalVector(d.source, d.target)

          var rotatedPointC2 = rotatePoint(center, { x: d.target.x - d.source.x - (options.nodeRadius + 1) * u.x - n.x + (n.x - u.x) * options.arrowSize, y: d.target.y - d.source.y - (options.nodeRadius + 1) * u.y - n.y + (n.y - u.y) * options.arrowSize }, angle)
          var rotatedPointD2 = rotatePoint(center, { x: d.target.x - d.source.x - (options.nodeRadius + 1) * u.x, y: d.target.y - d.source.y - (options.nodeRadius + 1) * u.y }, angle)
          var rotatedPointE2 = rotatePoint(center, { x: d.target.x - d.source.x - (options.nodeRadius + 1) * u.x + (-n.x - u.x) * options.arrowSize, y: d.target.y - d.source.y - (options.nodeRadius + 1) * u.y + (-n.y - u.y) * options.arrowSize }, angle)
          var rotatedPointF2 = rotatePoint(center, { x: d.target.x - d.source.x - (options.nodeRadius + 1) * u.x - u.x * options.arrowSize, y: d.target.y - d.source.y - (options.nodeRadius + 1) * u.y - u.y * options.arrowSize }, angle)

          const dx = rotatedPointF2.x + computedOffset(d).x
          const dy = rotatedPointF2.y + computedOffset(d).y
          d3.select(this)
            .attr('transform', function(d) {
              if (d.direction) {
                return 'rotate(' + (-10 * d.linknum * d.direction) + ',' + dx + ',' + dy + ')'
              } else {
                return 'rotate(' + (-10 * d.linknum) + ',' + dx + ',' + dy + ')'
              }
              // return 'rotate('+d.linknum+' 0, 0)'
            })

          return ' M ' + (rotatedPointF2.x + computedOffset(d).x) + ' ' + (rotatedPointF2.y + computedOffset(d).y) +
                            ' L ' + (rotatedPointC2.x + computedOffset(d).x) + ' ' + (rotatedPointC2.y + computedOffset(d).y) +
                            ' L ' + (rotatedPointD2.x + computedOffset(d).x) + ' ' + (rotatedPointD2.y + computedOffset(d).y) +
                            ' L ' + (rotatedPointE2.x + computedOffset(d).x) + ' ' + (rotatedPointE2.y + computedOffset(d).y) +
                            ' L ' + (rotatedPointF2.x + computedOffset(d).x) + ' ' + (rotatedPointF2.y + computedOffset(d).y) +
                            ' Z '
        } else {
          return ''
        }
      })
    })
  }
  function jiantoujianju(d) {
    const arrname = d.target.id + '|' + d.source.id
    const arrname2 = d.source.id + '|' + d.target.id
    let leng
    if (Array.isArray(sameRelations[arrname])) {
      leng = sameRelations[arrname].length
    } else if (Array.isArray(sameRelations[arrname2])) {
      leng = sameRelations[arrname2].length
    } else {
      leng = 0
    }
    if (leng > 7) {
      return options.minArrowGap * d.linknum * 10
    } else if (leng > 0) {
      return options.maxArrowGap * d.linknum * 10
    } else {
      return 1
    }
  }
  function tickRelationshipsOutlines() {
    relationship.each(function(relationship) {
      var rel = d3.select(this)
      var outline = rel.select('.outline')
      var text = rel.select('.text')
      var bbox = text.node().getBBox()
      var padding = 3

      outline.attr('d', function(d) {
        var center = { x: 0, y: 0 }
        var angle = rotation(d.source, d.target)
        var textBoundingBox = text.node().getBBox()
        var textPadding = 5
        var jianju = jiantoujianju(d)
        var u = unitaryVector(d.source, d.target)
        var textMargin = { x: (d.target.x - d.source.x - (textBoundingBox.width + textPadding) * u.x) * 0.5, y: (d.target.y - d.source.y - (textBoundingBox.width + textPadding) * u.y) * 0.5 }
        var dx = d.source.x - d.target.x
        var dy = d.source.y - d.target.y
        var length = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) / options.openBigDistance
        var n = unitaryNormalVector(d.source, d.target)
        var rotatedPointA1 = rotatePoint(center, { x: 0 + (options.nodeRadius + 1) * u.x - n.x, y: 0 + (options.nodeRadius + 1) * u.y - n.y }, angle)
        var rotatedPointB1 = rotatePoint(center, { x: textMargin.x - n.x, y: textMargin.y - n.y }, angle)
        var rotatedPointC1 = rotatePoint(center, { x: textMargin.x, y: textMargin.y }, angle)
        var rotatedPointD1 = rotatePoint(center, { x: 0 + (options.nodeRadius + 1) * u.x, y: 0 + (options.nodeRadius + 1) * u.y }, angle)
        var rotatedPointA2 = rotatePoint(center, { x: d.target.x - d.source.x - textMargin.x - n.x, y: d.target.y - d.source.y - textMargin.y - n.y }, angle)
        var rotatedPointB2 = rotatePoint(center, { x: d.target.x - d.source.x - (options.nodeRadius + 1) * u.x - n.x - u.x * options.arrowSize, y: d.target.y - d.source.y - (options.nodeRadius + 1) * u.y - n.y - u.y * options.arrowSize }, angle)
        var rotatedPointC2 = rotatePoint(center, { x: d.target.x - d.source.x - (options.nodeRadius + 1) * u.x - n.x + (n.x - u.x) * options.arrowSize, y: d.target.y - d.source.y - (options.nodeRadius + 1) * u.y - n.y + (n.y - u.y) * options.arrowSize }, angle)
        var rotatedPointD2 = rotatePoint(center, { x: d.target.x - d.source.x - (options.nodeRadius + 1) * u.x, y: d.target.y - d.source.y - (options.nodeRadius + 1) * u.y }, angle)
        var rotatedPointE2 = rotatePoint(center, { x: d.target.x - d.source.x - (options.nodeRadius + 1) * u.x + (-n.x - u.x) * options.arrowSize, y: d.target.y - d.source.y - (options.nodeRadius + 1) * u.y + (-n.y - u.y) * options.arrowSize }, angle)
        var rotatedPointF2 = rotatePoint(center, { x: d.target.x - d.source.x - (options.nodeRadius + 1) * u.x - u.x * options.arrowSize, y: d.target.y - d.source.y - (options.nodeRadius + 1) * u.y - u.y * options.arrowSize }, angle)
        var rotatedPointG2 = rotatePoint(center, { x: d.target.x - d.source.x - textMargin.x, y: d.target.y - d.source.y - textMargin.y }, angle)
        if (d.linknum !== 0) {
          rotatedPointB1 = rotatePoint(center, { x: textMargin.x - (n.x * jianju * length * d.direction), y: textMargin.y - (n.y * jianju * length * d.direction) }, angle)
          rotatedPointC1 = rotatePoint(center, { x: textMargin.x - (n.x * jianju * length * d.direction) + n.x, y: textMargin.y - (n.y * jianju * length * d.direction) + n.y }, angle)
          rotatedPointA2 = rotatePoint(center, { x: d.target.x - d.source.x - textMargin.x - (n.x * jianju * length * d.direction), y: d.target.y - d.source.y - textMargin.y - (n.y * jianju * length * d.direction) }, angle)
          rotatedPointG2 = rotatePoint(center, { x: d.target.x - d.source.x - textMargin.x - (n.x * jianju * length * d.direction) + n.x, y: d.target.y - d.source.y - textMargin.y - (n.y * jianju * length * d.direction) + n.y }, angle)

          const arc = computeArcRatelength(d, rotatedPointA1, rotatedPointB1)

          let mark = d.linknum > 0 ? 0 : 1
          let mark2 = d.linknum > 0 ? 1 : 0

          if (d.direction === -1) {
            mark = d.linknum > 0 ? 1 : 0
            mark2 = d.linknum > 0 ? 0 : 1
          }

          return 'M ' + (rotatedPointA1.x - computedOffset(d, true).x) + ' ' + (rotatedPointA1.y + computedOffset(d, true).y) +
                            // return 'M ' + computedOffset(d,rotatedPointA1.x,rotatedPointA1.y).x  + ' ' +  computedOffset(d,rotatedPointA1.x,rotatedPointA1.y).y +
                            ' A ' + arc.x + ' ' + arc.y + ' , 0 , 0 ,' + mark + rotatedPointB1.x + ' ' + rotatedPointB1.y +
                            ' L ' + rotatedPointC1.x + ' ' + rotatedPointC1.y +
                            ' A ' + arc.x + ' ' + arc.y + ' , 0 , 0 , ' + mark2 + (rotatedPointD1.x - computedOffset(d, true).x) + ' ' + (rotatedPointD1.y + computedOffset(d, true).y) +
                            // ' A '+arc.x+' '+arc.y+' , 0 , 0 , '+mark2 + computedOffset(d,rotatedPointD1.x,rotatedPointD1.y).x + ' ' + computedOffset(d,rotatedPointD1.x,rotatedPointD1.y).y +
                            // ' A '+arc.x+' '+arc.y+' , 0 , 0 , '+mark2 + (rotatedPointD1.x  ) + ' ' + (rotatedPointD1.y ) +
                            ' Z' +
                            ' M ' + rotatedPointA2.x + ' ' + rotatedPointA2.y + // 第二部分起点  需改
                            // ' A '+arc.x+' '+arc.y+' , 0 , 0 ,'+ mark + (rotatedPointB2.x) + ' ' + (rotatedPointB2.y) + // 第一部分text
                            ' A ' + arc.x + ' ' + arc.y + ' , 0 , 0 ,' + mark + (rotatedPointB2.x + computedOffset(d).x) + ' ' + (rotatedPointB2.y + computedOffset(d).y) + // 第一部分text
                            // ' L ' + (rotatedPointC2.x + computedOffset(d).x ) + ' ' + (rotatedPointC2.y + computedOffset(d).y ) +
                            // ' L ' + (rotatedPointD2.x + computedOffset(d).x  ) + ' ' + (rotatedPointD2.y + computedOffset(d).y )+
                            // ' L ' + (rotatedPointE2.x + computedOffset(d).x  ) + ' ' + (rotatedPointE2.y + computedOffset(d).y ) +
                            // ' L ' + (rotatedPointF2.x + computedOffset(d).x) + ' ' + (rotatedPointF2.y + computedOffset(d).y) +
                            ' L ' + (rotatedPointF2.x + computedOffset(d).x) + ' ' + (rotatedPointF2.y + computedOffset(d).y) +
                            ' A ' + arc.x + ' ' + arc.y + ' , 0 , 0 , ' + mark2 + rotatedPointG2.x + ' ' + rotatedPointG2.y + // 第一部分text
                            ' Z'
        } else {
          return 'M ' + rotatedPointA1.x + ' ' + rotatedPointA1.y +
                                ' L ' + rotatedPointB1.x + ' ' + rotatedPointB1.y + // 第一部分终点 需改
                                ' L ' + rotatedPointC1.x + ' ' + rotatedPointC1.y +
                                ' L ' + rotatedPointD1.x + ' ' + rotatedPointD1.y + // 第一部分终点  需改
                                ' Z' +
                                ' M ' + (rotatedPointA2.x) + ' ' + (rotatedPointA2.y) + // 第二部分起点  需改
                                // ' M ' + rotatedPointB2.x + ' ' + rotatedPointB2.y +
                                ' L ' + (rotatedPointB2.x) + ' ' + rotatedPointB2.y +
                                ' L ' + (rotatedPointC2.x) + ' ' + rotatedPointC2.y +
                                ' L ' + (rotatedPointD2.x) + ' ' + rotatedPointD2.y + // 箭头靠近圆顶点
                                ' L ' + (rotatedPointE2.x) + ' ' + rotatedPointE2.y + // 箭头上方顶点
                                ' L ' + (rotatedPointF2.x) + ' ' + (rotatedPointF2.y) +
                                ' L ' + (rotatedPointG2.x) + ' ' + (rotatedPointG2.y) + // 第二部分起点 需改
                                ' Z'
        }
      })
    })
  }

  function appendArrowToRelationship(r) {
    return r.append('path')
      .attr('class', 'Arrow')
      .attr('fill', '#a5abb6')
      .attr('stroke', 'none')
  }
  function AddArrowToRelation() {

  }

  function computedOffset(d, bool) {
    var radians = (Math.PI / 180) * (jiantoujianju(d) * d.direction)
    var cos = Math.cos(radians)
    var sin = Math.sin(radians)
    var ny = sin * options.nodeRadius * 1.15
    var nx = (1 - cos) * options.nodeRadius * 1.15
    if (bool) {
      ny = sin * options.nodeRadius,
      nx = (1 - cos) * options.nodeRadius
    }

    return { x: nx, y: ny }
  }

  function computeArcRatelength(d, d1, d2) {
    const dx = d.source.x - d.target.x; const dy = d.source.y - d.target.y
    let length = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) / 1200
    // console.log('length', length)
    if (length < 1) {
      length = 1
    } else if (length < 0.25) {
      // length = 0.5
    }
    const x = d1.x - d2.x
    const y = d1.y - d2.y
    return { x: 2 * x * length, y: 2 * y * length }
  }

  //  关系线阴影
  function tickRelationshipsOverlays() {
    relationshipOverlay.attr('d', function(d) {
      var center = { x: 0, y: 0 }
      var angle = rotation(d.source, d.target)
      var n1 = unitaryNormalVector(d.source, d.target)
      var n = unitaryNormalVector(d.source, d.target, 50)
      var jianju = jiantoujianju(d)
      var dx = d.source.x - d.target.x
      var dy = d.source.y - d.target.y
      var length = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) / 200
      var rotatedPointA = rotatePoint(center, { x: 0 - n.x, y: 0 - n.y }, angle)
      var rotatedPointB = rotatePoint(center, { x: d.target.x - d.source.x - n.x, y: d.target.y - d.source.y - n.y }, angle)
      var rotatedPointC = rotatePoint(center, { x: d.target.x - d.source.x + n.x - n1.x, y: d.target.y - d.source.y + n.y - n1.y }, angle)
      var rotatedPointD = rotatePoint(center, { x: 0 + n.x - n1.x, y: 0 + n.y - n1.y }, angle)

      if (d.linknum !== 0) {
        var angle = (rotation(d.source, d.target) + 360) % 360
        var mirror = angle > 90 && angle < 270
        var nWeight = mirror ? 2 : -3

        let length = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
        const point = { x: (d.target.x - d.source.x) * 0.5 + n.x * nWeight - (n.x * jianju * length), y: (d.target.y - d.source.y) * 0.5 + n.y * nWeight - (n.y * jianju * length) }
        const rotatedPoint = rotatePoint(center, point, angle)

        if (length < 1) {
          length = 1
        } else if (length < 0.25) {
          length = 0.5
        }

        const addlength = Math.sqrt(Math.pow((n.x * jianju * length / 200 - 10), 2) + Math.pow((n.y * jianju * length / 200 - 10), 2))

        let mark = d.linknum > 0 ? 0 : 1
        let mark2 = d.linknum > 0 ? 1 : 0

        if (d.direction === -1) {
          mark = d.linknum > 0 ? 1 : 0
          mark2 = d.linknum > 0 ? 0 : 1
        }

        return ' M ' + (rotatedPointA.x) + ' ' + (rotatedPointA.y) +
                            ' A ' + length + ' ' + addlength + ' , 0 , 0 ,' + mark + ' ' + rotatedPointB.x + ' ' + rotatedPointB.y +
                            ' L ' + rotatedPointC.x + ' ' + rotatedPointC.y +
                            ' A ' + length + ' ' + addlength + ' , 0 , 0 , ' + mark2 + ' ' + (rotatedPointD.x) + ' ' + (rotatedPointD.y) +
                            ' Z'
      }

      return ' M ' + rotatedPointA.x + ' ' + rotatedPointA.y +
                   ' L ' + rotatedPointB.x + ' ' + rotatedPointB.y +
                   ' L ' + rotatedPointC.x + ' ' + rotatedPointC.y +
                   ' L ' + rotatedPointD.x + ' ' + rotatedPointD.y +
                   ' Z'
    })
  }

  function tickRelationshipsTexts() {
    relationshipText.attr('transform', function(d) {
      var angle = (rotation(d.source, d.target) + 360) % 360
      var jianju = jiantoujianju(d)
      var mirror = angle > 90 && angle < 270
      var center = { x: 0, y: 0 }
      var n = unitaryNormalVector(d.source, d.target)
      var dx = d.source.x - d.target.x
      var dy = d.source.y - d.target.y
      var length = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) / options.openBigDistance
      var nWeight = mirror ? 2 : -3
      let point, rotatedPoint

      if (d.linknum === 0) {
        jianju = 0
      }

      if (d.direction) {
        point = { x: (d.target.x - d.source.x) * 0.5 + n.x * nWeight - (n.x * jianju * length * d.direction), y: (d.target.y - d.source.y) * 0.5 + n.y * nWeight - (n.y * jianju * length * d.direction) }
      } else {
        point = { x: (d.target.x - d.source.x) * 0.5 + n.x * nWeight - (n.x * jianju * length), y: (d.target.y - d.source.y) * 0.5 + n.y * nWeight - (n.y * jianju * length) }
      }
      rotatedPoint = rotatePoint(center, point, angle)

      return 'translate(' + rotatedPoint.x + ', ' + rotatedPoint.y + ') rotate(' + (mirror ? 180 : 0) + ')'
    })
  }

  // function toString(d) {
  //     var s = d.labels ? d.labels : d.type;

  //     s += ' (<id>: ' + d.id;

  //     Object.keys(d.properties).forEach(function(property) {
  //         s += ', ' + property + ': ' + JSON.stringify(d.properties[property]);
  //     });

  //     s += ')';

  //     return s;
  // }

  function unitaryNormalVector(source, target, newLength) {
    var center = { x: 0, y: 0 }
    var vector = unitaryVector(source, target, newLength)

    return rotatePoint(center, vector, 90)
  }

  function unitaryVector(source, target, newLength) {
    var length = Math.sqrt(Math.pow(target.x - source.x, 2) + Math.pow(target.y - source.y, 2)) / Math.sqrt(newLength || 1)

    return {
      x: (target.x - source.x) / length,
      y: (target.y - source.y) / length
    }
  }

  function updateWithD3Data(d3Data) {
    updateNodesAndRelationships(d3Data.nodes, d3Data.relationships)
  }

  function updateWithNeo4jData(neo4jData) {
    var d3Data = neo4jDataToD3Data(neo4jData)
    updateWithD3Data(d3Data)
  }

  function updateInfo(d) {
    clearInfo()

    if (d.labels) {
      appendInfoElementClass('class', d.labels)
    } else {
      appendInfoElementRelationship('class', d.type)
    }

    Object.keys(d.properties).forEach(function(property) {
      appendInfoElementProperty('property', property, JSON.stringify(d.properties[property]))
    })
  }

  function updateNodes(n) {
    Array.prototype.push.apply(nodes, n)
    // console.log('updateNodes', nodes)
    // console.log('updateNodes', relationships)

    node = svgNodes.selectAll('.node')
      .data(nodes, function(d) { return d.id })
    var nodeEnter = appendNodeToGraph()
    node = nodeEnter.merge(node)
  }

  function updateNodesAndRelationships(n, r) {
    updateNodes(n)
    updateRelationships(r)
    // console.log('simulation.nodes',nodes )
    simulation.nodes(nodes)
    simulation.force('link').links(relationships)
  }

  function updateRelationships(r) {
    Array.prototype.push.apply(relationships, r)

    const arrNode = []

    nodes.forEach((item, i) => {
      arrNode.push(item.id)
    })
    relationships.forEach((item, i) => {
      if (arrNode.indexOf(item.startNode) === -1 || arrNode.indexOf(item.endNode) === -1) {
        relationships.splice(i, 1)
        // console.log('splice',item )
      }
    })

    relationship = svgRelationships.selectAll('.relationship')
      .data(relationships, function(d) { return d.id })
    var relationshipEnter = appendRelationshipToGraph()
    relationship = relationshipEnter.relationship.merge(relationship)
    relationshipOutline = svg.selectAll('.relationship .outline')
    relationshipOutline = relationshipEnter.outline.merge(relationshipOutline)

    relationshipOverlay = svg.selectAll('.relationship .overlay')
    relationshipOverlay = relationshipEnter.overlay.merge(relationshipOverlay)

    relationshipText = svg.selectAll('.relationship .text')
    relationshipText = relationshipEnter.text.merge(relationshipText)
  }

  function zoomFit(transitionDuration) {
    // .getBBox()返回给定元素的边界框描述。
    var bounds = svg.node().getBBox()
    var parent = svg.node().parentElement.parentElement
    var fullWidth = parent.clientWidth
    var fullHeight = parent.clientHeight
    var width = bounds.width
    var height = bounds.height
    var midX = bounds.x + width / 2
    var midY = bounds.y + height / 2

    if (width === 0 || height === 0) {
      return // nothing to fit
    }

    svgScale = 0.85 / Math.max(width / fullWidth, height / fullHeight)
    svgTranslate = [fullWidth / 2 - svgScale * midX, fullHeight / 2 - svgScale * midY]

    svg.attr('transform', 'translate(' + svgTranslate[0] + ', ' + svgTranslate[1] + ') scale(' + svgScale + ')')
    //        smoothTransform(svgTranslate, svgScale);
  }

  function clearAll() {
    d3.select(".neo4jd3-graph").remove()
    console.log('resize',resize )
    window.removeEventListener('resize',resize , false)
  }

  init(_selector, _options)

  return {
    neo4jDataToD3Data: neo4jDataToD3Data,
    updataNodesChildren: updataNodesChildren,
    size: size,
    updateWithD3Data: updateWithD3Data,
    updateWithNeo4jData: updateWithNeo4jData,
    changeNodeColor: changeNodeColor,
    changeNodeTextPosition: changeNodeTextPosition,
    changeNodeTextFontSize: changeNodeTextFontSize,
    changeNodeSize: changeNodeSize,
    resetGraph: resetGraph,
    ShowOrHideText: ShowOrHideText,
    clearAll:clearAll
  }
}

// module.exports = Neo4jD3;

