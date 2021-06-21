<template>
  <div class="components-container board">
    <!-- <Kanban :key="1" :list="list1" :group="group" class="kanban todo" header-text="Todo" />
    <Kanban :key="2" :list="list2" :group="group" class="kanban working" header-text="Working" />
    <Kanban :key="3" :list="list3" :group="group" class="kanban done" header-text="Done" /> -->

    <Kanbanlevel :key="1" :list="list01" />

  </div>
</template>
<script>
// import Kanban from '@/components/Kanban'
import Kanbanlevel from '@/components/Kanban/index_level'

export default {
  name: 'DragKanbanDemo',
  components: {
    // Kanban,
    Kanbanlevel
  },
  data() {
    return {
      group: 'mission',
      list1: [
        { name: 'Mission', id: 1 },
        { name: 'Mission', id: 2 },
        { name: 'Mission', id: 3 },
        { name: 'Mission', id: 4 }
      ],
      list2: [
        { name: 'Mission', id: 5 },
        { name: 'Mission', id: 6 },
        { name: 'Mission', id: 7 }
      ],
      list3: [
        { name: 'Mission', id: 8 },
        { name: 'Mission', id: 9 },
        { name: 'Mission', id: 10 }
      ],
      list01: [
        { name: '待处理', id: 1111,
          children: [
            { name: 'Mission', checked: false, tags: ['red', 'orange', 'yellow', 'green', 'blue'], id: 1 },
            { name: 'Mission', checked: false, tags: [], id: 2 },
            { name: 'Mission', checked: false, tags: [], id: 3 }
          ]
        },
        { name: '测试', id: 2222,
          children: [
            { name: 'Mission', checked: false, tags: [], id: 11, time: '2020/10/01-至今' },
            { name: 'Mission', checked: false, tags: ['red', 'orange', 'yellow', 'green', 'blue'], id: 22, time: '' }
          ]
        },
        { name: '已完成', id: 3333,
          children: [
            { name: 'Mission', checked: false, tags: [], id: 64, time: '' }
          ]
        },
        { name: '进行中', id: 3333,
          children: [
            { name: 'Mission', checked: false, tags: [], id: 42, time: '' },
            { name: 'Mission', checked: false, tags: [], id: 53, time: '' }
          ]
        }
      ]

    }
  }
}
</script>
<style lang="scss">
.board {
  width: 1000px;
  margin-left: 20px;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: flex-start;
}

</style>

