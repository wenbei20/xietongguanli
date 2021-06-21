<template>
  <draggable
    :list="list"
    v-bind="$attrs"
    class="board-wrapper"
    :set-data="setData"
    animation="300"
    ghost-class="column_ghost"
  >

    <dragchild
      v-for="element in list"
      :key="element.id"
      :name="element.name"
      :list="element.children"
      group="group"
      class="kanban todo"
      :addmoreinfo="addmoreinfo"
    />

  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import dragchild from './column'

export default {
  name: 'DragKanbanDemo',
  components: {
    draggable,
    dragchild
  },
  props: {
    headerText: {
      type: String,
      default: 'Header'
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    list: {
      type: Array,
      default() {
        return []
      }
    },
    addmoreinfo: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      childrenLength: ''
    }
  },
  methods: {
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '')
    }
  }
}
</script>
<style lang="scss" scoped>
.board-wrapper { width: 100%; height: 100%; overflow-x: auto; overflow-y: hidden; display: flex; align-items: flex-start; flex-wrap: nowrap; }
.column_ghost{
  position: relative;
}
.column_ghost:after{ content: ''; display:block; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: #E2E2E2; border-radius: 4px; border: 1px solid #D5D5D5; z-index: 1002;}
</style>

