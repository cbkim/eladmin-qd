<template>
  <div class="app-container">
    <!--表单组件-->
    <eForm ref="form" :is-add="isAdd"/>
    <!--工具栏-->
    <div class="head-container">
      <!-- 搜索 -->
      <el-input v-model="query.value" clearable :placeholder="$t('searchname')" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">{{ $t('search') }}</el-button>
      <!-- 新增 -->
      <div v-permission="['ADMIN','ROLES_ALL','ROLES_CREATE']" style="display: inline-block;margin: 0px 2px;">
        <el-button
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="add">{{ $t('add') }}</el-button>
      </div>
    </div>
    <el-row :gutter="15">
      <!--角色管理-->
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="role-span">{{ $t('rolelist') }}</span>
            <div id="opt" style="float: right">
              <el-radio-group v-model="opt" size="mini">
                <el-radio-button :label="$t('menuassignment')"/>
                <el-radio-button label="权限分配"/>
              </el-radio-group>
            </div>
          </div>
          <el-table v-loading="loading" :data="data" highlight-current-row size="small" style="width: 100%;" @current-change="handleCurrentChange">
            <el-table-column prop="name" label="名称"/>
            <el-table-column prop="dataScope" label="数据权限"/>
            <el-table-column prop="level" label="角色级别"/>
            <el-table-column :show-overflow-tooltip="true" prop="remark" label="描述"/>
            <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建日期">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.createTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="checkPermission(['ADMIN','ROLES_ALL','ROLES_EDIT','ROLES_DELETE'])" label="操作" width="130px" align="center">
              <template slot-scope="scope">
                <el-button v-permission="['ADMIN','ROLES_ALL','ROLES_EDIT']" size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)"/>
                <el-popover
                  v-permission="['ADMIN','ROLES_ALL','ROLES_DELETE']"
                  :ref="scope.row.id"
                  placement="top"
                  width="180">
                  <p{{ $t('confirmdeletion') }}</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                    <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                  </div> <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <!--分页组件-->
          <el-pagination
            :total="total"
            :current-page="page + 1"
            style="margin-top: 8px;"
            layout="total, prev, pager, next, sizes"
            @size-change="sizeChange"
            @current-change="pageChange"/>
        </el-card>
      </el-col>
      <!-- 授权 -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
        <el-card v-show="opt === $t('menuassignment')" class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <el-tooltip class="item" effect="dark" content="选择指定角色分配菜单" placement="top">
              <span class="role-span"> {{ $t('menuassignment') }} </span>
            </el-tooltip>
            <el-button
              v-permission="['ADMIN','ROLES_ALL','ROLES_EDIT']"
              :disabled="!showButton"
              :loading="menuLoading"
              icon="el-icon-check"
              size="mini"
              style="float: right; padding: 6px 9px"
              type="primary"
              @click="saveMenu">保存</el-button>
          </div>
          <el-tree
            ref="menu"
            :data="menus"
            :default-checked-keys="menuIds"
            :props="defaultProps"
            accordion
            show-checkbox
            node-key="id"/>
        </el-card>
        <el-card v-show="opt === '权限分配'" class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <el-tooltip class="item" effect="dark" content="选择指定角色分配权限" placement="top">
              <span class="role-span">权限分配</span>
            </el-tooltip>
            <el-button
              v-permission="['ADMIN','ROLES_ALL','ROLES_EDIT']"
              :disabled="!showButton"
              :loading="permissionLoading"
              icon="el-icon-check"
              size="mini"
              style="float: right; padding: 6px 9px"
              type="primary"
              @click="savePermission">保存</el-button>
          </div>
          <el-tree
            ref="permission"
            :data="permissions"
            :default-checked-keys="permissionIds"
            :props="defaultProps"
            show-checkbox
            accordion
            node-key="id"/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del } from '@/api/role'
import { getPermissionTree } from '@/api/permission'
import { getMenusTree } from '@/api/menu'
import { parseTime } from '@/utils/index'
import eForm from './form'
import { editPermission, editMenu, get } from '@/api/role'
import i18n from '../../../lang/lang'

var lang = i18n.messages.en
export default {
  components: { eForm },
  mixins: [initData],
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      currentId: 0, permissionLoading: false, menuLoading: false, showButton: false, opt: lang.menuassignment,
      delLoading: false, permissions: [], permissionIds: [], menus: [], menuIds: []
    }
  },
  created() {
    this.getPermissions()
    this.getMenus()
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.$refs.permission.setCheckedKeys([])
      this.$refs.menu.setCheckedKeys([])
      this.showButton = false
      this.url = 'api/roles'
      const sort = 'level,asc'
      const query = this.query
      const value = query.value
      this.params = { page: this.page, size: this.size, sort: sort }
      if (value) { this.params['name'] = value }
      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.dleChangePage()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err.response.data.message)
      })
    },
    getPermissions() {
      getPermissionTree().then(res => {
        this.permissions = res
      })
    },
    getMenus() {
      getMenusTree().then(res => {
        this.menus = res
      })
    },
    handleCurrentChange(val) {
      if (val) {
        const _this = this
        // 清空权限与菜单的选中
        this.$refs.permission.setCheckedKeys([])
        this.$refs.menu.setCheckedKeys([])
        // 保存当前的角色id
        this.currentId = val.id
        // 点击后显示按钮
        this.showButton = true
        // 初始化
        this.menuIds = []
        this.permissionIds = []
        // 菜单数据需要特殊处理
        val.menus.forEach(function(data, index) {
          let add = true
          for (let i = 0; i < val.menus.length; i++) {
            if (data.id === val.menus[i].pid) {
              add = false
              break
            }
          }
          if (add) {
            _this.menuIds.push(data.id)
          }
        })
        // 处理权限数据
        val.permissions.forEach(function(data, index) {
          _this.permissionIds.push(data.id)
        })
      }
    },
    savePermission() {
      this.permissionLoading = true
      const role = { id: this.currentId, permissions: [] }
      this.$refs.permission.getCheckedKeys().forEach(function(data, index) {
        const permission = { id: data }
        role.permissions.push(permission)
      })
      editPermission(role).then(res => {
        this.$notify({
          title: '保存成功',
          type: 'success',
          duration: 2500
        })
        this.permissionLoading = false
        this.update()
      }).catch(err => {
        this.permissionLoading = false
        console.log(err.response.data.message)
      })
    },
    saveMenu() {
      this.menuLoading = true
      const role = { id: this.currentId, menus: [] }
      // 得到半选的父节点数据，保存起来
      this.$refs.menu.getHalfCheckedNodes().forEach(function(data, index) {
        const permission = { id: data.id }
        role.menus.push(permission)
      })
      // 得到已选中的 key 值
      this.$refs.menu.getCheckedKeys().forEach(function(data, index) {
        const permission = { id: data }
        role.menus.push(permission)
      })
      editMenu(role).then(res => {
        this.$notify({
          title: '保存成功',
          type: 'success',
          duration: 2500
        })
        this.menuLoading = false
        this.update()
      }).catch(err => {
        this.menuLoading = false
        console.log(err.response.data.message)
      })
    },
    update() {
      // 无刷新更新 表格数据
      get(this.currentId).then(res => {
        for (let i = 0; i < this.data.length; i++) {
          if (res.id === this.data[i].id) {
            this.data[i] = res
            break
          }
        }
      })
    },
    add() {
      this.isAdd = true
      this.$refs.form.dialog = true
    },
    edit(data) {
      this.isAdd = false
      const _this = this.$refs.form
      _this.deptIds = []
      _this.form = { id: data.id, name: data.name, remark: data.remark, depts: data.depts, dataScope: data.dataScope, level: data.level }
      if (_this.form.dataScope === '自定义') {
        _this.getDepts()
      }
      for (let i = 0; i < _this.form.depts.length; i++) {
        _this.deptIds[i] = _this.form.depts[i].id
      }
      _this.dialog = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .role-span {
    font-weight: bold;color: #303133;
    font-size: 15px;
  }
</style>
