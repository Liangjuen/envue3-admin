<template>
    <div class="menu-management-container">
        <div class="top-panel" v-permission="['menu', 'add']">
            <el-button type="primary" @click="showDialog('add')">
                <svg-icon icon="plus" class="mr-8"></svg-icon>
                添 加
            </el-button>
        </div>
        <el-table :data="menus" style="width: 100%" row-key="id" border>
            <el-table-column prop="title" label="标题" min-width="140" />
            <el-table-column prop="icon" label="图标" align="center " width="100">
                <template v-slot="{ row }">
                    <svg-icon :icon="row.icon" :size="18" :strokeWidth="2"></svg-icon>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="Name" min-width="120" />
            <el-table-column prop="path" label="路径" min-width="120" />
            <el-table-column prop="component" label="组件路径" min-width="120">
                <template v-slot="{ row }">
                    <el-tooltip v-if="row.component" effect="dark" :content="row.component" placement="top">
                        {{ row.component }}
                    </el-tooltip>
                    <span v-else>Layout</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="140">
                <template v-slot="{ row }">
                    <el-button v-permission="['menu', 'edit']" type="primary" size="small">编辑</el-button>
                    <el-button v-permission="['menu', 'delete']" type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="state.dialogTableVisible" :title="state.dialogTitle" draggable>
            <span>This is a message</span>
            <template #footer>
                <span>
                    <el-button @click="state.dialogTableVisible = false">取 消</el-button>
                    <el-button type="primary" @click="state.dialogTableVisible = false">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { usePermissionStore } from '@/stores/permission'
import { getMenus } from '@/utils'
const PermissionStore = usePermissionStore()
const menus = computed<API.Menu[]>(() => getMenus(PermissionStore.permissions))

const state = reactive({
    dialogTableVisible: false,
    dialogTitle: '新增菜单'
})

const showDialog = (type: 'add' | 'edit') => {
    state.dialogTableVisible = true
}
</script>

<style lang="scss" >
.top-panel {
    margin-bottom: var(--theme-margin);
}
</style>