<template>
    <div class="menu-management-container card">
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
        <el-dialog v-model="state.dialogTableVisible" :title="state.dialogTitle" draggable width="760px">
            <el-form :model="menuForm" :inline="true" label-width="110px" require-asterisk-position="left">
                <el-form-item label="类型" required>
                    <el-radio-group v-model="menuForm.type">
                        <el-radio :label="1">目录</el-radio>
                        <el-radio :label="2">页面</el-radio>
                        <el-radio :label="3">按钮</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item></el-form-item>
                <el-form-item label="标题" required>
                    <el-input v-model="menuForm.title"></el-input>
                </el-form-item>
                <el-form-item label="访问路径" required>
                    <el-input v-model="menuForm.path"></el-input>
                </el-form-item>
                <el-form-item label="vue组件路径" required>
                    <el-input v-model="menuForm.component"></el-input>
                </el-form-item>
                <el-form-item label="路由名称">
                    <el-input v-model="menuForm.name"></el-input>
                </el-form-item>
                <el-form-item label="父级目录" required>
                    <el-tree-select v-model="menuForm.pid" :data="parentTree" check-strictly :render-after-expand="false" />
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="menuForm.sort"></el-input>
                </el-form-item>
                <el-form-item label="图标">
                    <el-input v-model="menuForm.icon">
                        <template #append>
                            <SvgSelector :data="svgNames" v-model="menuForm.icon">
                                <el-button>
                                    <svg-icon :icon="menuForm.icon ? menuForm.icon : 'more-horizontal'"></svg-icon>
                                </el-button>
                            </SvgSelector>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="缓存">
                    <el-switch v-model="menuForm.cache"></el-switch>
                </el-form-item>
                <el-form-item label="隐藏">
                    <el-switch v-model="menuForm.hidden"></el-switch>
                </el-form-item>
            </el-form>
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
import SvgSelector from '@/components/SvgSelector/index'
import svgNames from '@/assets/icons/index'

const PermissionStore = usePermissionStore()
const menus = computed<API.Menu[]>(() => getMenus(PermissionStore.permissions))
type TreeSelect = {
    value: string
    label: string
    children?: TreeSelect[]
}
const parentTree = computed(() => {
    const mapMenus = (menu: API.Menu) => {
        let item: TreeSelect
        item = {
            value: menu.id,
            label: menu.title
        }
        if (menu.children && menu.children.length) {
            item.children = menu.children.filter(i => i.type == 1).map(mapMenus)
        }
        return item
    }
    const tree = [{
        value: '',
        label: '根目录',
        children: menus.value.filter(i => i.type == 1).map(mapMenus)
    }]
    return tree
})

const menuForm = reactive<API.Menu>({
    id: '',
    pid: '',
    path: '',
    name: '',
    type: 1,
    title: '',
    icon: '',
    sort: 1,
    hidden: 0,
    cache: 0,
    component: ''
})

const state = reactive({
    dialogTableVisible: false,
    dialogTitle: '新增菜单'
})

const showDialog = (type: 'add' | 'edit') => {
    state.dialogTableVisible = true
}
</script>

<style lang="scss" scoped>
.top-panel {
    margin-bottom: var(--theme-margin);
}

.el-form-item {
    width: 300px;

    .el-radio {
        margin-right: 18px;
    }

    .el-radio:last-child {
        margin-right: 0;
    }
}
</style>